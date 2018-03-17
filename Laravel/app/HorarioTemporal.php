<?php

namespace App;

use Illuminate\Support\Facades\Input;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class HorarioTemporal extends Model
{
 
    public $incrementing = false;

    public $timestamps = false;

    public $table = 'horario_temporal';

    protected $fillable = [
        'idDocente', 'idMateria', 'idGrupo', 'hora', 'dia', 'idCurso'
    ];


    public function getHorarioByIdDocenteGrupo($idDocente,$idGrupo,$dia){
          
        $horario_temporal = DB::select('SELECT horario_temporal.*, materia.nombre FROM horario_temporal INNER JOIN materia ON materia.idMateria = horario_temporal.idMateria WHERE idDocente='."'$idDocente'".'and idGrupo ='."'$idGrupo'".'and dia='."'$dia'");

        return $horario_temporal;
    
    }

     public function getAllHorarioDocente($idDocente,$idGrupo){
          
        $horario_temporal = DB::select('SELECT materia.idMateria, materia.nombre, horario_temporal.dia, horario_temporal.hora, horario_temporal.idGrupo, horario_temporal.idDocente
            FROM
            horario_temporal
            LEFT JOIN materia ON materia.idMateria = horario_temporal.idMateria
            WHERE idDocente='."'$idDocente'".'and idGrupo ='."'$idGrupo'");

        return $horario_temporal;
    
    }

    public function getAllHorarioDocentePersonalizado($idDocente,$idGrupo,$day){
          
        $horario_temporal = DB::select('SELECT materia.idMateria, materia.nombre as materia'."$day".', horario_temporal.dia, horario_temporal.hora
            FROM
            horario_temporal
            LEFT JOIN materia ON materia.idMateria = horario_temporal.idMateria
            WHERE idDocente='."'$idDocente'".'and idGrupo ='."'$idGrupo'".'and dia='."'$day'");

        return $horario_temporal;
    
    }

    //grupos que tiene asociados un docente

    public function getgruposasociadosadocentes($idDocente){
        $grupodocente=DB::select('SELECT horario_temporal.idGrupo, horario_temporal.idDocente from horario_temporal inner join docente on horario_temporal.idDocente=docente.idDocente where horario_temporal.idDocente='."'$idDocente'".'group by idGrupo');
        return $grupodocente;
    }



     public function saveHorarioTemporal(){      
        
         $arregloHorarioTemporal = Input::get('enviar');
        
         foreach ($arregloHorarioTemporal as $key => $horarioTemporal) {
        
            DB::table('horario_temporal')->insert($horarioTemporal);
        
        }

    }

     public function updateHorarioTemporal(){      
        
         $arregloUpdateTemporal = Input::get('enviar');

        
         foreach ($arregloUpdateTemporal as $key => $horarios) {
            
            //print_r($horarios["idMateria"]);
        
            DB::table('horario_temporal')
            ->where([
                ['idDocente', '=',$horarios["idDocente"]],
                ['idGrupo', '=', $horarios["idGrupo"]],
                ['hora', '=', $horarios["hora"]],
                ['dia', '=', $horarios["dia"]],
                //['idCurso', '=', $horarios["idCurso"]],
            ])->update($horarios);
            
        }
    
    }

    //obtiene los docentes que aún no tienen grupo asigando
    public function DocentesNoAsignados(){
        $docentes = DB::select('SELECT docente.nombres From docente Left Outer Join horario_temporal ON docente.idDocente = horario_temporal.idDocente where horario_temporal.idDocente is null GROUP BY docente.idDocente');
        

        return $docentes;
    }


    //obtener las materias que le toca cada día al docente
    public function materiasPorDia($idDocente){
        $docentes = DB::select('SELECT materia.nombre, horario_temporal.dia from materia INNER JOIN horario_temporal on materia.idMateria = horario_temporal.idMateria INNER JOIN docente on horario_temporal.idDocente = docente.idDocente WHERE docente.idDocente ='."'$idDocente'");
        

        return $docentes;
    }

    public function getHorarioPorGrupo($idGrupo){
        $docentes = DB::select('SELECT horario_temporal.*, docente.nombres as nombre_docente, grupo.nombre as nombre_grupo, materia.nombre as nombre_materia FROM horario_temporal
            INNER JOIN docente ON horario_temporal.idDocente = docente.idDocente
            INNER JOIN grupo on horario_temporal.idGrupo = grupo.idGrupo
            INNER JOIN materia on horario_temporal.idMateria = materia.idMateria
            INNER JOIN curso on horario_temporal.idCurso = curso.idCurso
            WHERE grupo.idGrupo ='."'$idGrupo'");
        

        return $docentes;
    }

    public function getHorarioEDF(){
            $docentes = DB::select('SELECT horario_temporal.*, CONCAT(grupo.grado," ",grupo.nombre)as nombre_grupo, materia.nombre as nombre_materia FROM horario_temporal 
    INNER JOIN materia ON materia.idMateria = horario_temporal.idMateria 
    INNER JOIN grupo ON horario_temporal.idGrupo = grupo.idGrupo
    WHERE materia.nombre = "EDUCACION FISICA"');
        return $docentes;
    }

    

    public function getGrupoAlumno($idAlumno){
        $docentes = DB::select('SELECT alumno_grupo.idGrupo FROM alumno_grupo INNER JOIN alumno ON alumno_grupo.idAlumno = alumno.idAlumno WHERE alumno.idAlumno ='."'$idAlumno'");
        

        return $docentes;
    }
    
    public function gethorasmaterias($idMateria,$idDocente){
        $docentes= DB::SELECT('SELECT count(materia.idMateria) as totalhoras from horario_temporal inner join materia on materia.idMateria=horario_temporal.idMateria INNER join docente on docente.idDocente= horario_temporal.idDocente INNER join grupo on grupo.idGrupo=horario_temporal.idGrupo where materia.idMateria='."'idMateria'".' and docente.idDocente='."'idDocente'");
        return $docentes;
    }

     public function verificaHorarioCompleto($idDocente){
        $docentes= DB::SELECT('SELECT IF(count(horario_temporal.idDocente) < 25,"incompleto", IF((select count(horario_temporal.idMateria) from horario_temporal where horario_temporal.idMateria = 0) = 0,"completo","incompleto")) as status FROM horario_temporal where horario_temporal.idDocente='."'$idDocente'");
        return $docentes;
    }

    public function evaluarAlumnos($idGrupo){
        $docentes= DB::SELECT('SELECT materia.nombre,materia.idMateria, curso.idCurso from materia INNER JOIN horario_temporal on materia.idMateria = horario_temporal.idMateria INNER JOIN grupo on grupo.idGrupo = horario_temporal.idGrupo INNER JOIN curso on horario_temporal.idCurso = curso.idCurso
            WHERE grupo.idGrupo = ? AND curso.estatus=1 GROUP BY materia.nombre',[$idGrupo]);
        return $docentes;
    }

    public function getGrupoDocente($idDocente){
        $docentes= DB::SELECT('SELECT docente_grupo.idGrupo, grupo.grado, grupo.nombre FROM docente_grupo INNER JOIN grupo on docente_grupo.idGrupo = grupo.idGrupo WHERE docente_grupo.idDocente =?',[$idDocente]);
        return $docentes;
    }


    public function allHorario(){
        $docentes= DB::SELECT('SELECT * from horario_temporal');
        return $docentes;
    }

    public function deleteHorarios($idDocente){
        $docentes= DB::delete('DELETE from horario_temporal where idDocente=?',[$idDocente]);
        return $docentes;
    }

    public function obtenerIdDocenteByIdGrupo($idGrupo){
        $docentes= DB::select('SELECT idDocente FROM docente_grupo WHERE idGrupo=?',[$idGrupo]);
        return $docentes;
    }

    

 







    

    

    

    

    
     




}
