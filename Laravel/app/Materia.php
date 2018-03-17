<?php

namespace App;
use App\Http\Requests\MateriaRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;

class Materia extends Model
{
    protected $primaryKey='idMateria';

    public $incrementing = true;

    public $timestamps = false;

    public $table = 'materia';

    protected $fillable = [
        'idMateria','nombre', 'grado','horas'
    ];
    //campo que no quieres que muestre el get
     protected $hidden =[
        
    ];
    public function allMaterias(){
        //$alumno=DB::select('select * from alumnos');
        //return $alumno;
        return self::all();
    }

    public function saveMateria(MateriaRequest $request){
        $input = Input::all();
        //$input['numero_control'] = Hash::make($input['numero_control']);
        $materias = new Materia();
        $materias-> estatus = 1;
        $materias->fill($request->all());
        $materias->save();

        return $materias;
    }
    public function getMateriaByTagName($nombre){
        $materias=self::find($nombre);
        if(is_null($materias)){

            return false;
        }

        return $materias;
    }

    //filtrar las materias por grado
    public function getMateriaByGrado($grado){
        $materias =DB::select('SELECT * from materia where grado='."'$grado'");

        return $materias;
    }

    public function deleteMateria($id){
        $materias = DB::delete('DELETE from materia where idMateria='."'$id'");
        

        return $materias;
    }
    public function updateMateria($camp){
        $materias = self::find($camp);
        if(is_null($materias)){
            return false;
        }
        $input = Input::all();
        $materias->fill($input);
        $materias->save();

        return $materias;

    }

    public function getMateriasByDocente($idDocente){
        $materias =DB::select('SELECT materia.nombre from materia INNER JOIN grupo on materia.grado= grupo.grado INNER join docente_grupo on grupo.idGrupo=docente_grupo.idGrupo inner join docente on docente.idDocente=docente_grupo.idDocente where docente_grupo.idDocente=? order by materia.idMateria', [$idDocente]);

       /*$materias =DB::select('SELECT horario_temporal.*, materia.nombre FROM materia INNER JOIN horario_temporal ON materia.idMateria=horario_temporal.idMateria INNER JOIN docente on horario_temporal.idDocente = docente.idDocente WHERE docente.idDocente =? GROUP BY materia.idMateria ORDER BY materia.nombre ASC', [$idDocente]);*/

        return $materias;
    }

    /*public function getMateriasByGrado($idGrado){
        $materias =DB::select('SELECT materia.idMateria,materia.nombre FROM materia INNER JOIN grupo ON materia.grado = grupo.grado WHERE materia.grado ='."'$idGrado'".'GROUP BY materia.idMateria');

        return $materias;
    }*/


    /*public function getMateriasByGrado($idGrado){
        $materias =DB::select('SELECT materia.idMateria,materia.nombre, materia.horas FROM materia INNER JOIN grupo ON materia.grado = grupo.grado WHERE materia.grado ='."'$idGrado'".'GROUP BY materia.idMateria');

        return $materias;
    }*/

        /*public function getMateriasByGrado($idGrado, $idDocente){
        $materias =DB::select('SELECT materia.* from materia inner join grupo on materia.grado=grupo.grado where grupo.grado=? group by materia.idMateria',[$idGrado]);
        return $materias;
    }*/
    public function getMateriasByGrado($idGrado, $idDocente){
        $materias =DB::select('SELECT t1.idMateria, t1.nombre, t1.horas as totales,(if((SELECT COUNT(horario_temporal.idMateria) AS horas FROM horario_temporal INNER JOIN materia on horario_temporal.idMateria = materia.idMateria WHERE horario_temporal.idDocente = ? AND horario_temporal.idMateria=t1.idMateria GROUP BY horario_temporal.idMateria) is not null, (SELECT COUNT(horario_temporal.idMateria) AS horas FROM horario_temporal INNER JOIN materia on horario_temporal.idMateria = materia.idMateria WHERE horario_temporal.idDocente = ? AND horario_temporal.idMateria=t1.idMateria GROUP BY horario_temporal.idMateria), 0))as actuales, (t1.horas - if((SELECT COUNT(horario_temporal.idMateria) AS horas FROM horario_temporal INNER JOIN materia on horario_temporal.idMateria = materia.idMateria WHERE horario_temporal.idDocente = ? AND horario_temporal.idMateria=t1.idMateria GROUP BY horario_temporal.idMateria) is not null, (SELECT COUNT(horario_temporal.idMateria) AS horas FROM horario_temporal INNER JOIN materia on horario_temporal.idMateria = materia.idMateria WHERE horario_temporal.idDocente = ? AND horario_temporal.idMateria=t1.idMateria GROUP BY horario_temporal.idMateria), 0)) as horas from (SELECT materia.idMateria,materia.nombre, materia.horas FROM materia INNER JOIN grupo ON materia.grado = grupo.grado WHERE materia.grado =? GROUP BY materia.idMateria) t1',[$idDocente,$idDocente,$idDocente,$idDocente,$idGrado]);

    return $materias;
    }    
    

    


    public function materiaExistente($nombre,$grado){
        $materias=DB::select('SELECT materia.nombre, materia.grado from materia where materia.nombre='."'$nombre'" .'and materia.grado='."'$grado'");
        return $materias;
    }


    public function getMateriasByAlumno($idAlumno){
        $materias=DB::select('SELECT horario_temporal.*, materia.nombre FROM materia INNER JOIN horario_temporal ON materia.idMateria=horario_temporal.idMateria INNER JOIN alumno_grupo on horario_temporal.idGrupo = alumno_grupo.idGrupo WHERE alumno_grupo.idAlumno =? GROUP BY materia.idMateria ORDER BY materia.nombre ASC',[$idAlumno]);
        return $materias;
    }

    public function califBim1Grado1($idAlumno, $idBimestre){
        $materias=DB::select('SELECT evaluacion_g_1.idEA, evaluacion_g_1.idEF, evaluacion_g_1.idEsp, evaluacion_g_1.idENS, evaluacion_g_1.idFCE, evaluacion_g_1.idMat FROM evaluacion_g_1 WHERE idAlumno = ? AND idBimestre=?',[$idAlumno, $idBimestre]);
        return $materias;
    }

    public function verCalifG1(){
        $materias=DB::select('select * from evaluacion_g_1 WHERE evaluacion_g_1.idAlumno = 1');
        return $materias;
    }




    public function promediosFinales($idDocente){
        $materias=DB::select('SELECT t1.*, (SELECT (SUM(evaluacion.califMateria)/5) FROM evaluacion INNER JOIN alumno ON evaluacion.idAlumno=alumno.idAlumno WHERE evaluacion.idAlumno = t1.idAlumno AND evaluacion.idMateria = t1.idMateria GROUP BY evaluacion.idAlumno) AS promedio FROM (SELECT evaluacion.idAlumno, evaluacion.idCurso, evaluacion.idDocente, evaluacion.idMateria, CONCAT(alumno.apPaterno, " ", alumno.apMaterno, " ", alumno.nombres)as nombre_completo, materia.nombre FROM evaluacion INNER JOIN alumno ON evaluacion.idAlumno=alumno.idAlumno INNER JOIN docente ON evaluacion.idDocente = docente.idDocente INNER JOIN curso ON evaluacion.idCurso = curso.idCurso INNER JOIN materia ON evaluacion.idMateria = materia.idMateria WHERE docente.idDocente = ? AND curso.estatus= 1 AND alumno.estatus=1 GROUP BY evaluacion.idAlumno, evaluacion.idMateria ORDER BY nombre_completo) t1',[$idDocente]);
        return $materias;
    }


    /*SELECT t2.idAlumno, t2.idCurso, t2.idDocente,t2.nombre_completo, 
(SUM((t2.promedio)/(SELECT COUNT(evaluacion.idMateria) FROM evaluacion INNER JOIN alumno ON evaluacion.idAlumno = alumno.idAlumno INNER JOIN curso on evaluacion.idCurso = curso.idCurso WHERE alumno.idAlumno = t2.idAlumno AND evaluacion.idBimestre=1 AND curso.estatus = 1)) ) AS promedioFinal 

FROM (SELECT t1.idAlumno, t1.idCurso, t1.idDocente,t1.nombre_completo,
(SELECT (SUM(evaluacion.califMateria)/5) FROM evaluacion INNER JOIN alumno ON evaluacion.idAlumno=alumno.idAlumno WHERE evaluacion.idAlumno = t1.idAlumno AND evaluacion.idMateria = t1.idMateria GROUP BY evaluacion.idAlumno) AS promedio 

FROM (SELECT evaluacion.idAlumno, evaluacion.idCurso, evaluacion.idDocente, evaluacion.idMateria,CONCAT(alumno.apPaterno, " ", alumno.apMaterno, " ", alumno.nombres)as nombre_completo FROM evaluacion INNER JOIN alumno ON evaluacion.idAlumno=alumno.idAlumno INNER JOIN curso ON evaluacion.idCurso = curso.idCurso
INNER JOIN docente ON docente.idDocente = evaluacion.idDocente
WHERE curso.estatus =1 AND docente.idDocente=? GROUP BY evaluacion.idAlumno, evaluacion.idMateria)t1)t2 GROUP BY t2.idAlumno*/
    


    public function promedioCurso($idDocente){
        $materias=DB::select('SELECT t2.idAlumno, t2.idCurso, t2.idDocente,t2.nombre_completo,t2.grado, 
(SUM((t2.promedio)/(SELECT COUNT(evaluacion.idMateria) FROM evaluacion INNER JOIN alumno ON evaluacion.idAlumno = alumno.idAlumno INNER JOIN curso on evaluacion.idCurso = curso.idCurso WHERE alumno.idAlumno = t2.idAlumno AND evaluacion.idBimestre=1 AND curso.estatus = 1)) ) AS promedioFinal 

FROM (SELECT t1.idAlumno, t1.idCurso, t1.idDocente,t1.nombre_completo,t1.grado,
(SELECT (SUM(evaluacion.califMateria)/5) FROM evaluacion INNER JOIN alumno ON evaluacion.idAlumno=alumno.idAlumno WHERE evaluacion.idAlumno = t1.idAlumno AND evaluacion.idMateria = t1.idMateria GROUP BY evaluacion.idAlumno) AS promedio 

FROM (SELECT evaluacion.idAlumno, evaluacion.idCurso, evaluacion.idDocente, evaluacion.idMateria,CONCAT(alumno.apPaterno, " ", alumno.apMaterno, " ", alumno.nombres)as nombre_completo, grupo.grado FROM evaluacion INNER JOIN alumno ON evaluacion.idAlumno=alumno.idAlumno 
INNER JOIN alumno_grupo ON alumno_grupo.idAlumno = alumno.idAlumno
INNER JOIN curso ON evaluacion.idCurso = curso.idCurso
INNER JOIN docente ON docente.idDocente = evaluacion.idDocente
INNER JOIN grupo ON grupo.idGrupo = alumno_grupo.idGrupo
WHERE curso.estatus =1 AND docente.idDocente=? GROUP BY evaluacion.idAlumno, evaluacion.idMateria)t1)t2 GROUP BY t2.idAlumno',[$idDocente]);
        return $materias;
    }


        public function materiasDeGrado($grado){
        $materias=DB::select('SELECT materia.nombre, materia.idMateria FROM materia WHERE materia.grado = ?',[$grado]);
        return $materias;
    }


    




    

    


    

    



}
