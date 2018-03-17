<?php

namespace App;

//use App\Http\Requests\AlumnoRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;

class Evaluacion extends Model
{
    //protected $primaryKey='idEvaluacion';
    //public $incrementing = true;
    public $timestamps = false;
    public $table = 'evaluacion';

    protected $fillable = [
        'idAlumno','idBimestre','idCurso','idDocente','idMateria','califMateria','promMateria'
    ];

    //campo que no quieres que muestre el get
     protected $hidden =[
        'password'
        
    ];
    public function allEvaluaciones(){
        return self::all();
    }

    /*public function saveAlumnoEvaluar(){
        $input = Input::all();
        $evaluaciones = new Evaluacion();
        $evaluaciones->fill($input);
        $evaluaciones->save();

        return $evaluaciones;
    }*/

    

     public function saveAlumnoEvaluar(){

         $inputArray = Input::all();
         foreach ($inputArray as $key => $input) {
            $existe = DB::select('SELECT * FROM evaluacion WHERE evaluacion.idAlumno =? AND evaluacion.idCurso =? AND evaluacion.idMateria=? AND evaluacion.idBimestre=?',[$input['idAlumno'], $input['idCurso'], $input['idMateria'], $input['idBimestre']]);
            if(!$existe){
                DB::table('evaluacion')->insert(['idAlumno' => $input['idAlumno'], 'idBimestre' => $input['idBimestre'], 'idCurso' => $input['idCurso'], 'idDocente' => $input['idDocente'], 'idMateria' => $input['idMateria'], 'califMateria' => $input['califMateria'], 'promMateria' => $input['promMateria']]);
            }
            
         }    
    }

    public function updateEvaluacionesAlumno(){
        /*$alumnos =DB::update('UPDATE evaluacion SET evaluacion.califMateria = ?, evaluacion.promMateria = ? WHERE evaluacion.idAlumno = ? AND (((evaluacion.idBimestre = ? AND evaluacion.idCurso = ?)AND evaluacion.idDocente = ? )AND evaluacion.idMateria = ?)', [$input['califMateria'], $input['promMateria'], $input['idAlumno'], $input['idBimestre'], $input['idCurso'], $input['idDocente'], $input['idMateria']]);*/
         $arregloEvalucion = Input::get('calif');

        
         foreach ($arregloEvalucion as $key => $calificaciones) {
            
            //print_r($horarios["idMateria"]);
        
            DB::table('evaluacion')
            ->where([
                ['idAlumno', '=',$calificaciones["idAlumno"]],
                ['idBimestre', '=', $calificaciones["idBimestre"]],
                ['idCurso', '=', $calificaciones["idCurso"]],
                ['idDocente', '=', $calificaciones["idDocente"]],
                ['idMateria', '=', $calificaciones["idMateria"]],
               // ['califMateria', '=', $calificaciones["califMateria"]],
                //['promMateria', '=', $calificaciones["promMateria"]],
                //['idCurso', '=', $horarios["idCurso"]],
            ])->update($calificaciones);
            
        }     
    }



    

    public function getEvaluacionesAlumno($idDocente, $idBimestre){
        $alumnos =DB::select('SELECT evaluacion.*, materia.nombre, CONCAT (alumno.apPaterno," ",alumno.apMaterno," ",alumno.nombres)as nombre_completo FROM evaluacion INNER JOIN materia on materia.idMateria = evaluacion.idMateria INNER JOIN alumno ON alumno.idAlumno = evaluacion.idAlumno INNER JOIN curso on evaluacion.idCurso = curso.idCurso WHERE evaluacion.idAlumno = ? AND alumno.estatus =1 AND evaluacion.idBimestre =? AND curso.estatus=1 ORDER BY "nombre_completo" ASC', [$idDocente, $idBimestre]);

        return $alumnos;
    }
    public function getEvaluacionesAlumnoD($idDocente, $idBimestre){
        $alumnos =DB::select('SELECT evaluacion.*, materia.nombre, CONCAT (alumno.apPaterno," ",alumno.apMaterno," ",alumno.nombres)as nombre_completo FROM evaluacion INNER JOIN materia on materia.idMateria = evaluacion.idMateria INNER JOIN alumno ON alumno.idAlumno = evaluacion.idAlumno INNER JOIN curso on evaluacion.idCurso = curso.idCurso WHERE evaluacion.idDocente = ? AND alumno.estatus =1 AND evaluacion.idBimestre =? AND curso.estatus=1 AND materia.nombre<> "EDUCACIÓN FÍSICA" ORDER BY "nombre_completo" ASC', [$idDocente, $idBimestre]);

        return $alumnos;
    }


    public function getEvaluacionDeAlumno($idBimestre, $idAlumno){
        $alumnos =DB::select('SELECT evaluacion.*, materia.nombre FROM evaluacion INNER JOIN materia on materia.idMateria = evaluacion.idMateria INNER JOIN alumno ON alumno.idAlumno = evaluacion.idAlumno WHERE alumno.estatus =1 AND evaluacion.idBimestre =? AND evaluacion.idAlumno =? ORDER BY materia.nombre ASC', [$idBimestre, $idAlumno]);

        return $alumnos;
    }

    public function getEvaluacionBimestrales($idAlumno){
        $alumnos =DB::select('SELECT evaluacion.*, materia.nombre FROM evaluacion INNER JOIN materia on materia.idMateria = evaluacion.idMateria INNER JOIN alumno ON alumno.idAlumno = evaluacion.idAlumno WHERE alumno.estatus =1 AND evaluacion.idAlumno =? ORDER BY materia.nombre, evaluacion.idBimestre ASC', [$idAlumno]);

        return $alumnos;
    }

    

    public function getNumMaterias($idDocente, $idAlumno){
        $alumnos =DB::select('SELECT COUNT(evaluacion.idMateria) as numMat FROM evaluacion WHERE evaluacion.idBimestre = 1 AND evaluacion.idDocente = ? AND evaluacion.idAlumno = ?', [$idDocente, $idAlumno]);

        return $alumnos;
    }

    

    function getFechasEval(){
            $fecha=DB::select('select * FROM fechas_evaluaciones');
            return $fecha;

        }

    public function updateFechaEvalBim($bimestre,$fechaInicio, $fechaFin){
        switch ($bimestre) {
            case '1':
                $fecha = DB::update('UPDATE fechas_evaluaciones SET fecha_inicio_b1 = ?, fecha_fin_b1=?', [$fechaInicio, $fechaFin]);
                break;

            case '2':
                $fecha = DB::update('UPDATE fechas_evaluaciones SET fecha_inicio_b2 = ?, fecha_fin_b2=?', [$fechaInicio, $fechaFin]);
                break;
            case '3':
                $fecha = DB::update('UPDATE fechas_evaluaciones SET fecha_inicio_b3 = ?, fecha_fin_b3=?', [$fechaInicio, $fechaFin]);
                break;
            case '4':
                $fecha = DB::update('UPDATE fechas_evaluaciones SET fecha_inicio_b4 = ?, fecha_fin_b4=?', [$fechaInicio, $fechaFin]);
                break;
            case '5':
                $fecha = DB::update('UPDATE fechas_evaluaciones SET fecha_inicio_b5 = ?, fecha_fin_b5=?', [$fechaInicio, $fechaFin]);
                break;
        }
        
        return $fecha;
    }


    function getAllEvaluaciones(){
            $fecha=DB::select('SELECT evaluacion.* from evaluacion INNER JOIN alumno ON alumno.idAlumno = evaluacion.idAlumno WHERE alumno.estatus = 1');
            return $fecha;

        }

        function getBoleta($idAlumno){
            $boleta=DB::select('SELECT t1.*, ((SELECT SUM(evaluacion.califMateria) FROM evaluacion WHERE t1.idAlumno = evaluacion.idAlumno AND t1.idCurso = evaluacion.idCurso AND t1.idDocente = evaluacion.idDocente AND t1.idMateria = evaluacion.idMateria)/5) AS promedio FROM (SELECT evaluacion.idAlumno, evaluacion.idCurso, evaluacion.idDocente, evaluacion.idMateria, materia.nombre FROM evaluacion INNER JOIN alumno ON alumno.idAlumno = evaluacion.idAlumno INNER JOIN materia ON evaluacion.idMateria= materia.idMateria  INNER JOIN curso ON evaluacion.idCurso = curso.idCurso WHERE alumno.estatus = 1 AND alumno.idAlumno = ? AND curso.estatus=1)t1 GROUP BY t1.idMateria ORDER BY t1.idMateria DESC',[$idAlumno]);
            return $boleta;

        }

        function getcaliFinalAlumno($idAlumno){
            $boleta=DB::select(' SELECT t2.idAlumno, t2.idCurso, t2.idDocente,t2.nombre_completo,t2.grado, 
(SUM((t2.promedio)/(SELECT COUNT(evaluacion.idMateria) FROM evaluacion INNER JOIN alumno ON evaluacion.idAlumno = alumno.idAlumno INNER JOIN curso on evaluacion.idCurso = curso.idCurso WHERE alumno.idAlumno = t2.idAlumno AND evaluacion.idBimestre=1 AND curso.estatus = 1)) ) AS promedioFinal 

FROM (SELECT t1.idAlumno, t1.idCurso, t1.idDocente,t1.nombre_completo,t1.grado,
(SELECT (SUM(evaluacion.califMateria)/5) FROM evaluacion INNER JOIN alumno ON evaluacion.idAlumno=alumno.idAlumno WHERE evaluacion.idAlumno = t1.idAlumno AND evaluacion.idMateria = t1.idMateria GROUP BY evaluacion.idAlumno) AS promedio 

FROM (SELECT evaluacion.idAlumno, evaluacion.idCurso, evaluacion.idDocente, evaluacion.idMateria,CONCAT(alumno.apPaterno, " ", alumno.apMaterno, " ", alumno.nombres)as nombre_completo, grupo.grado FROM evaluacion INNER JOIN alumno ON evaluacion.idAlumno=alumno.idAlumno 
INNER JOIN alumno_grupo ON alumno_grupo.idAlumno = alumno.idAlumno
INNER JOIN curso ON evaluacion.idCurso = curso.idCurso
INNER JOIN docente ON docente.idDocente = evaluacion.idDocente
INNER JOIN grupo ON grupo.idGrupo = alumno_grupo.idGrupo
WHERE curso.estatus =1 AND alumno.idAlumno=? GROUP BY evaluacion.idAlumno, evaluacion.idMateria)t1)t2 GROUP BY t2.idAlumno',[$idAlumno]);
            return $boleta;

        }

       

        function getAlumnosByDocente($idDocente){
            $alumnos=DB::select('SELECT evaluacion.idAlumno,CONCAT(alumno.apPaterno," ",alumno.apMaterno," ",alumno.nombres) AS nombre FROM alumno INNER JOIN evaluacion ON alumno.idAlumno = evaluacion.idAlumno INNER JOIN docente ON docente.idDocente = evaluacion.idDocente WHERE evaluacion.idDocente = ? GROUP BY nombre ORDER by nombre ASC',[$idDocente]);
            return $alumnos;

        }


        function getAlumnosNuevoDocente($grado, $grupo){
            $alumnos=DB::select('SELECT alumno.idAlumno, alumno.apPaterno, alumno.apMaterno, alumno.nombres FROM alumno
                INNER JOIN alumno_grupo ON alumno_grupo.idAlumno = alumno.idAlumno
                INNER JOIN grupo ON grupo.idGrupo = alumno_grupo.idGrupo
                INNER JOIN curso ON curso.idCurso = alumno_grupo.idCurso
                INNER JOIN evaluacion ON alumno_grupo.idAlumno = evaluacion.idAlumno
                WHERE grupo.grado = ? AND grupo.nombre=? AND curso.estatus = 1 AND alumno.estatus=1
                GROUP BY evaluacion.idAlumno ORDER BY alumno.apPaterno, alumno.apMaterno,alumno.nombres ASC',[$grado, $grupo]);
            return $alumnos;

        }

        public function asignarNuevoDocente($idDocente,$idAlumno){
        $docentes = DB::select('UPDATE evaluacion 
            INNER JOIN curso ON curso.idCurso = evaluacion.idCurso
            SET idDocente = ? where idAlumno = ? AND curso.estatus = 1',[$idDocente,$idAlumno]);
        

        return $docentes;
    }

    public function getEvaluacionesAlumnoDirector($idAlumno, $idBimestre){
        $alumnos =DB::select('SELECT evaluacion.*, materia.nombre, CONCAT (alumno.apPaterno," ",alumno.apMaterno," ",alumno.nombres)as nombre_completo FROM evaluacion INNER JOIN materia on materia.idMateria = evaluacion.idMateria INNER JOIN alumno ON alumno.idAlumno = evaluacion.idAlumno INNER JOIN curso on evaluacion.idCurso = curso.idCurso WHERE evaluacion.idAlumno =? AND alumno.estatus =1 AND evaluacion.idBimestre =? AND curso.estatus=1 ORDER BY "nombre_completo" ASC', [$idAlumno, $idBimestre]);

        return $alumnos;
    }

    public function getEvaluacionesEdFisica($idGrupo, $idBimestre){
        $alumnos =DB::select('SELECT evaluacion.*, materia.nombre, CONCAT (alumno.apPaterno," ",alumno.apMaterno," ",alumno.nombres)as nombre_completo FROM evaluacion INNER JOIN materia on materia.idMateria = evaluacion.idMateria INNER JOIN alumno ON alumno.idAlumno = evaluacion.idAlumno INNER JOIN curso on evaluacion.idCurso = curso.idCurso INNER JOIN alumno_grupo ON alumno_grupo.idAlumno = alumno.idAlumno WHERE alumno_grupo.idGrupo= ? AND alumno.estatus =1 AND evaluacion.idBimestre =? AND curso.estatus=1 AND materia.nombre="EDUCACIÓN FÍSICA" ORDER BY "nombre_completo" ASC', [$idGrupo, $idBimestre]);

        return $alumnos;
    }

    public function promedioFinalNivel($idAlumno){
        $alumnos =DB::select('SELECT (SUM(evaluacion.califMateria)/215) as final FROM evaluacion WHERE evaluacion.idAlumno =?', [$idAlumno]);

        return $alumnos;
    }

    

    

    

        
        


    

    

    




    

}
