////////////////////////////// VÁRIAVEIS GLOBAIS ///////////////////////////////

let ModalPessoaExternoIniciado = false;
let ModalVeiculoExternoIniciado = false;
let acaoManutencao = "create"; //Ação "create" por default 

//////////////////////////// FIM VÁRIAVEIS GLOBAIS /////////////////////////////

$(document).ready(async function () {

    ///////////////////////////////// EVENTOS //////////////////////////////////
    
    //// Inicio do controle da tela de consulta ////
    
    //Carrega dados e configurações da tabela "consulta-usuario" ao carregar página
    if ($('#consulta-aluguel')) {
        carregaConsulta('consulta-aluguel', 'aluguel');
    }
    
    $(document).on("click", '#excluirConfirmar', function () {
        executaExclusao('consulta-aluguel', 'aluguel');
    });
    
    //// Fim do controle da tela de consulta ////
    
    //// Inicio do controle da tela de manutenção ////

    //Se tela de manutenção for de inclusão então esconde campo do código
    if (acaoManutencao == "create") {
        $('.rowCodigo').hide();
    }
    if (acaoManutencao != "show") {

        //Carrega dados e configurações da tabela externa de "consulta-pessoa" ao clicar na 
        //"lupinha" de consulta pessoa
        $('#consultaPessoa').click(async function () {
            ModalPessoaExternoIniciado = carregaExterno('consulta-pessoa', 'pessoa', 'modalConsultaPessoa', ModalaPessoaExternoIniciado);
        });

        //Carrega dados e configurações da tabela externa de "consulta-pessoa" ao clicar na 
        //"lupinha" de consulta pessoa
        $('#consultaVeiculo').click(async function () {
            ModalVeiculoExternoIniciado = carregaExterno('consulta-veiculo', 'veiculo', 'modalConsultaVeiculo', ModalVeiculoExternoIniciado);
        });
    }

    //Chama processo a ser executado conforme a ação da tela de manutenção
    $("#form").submit(async function(e){
        e.preventDefault();
        $('#confirmar').prop('disabled', true);
        if (acaoManutencao == "edit") {
            urlApi = '/aluguel/' + $('#alucodigo').val();
            campos = ['pescodigo','veicodigo','aluqtddiarias','aludataretirada'];
            await executaAlteracao(campos, urlApi);
        } else if (acaoManutencao == "create") {
            urlApi = '/aluguel';
            campos = ['pescodigo','veicodigo','aluqtddiarias','aludataretirada'];
            await executaInsercao(campos, urlApi);
        }
        $('#confirmar').prop('disabled', false);
    });
    
    //Chama método para selecionar registro conforme modal selecionado
    $(document).on("click", '.selecionar', function () {
        if ($('.selected').length == 0) {
            return
        }
        if (currentModal === 'modalConsultaPessoa') {
            SelecionaRegistro('pescodigo', 'pesnome');
        } else if (currentModal === 'modalConsultaVeiculo') {
            SelecionaRegistro('veicodigo', 'modcodigo');
        }
    });
  
    //Define os campos como obrigatório
    $('#pescodigo, #veicodigo, #aluqtddiarias, #aludataretirada').attr("required", "true");

    //Define os campos como somente leitura
    $('#pescodigo, #veicodigo').prop("readonly", true);
    
    //// Fim do controle da tela de manutenção ////

    /////////////////////////////// FIM EVENTOS ////////////////////////////////

});

/////////////////////////////////// MÉTODOS ////////////////////////////////////

/**
 * Define os atributos dos dados que serão usados
 * @param object data
 * @returns object
 */
function trataDadosAluguel(data) {
    let source = [],
            columns = [{data: "veicodigo"},
                {data: "veiano"},
                {data: "veicor"},
                {data: "veikm"},
                {data: "modcodigo"},
                {data: "veivalordiaria"},
                {data: "veisituacao"},
            ];
    data.forEach(item => source.push(
                {
                    veicodigo: item.veicodigo,
                    veiano: item.veiano,
                    veicor: item.veicor,
                    veikm: item.veikm,
                    modcodigo: item.modcodigo,
                    veivalordiaria: item.veivalordiaria,
                    veisituacao: item.veisituacao
                }
        ));
    return {source: source, columns: columns};
}



/**
 * Define os atributos dos dados que serão usados
 * @param object data
 * @returns object
 */
function trataDadosaluguel(data) {
    let source = [],
            columns = [{data: "veicodigo"},
                {data: "veiano"},
                {data: "veicor"},
                {data: "veikm"},
                {data: "modcodigo"},
                {data: "veivalordiaria"},
                {data: "veisituacao"},
            ];
    data.forEach(item => source.push(
                {
                    veicodigo: item.veicodigo,
                    veiano: item.veiano,
                    veicor: item.veicor,
                    veikm: item.veikm,
                    modcodigo: item.modcodigo,
                    veivalordiaria: item.veivalordiaria,
                    veisituacao: item.veisituacao
                }
        ));
    return {source: source, columns: columns};
}

/**
 * Define os atributos dos dados que serão usados
 * @param object data
 * @returns object
 */
function trataDadosModelo(data) {
    let source = [],
            columns = [{data: "modcodigo"},
                {data: "moddescricao"},
                {data: "marcodigo"},
            ];
    data.forEach(item => source.push(
                {
                    modcodigo: item.modcodigo,
                    moddescricao: item.moddescricao,
                    marcodigo: item.marcodigo,
                }
        ));
    return {source: source, columns: columns};
}

/**
 * Busca dados para tela de manutenção
 * @param string acao
 * @param string id
 * @returns {undefined}
 */
async function buscaDadosManutencao(acao, id) {
    acaoManutencao = acao;
    if (acao == 'show') {
        //Desabilita todos os campos
        $(':input').prop("disabled", true);
        //Remove o botão de "confirmar"
        $('#confirmar').hide();

    } 
    try {
        result = await api.get('aluguel/' + id);
        aluguel = result.data;
        result = await api.get('modelo/' + aluguel.modcodigo);
        modelo = result.data;
        $('#veicodigo').val(aluguel.veicodigo);
        $('#veiano').val(aluguel.veiano);
        $('#veicor').val(aluguel.veicor);
        $('#veikm').val(aluguel.veikm);
        $('#modcodigo').val(modelo.modcodigo);
        $('#moddescricao').val(modelo.moddescricao);
        $('#veivalordiaria').val(aluguel.veivalordiaria);
        $('#veisituacao').val(aluguel.veisituacao);
    } catch (err) {
        toastr['error'](Object.values(err.response.data.errors)[0]);
    }
}

///////////////////////////////// FIM MÉTODOS //////////////////////////////////