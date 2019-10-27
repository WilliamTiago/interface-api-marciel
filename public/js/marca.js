////////////////////////////// VÁRIAVEIS GLOBAIS ///////////////////////////////
 
let acaoManutencao = "create"; //Ação "create" por default 

//////////////////////////// FIM VÁRIAVEIS GLOBAIS /////////////////////////////

$(document).ready(async function () {

    ///////////////////////////////// EVENTOS //////////////////////////////////
    
    //// Inicio do controle da tela de consulta ////
    
    //Carrega dados e configurações da tabela "consulta-usuario" ao carregar página
    if ($('#consulta-marca')) {
        carregaConsulta('consulta-marca', 'marca');
    }
    
    $(document).on("click", '#excluirConfirmar', function () {
        executaExclusao('consulta-marca', 'marca');
    });
    
    //// Fim do controle da tela de consulta ////
    
    //// Inicio do controle da tela de manutenção ////

    if (acaoManutencao == "create") {
        $('.rowCodigo').hide();
    }

    //Chama processo a ser executado conforme a ação da tela de manutenção
    $("#form").submit(async function(e){
        e.preventDefault();
        $('#confirmar').prop('disabled', true);
        if (acaoManutencao == "edit") {
            urlApi = '/marca/' + $('#marcodigo').val();
            campos = ['marcodigo','mardescricao'];
            await executaAlteracao(campos, urlApi);
        } else if (acaoManutencao == "create") {
            urlApi = '/marca';
            campos = ['mardescricao'];
            await executaInsercao(campos, urlApi);
        }
        $('#confirmar').prop('disabled', false);
    });
    
    //Define os campos como obrigatório
    $('#mardescricao').attr("required", "true");
    
    //// Fim do controle da tela de manutenção ////

    /////////////////////////////// FIM EVENTOS ////////////////////////////////

});

/////////////////////////////////// MÉTODOS ////////////////////////////////////

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
        result = await api.get('marca/' + id);
        marca = result.data;
        $('#marcodigo').val(marca.marcodigo);
        $('#mardescricao').val(marca.mardescricao);
    } catch (err) {
        toastr['error'](Object.values(err.response.data.errors)[0]);
    }
}

///////////////////////////////// FIM MÉTODOS //////////////////////////////////