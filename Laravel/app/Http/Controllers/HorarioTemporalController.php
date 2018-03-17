<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\HorarioTemporal;

class HorarioTemporalController extends Controller
{
     protected $horario_temporal = null;

    public function __construct(HorarioTemporal $horario_temporal){
    	$this->horario_temporal = $horario_temporal;
    }


    public function getHorarioByIdDocenteGrupo($idDocente,$idGrupo,$dia){
    		return $this->horario_temporal->getHorarioByIdDocenteGrupo($idDocente,$idGrupo,$dia);
    	
	}

    public function  getAllHorarioDocente($idDocente,$idGrupo){
            return $this->horario_temporal->getAllHorarioDocente($idDocente,$idGrupo);
        
    }
    
     public function getgruposasociadosadocentes($idDocente){
            return $this->horario_temporal->getgruposasociadosadocentes($idDocente);
     }

	  public function saveHorarioTemporal(){
        return $this->horario_temporal->saveHorarioTemporal();
    }


    public function updateHorarioTemporal(){
        
        $horario_temporal = $this->horario_temporal->updateHorarioTemporal();
        
    }

    public function DocentesNoAsignados(){
        return $this->horario_temporal->DocentesNoAsignados();
        
    }

    public function contarAlumnosDeGrupo($grupo){
            return $this->horario_temporal->contarAlumnosDeGrupo($grupo);
     }

     public function verificaHorarioCompleto($idDocente){
            return $this->horario_temporal->verificaHorarioCompleto($idDocente);
     }

     public function obtenerIdDocenteByIdGrupo($idGrupo){
        return $this->horario_temporal->obtenerIdDocenteByIdGrupo($idGrupo);
        
    }



     

     /*
     public function getHorarioPersonalizado(){

         //return $this->horario_temporal->getHorarioPersonalizado();
     }*/

     public function getHorarioPersonalizado(){
        $arr = [];
        $dias = ['Lunes','Martes','Miercoles','Jueves','Viernes'];
        //$dias = ['08:00:00 - 08:50:00', '08:50:00 - 09:40:00'];
        foreach ($dias as $key => $day) {
            $arr[$key] = $this->horario_temporal->getAllHorarioDocentePersonalizado(14,1,$day);
            
            //print_r($day);

        }
        return $arr;
    }

    
    public function materiasPorDia($idDocente){
            return $this->horario_temporal->materiasPorDia($idDocente);
     }

     public function getHorarioPorGrupo($idGrupo){
            return $this->horario_temporal->getHorarioPorGrupo($idGrupo);
     }

     public function getGrupoAlumno($idAlumno){
            return $this->horario_temporal->getGrupoAlumno($idAlumno);
     }

     
     public function gethorasmaterias($idMateria,$idDocente){
            return $this->horario_temporal->gethorasmaterias($idMateria,$idDocente);
     }

     public function evaluarAlumnos($idGrupo){
            return $this->horario_temporal->evaluarAlumnos($idGrupo);
     }

     public function getGrupoDocente($idDocente){
            return $this->horario_temporal->getGrupoDocente($idDocente);
     }

     public function allHorario(){
            return $this->horario_temporal->allHorario();
     }

     public function deleteHorarios($idDocente){
            return $this->horario_temporal->deleteHorarios($idDocente);
     }

     public function getHorarioEDF(){
            return $this->horario_temporal->getHorarioEDF();
     }

     

     


     

     

     

     
     

    


}
