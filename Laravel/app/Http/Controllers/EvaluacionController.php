<?php

namespace App\Http\Controllers;
use App\Evaluacion;
use Illuminate\Http\Request;
//use App\Http\Requests\AlumnoRequest;
use App\Http\Requests;
use Illuminate\Support\Facades\Response;

class EvaluacionController extends Controller
{
    protected $evaluacion = null;

    public function __construct(Evaluacion $evaluacion){
        $this->evaluacion = $evaluacion;
    }

    public function allEvaluacion(){
            return $this->evaluacion->allEvaluacion(); 
    }

    public function saveAlumnoEvaluar(){
            return $this->evaluacion->saveAlumnoEvaluar(); 
    }

    public function getEvaluacionesAlumno($idDocente, $idBimestre){
            return $this->evaluacion->getEvaluacionesAlumno($idDocente, $idBimestre); 
    }

    public function updateEvaluacionesAlumno(){
            return $this->evaluacion->updateEvaluacionesAlumno(); 
    }

    public function getFechasEval(){
            return $this->evaluacion->getFechasEval(); 
    }

    public function updateFechaEvalBim($bimestre,$fechaInicio, $fechaFin){
            return $this->evaluacion->updateFechaEvalBim($bimestre,$fechaInicio, $fechaFin); 
    }

    public function getAllEvaluaciones(){
            return $this->evaluacion->getAllEvaluaciones(); 
    }

    public function getNumMaterias($idDocente, $idAlumno){
            return $this->evaluacion->getNumMaterias($idDocente, $idAlumno); 
    }

    public function getEvaluacionDeAlumno($idBimestre, $idAlumno){
            return $this->evaluacion->getEvaluacionDeAlumno($idBimestre, $idAlumno); 
    }

    public function getBoleta($idAlumno){
            return $this->evaluacion->getBoleta($idAlumno); 
    }

    public function getAlumnosByDocente($idDocente){
            return $this->evaluacion->getAlumnosByDocente($idDocente); 
    }

    public function getAlumnosNuevoDocente($grado, $grupo){
            return $this->evaluacion->getAlumnosNuevoDocente($grado, $grupo); 
    }

    public function asignarNuevoDocente($idDocente, $idAlumno){
            return $this->evaluacion->asignarNuevoDocente($idDocente, $idAlumno); 
    }

    public function getEvaluacionBimestrales($idAlumno){
            return $this->evaluacion->getEvaluacionBimestrales($idAlumno); 
    }
    public function getcaliFinalAlumno($idAlumno){
            return $this->evaluacion->getcaliFinalAlumno($idAlumno); 
    }

    public function getEvaluacionesAlumnoDirector($idAlumno, $idBimestre){
            return $this->evaluacion->getEvaluacionesAlumnoDirector($idAlumno, $idBimestre); 
    }
    public function getEvaluacionesAlumnoD($idDocente, $idBimestre){
            return $this->evaluacion->getEvaluacionesAlumnoD($idDocente, $idBimestre); 
    }
    public function getEvaluacionesEdFisica($idDocente, $idBimestre){
            return $this->evaluacion->getEvaluacionesEdFisica($idDocente, $idBimestre); 
    }
    public function promedioFinalNivel($idDocente){
            return $this->evaluacion->promedioFinalNivel($idDocente); 
    }
    


        
    
}
