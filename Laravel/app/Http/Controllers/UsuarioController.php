<?php

namespace App\Http\Controllers;

use App\Usuario;

use Illuminate\Http\Request;
use App\Http\Requests;


use Illuminate\Support\Facades\Response;


class UsuarioController extends Controller
{
    protected $usuario = null;

    public function __construct(Usuario $usuario){
        $this->usuario = $usuario;
    }

    public function allUsuarios(){
            return $this->usuario->allUsuarios();
        //return User::orderBy('id', 'asc')->get();
        
    }

    public function saveUsuario(){
        try{
            return $this->usuario->saveUsuario();
        } catch(\Illuminate\Database\QueryException $ex){
            return Response::json(['response' => $ex->getCode()],500);
        }
    }


    public function getUsuario($nombres){
        $usuario = $this->usuario->getUsuario($nombres);
        if(!$usuario){
            return Response::json(['response' => 'usuario no encontrado']);
        }
        return Response::json($usuario,200);
    }


    public function deleteUsuario($nombres){
        $usuario = $this->usuario->deleteUsuario($nombres);
        if(!$usuario){
            return Response::json(['response' => 'Usuario no encontrado']);
        }
        return Response::json($usuario,200);
    }


    public function updateUsuario($campo){
        $usuario = $this->usuario->updateUsuario($campo);
        if(!$usuario){
            return Response::json(['response' => 'Usuario no encontrado']);
        }
        return Response::json($usuario,200);
    }

    public function listaAlumnos($camp){
        $usuario = $this->usuario->listaAlumnos($camp);
        if(!$usuario){
            return Response::json(['response' => 'Usuario no encontrado']);
        }
        return Response::json($usuario,200);
    }
    public function buscarUsuario($email, $password){
        $usuario = $this->usuario->buscarUsuario($email, $password);
        if(!$usuario){
            return Response::json(['response' => 'Usuario no encontrado']);
        }
        return Response::json($usuario,200);
    }





}
