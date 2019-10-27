@extends('web/HomeView')

@section('title', 'Matutenção Aluguel')

@section('stylesheets')

@section('page-content')

@component('web.componentes.modalConsultaPessoa')
@endcomponent

@component('web.componentes.modalConsultaveiculo')
@endcomponent

<div class="card shadow-lg">
    <form id="form">
        <div class="card-header">
            <p class="m-0 font-weight-bold">Cadastro de Aluguel</p>
        </div>
        <div class="card-body">
            <div class="form-group row rowCodigo">
                <label for="alucodigo" class="col-sm-3 col-md-2 col-lg-2 col-xl-1 col-form-label-sm label-right">Código:</label>
                <div class="col-sm-3 col-md-2 col-lg-2 col-xl-1 ">
                    <input id="alucodigo" name="alucodigo" type="number" class="form-control" value="" disabled="">
                </div>
            </div>
            <div class="form-group row">
                <label for="aluqtddiarias" class="col-sm-3 col-md-2 col-lg-2 col-xl-1 col-form-label-sm label-right">Nome:</label>
                <div class="col-sm-9 col-md-9 col-lg-7 col-xl-5">
                    <input id="aluqtddiarias" name="aluqtddiarias" type="number" class="form-control" value="">
                </div>
            </div>
            <div class="form-group row">
                <label for="aludataretirada" class="col-sm-3 col-md-2 col-lg-2 col-xl-1 col-form-label-sm label-right">Nome:</label>
                <div class="col-sm-9 col-md-9 col-lg-7 col-xl-5">
                    <input id="aludataretirada" name="aludataretirada" type="data" class="form-control" value="">
                </div>
            </div>
            <div class="form-group row">
                <label for="pescodigo" class="col-sm-3 col-md-2 col-lg-2 col-xl-1 col-form-label-sm label-right">Marca:</label>
                <div class="col-sm-2 col-xl-1">
                    <input id="pescodigo" name="pescodigo" type="number" class="form-control input-small" value="">
                </div>
                <div class="col-sm-1">
                    <a href="#" id="consultaPessoa" class="btn btn-icon-split btn-sm">
                        <span class="">
                            <i class="fas fa-search"></i>
                        </span>
                    </a>
                </div>
                <div class="col-sm-6 col-lg-4">
                    <input id="pesnome" name="pesnome" type="text" class="form-control input-small" value="">
                </div>
            </div>
            <div class="form-group row">
                <label for="veicodigo" class="col-sm-3 col-md-2 col-lg-2 col-xl-1 col-form-label-sm label-right">Marca:</label>
                <div class="col-sm-2 col-xl-1">
                    <input id="veicodigo" name="veicodigo" type="number" class="form-control input-small" value="">
                </div>
                <div class="col-sm-1">
                    <a href="#" id="consultaVeiculo" class="btn btn-icon-split btn-sm">
                        <span class="">
                            <i class="fas fa-search"></i>
                        </span>
                    </a>
                </div>
                <div class="col-sm-6 col-lg-4">
                    <input id="modcodigo" name="modcodigo" type="text" class="form-control input-small" value="">
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
            <a href="{{ url('web/aluguel') }}" id="cancelar" class="btn btn-primary btn-icon-split btn-sm">
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

<script src="/js/aluguel.js"></script>

@if(isset($parms))
@if($parms['acao'] == 'show' || $parms['acao'] == 'edit')
<script>buscaDadosManutencao("{{$parms['acao']}}", "{{$parms['id']}}")</script>
@endif
@endif

@endsection
