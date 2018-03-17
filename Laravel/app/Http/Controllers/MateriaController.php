<?php

namespace App\Http\Controllers;
use App\Materia;
use Illuminate\Http\Request;
use App\Http\Requests\MateriaRequest;
use App\Http\Requests;
use Illuminate\Support\Facades\Response;

class MateriaController extends Controller
{
     protected $materia = null;

    public function __construct(Materia $materia){
    	$this->materia = $materia;
    }

    public function allMaterias(){
    		return $this->materia->allMaterias();		
	}
	public function saveMateria(MateriaRequest $request){
    		return $this->materia->saveMateria($request);
	}

    public function getMateriaByTagName($nombre){
        $materia = $this->materia->getMateriaByTagName($nombre);
        if(!$materia){
            return Response::json(['response' => 'Materia no encontrado'],404);
        }
        return Response::json($materia,200);
    }

    public function getMateriaByGrado($grado){
        $materia = $this->materia->getMateriaByGrado($grado);
        if(!$materia){
            return Response::json(['response' => 'Materia no encontrado'],404);
        }
        return Response::json($materia,200);
    }
    public function deleteMateria($id){
        $materia = $this->materia->deleteMateria($id);
        if(!$materia){
            return Response::json(['response' => 'Materia no encontrado'],404);
        }
        return Response::json($materia,200);
    }
    public function updateMateria($camp){
        $materia = $this->materia->updateMateria($camp);
        if(!$materia){
            return Response::json(['response' => 'Materia no encontrado'],404);
        }
        return Response::json($materia,200);
    }

    public function getMateriasByDocente($camp){
        $materia = $this->materia->getMateriasByDocente($camp);
        if(!$materia){
            return Response::json(['response' => 'Materia no encontrado'],404);
        }
        return Response::json($materia,200);
    }

    public function getMateriasByGrado($camp, $idDocente){
        $materia = $this->materia->getMateriasByGrado($camp, $idDocente);
        if(!$materia){
            return Response::json(['response' => 'Materia no encontrado'],404);
        }
        return Response::json($materia,200);
    }
    public function materiaExistente($camp1,$camp2){
        $materia = $this->materia->materiaExistente($camp1,$camp2);
        if(!$materia){
            return Response::json(['response' => 'Materia no encontrada'],404);
        }
        return Response::json($materia,200);
    }


    public function getMateriasByAlumno($idAlumno){
            return $this->materia->getMateriasByAlumno($idAlumno);
        
    }

    public function califBim1Grado1($idAlumno, $idBimestre){
            return $this->materia->califBim1Grado1($idAlumno, $idBimestre);
        
    }

    public function verCalifG1(){
            return $this->materia->verCalifG1();
        
    }

    public function promediosFinales($grado){
            return $this->materia->promediosFinales($grado);
        
    }

    public function promedioCurso($idDocente){
            return $this->materia->promedioCurso($idDocente);
        
    }

    public function materiasDeGrado($grado){
            return $this->materia->materiasDeGrado($grado);
        
    }

    

    

    

    

    


    

    

    //materiaExistente


    

}
