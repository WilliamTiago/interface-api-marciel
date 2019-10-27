/**
 * Métodos e váriaveis globais da aplicação
 * @author Roberto Klann
 * @author William Goebel
 * @since 2019/09/19
 */

////////////////////////////// VÁRIAVEIS GLOBAIS ///////////////////////////////

let currentModal = null; //Modal corrente

//////////////////////////// FIM VÁRIAVEIS GLOBAIS /////////////////////////////

$(document).ready(function () {

    ///////////////////////////////// EVENTOS //////////////////////////////////

    //Seta o tempo da tela de loading
    loading(2000);

    //// Inicio do controle dos botões de ação da consulta ////

    //Trata ações da consulta quando é selecionado um ou mais registros 
    $(document).on("click", "tr td", function () {
        trataAcoesConsulta();
    });

    //Define rota com o registro que será alterado
    $(document).on("click", '#alterar', function () {
        $(this)[0].href += "/" + $('.selected')[0].cells[0].textContent;
    });

    //Define rota com o registro que será visualizado
    $(document).on("click", '#visualizar', function () {
        $(this)[0].href += "/" + $('.selected')[0].cells[0].textContent;
    });

    //Exibe modal de confirmação de exclusão dos registros selecionados
    $(document).on("click", "#excluir", function () {
        $('#modalExcluir').show();
    });

    //// Fim do controle doas botões de ação da consulta ////

    //// Inicio do controle dos modais ////

    //Fecha modal ao clicar em cancelar
    $('#cancelar').click(function () {
        $('.modal').hide();
    });

    //Fecha modal ao clicar no "x"
    $('.close').click(function () {
        $('.modal').hide();
        currentModal = null;
    });

    //Fecha modal ao clicar fora do modal
    $(window).click(function (event) {
        if (event.target.classList[0] === 'modal') {
            $('.modal').hide();
            currentModal = null;
        }
    });

    //// Fim do controle dos modais ////

    /////////////////////////////// FIM EVENTOS ////////////////////////////////

});

/////////////////////////////////// MÉTODOS ////////////////////////////////////

/**
 * Método para setar o loading
 * @param integer time (milissegundos)
 */
function loading(time) {
    setTimeout(function () {
        let oBody = document.getElementById('page-top'),
                oDivPrincipal = document.getElementById("wrapper"),
                oDivAnimation = document.getElementById("animation");

        if (oDivPrincipal && oDivAnimation && oBody) {
            oDivAnimation.remove();
            oDivPrincipal.style.display = 'flex';
        }
    }, time);
}

/**
 * Permite apenas caracteres númericos.
 * @param event evt
 */
function onlynumber(evt) {
    let theEvent = evt || window.event,
            key = theEvent.keyCode || theEvent.which;

    key = String.fromCharCode(key);
    let regex = /^[0-9.]+$/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault)
            theEvent.preventDefault();
    }
}

/**
 * Verifica os registros selecionados e libera ou bloqueia
 * os botões de CRUD da consulta conforme necessidade 
 */
function trataAcoesConsulta() {
    let aSelecionados = $('.selected');

    //Se registros selecionados maior que 1
    if (aSelecionados.length > 1) {
        trataBtnCRUD($('#alterar'), false);    //Bloqueia btn Alterar
        trataBtnCRUD($('#visualizar'), false); //Bloqueia btn Visualizar
        trataBtnCRUD($('#excluir'), true);     //Libera btn Excluir
        //Se registros selecionados igual a 1
    } else if (aSelecionados.length == 1) {
        trataBtnCRUD($('#alterar'), true);     //Libera btn Alterar
        trataBtnCRUD($('#visualizar'), true);  //Libera btn Visualizar
        trataBtnCRUD($('#excluir'), true);     //Libera btn Excluir
        //Se não houver nenhum registro selecionado
    } else {
        trataBtnCRUD($('#alterar'), false);    //Bloqueia btn Alterar
        trataBtnCRUD($('#visualizar'), false); //Bloqueia btn Visualizar
        trataBtnCRUD($('#excluir'), false);    //Bloqueia btn Excluir
    }
}

/**
 * Libera ou bloqueia botões de CRUD da consulta
 * @param object botao
 * @param bool habilita
 */
function trataBtnCRUD(botao, habilita) {
    if (habilita) {
        botao.removeClass('disabled');
    } else {
        botao.addClass('disabled');
    }
}


/**
 * Seta as configurações do Data Table
 * @param string selectStyle
 * @param string divControls
 * @param JSON   data
 * @param JSON   columns
 * @param int    pageLength
 * @param array  lengthMenu
 * @param array  order
 * @param bool   searching
 * @returns dataTableSettings.object
 */
function loadTableSettings(
        //Parâmetros default
        data = [],
        columns = [],
        selectStyle = 'multi',
        blurable = false,
        divControls = '#divControls.',
        pageLength = 5,
        lengthMenu = [5, 10, 20, 50, 100],
        order = [[0, 'asc']],
        searching = true) {
    //Corpo da função
    let object = {
        //Define a posição dos elementos, ex: (dom: 'ltip')
        dom: '<"top row"<"col-md-12 col-lg-6"l>\n\
             <"col-md-12 col-lg-6"f>>t\n\
             <"bottom row"<"col-md-12 col-lg-6"i>\n\
             <"col-md-12 col-lg-6"p>>',
        //Define o valor inicial do show entries
        pageLength: pageLength,
        //Define as opções do show entries
        lengthMenu: lengthMenu,
        //Define o tipo do select row
        select: {
            //values: multi, multi+shift single, os, api
            style: selectStyle,
            blurable: blurable
        },
        //Define por qual coluna será ordenado
        order: order,
        //Define o search como desabilitado
        searching: searching,
        data: data,
        columns: columns
    }
    return object;
}

/**
 * Carrega o botão de selecionar do externo
 */
function carregaButtonsExterno() {
    let div = $(".section-botao-selecionar-externo");

    //Carrega botão "Selecionar" para cada externo
    for (x in div) {
        div[x].innerHTML = '<button class="selecionar btn btn-primary btn-icon-split btn-sm">' +
                '<span class="icon text-white-50">' +
                '<i class="fas fa-hand-pointer"></i>' +
                '</span>' +
                '<span class="text">Selecionar</span>' +
                '</button>';
    }
}

/**
 * Captura os registros selecionados nas consultas externas
 * @param string codigo
 * @param string descricao
 */
function SelecionaRegistro(codigo, descricao) {
    if (!$('.selected')) {
        return;
    }
    let index = $('.selected').length - 1;
    $('[name=' + codigo + ']').val($('.selected')[index].cells[0].textContent);
    $('[name=' + descricao + ']').val($('.selected')[index].cells[1].textContent);
    currentModal = null;
    $('.modal').hide();
}

/**
 * Executa a inserção dos dados atráves da API
 * @param array campos
 * @param string urlApi
 */
async function executaInsercao(campos, urlApi) {
    let data = montaDados(campos, false);
    try {
        let result = await api.post(urlApi, data);
        toastr['success']("Operação realizada com sucesso!");
        $(':input').val("");
    } catch (err) {
        //Resposta da API
        toastr['error'](Object.values(err.response.data.errors)[0]);
    }
}

/**
 * Executa a inserção dos dados atráves da API
 * @param array campos
 * @param string urlApi
 */
async function executaAlteracao(campos, urlApi) {
    let data = montaDados(campos, true);
    try {
        let result = await api.put(urlApi, data);
        toastr['success']("Operação realizada com sucesso!");
    } catch (err) {
        //Resposta da API
        toastr['error'](Object.values(err.response.data.errors)[0]);
    }
}

/**
 * Executa a exclusão dos dados atráves da API
 * @param string rotaApi
 * @param string rotaWEB
 */
function executaExclusao(tabela, rotaApi, rotaWEB) {
    let ids = []; //Array dos ids dos registros selecionados na tela de consulta
    //Carrega os ids dos registros selecionados na váriavel de "ids"
    Array.from($('.selected')).forEach(item => ids.push(item.cells[0].textContent));
    try {
        ids.forEach(async item => {
            let result = await api.delete(rotaApi + "/" + item);
        });
        toastr['success']('Registros deletados com sucesso!');
    } catch (err) {
        //Resposta da API
        toastr['error'](Object.values(err.response.data.errors)[0]);
    } finally {
        //Remove modal excluir
        $('#modalExcluir').hide();
        //Remove registros da tabela
        $('#' + tabela).DataTable()
                .rows('.selected')
                .remove()
                .draw();
    }
}

/**
 * Carrega dados da consulta
 * @param string tabela
 * @param string rotaApi
 * @param string rotaWeb
 */
async function carregaConsulta(tabela, rotaApi) {
    let result = await api.get(rotaApi);
    let data = result.data;
    data = trataDados(tabela, data);
    $('#' + tabela).DataTable(loadTableSettings(data['source'], data['columns']));
}

/**
 * Carrega modal de consulta externa
 * @param string tabela
 * @param string rotaApi
 * @param string modal
 * @param string iniciado (váriavel que indica se o modal foi iniciado)
 */
async function carregaExterno(tabela, rotaApi, modal, iniciado) {
    if ($('#' + tabela)) {
        //Se o modal ainda não foi iniciado então faz a requisição para a API 
        if (!iniciado) {
            try {
                let result = await api.get(rotaApi);
                let data = result.data;
                data = trataDados(tabela, data);
                $('#' + tabela).DataTable(loadTableSettings(data['source'], data['columns'], 'single', false, 'divControlsExterno '));
                carregaButtonsExterno();
            } catch (err) {
                toastr['error'](Object.values(err.response.data.errors)[0]);
            }
        }
    }
    //Exibe modal
    $('#' + modal).show();
    //Seta currentModal com o modal atual
    currentModal = modal;
    return true;
}

/**
 * 
 * @param array campos
 * @param bool store
 * @returns dados
 */
function montaDados(campos, store = false) {
    let data = {}
    campos.forEach(item => {
        if ((typeof item) == "string") {
            data[item] = (typeof $(`input[name='${item}']`)[0] != "undefined") ? $(`input[name='${item}']`).val() : $(`select[name='${item}']`).val();
        } else if ((typeof item) == "object") {
            for (var campo in item) {
                let obj = {};
                for (var subcampo in item[campo]) {
                    obj[item[campo][subcampo]] = $('#' + item[campo][subcampo]).val();
                }
                data[campo] = (store == false) ? [obj] : {'store': [obj]};
            }
        }
    });
    return data
}

/**
 * Chama o trata dados especifico para tipo de recurso em uso
 * @param {type} tabela
 * @param {type} data
 * @returns "dados tratados" 
 */
function trataDados(tabela, data) {
    switch (tabela) {
        case "consulta-pessoa":
            dados = trataDadosPessoa(data);
            break;
        case "consulta-marca":
            dados = trataDadosMarca(data);
            break;
        case "consulta-modelo":
            dados = trataDadosModelo(data);
            break;
        case "consulta-veiculo":
            dados = trataDadosVeiculo(data);
            break;
        case "consulta-aluguel":
            dados = trataDadosAluguel(data);
            break;
    }
    return dados;
}

///////////////////////////////// FIM MÉTODOS //////////////////////////////////