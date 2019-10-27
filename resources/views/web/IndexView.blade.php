@extends('web/HomeView')

@section('title', 'Consulta Usuario')

@section('stylesheets')
    
@endsection

@section('page-content')

@component('web.componentes.modalExcluir')
@endcomponent

<div class="container-fluid">

<!-- Page Heading -->
<div class="d-sm-flex align-items-center justify-content-between mb-4">
  <h1 class="h3 mb-0 text-gray-800">Home</h1>
</div>

<div class="row">

  <!-- Earnings (Monthly) Card Example -->
  
    
  <a href="{{ url('web/pessoa')}}" class="col-xl-3 col-md-6 mb-4">
    <div class="card border-left-primary shadow h-100 py-2">
      <div class="card-body">
        <div class="row no-gutters align-items-center">
          <div class="col mr-2">
            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Rotina</div>
            <div class="h5 mb-0 font-weight-bold text-gray-800">Pessoas</div>
          </div>
          <div class="col-auto">
            <i class="fas fa-users fa-2x text-gray-300"></i>
          </div>
        </div>
      </div>
    </div>
  </a>

  <!-- Earnings (Monthly) Card Example -->
  <a href="{{ url('web/aluguel')}}" class="col-xl-3 col-md-6 mb-4">
    <div class="card border-left-success shadow h-100 py-2">
      <div class="card-body">
        <div class="row no-gutters align-items-center">
          <div class="col mr-2">
            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Rotina</div>
            <div class="h5 mb-0 font-weight-bold text-gray-800">Alugueis</div>
          </div>
          <div class="col-auto">
            <i class="fas fa-handshake fa-2x text-gray-300"></i>
          </div>
        </div>
      </div>
    </div>
  </a>

  <!-- Earnings (Monthly) Card Example -->
  <a href="{{ url('web/marca')}}" class="col-xl-3 col-md-6 mb-4">
    <div class="card border-left-info shadow h-100 py-2">
      <div class="card-body">
        <div class="row no-gutters align-items-center">
          <div class="col mr-2">
            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Rotina</div>
            <div class="row no-gutters align-items-center">
              <div class="col-auto">
                <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">Marcas</div>
              </div>
            </div>
          </div>
          <div class="col-auto">
            <i class="fas fa-copyright fa-2x text-gray-300"></i>
          </div>
        </div>
      </div>
    </div>
  </a>

  <!-- Pending Requests Card Example -->
  <a href="{{ url('web/modelo')}}" class="col-xl-3 col-md-6 mb-4">
    <div class="card border-left-warning shadow h-100 py-2">
      <div class="card-body">
        <div class="row no-gutters align-items-center">
          <div class="col mr-2">
            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Rotina</div>
            <div class="h5 mb-0 font-weight-bold text-gray-800">Modelos</div>
          </div>
          <div class="col-auto">
            <i class="fas fa-object-group fa-2x text-gray-300"></i>
          </div>
        </div>
      </div>
    </div>  
  </a>

  <!-- Earnings (Monthly) Card Example -->
  <a href="{{ url('web/veiculo')}}" class="col-xl-3 col-md-6 mb-4">
    <div class="card border-left-primary shadow h-100 py-2">
      <div class="card-body">
        <div class="row no-gutters align-items-center">
          <div class="col mr-2">
            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Rotina</div>
            <div class="h5 mb-0 font-weight-bold text-gray-800">Veiculos</div>
          </div>
          <div class="col-auto">
            <i class="fas fa-car fa-2x text-gray-300"></i>
          </div>
        </div>
      </div>
    </div>
  </a>

</div>

<div style="height: 150px">

</div>

@endsection

@section('scripts')

<script src="/js/pessoa.js"></script>

@endsection

