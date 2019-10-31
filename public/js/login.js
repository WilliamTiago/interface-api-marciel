$(document).ready(function(){
    $('#form-login').submit(function(e) {
        e.preventDefault();
        
        let dados = {
            "login": $('input[name=login').val(),
            "password": $('input[name=password]').val()
        };
        validaLogin(dados);
    });
});

function validaLogin(dados) {
    axios({
        method : 'post',
        url    : 'http://127.0.0.1:8000/api/auth/login',
        data   : dados
    })
    .then(response => {
        localStorage.setItem('token', response.data.token);
        window.location.href = 'http://127.0.0.1:8088/web/home';
    }).catch(error => {
        if(error.response.status == 401 || error.response.status == 404) {
            toastr["error"]("Login ou Senha inválidos!");
        } else {
            toastr["error"]("Ops, algo de estranho aconteceu, entre em contato com o suporte para mais informações!");
        }
    });
}