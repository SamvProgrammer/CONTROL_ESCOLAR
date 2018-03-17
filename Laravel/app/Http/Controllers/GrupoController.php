<?php
namespace App\Http\Controllers;
use App\Grupo;
use Illuminate\Http\Request;
use App\Http\Requests\GruposRequest;
use App\Http\Requests;
use Illuminate\Support\Facades\Response;

class GrupoController extends Controller{
	protected $grupos=null;
	public function __construct(Grupo $grupos){
		$this->grupos=$grupos;
	}

	public function allGrupo(){
		return $this->grupos->allGrupo();
	}

	public function saveGrupo(GruposRequest $request){
		return $this->grupos->saveGrupo($request);
	}

	public function getGrupo($id){
        $grupos = $this->grupos->getGrupo($id);
        if(!$grupos){
            return Response::json(['response' => 'Grupo no encontrado'], 404);
        }
        return Response::json($grupos,200);
    }

    public function getGrupoByGrado($grado){
        $grupos = $this->grupos->getGrupoByGrado($grado);
        if(!$grupos){
            return Response::json(['response' => 'Grupo no encontrado'], 404);
        }
        return Response::json($grupos,200);
    }

    public function getGrado($nombre){
        $grupos = $this->grupos->getGrado($nombre);
        if(!$grupos){
            return Response::json(['response' => 'Grado no encontrado'], 404);
        }
        return Response::json($grupos,200);
    }

    public function deleteGrupo($id){
        $grupos = $this->grupos->deleteGrupo($id);
        if(!$grupos){
            return Response::json(['response' => 'Grupo no encontrado'], 404);
        }
        return Response::json($grupos,200);
    }
    public function actualizarGrupo($camp){
        $grupos = $this->grupos->actualizarGrupo($camp);
        
        if(!$grupos){
            return Response::json(['response' => 'Grupo no encontrado'],404);
        }
        
        return Response::json($grupos,200);
    }

    public function getGrupoDocente($camp){
        $grupos = $this->grupos->getGrupoDocente($camp);
        
        if(!$grupos){
            return Response::json(['response' => 'Grupo no encontrado'],404);
        }
        
        return Response::json($grupos,200);
    }
    


    public function getGrupoGradoDocente($camp){
        $grupos = $this->grupos->getGrupoGradoDocente($camp);
        
        if(!$grupos){
            return Response::json(['response' => 'Grupo no encontrado'],404);
        }
        
        return Response::json($grupos,200);
    }


    public function getGruposNoAsignadosAun($camp){
        $grupos = $this->grupos->getGruposNoAsignadosAun($camp);
        
        if(!$grupos){
            return Response::json(['response' => 'Grupo no encontrado'],404);
        }
        
        return Response::json($grupos,200);
    }

    public function getMaxAlumnos($camp){
        $grupos = $this->grupos->getMaxAlumnos($camp);
        
        if(!$grupos){
            return Response::json(['response' => 'Grupo no encontrado'],404);
        }
        
        return Response::json($grupos,200);
    }
    public function grupoExistente($camp1,$camp2){
        $grupos = $this->grupos->grupoExistente($camp1,$camp2);
        if(!$grupos){
            return Response::json(['response' => 'Grupo no encontrado'],404);
        }
        
        return Response::json($grupos,200);
    }

    
    public function guardarPrimerGrado(){
        return $this->grupos->guardarPrimerGrado();
    }

    public function getGruposActivos(){
        return $this->grupos->getGruposActivos();
    }

    public function getGruposNoOcupados($idGrupo){
        return $this->grupos->getGruposNoOcupados($idGrupo);
    }

    public function saveDocenteGrupo(){
        return $this->grupos->saveDocenteGrupo();
    }
    public function docenteActivo($idDocente){
        return $this->grupos->docenteActivo($idDocente);
        
    }

    public function gruposNoPuedeEliminar($idGrupo){
        return $this->grupos->gruposNoPuedeEliminar($idGrupo);
        
    }

    public function saveGrupoParaCicloNuevo(){
        return $this->grupos->saveGrupoParaCicloNuevo();
        
    }

    public function inhabilitarGrupoAnterior($idGrupo){
        return $this->grupos->inhabilitarGrupoAnterior($idGrupo);
        
    }

    public function quitarleGrupoADocente($idDocente){
        return $this->grupos->quitarleGrupoADocente($idDocente);
        
    }

    public function obtenerIdGrupo($grupo, $nombre){
        return $this->grupos->obtenerIdGrupo($grupo, $nombre);
        
    }

    public function comprobarGrupo($grupo, $nombre){
        return $this->grupos->comprobarGrupo($grupo, $nombre);
        
    }

    public function datosCabeceraHorarioAlumno($idAlumno){
        return $this->grupos->datosCabeceraHorarioAlumno($idAlumno);
        
    }

    public function cambiarCurso($nuevo, $id){
        return $this->grupos->cambiarCurso($nuevo, $id);
        
    }

    public function totalAlumnos($idGrupo){
        return $this->grupos->totalAlumnos($idGrupo);
        
    }

    public function cabeceraEstadistica($idGrupo){
        return $this->grupos->cabeceraEstadistica($idGrupo);
        
    }

    public function cabeceraBoletaEgresado($idAlumno){
        return $this->grupos->cabeceraBoletaEgresado($idAlumno);
        
    }
    public function getNombreGrupo($idGrupo){
        return $this->grupos->getNombreGrupo($idGrupo);
        
    }

    public function getGrados(){
        return $this->grupos->getGrados();
        
    }
    public function getGrupos(){
        return $this->grupos->getGrupos();
        
    }
    public function getGrados2($grado){
        return $this->grupos->getGrados2($grado);
        
    }
    public function getGrupo2($nombre){
        return $this->grupos->getGrupo2($nombre);
        
    }
    public function getGruposVacios(){
        return $this->grupos->getGruposVacios();
        
    }

    public function getGruposByID($idGrupo){
        return $this->grupos->getGruposByID($idGrupo);
        
    }

    

    
    
    
    
    
    

        

    

    
}