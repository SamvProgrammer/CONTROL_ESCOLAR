<?php

namespace App\Http\Controllers;
use App\Docente;
use Illuminate\Http\Request;
use App\Http\Requests\DocenteRequest;
use Illuminate\Support\Facades\Response;
use App\Http\Requests;

class DocenteController extends Controller
{
     protected $docente = null;

    public function __construct(Docente $docente){
    	$this->docente = $docente;
    }

    public function allDocentes(){
    		return $this->docente->allDocentes();
	}

	public function saveDocente(DocenteRequest $request){
        return $this->docente->saveDocente($request);
           
	}

    public function getDocente(){
        $docente = $this->docente->getDocente();
        if(!$docente){
            return Response::json(['response' => 'Docente no encontrado']);
        }
        return Response::json($docente,200);
    }


    public function getDocenteGrado($nombres){
        $docente = $this->docente->getDocenteGrado($nombres);
        if(!$docente){
            return Response::json(['response' => 'Docente no encontrado']);
        }
        return Response::json($docente,200);
    }

    public function getDocenteGrupo($nombres){
        $docente = $this->docente->getDocenteGrupo($nombres);
        if(!$docente){
            return Response::json(['response' => 'Docente no encontrado']);
        }
        return Response::json($docente,200);
    }
    public function getDocenteNombre($id){
        $docente = $this->docente->getDocenteNombre($id);
        if(!$docente){
            return Response::json(['response' => 'Docente no encontrado']);
        }
        return Response::json($docente,200);
    }
    public function getevaluaremail($email){
        $docente = $this->docente->evaluaremail($email);
        if(!$docente){
            return Response::json(['response' => 'email valido'],404);
        }
        return Response::json(['response' => 'email invalido'],200);
    }
    public function getevaluarrfc($rfc){
        $docente = $this->docente->evaluarrfc($rfc);
        if(!$docente){
            return Response::json(['response' => 'rfc valida'],404);
        }
        return Response::json(['response' => 'rfc invalida'],200);
    }



        public function deleteDocente($nombres){
        $docente = $this->docente->deleteDocente($nombres);
        if(!$docente){
            return Response::json(['response' => 'Docente no encontrado']);
        }
        return Response::json($docente,200);
    }

    public function updateDocente($camp){
        $docente = $this->docente->updateDocente($camp);
        if(!$docente){
            return Response::json(['response' => 'Docente no encontrado']);
        }
        return Response::json($docente,200);
    }

    
    public function obtenerAlumnosByDocente($camp){
        $docente = $this->docente->obtenerAlumnosByDocente($camp);
        if(!$docente){
            return Response::json(['response' => 'Docente no encontrado']);
        }
        return Response::json($docente,200);
    }


    public function getDirectores(){
        return $this->docente->getDirectores();
        
    }

    public function cambiarDirector($tipo){
        return $this->docente->cambiarDirector($tipo);
        
    }

    public function cambiarDocente($tipo){
        return $this->docente->cambiarDocente($tipo);
        
    }

    public function cambiarDocenteEnUsers($tipo, $idDocente){
        return $this->docente->cambiarDocenteEnUsers($tipo, $idDocente);
        
    }

    public function traerDocentes(){
        return $this->docente->traerDocentes();
        
    }

    public function getDirectorActual(){
        return $this->docente->getDirectorActual();
        
    }

    public function traerDocentesActivos(){
        return $this->docente->traerDocentesActivos();
        
    }

    public function getBajaDocentes(){
        return $this->docente->getBajaDocentes();
        
    }

    public function getGradoDocente($idDocente){
        return $this->docente->getGradoDocente($idDocente);
        
    }

    public function cambiarGrupoDocente($N,$A){
        return $this->docente->cambiarGrupoDocente($N,$A);
        
    }

    
    public function agregarmotivodebaja($motivo,$idDocente){
        return $this->docente->agregarmotivodebaja($motivo,$idDocente);
    }

    public function getDocenteByGrupo($idGrupo){
        return $this->docente->getDocenteByGrupo($idGrupo);
    }

    public function getRegistrosDeAlumno($idAlumno){
        return $this->docente->getRegistrosDeAlumno($idAlumno);
    }

    public function updateIdDocente($idDocente,$idAlumno){
        return $this->docente->updateIdDocente($idDocente,$idAlumno);
    }

    


    
    

    

    

}
