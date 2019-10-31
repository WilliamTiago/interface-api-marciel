////////////////////////////// VÁRIAVEIS GLOBAIS ///////////////////////////////
 
let acaoManutencao = "create"; //Ação "create" por default 

//////////////////////////// FIM VÁRIAVEIS GLOBAIS /////////////////////////////

$(document).ready(async function () {

    ///////////////////////////////// EVENTOS //////////////////////////////////
    
    //// Inicio do controle da tela de consulta ////
    
    //Carrega dados e configurações da tabela "consulta-usuario" ao carregar página
    if ($('#consulta-pessoa')) {
        carregaConsulta('consulta-pessoa', 'pessoa');
    }
    
    $(document).on("click", '#excluirConfirmar', function () {
        executaExclusao('consulta-pessoa', 'pessoa');
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
            urlApi = '/pessoa/' + $('#pescodigo').val();
            campos = ['pesnome','pesemail','pestelefone','pescpfcnpj','login','password'];
            await executaAlteracao(campos, urlApi);
        } else if (acaoManutencao == "create") {
            urlApi = '/pessoa';
            campos = ['pesnome','pesemail','pestelefone','pescpfcnpj','login','password'];
            await executaInsercao(campos, urlApi);
        }
        $('#confirmar').prop('disabled', false);
    });
    
    //Define os campos como obrigatório
    $('#pesnome, #pescpfcnpj, #login, #password').attr("required", "true");

    //Define por defaulr a mascara de CPF para o campo "psocpfcnpj"
    if(typeof $('#pescpfcnpj')[0] != "undefined"){
        $('#pescpfcnpj').mask('000.000.000-00', {reverse: true});
    }
    
    //Quando muda o tipo de pessoa
    $('#psotipo').change(function(){
        onChangeTipoPessoa();
    });
    
    //// Fim do controle da tela de manutenção ////

    /////////////////////////////// FIM EVENTOS ////////////////////////////////

});

/////////////////////////////////// MÉTODOS ////////////////////////////////////

/**
 * Define os atributos dos dados que serão usados
 * @param object data
 * @returns object
 */
function trataDadosPessoa(data) {
    let source = [],
            columns = [{data: "pescodigo"},
                {data: "pesnome"},
                {data: "pesemail"},
                {data: "pestelefone"},
                {data: "pescpfcnpj"}
            ];
    data.forEach(item => source.push(
                {
                    pescodigo: item.pescodigo,
                    pesnome: item.pesnome,
                    pesemail: item.pesemail,
                    pestelefone: item.pestelefone,
                    pescpfcnpj: item.pescpfcnpj
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
        result = await api.get('pessoa/' + id);
        pessoa = result.data;
        $('#pescodigo').val(pessoa.pescodigo);
        $('#pesnome').val(pessoa.pesnome);
        $('#pesemail').val(pessoa.pesemail);
        $('#pestelefone').val(pessoa.pestelefone);
        $('#pescpfcnpj').val(pessoa.pescpfcnpj);
        $('#login').val(pessoa.login);
        $('#password').val(pessoa.password);
    } catch (err) {
        toastr['error'](Object.values(err.response.data.errors)[0]);
    }
}

/**
 * Muda o tipo de mascara para CPF ou CNPJ 
 * conforme tipo de pessoa selecionada
 * @param string acao
 * @param string id
 * @returns {undefined}
 */
function onChangeTipoPessoa() {
    if ($('#psotipo').val() == 1) {
          $('#pescpfcnpj').val('');
          $('#pescpfcnpj').mask('000.000.000-00', {reverse: true});
    } else {
          $('#pescpfcnpj').val('');
          $('#pescpfcnpj').mask('00.000.000/0000-00', {reverse: true});
    }
}

///////////////////////////////// FIM MÉTODOS //////////////////////////////////