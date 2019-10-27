@extends('web/HomeView')

@section('title', 'Consulta Veiculo')

@section('stylesheets')
    
@endsection

@section('page-content')

@component('web.componentes.modalExcluir')
@endcomponent

<!-- Page Heading -->
<h1 class="h3 mb-2 text-gray-800">Consulta de Veiculos</h1>

<!-- DataTales Example -->
<div class="card shadow mb-4">
  <div class="card-header py-3">
  <a id="incluir" href="veiculo/create" class="btn btn-primary btn-icon-split m-1">
    <span class="icon text-white-50">
      <i class="fas fa-flag"></i>
    </span>
    <span class="text">Incluir</span>
  </a>
  <a id="alterar" href="veiculo/edit" class="btn btn-primary btn-icon-split m-1 disabled">
    <span class="icon text-white-50">
      <i class="fas fa-flag"></i>
    </span>
    <span class="text">Editar</span>
  </a>
  <a id="visualizar" href="veiculo/show" class="btn btn-primary btn-icon-split m-1 disabled">
    <span class="icon text-white-50">
      <i class="fas fa-flag"></i>
    </span>
    <span class="text">Visualizar</span>
  </a>
  <button id="excluir" class="btn btn-danger btn-icon-split m-1 disabled">
    <span class="icon text-white-50">
      <i class="fas fa-flag"></i>
    </span>
    <span class="text">Excluir</span>
  </button>
  </div>
  <div class="card-body">
    <div class="table-responsive">
      <table class="table table-bordered" id="consulta-veiculo" width="100%" cellspacing="0">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Ano</th>
            <th>Cor</th>
            <th>KM</th>
            <th>Modelo</th>
            <th>Valor Diária</th>
            <th>Situação</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</div>

@endsection

@section('scripts')

<script src="/js/veiculo.js"></script>

@endsection

