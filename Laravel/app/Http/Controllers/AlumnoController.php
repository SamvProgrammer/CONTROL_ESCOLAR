<?php

namespace App\Http\Controllers;
use App\Alumno;
use Illuminate\Http\Request;
use App\Http\Requests\AlumnoRequest;
use App\Http\Requests;
use Illuminate\Support\Facades\Response;

use App\User;

class AlumnoController extends Controller
{
    protected $alumno = null;

    public function __construct(Alumno $alumno){
    	$this->alumno = $alumno;
    }

    /*public function allAlumnos(){
    		return $this->alumno->allAlumnos();	
	}*/
	public function saveAlumno(AlumnoRequest $request){
    		return $this->alumno->saveAlumno($request);
            
	}
    public function getAlumno(){
        $alumno = $this->alumno->getAlumno();
        if(!$alumno){
            return Response::json(['response' => 'Alumno no encontrado'], 404);
        }
        return Response::json($alumno,200);
    }

    public function getAlumnosBaja(){
            return $this->alumno->getAlumnosBaja(); 
    }


    public function getAlumnoById($id){
        $alumno = $this->alumno->getAlumnoById($id);
        if(!$alumno){
            return Response::json(['response' => 'Alumno no encontrado'], 404);
        }
        return Response::json($alumno,200);
    }
    public function deleteAlumno($id){
        $alumno = $this->alumno->deleteAlumno($id);
        if(!$alumno){
            return Response::json(['response' => 'Alumno no encontrado'],404);
        }
        return Response::json($alumno,200);
    }


    public function getAlumnoByGrado($grado){
        $alumno = $this->alumno->getAlumnoByGrado($grado);
        if(!$alumno){
            return Response::json(['response' => 'Alumno no encontrado'], 404);
        }
        return Response::json($alumno,200);
    }

    public function getAlumnoByGrupo($grupo){
        $alumno = $this->alumno->getAlumnoByGrupo($grupo);
        if(!$alumno){
            return Response::json(['response' => 'Alumno no encontrado'],404);
        }
        return Response::json($alumno,200);
    }
    public function getevaluaremail($email){
        $alumno = $this->alumno->evaluaremail($email);
        if(!$alumno){
            return Response::json(['response' => 'email invalido'],404);
        }
        return Response::json(['response' => 'email valido'],200);
    }
    public function getevaluarcurp($curp){
        $alumno = $this->alumno->evaluarcurp($curp);
        if(!$alumno){
            return Response::json(['response' => 'curp valida'],404);
        }
        return Response::json(['response' => 'curp invalida'],200);
    }

    


    

    public function actualizarAlumno($camp){
        $alumno = $this->alumno->actualizarAlumno($camp);
        
        if(!$alumno){
            return Response::json(['response' => 'Alumno no encontrado'],404);
        }
        
        return Response::json($alumno,200);
    }

    public function getAlumnosInhabilitados(){
            return $this->alumno->getAlumnosInhabilitados(); 
    }


    public function getAlumnosEgresados(){
            return $this->alumno->getAlumnosEgresados(); 
    }

    public function ponerAlumnosEgresados($idAlumno){
            return $this->alumno->ponerAlumnosEgresados($idAlumno); 
    }

     public function getGradoAlumno($idAlumno){
            return $this->alumno->getGradoAlumno($idAlumno); 
    }
    public function traeralumnosActivos(){
        return $this->alumno->traeralumnosActivos();   
    }

    public function getEgresados(){
        return $this->alumno->getEgresados();   
    }

    public function getAlumnosByGrupo($idGrupo){
        return $this->alumno->getAlumnosByGrupo($idGrupo);   
    }

    public function saveAlumnoBoleta(){
        return $this->alumno->saveAlumnoBoleta();   
    }
    public function saveAlumnoBole(){
        return $this->alumno->saveAlumnoBole();   
    }

    public function getBoleta($idAlumno){
        return $this->alumno->getBoleta($idAlumno);   
    }

    public function actualizarBoleta(){
        return $this->alumno->actualizarBoleta();   
    }

    public function getBajaGrupo($idGrupo){
        return $this->alumno->getBajaGrupo($idGrupo);   
    }

    
    public function agregarmotivodebaja($motivo,$idAlumno){
        return $this->alumno->agregarmotivodebaja($motivo,$idAlumno);   
    }
    
    
    
    

    
    

    

}
