<?php

namespace App\Http\Controllers;
use App\Curso;
use Illuminate\Http\Request;
use App\Http\Requests\CursoRequest;
use App\Http\Requests;
use Illuminate\Support\Facades\Response;

class CursoController extends Controller{

	protected $curso=null;

	public function __construct(Curso $curso){
    	$this->curso = $curso;
    }
    public function allCurso(){
    		return $this->curso->allCurso();
    }
    public function getCursoActual(){
        return $this->curso->getCursoActual();
    }
    public function saveCurso(CursoRequest $request){
    		return $this->curso->saveCurso($request);
	}
	public function getCurso($nombres){
        $curso = $this->curso->getCurso($nombres);
        if(!$curso){
            return Response::json(['response' => 'Curso no encontrado'],404);
        }
        return Response::json($curso,200);
    }
    public function deleteCurso($id){
        $curso = $this->curso->deleteCurso($id);
        if(!$curso){
            return Response::json(['response' => 'Curso no encontrado']);
        }
        return Response::json($curso,200);
    }

    public function actualizarCurso($camp){
        $curso = $this->curso->actualizarCurso($camp);
        
        if(!$curso){
            return Response::json(['response' => 'Curso no encontrado'],404);
        }
        
        return Response::json($curso,200);
    }

    public function cursoEnEspera(){
            return $this->curso->cursoEnEspera();
    }

    public function cambiarCursoACero($idCurso){
            return $this->curso->cambiarCursoACero($idCurso);
    }

    public function cambiarCursoAUno($idCurso){
            return $this->curso->cambiarCursoAUno($idCurso);
    }

    public function allGrupoDocentes(){
            return $this->curso->allGrupoDocentes();
    }

    


    


}