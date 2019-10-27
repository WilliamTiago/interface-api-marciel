@extends('web/HomeView')

@section('title', 'Matutenção Marca')

@section('stylesheets')

@section('page-content')


<div class="card shadow-lg">
    <form id="form">
        <div class="card-header">
            <p class="m-0 font-weight-bold">Cadastro de Marca</p>
        </div>
        <div class="card-body">
            <div class="form-group row rowCodigo">
                <label for="marcodigo" class="col-sm-3 col-md-2 col-lg-2 col-xl-1 col-form-label-sm label-right">Código:</label>
                <div class="col-sm-3 col-md-2 col-lg-2 col-xl-1 ">
                    <input id="marcodigo" name="marcodigo" type="number" class="form-control" value="" disabled="">
                </div>
            </div>
            <div class="form-group row">
                <label for="mardescricao" class="col-sm-3 col-md-2 col-lg-2 col-xl-1 col-form-label-sm label-right">Nome:</label>
                <div class="col-sm-9 col-md-9 col-lg-7 col-xl-5">
                    <input id="mardescricao" name="mardescricao" type="text" class="form-control" value="">
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
            <a href="{{ url('web/marca') }}" id="cancelar" class="btn btn-primary btn-icon-split btn-sm">
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

<script src="/js/marca.js"></script>

@if(isset($parms))
@if($parms['acao'] == 'show' || $parms['acao'] == 'edit')
<script>buscaDadosManutencao("{{$parms['acao']}}", "{{$parms['id']}}")</script>
@endif
@endif

@endsection
