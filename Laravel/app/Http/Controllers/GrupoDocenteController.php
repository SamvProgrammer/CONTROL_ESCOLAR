<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\GrupoDocente;
use App\Http\Requests;
use Illuminate\Support\Facades\Response;

class GrupoDocenteController extends Controller
{
    protected $docente = null;

    public function __construct(GrupoDocente $docente){
    	$this->docente = $docente;
    }

    public function allDocentes(){
            return $this->docente->allDocentes();
        //return User::orderBy('id', 'asc')->get();
        
    }


    public function saveDocenteGrupo(){
		try{
    		return $this->docente->saveDocenteGrupo();
    	} catch(\Illuminate\Database\QueryException $ex){
    		return Response::json(['response' => $ex->getCode()],500);
    	}
	}
}
