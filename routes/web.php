<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function() {
    return redirect('auth/login');
});
Route::domain('{client}.localhost')->group(function($router) {
    Route::get('teste', function($client) {
        dd($client);
    });
});
/*
 | Auth
 |
 */
Route::group([
    'namespace' => 'Auth',
    'prefix'    => 'auth'
], function($router) {
    Route::get('login' , 'LoginController@index')->name('auth.index');
    Route::post('login', 'LoginController@login')->name('auth.login');
    Route::get('logout', 'LoginController@logout')->name('auth.logout');
});
/*
 | Dashboard
 |
 */
Route::group([
    'namespace'  => 'Web',
    'prefix'     => 'web'
//    'middleware' => 'auth:token'
], function($router) {
    //Home
    Route::get('{route}', 'HomeController@index')->where('route', 'index|home');
    //Pessoa
    Route::get('pessoa'             , 'PessoaController@index')->name('pessoa.index');
    Route::get('pessoa/create'      , 'PessoaController@create')->name('pessoa.create');
    Route::get('pessoa/edit/{id}'   , 'PessoaController@edit')->name('pessoa.edit');
    Route::get('pessoa/show/{id}'   , 'PessoaController@show')->name('pessoa.show');
    //Aluguel
    Route::get('aluguel'             , 'Aluguel@index')->name('aluguel.index');
    Route::get('aluguel/create'      , 'Aluguel@create')->name('aluguel.create');
    Route::get('aluguel/edit/{id}'   , 'Aluguel@edit')->name('aluguel.edit');
    Route::get('aluguel/show/{id}'   , 'Aluguel@show')->name('aluguel.show');
    //Marca
    Route::get('marca'             , 'Marca@index')->name('marca.index');
    Route::get('marca/create'      , 'Marca@create')->name('marca.create');
    Route::get('marca/edit/{id}'   , 'Marca@edit')->name('marca.edit');
    Route::get('marca/show/{id}'   , 'Marca@show')->name('marca.show');
    //Modelo
    Route::get('modelo'             , 'Modelo@index')->name('modelo.index');
    Route::get('modelo/create'      , 'Modelo@create')->name('modelo.create');
    Route::get('modelo/edit/{id}'   , 'Modelo@edit')->name('modelo.edit');
    Route::get('modelo/show/{id}'   , 'Modelo@show')->name('modelo.show');
    //Veiculo
    Route::get('veiculo'             , 'Veiculo@index')->name('veiculo.index');
    Route::get('veiculo/create'      , 'VeiculoController@create')->name('veiculo.create');
    Route::get('veiculo/edit/{id}'   , 'VeiculoController@edit')->name('veiculo.edit');
    Route::get('veiculo/show/{id}'   , 'VeiculoController@show')->name('veiculo.show');
});