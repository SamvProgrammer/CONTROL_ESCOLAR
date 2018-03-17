<?php

namespace App\Http\Controllers;
use App\AlumnoGrupo;
use Illuminate\Http\Request;
use App\Http\Requests;

class AlumnoGrupoController extends Controller
{
     protected $alumnogrupo = null;

    public function __construct(AlumnoGrupo $alumnogrupo){
    	$this->alumnogrupo = $alumnogrupo;
    }
    public function allAluGrup(){
    		return $this->alumnogrupo->allAlumnoGrupo();
	}
    public function getAlumnoById($idAlumno){
            return $this->alumnogrupo->getAlumnoById($idAlumno);
    }

    public function a($idGrupo){
            return $this->alumnogrupo->a($idGrupo);
    }

	public function saveAluGrup(){
    		return $this->alumnogrupo->saveAlumnoGrupo();
	}

    public function contarRegistros($idGrupo){
            return $this->alumnogrupo->contarRegistros($idGrupo);
    }

    public function alumnosHombres($idGrupo){
            return $this->alumnogrupo->alumnosHombres($idGrupo);
    }

    public function alumnosHombresF($idCurso){
            return $this->alumnogrupo->alumnosHombresF($idCurso);
    }

    public function alumnasMujeresF($idCurso){
            return $this->alumnogrupo->alumnasMujeresF($idCurso);
    }
    
    

    public function alumnasMujeres($idGrupo){
            return $this->alumnogrupo->alumnasMujeres($idGrupo);
    }


    public function obtenerEdadAlumnos($idGrupo,$sexo){
        $arregloedadAlumnos=[5,6,7,8,9,10,11,12,13,14,15];
        foreach ($arregloedadAlumnos as $key => $datos) {
            $arr[$key]=$this->alumnogrupo->obtenerEdadAlumnos($datos,$idGrupo,$sexo);
        }
           return $arr;
        }

        public function obtenerEdadAlumnosF($sexo,$idCurso){
        $arregloedadAlumnos=[5,6,7,8,9,10,11,12,13,14,15];
        foreach ($arregloedadAlumnos as $key => $datos) {
            $arr[$key]=$this->alumnogrupo->obtenerEdadAlumnosF($datos,$sexo,$idCurso);
        }
           return $arr;
        }

        public function obtenerEdadAlumnosF2($sexo, $idCurso){
        $arregloedadAlumnos=[5,6,7,8,9,10,11,12,13,14,15];
        foreach ($arregloedadAlumnos as $key => $datos) {
            $arr[$key]=$this->alumnogrupo->obtenerEdadAlumnosF2($datos,$sexo,$idCurso);
        }
           return $arr;
        }
    

    public function obtenerAlumnoDelGrupoParaEvaluar($idGrupo){
            return $this->alumnogrupo->obtenerAlumnoDelGrupoParaEvaluar($idGrupo);
    }

     public function getNumerosGrupos($idGrupo){
            return $this->alumnogrupo->getNumerosGrupos($idGrupo);
    }
    public function getTotalAlumnos($idGrupo){
            return $this->alumnogrupo->getTotalAlumnos($idGrupo);
    }

    public function deleteAlumnosGrupos($idAlumno, $idCurso){
            return $this->alumnogrupo->deleteAlumnosGrupos($idAlumno, $idCurso);
    }

    public function promovidoOno($estado, $idAlumno){
            return $this->alumnogrupo->promovidoOno($estado, $idAlumno);
    }

    public function getNumEmailAlumnos($idGrupo){
            return $this->alumnogrupo->getNumEmailAlumnos($idGrupo);
    }

    public function contarRegistrosInicial($idGrupo){
            return $this->alumnogrupo->contarRegistrosInicial($idGrupo);
    }

    public function cambiarDeGrupo($idGrupo, $idAlumno){
            return $this->alumnogrupo->cambiarDeGrupo($idGrupo,$idAlumno);
    }

    public function cambiarDeGrupoEvaluacion($idGrupo, $idAlumno){
            return $this->alumnogrupo->cambiarDeGrupoEvaluacion($idGrupo,$idAlumno);
    }

    public function contarRegistrosF($idCurso){
            return $this->alumnogrupo->contarRegistrosF($idCurso);
    }

    public function datosAlumnoCurso($idCurso){
            return $this->alumnogrupo->datosAlumnoCurso($idCurso);
    }

    
    
    

    

    

    

    

    
}
