////////////////////////////// VÁRIAVEIS GLOBAIS ///////////////////////////////

let ModalMarcaExternoIniciado = false;
let acaoManutencao = "create"; //Ação "create" por default 

//////////////////////////// FIM VÁRIAVEIS GLOBAIS /////////////////////////////

$(document).ready(async function () {

    ///////////////////////////////// EVENTOS //////////////////////////////////
    
    //// Inicio do controle da tela de consulta ////
    
    //Carrega dados e configurações da tabela "consulta-usuario" ao carregar página
    if ($('#consulta-modelo')) {
        carregaConsulta('consulta-modelo', 'modelo');
    }
    
    $(document).on("click", '#excluirConfirmar', function () {
        executaExclusao('consulta-modelo', 'modelo');
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
        $('#consultaMarca').click(async function () {
            ModalMarcaExternoIniciado = carregaExterno('consulta-marca', 'marca', 'modalConsultaMarca', ModalMarcaExternoIniciado);
        });
    }

    //Chama processo a ser executado conforme a ação da tela de manutenção
    $("#form").submit(async function(e){
        e.preventDefault();
        $('#confirmar').prop('disabled', true);
        if (acaoManutencao == "edit") {
            urlApi = '/modelo/' + $('#modcodigo').val();
            campos = ['moddescricao','marcodigo'];
            await executaAlteracao(campos, urlApi);
        } else if (acaoManutencao == "create") {
            urlApi = '/modelo';
            campos = ['moddescricao','marcodigo'];
            await executaInsercao(campos, urlApi);
        }
        $('#confirmar').prop('disabled', false);
    });
    
    //Chama método para selecionar registro conforme modal selecionado
    $(document).on("click", '.selecionar', function () {
        if ($('.selected').length == 0) {
            return
        }
        if (currentModal === 'modalConsultaMarca') {
            SelecionaRegistro('marcodigo', 'mardescricao');
        } 
    });
  
    //Define os campos como obrigatório
    $('#modcodigo, #moddescricao, #marcodigo').attr("required", "true");

    //Define os campos como somente leitura
    $('#marcodigo, #mardescricao').prop("readonly", true);
    
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
function trataDadosMarca(data) {
    let source = [],
            columns = [{data: "marcodigo"},
                {data: "mardescricao"}
            ];
    data.forEach(item => source.push(
                {
                    marcodigo: item.marcodigo,
                    mardescricao: item.mardescricao
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
        result = await api.get('modelo/' + id);
        modelo = result.data;
        result = await api.get('marca/' + modelo.marcodigo);
        marca = result.data;
        $('#modcodigo').val(modelo.modcodigo);
        $('#moddescricao').val(modelo.moddescricao);
        $('#marcodigo').val(marca.marcodigo);
        $('#mardescricao').val(marca.mardescricao);
    } catch (err) {
        toastr['error'](Object.values(err.response.data.errors)[0]);
    }
}

///////////////////////////////// FIM MÉTODOS //////////////////////////////////