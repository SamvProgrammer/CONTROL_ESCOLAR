<?php
namespace App;
use App\Http\Requests\GruposRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;

class Grupo extends Model{

	protected $primaryKey='idGrupo';
	public $incrementing=true;
	public $timestamps=false;
	public $table ='grupo';

	protected $fillable=[
		'idGrupo','nombre','grado','maxAlumnos','totalAlumnos', 'idCurso'
	];

	public function allGrupo(){
		//return self::all();
    $grupo=DB::select ('SELECT * from grupo where grupo.estatus =1 AND grupo.grado <> 7');
    return $grupo;
	}

	public function saveGrupo(GruposRequest $request){
		$input=Input::all();
    
		          $grupo= new Grupo();
              $grupo-> maxAlumnos=45;
              $grupo-> estatus = 1;
		          $grupo->fill($request->all());
		          $grupo->save();

		return $grupo;
	}
	
	public function getGrupo($id){
		$grupo=DB::select ('SELECT * from grupo where idGrupo='."'$id'".' AND grupo.estatus =1 AND grupo.grado <> 7');
		return $grupo;
	}

	public function getGrupoByGrado($grado){
		$grupo=DB::select ('SELECT * from grupo where grado='."'$grado'".'AND grupo.estatus =1');
		return $grupo;
	}

	public function getGrado($nombre){
		$grupo=DB::select ('SELECT grado from grupo where nombre <>'."'$nombre'".'AND grupo.estatus =1');
		return $grupo;
	}

	public function deleteGrupo($id){
        $grupo = DB::update('UPDATE grupo SET estatus=0 where idGrupo='."'$id'");
        

        return $grupo;
    }


    public function actualizarGrupo($camp){
        $grupo = self::find($camp);
        if(is_null($grupo)){
            return false;
        }
         $input = Input::all();
             
        $grupo->fill($input);
        $grupo->save();
        return $grupo;
    }
    /*
    public function getGrupoDocente($idDocente){
        $grupo =DB::select('SELECT grupo.idGrupo, grupo.nombre, grupo.grado
							FROM grupo
							INNER JOIN horario_temporal ON horario_temporal.idGrupo = grupo.idGrupo
							INNER JOIN docente ON horario_temporal.idDocente = docente.idDocente
							WHERE docente.idDocente ='."'$idDocente'".'AND grupo.estatus =1 GROUP BY grupo.idGrupo');

        return $grupo;
    }
    */
    public function getGrupoDocente($idDocente){
        $grupo =DB::select('SELECT grupo.idGrupo,grupo.nombre, grupo.grado, docente_grupo.idDocente, curso.anioInicio, curso.anioFin from grupo INNER join docente_grupo on grupo.idGrupo= docente_grupo.idGrupo INNER join curso on curso.idCurso= grupo.idCurso where docente_grupo.idDocente='."'$idDocente'");

        return $grupo;
    }
    
    public function getGrupoGradoDocente($idDocente){
        $grupo =DB::select('SELECT grupo.grado, grupo.nombre, curso.anioInicio, curso.anioFin from grupo INNER JOIN curso ON grupo.idCurso = curso.idCurso INNER JOIN horario_temporal on grupo.idGrupo=horario_temporal.idGrupo AND horario_temporal.idCurso = curso.idCurso INNER JOIN docente on horario_temporal.idDocente = docente.idDocente WHERE docente.idDocente ='."'$idDocente'".'AND(curso.estatus AND grupo.estatus = 1) GROUP BY grupo.grado');

        return $grupo;
    }
    

     

    

     	
     	 

    
    //consulta que trae los grupos que aún no son asignados dependiendo del grado
     public function getGruposNoAsignadosAun($idGrupo){
     	$numero=DB::select('SELECT COUNT(idGrupo) AS num, horario_temporal.idGrupo FROM horario_temporal WHERE horario_temporal.idGrupo ='."'$idGrupo'");

       
        	if($numero[0]->num == 30){
     		return DB::select('SELECT grupo.idGrupo, grupo.nombre from grupo WHERE grupo.idGrupo !='.$numero[0]->idGrupo.' AND grupo.grado ='."'$idGrupo'");

     		 

     	}else{
     		return DB::select ('SELECT grupo.idGrupo, grupo.nombre from grupo where grupo.grado='."'$idGrupo'");
     	}

        
    }


    public function getMaxAlumnos($idGrupo){
        $grupo =DB::select('SELECT grupo.maxAlumnos from grupo WHERE grupo.idGrupo ='."'$idGrupo'".'AND grupo.estatus = 1');
        return $grupo;
    }
    public function grupoExistente($grado,$nombre){
    	$grupo=DB::select('SELECT * from grupo where grado='."'$grado'" .'and grupo.nombre='."'$nombre'".'AND grupo.estatus = 1');
    	return $grupo;
    }

    /*public function vecesDocenteHorario($idDocente){
    	$grupo=DB::select('SELECT COUNT(idDocente) AS numero FROM horario_temporal WHERE idDocente ='."'$idDocente'");
    	return $grupo;
    }*/

    public function guardarPrimerGrado(){
                  $inputArray = Input::all();
                  foreach ($inputArray as $key => $input) {
                      DB::table('evaluacion_g_1')->insert(
                      ['idAlumno' => $input['idAlumno'], 'idBimestre' => $input['idBimestre'], 'idCurso' => $input['idCurso'],'idDocente' => $input['idDocente'],'idEA' => $input['idEA'],'idEF' => $input['idEF'],'idEsp' => $input['idEsp'],'idENS' => $input['idENS'],'idFCE' => $input['idFCE'],'idMat' => $input['idMat'], 'promedio' => $input['promedio'] ]
                      );
                  } 
              }


    public function getGrupoHorarioTemporal($id){
    $grupo=DB::select ('SELECT * from grupo where idGrupo='."'$id'".'AND grupo.estatus =1');
    return $grupo;
  }

  public function getGruposActivos(){
    $grupo=DB::select ('SELECT grupo.idGrupo ,grupo.grado, grupo.nombre FROM grupo WHERE grupo.estatus = 1 AND grupo.grado <> 7 GROUP BY grupo.grado');
    return $grupo;
  }

  public function getGruposNoOcupados($idGrupo){
    $grupo=DB::select ('SELECT grupo.idGrupo, grupo.grado ,grupo.nombre from grupo where not exists (select docente_grupo.idGrupo from docente_grupo where docente_grupo.idGrupo = grupo.idGrupo) AND grupo.estatus = 1 AND grupo.grado=?',[$idGrupo]);
    return $grupo;
  }


 

    public function saveDocenteGrupo(){
                  $inputArray = Input::all();
                  foreach ($inputArray as $key => $input) {
                      DB::table('docente_grupo')->insert(
                      ['idDocente' => $input['idDocente'], 'idCurso' => $input['idCurso'], 'idGrupo' => $input['idGrupo']]
                      );
                  } 
              }


  public function docenteActivo($idDocente){
        $grupo=DB::select ('SELECT docente_grupo.idDocente FROM docente_grupo WHERE docente_grupo.idDocente =?',[$idDocente]);
          return $grupo;
                  
              }



      public function gruposNoPuedeEliminar($idGrupo){
        $grupo=DB::select ('SELECT alumno_grupo.idAlumno FROM alumno_grupo WHERE alumno_grupo.idGrupo =?',[$idGrupo]);
          return $grupo;
                  
              }


              public function saveGrupoParaCicloNuevo(){
                  $inputArray = Input::all();
                  foreach ($inputArray as $key => $input) {
                      DB::table('grupo')->insert(
                      ['nombre' => $input['nombre'], 'grado' => $input['grado'], 'maxAlumnos' => $input['maxAlumnos'], 'idCurso' => $input['idCurso'], 'estatus'=>$input['estatus']]
                      );
                  } 
              }


    public function inhabilitarGrupoAnterior($idGrupo){
        $docentes = DB::select('UPDATE grupo SET estatus = 0 where idGrupo =?',[$idGrupo]);
        return $docentes;
    }

    public function quitarleGrupoADocente($idDocente){
        $grupo = DB::delete('DELETE from docente_grupo where idDocente=?',[$idDocente]);
        

        return $grupo;
    }

    public function obtenerIdGrupo($grado, $nombre){
        $grupo = DB::select('SELECT docente_grupo.idGrupo from docente_grupo 
      INNER JOIN grupo ON grupo.idGrupo = docente_grupo.idGrupo
      WHERE grupo.grado =? AND grupo.nombre =?',[$grado, $nombre]);
        

        return $grupo;
    }

      function comprobarGrupo($grado, $nombre){
        $grupo = DB::select('SELECT * from grupo
        WHERE grupo.grado =? AND grupo.nombre =?',[$grado, $nombre]);

        return $grupo;
      }

      function datosCabeceraHorarioAlumno($idAlumno){
        $grupo = DB::select('SELECT grupo.grado, grupo.nombre, curso.anioInicio, curso.anioFin,CONCAT(docente.nombres, " ", docente.apPaterno, " ", docente.apMaterno) as nombre_completo, alumno.curp, alumno.apPaterno, alumno.apMaterno, alumno.nombres FROM grupo INNER JOIN alumno_grupo ON grupo.idGrupo = alumno_grupo.idGrupo INNER JOIN alumno ON alumno.idAlumno = alumno_grupo.idAlumno INNER JOIN docente_grupo ON docente_grupo.idGrupo = grupo.idGrupo INNER JOIN docente ON docente.idDocente = docente_grupo.idDocente INNER JOIN curso ON alumno_grupo.idCurso = curso.idCurso WHERE alumno.idAlumno =?',[$idAlumno]);

        return $grupo;
      }


      public function cambiarCurso($nuevo, $id){
        $grupo = DB::update('UPDATE grupo SET idCurso=? where idGrupo=?',[$nuevo, $id]);
        return $grupo;
    } 

    public function totalAlumnos($idGrupo){
        $docentes = DB::update('UPDATE grupo SET totalAlumnos= totalAlumnos+1 where idGrupo =?',[$idGrupo]);
        return $docentes;
    }

    public function cabeceraEstadistica($idGrupo){
        $docentes = DB::select('SELECT grupo.grado, grupo.nombre, curso.anioInicio, curso.anioFin,CONCAT(docente.nombres, " ", docente.apPaterno, " ", docente.apMaterno) as nombre_completo FROM grupo INNER JOIN docente_grupo ON docente_grupo.idGrupo = grupo.idGrupo INNER JOIN docente ON docente.idDocente = docente_grupo.idDocente INNER JOIN curso ON docente_grupo.idCurso = curso.idCurso WHERE grupo.idGrupo=?',[$idGrupo]);
        return $docentes;
    }

    public function cabeceraBoletaEgresado($idAlumno){
        $docentes = DB::select('SELECT grupo.grado, grupo.nombre, curso.anioInicio, curso.anioFin, alumno.curp, alumno.apPaterno, alumno.apMaterno, alumno.nombres 
          FROM grupo
          INNER JOIN alumno_grupo ON grupo.idGrupo = alumno_grupo.idGrupo 
          INNER JOIN alumno ON alumno.idAlumno = alumno_grupo.idAlumno 
          INNER JOIN curso ON alumno_grupo.idCurso = curso.idCurso 
          WHERE alumno.idAlumno =?',[$idAlumno]);
        return $docentes;
    }


    public function getNombreGrupo($idGrupo){
        $docentes = DB::select('SELECT grupo.grado," ",grupo.nombre from grupo where idGrupo =?',[$idGrupo]);
        return $docentes;
    }

    public function getGrados(){
        $docentes = DB::select('SELECT grado FROM grupo where grupo.estatus= 1 and grado <>7 GROUP BY grado');
        return $docentes;
    }
    public function getGrados2($grado){
        $docentes = DB::select('SELECT * FROM grupo where grupo.grado= ? and grupo.estatus= 1',[$grado]);
        return $docentes;
    }

    public function getGrupos(){
        $docentes = DB::select('SELECT nombre FROM grupo where grupo.estatus= 1 GROUP BY nombre');
        return $docentes;
    }

    public function getGrupo2($nombre){
        $docentes = DB::select('SELECT * FROM grupo where grupo.nombre = ? and grupo.estatus= 1 and grupo.grado <>7',[$nombre]);
        return $docentes;
    }

    public function getGruposVacios(){
        $docentes = DB::select('SELECT grupo.* from grupo where not exists (select alumno_grupo.idGrupo from alumno_grupo where alumno_grupo.idGrupo = grupo.idGrupo) AND grupo.estatus = 1');
        return $docentes;
    }


    public function getGruposByID($idGrupo){
        $docentes = DB::select('SELECT * FROM grupo WHERE idGrupo =?',[$idGrupo]);
        return $docentes;
    }
    

    

    
    

      





     
    

}