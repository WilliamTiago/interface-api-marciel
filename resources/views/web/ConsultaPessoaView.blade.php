@extends('web/HomeView')

@section('title', 'Consulta Usuario')

@section('stylesheets')
    
@endsection

@section('page-content')

@component('web.componentes.modalExcluir')
@endcomponent

<!-- Page Heading -->
<h1 class="h3 mb-2 text-gray-800">Consulta de Pessoas</h1>

<!-- DataTales Example -->
<div class="card shadow mb-4">
  <div class="card-header py-3">
  <a id="incluir" href="pessoa/create" class="btn btn-primary btn-icon-split m-1">
    <span class="icon text-white-50">
      <i class="fas fa-flag"></i>
    </span>
    <span class="text">Incluir</span>
  </a>
  <a id="alterar" href="pessoa/edit" class="btn btn-primary btn-icon-split m-1 disabled">
    <span class="icon text-white-50">
      <i class="fas fa-flag"></i>
    </span>
    <span class="text">Editar</span>
  </a>
  <a id="visualizar" href="pessoa/show" class="btn btn-primary btn-icon-split m-1 disabled">
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
      <table class="table table-bordered" id="consulta-pessoa" width="100%" cellspacing="0">
        <thead>
          <tr>
          <th>Codigo</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Cpf/Cnpj</th>
          </tr>
        </thead>
        
      </table>
    </div>
  </div>
</div>

@endsection

@section('scripts')

<script src="/js/pessoa.js"></script>

@endsection

