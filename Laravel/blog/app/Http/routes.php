<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['prefix' => 'api'], function () {
    //------------------------
    Route::group(['prefix' => 'alumnos'], function () {
        Route::get('', ['uses' => 'AlumnoController@allAlumnos']);
        
       // Route::delete('{id}', ['uses' => 'AlumnoController@deleteAlumno']);
    });
    //------------------------
    //
    ////------------------------
   

});

Route::get('/', function () {
    return view('welcome');
});