@extends('beautymail::templates.sunny')

@section('content')

   @include ('beautymail::templates.sunny.heading' , [
       'heading' => 'Hola '.$user->nombre.' '.$user->apPaterno.' '.$user->apMaterno,
       'level' => 'h2',
   ])

   @include('beautymail::templates.sunny.contentStart')

       <p>Bienvenido(a) al Sistema de Gestión Escolar <br>
       		de la Escuela primaria "Rosario Castellanos"</p>

   @include('beautymail::templates.sunny.contentEnd')



@stop