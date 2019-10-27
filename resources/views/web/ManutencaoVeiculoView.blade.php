@extends('web/HomeView')

@section('title', 'Matutenção Veiculo')

@section('stylesheets')

@section('page-content')

@component('web.componentes.modalConsultaModelo')
@endcomponent

<div class="card shadow-lg">
    <form id="form">
        <div class="card-header">
            <p class="m-0 font-weight-bold">Cadastro de Veiculo</p>
        </div>
        <div class="card-body">
            <div class="form-group row rowCodigo">
                <label for="veicodigo" class="col-sm-3 col-md-2 col-lg-2 col-xl-1 col-form-label-sm label-right">Código:</label>
                <div class="col-sm-3 col-md-2 col-lg-2 col-xl-1 ">
                    <input id="veicodigo" name="veicodigo" type="number" class="form-control" value="" disabled="">
                </div>
            </div>
            <div class="form-group row">
                <label for="veiano" class="col-sm-3 col-md-2 col-lg-2 col-xl-1 col-form-label-sm label-right">Ano:</label>
                <div class="col-sm-9 col-md-9 col-lg-7 col-xl-5">
                    <input id="veiano" name="veiano" type="number" class="form-control" value="">
                </div>
            </div>
            <div class="form-group row">
                <label for="veicor" class="col-sm-3 col-md-2 col-lg-2 col-xl-1 col-form-label-sm label-right">Cor:</label>
                <div class="col-sm-9 col-md-9 col-lg-7 col-xl-5">
                    <input id="veicor" name="veicor" type="text" class="form-control" value="">
                </div>
            </div>
            <div class="form-group row">
                <label for="veikm" class="col-sm-3 col-md-2 col-lg-2 col-xl-1 col-form-label-sm label-right">Km:</label>
                <div class="col-sm-9 col-md-9 col-lg-7 col-xl-5">
                    <input id="veikm" name="veikm" type="number" class="form-control" value="">
                </div>
            </div>
            <div class="form-group row">
                <label for="veivalordiaria" class="col-sm-3 col-md-2 col-lg-2 col-xl-1 col-form-label-sm label-right">Valor Diária:</label>
                <div class="col-sm-9 col-md-9 col-lg-7 col-xl-5">
                    <input id="veivalordiaria" name="veivalordiaria" type="number" class="form-control" value="">
                </div>
            </div>
            <div class="form-group row">
                <label for="veisituacao" class="col-sm-3 col-md-2 col-lg-2 col-xl-1 col-form-label-sm label-right">Situação:</label>
                <div class="col-sm-2">
                    <select name="veisituacao" id="veisituacao" class="form-control pt-0">
                        <option value="1">Ativo</option>
                        <option value="2">Inativo</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <label for="modcodigo" class="col-sm-3 col-md-2 col-lg-2 col-xl-1 col-form-label-sm label-right">Modelo:</label>
                <div class="col-sm-2 col-xl-1">
                    <input id="modcodigo" name="modcodigo" type="number" class="form-control input-small" value="">
                </div>
                <div class="col-sm-1">
                    <a href="#" id="consultaModelo" class="btn btn-icon-split btn-sm">
                        <span class="">
                            <i class="fas fa-search"></i>
                        </span>
                    </a>
                </div>
                <div class="col-sm-6 col-lg-4">
                    <input id="moddescricao" name="moddescricao" type="text" class="form-control input-small" value="">
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
            <a href="{{ url('web/veiculo') }}" id="cancelar" class="btn btn-primary btn-icon-split btn-sm">
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

<script src="/js/veiculo.js"></script>

@if(isset($parms))
@if($parms['acao'] == 'show' || $parms['acao'] == 'edit')
<script>buscaDadosManutencao("{{$parms['acao']}}", "{{$parms['id']}}")</script>
@endif
@endif

@endsection
