////////////////////////////// VÁRIAVEIS GLOBAIS ///////////////////////////////

let ModalveiculoExternoIniciado = false;
let acaoManutencao = "create"; //Ação "create" por default 

//////////////////////////// FIM VÁRIAVEIS GLOBAIS /////////////////////////////

$(document).ready(async function () {

    ///////////////////////////////// EVENTOS //////////////////////////////////
    
    //// Inicio do controle da tela de consulta ////
    
    //Carrega dados e configurações da tabela "consulta-usuario" ao carregar página
    if ($('#consulta-veiculo')) {
        carregaConsulta('consulta-veiculo', 'veiculo');
    }
    
    $(document).on("click", '#excluirConfirmar', function () {
        executaExclusao('consulta-veiculo', 'veiculo');
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
        $('#consultaModelo').click(async function () {
            ModalveiculoExternoIniciado = carregaExterno('consulta-modelo', 'modelo', 'modalConsultaModelo', ModalveiculoExternoIniciado);
        });
    }

    //Chama processo a ser executado conforme a ação da tela de manutenção
    $("#form").submit(async function(e){
        e.preventDefault();
        $('#confirmar').prop('disabled', true);
        if (acaoManutencao == "edit") {
            urlApi = '/veiculo/' + $('#veicodigo').val();
            campos = ['veiano','veicor','veikm','modcodigo','veivalordiaria','veisituacao'];
            await executaAlteracao(campos, urlApi);
        } else if (acaoManutencao == "create") {
            urlApi = '/veiculo';
            campos = ['veiano','veicor','veikm','modcodigo','veivalordiaria','veisituacao'];
            await executaInsercao(campos, urlApi);
        }
        $('#confirmar').prop('disabled', false);
    });
    
    //Chama método para selecionar registro conforme modal selecionado
    $(document).on("click", '.selecionar', function () {
        if ($('.selected').length == 0) {
            return
        }
        if (currentModal === 'modalConsultaModelo') {
            SelecionaRegistro('modcodigo', 'moddescricao');
        } 
    });
  
    //Define os campos como obrigatório
    $('#veiano, #veicor, #veikm, #modcodigo, #moddescricao, #veivalordiaria, #veisituacao').attr("required", "true");

    //Define os campos como somente leitura
    $('#modcodigo, #moddescricao').prop("readonly", true);
    
    //// Fim do controle da tela de manutenção ////

    /////////////////////////////// FIM EVENTOS ////////////////////////////////

});

/////////////////////////////////// MÉTODOS ////////////////////////////////////

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
 * Define os atributos dos dados que serão usados
 * @param object data
 * @returns object
 */
function trataDadosVeiculo(data) {
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
        result = await api.get('veiculo/' + id);
        veiculo = result.data;
        result = await api.get('modelo/' + veiculo.modcodigo);
        modelo = result.data;
        $('#veicodigo').val(veiculo.veicodigo);
        $('#veiano').val(veiculo.veiano);
        $('#veicor').val(veiculo.veicor);
        $('#veikm').val(veiculo.veikm);
        $('#veivalordiaria').val(veiculo.veivalordiaria);
        Array.from($('#veisituacao')[0].options).forEach(item => {
            if (item.value == veiculo.veisituacao) {
                $(`select option[value='${item.value}']`).prop("selected", true);
                return false;
            }
        })
        $('#modcodigo').val(modelo.modcodigo);
        $('#moddescricao').val(modelo.moddescricao);
    } catch (err) {
        toastr['error'](Object.values(err.response.data.errors)[0]);
    }
}

///////////////////////////////// FIM MÉTODOS //////////////////////////////////