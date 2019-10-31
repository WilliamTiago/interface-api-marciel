<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="utf-8">
        <title>Conecte-se</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <meta name="author" content="DWR-Sistemas">

        <link href="/template/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
        <link href="/template/css/sb-admin-2.min.css" rel="stylesheet">
        <link href="/css/login.css" rel="stylesheet">
        <link href="/css/toastr.css" rel="stylesheet">
    </head>
    <body id="page-top">
        <div class="sidenav">
            <div class="login-main-text">
                <h2>Bob Waiter Login</h2>
                <p>Faça o login para obter acesso à aplicação.</p>
            </div>
        </div>
        <div class="main">
            <div class="col-md-6 col-sm-12">
                <div class="login-form">
                    <form action="login" method="post" id="form-login">
                        <div class="form-group has-feedback input-login">
                            <input type="text" name="login" class="form-control" placeholder="Informe seu login">
                            <span class="glyphicon glyphicon-user form-control-feedback"></span>
                        </div>
                        <div class="form-group has-feedback input-login">
                            <input type="password" name="password" class="form-control" placeholder="Informe sua senha">
                            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <button type="submit" class="btn btn-black">Entrar</button>

                        <input type="hidden" name="_method" value="POST">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    </form>
                </div>
                <br>
                @if(Session::has('loginFails'))
                    <p class="alert {{ Session::get('alertClass', 'alert-info') }}">{{ Session::get('loginFails') }}</p>
                @endif
            </div>
        </div>

        <script src="/template/vendor/jquery/jquery.min.js"></script>
        <script src="/template/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="/template/js/sb-admin-2.min.js"></script>
        <script src="/js/login.js"></script>
        <script src="/js/axios.js"></script>
        <script src="/js/toastr.js"></script>
    </body>

</html>