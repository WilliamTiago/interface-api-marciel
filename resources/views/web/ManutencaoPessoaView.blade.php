@extends('web/HomeView')

@section('title', 'Matutenção Pessoa')

@section('stylesheets')

@section('page-content')


<div class="card shadow-lg">
    <form id="form">
        <div class="card-header">
            <p class="m-0 font-weight-bold">Cadastro de Usuário</p>
        </div>
        <div class="card-body">
            <div class="form-group row rowCodigo">
                <label for="pescodigo" class="col-sm-3 col-md-2 col-lg-2 col-xl-1 col-form-label-sm label-right">Código:</label>
                <div class="col-sm-3 col-md-2 col-lg-2 col-xl-1 ">
                    <input id="pescodigo" name="pescodigo" type="number" class="form-control" value="" disabled="">
                </div>
            </div>
            <div class="form-group row">
                <label for="pesnome" class="col-sm-3 col-md-2 col-lg-2 col-xl-1 col-form-label-sm label-right">Nome:</label>
                <div class="col-sm-9 col-md-9 col-lg-7 col-xl-5">
                    <input id="pesnome" name="pesnome" type="text" class="form-control" value="">
                </div>
            </div>
            <div class="form-group row">
                <label for="pesemail" class="col-sm-3 col-md-2 col-lg-2 col-xl-1 col-form-label-sm label-right">Email:</label>
                <div class="col-sm-9 col-md-9 col-lg-7 col-xl-5">
                    <input id="pesemail" name="pesemail" type="email" class="form-control" value="">
                </div>
            </div>
            <div class="form-group row">
                <label for="pestelefone" class="col-sm-3 col-md-2 col-lg-2 col-xl-1 col-form-label-sm label-right">Telefone:</label>
                <div class="col-sm-9 col-md-9 col-lg-7 col-xl-5">
                    <input id="pestelefone" name="pestelefone" type="tel" class="form-control" value="">
                </div>
            </div>
            <div class="form-group row">
                <label for="login" class="col-sm-3 col-md-2 col-lg-2 col-xl-1 col-form-label-sm label-right">Login:</label>
                <div class="col-sm-9 col-md-9 col-lg-7 col-xl-5">
                    <input id="login" name="login" type="text" class="form-control" value="">
                </div>
            </div>
            <div class="form-group row">
                <label for="password" class="col-sm-3 col-md-2 col-lg-2 col-xl-1 col-form-label-sm label-right">Senha:</label>
                <div class="col-sm-9 col-md-9 col-lg-7 col-xl-5">
                    <input id="password" name="password" type="password" class="form-control" value="">
                </div>
            </div>
            <div class="form-group row">
                <label for="psotipo" class="col-sm-3 col-md-2 col-lg-2 col-xl-1 col-form-label-sm label-right">Tipo Pessoa:</label>
                <div class="col-sm-2">
                    <select name="psotipo" id="psotipo" class="form-control pt-0">
                        <option value="1">Física</option>
                        <option value="2">Júridica</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <label for="psocpfcnpj" class="col-sm-3 col-md-2 col-lg-2 col-xl-1 col-form-label-sm label-right">CPF/CNPJ:</label>
                <div class="col-sm-9 col-md-9 col-lg-7 col-xl-5">
                    <input id="pescpfcnpj" name="pescpfcnpj" type="text" class="form-control">
                </div>
            </div>
        </div>
        <div class="card-footer text-center">
            <button id="confirmar" type="submit" class="btn btn-primary btn-icon-split btn-sm">
                <span class="icon text-white-50">
                    <i class="fas fa-check mt-1"></i>
                </span>
                <span class="text">Confirmar</span>
            </button>
            <a href="{{ url('web/pessoa') }}" id="cancelar" class="btn btn-primary btn-icon-split btn-sm">
                <span class="icon text-white-50">
                    <i class="fas fa-times  mt-1"></i>
                </span>
                <span class="text">Voltar</span>
            </a>
        </div>
    </form>
</div>


@endsection

@section('scripts')

<script src="/js/jquery.mask.min.js"></script>
<script src="/js/pessoa.js"></script>

@if(isset($parms))
@if($parms['acao'] == 'show' || $parms['acao'] == 'edit')
<script>buscaDadosManutencao("{{$parms['acao']}}", "{{$parms['id']}}")</script>
@endif
@endif

@endsection
