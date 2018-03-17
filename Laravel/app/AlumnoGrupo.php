<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;
class AlumnoGrupo extends Model
{
    public $incrementing = false;

    public $timestamps = false;

    public $table = 'alumno_grupo';

    protected $fillable = [
        'idAlumno', 'idCurso', 'idGrupo'
    ];

    public function allAlumnoGrupo(){
        return self::all();
    }

    public function saveAlumnoGrupo(){
        $input = Input::all();

         $existe = DB::select('SELECT * FROM alumno_grupo WHERE alumno_grupo.idAlumno =? AND alumno_grupo.idCurso =? AND alumno_grupo.idGrupo=?',[$input['idAlumno'], $input['idCurso'], $input['idGrupo']]);

         if(!$existe){
        $alumnogrupo = new AlumnoGrupo();
        $alumnogrupo-> fill($input);
        $alumnogrupo->save();
        }

        return $alumnogrupo;
    }

    public function getAlumnoById($idAlumno){
        $alumno=DB::select('SELECT alumno.idAlumno,alumno.nombres,alumno.apPaterno,alumno.apMaterno from alumno INNER join alumno_grupo on alumno.idAlumno=alumno_grupo.'."'$idAlumno'");
        return $alumno;
    }


    public function contarRegistros($idGrupo){
        $alumno=DB::select('SELECT COUNT(*) as numero, alumno_grupo.idGrupo FROM alumno_grupo INNER join curso on curso.idCurso = alumno_grupo.idCurso WHERE curso.estatus =1 alumno_grupo.idGrupo ='."'$idGrupo'");
        return $alumno;
    }

    public function contarRegistrosF($idCurso){
        $alumno=DB::select('SELECT COUNT(*) as numero, alumno_grupo.idGrupo FROM alumno_grupo INNER join curso on curso.idCurso = alumno_grupo.idCurso WHERE curso.idCurso=?',[$idCurso]);
        return $alumno;
    }

    public function contarRegistrosInicial($idGrupo){
        $alumno=DB::select('SELECT COUNT(*) as numero, idGrupo FROM alumno_grupo INNER JOIN alumno ON alumno.idAlumno = alumno_grupo.idAlumno WHERE idGrupo =? AND alumno.estatus=1',[$idGrupo]);
        return $alumno;
    }

    //cuenta los alumnos hombres en el grupo
    public function alumnosHombres($idGrupo){
        $alumno=DB::select('SELECT COUNT(*) as total, alumno.idAlumno FROM alumno INNER JOIN alumno_grupo ON alumno.idAlumno = alumno_grupo.idAlumno INNER JOIN curso on curso.idCurso = alumno_grupo.idCurso WHERE alumno.sexo = "H" AND curso.estatus =1 AND alumno_grupo.idGrupo =?',[$idGrupo]);
        return $alumno;
    }

    public function alumnosHombresF($idCurso){
        $alumno=DB::select('SELECT COUNT(*) as total, alumno.idAlumno FROM alumno INNER JOIN alumno_grupo ON alumno.idAlumno = alumno_grupo.idAlumno INNER JOIN curso on curso.idCurso = alumno_grupo.idCurso  WHERE alumno.sexo = "H" AND curso.idCurso =? ',[$idCurso]);
        return $alumno;
    }

    //cuenta los alumnos mujeres en el grupo
    public function alumnasMujeres($idGrupo){
        $alumno=DB::select('SELECT COUNT(*) as total, alumno.idAlumno FROM alumno INNER JOIN alumno_grupo ON alumno.idAlumno = alumno_grupo.idAlumno INNER JOIN curso on curso.idCurso = alumno_grupo.idCurso WHERE alumno.sexo = "M" AND curso.estatus =1 AND alumno_grupo.idGrupo =?',[$idGrupo]);
        return $alumno;
    }

    public function alumnasMujeresF($idCurso){
        $alumno=DB::select('SELECT COUNT(*) as total, alumno.idAlumno FROM alumno INNER JOIN alumno_grupo ON alumno.idAlumno = alumno_grupo.idAlumno INNER JOIN curso on curso.idCurso = alumno_grupo.idCurso WHERE alumno.sexo = "M" AND curso.idCurso =?',[$idCurso]);
        return $alumno;
    }
    



    //función que cuenta los alumnos hombres (recibe edad e IdGrupo)
    public function obtenerEdadAlumnos($edad, $idGrupo, $sexo){
        $alumno=DB::select('SELECT COUNT(*) as total, alumno.idAlumno FROM alumno INNER JOIN alumno_grupo ON alumno.idAlumno = alumno_grupo.idAlumno INNER JOIN curso on alumno_grupo.idCurso = curso.idCurso WHERE alumno.edad =? AND alumno.sexo = ? AND alumno_grupo.idGrupo =? AND alumno.estatus = 1  AND curso.estatus =1',[$edad, $sexo, $idGrupo]);
        return $alumno;
    }

    //para inscripción total
    public function obtenerEdadAlumnosF($edad,$sexo,$idCurso){
        $alumno=DB::select('SELECT COUNT(*) as total, alumno.idAlumno FROM alumno INNER JOIN alumno_grupo ON alumno.idAlumno = alumno_grupo.idAlumno INNER JOIN curso ON alumno_grupo.idCurso = curso.idCurso  WHERE alumno.edad =? AND alumno.sexo = ? AND curso.idCurso =?',[$edad, $sexo, $idCurso]);
        return $alumno;
    }
    //para existencia
    public function obtenerEdadAlumnosF2($edad, $sexo, $idCurso){
        $alumno=DB::select('SELECT COUNT(*) as total, alumno.idAlumno FROM alumno INNER JOIN alumno_grupo ON alumno.idAlumno = alumno_grupo.idAlumno INNER JOIN curso ON alumno_grupo.idCurso = curso.idCurso   WHERE alumno.edad =? AND alumno.sexo = ? AND curso.idCurso =? AND alumno.estatus = 1',[$edad, $sexo, $idCurso]);
        return $alumno;
    }

    

    


    public function obtenerAlumnoDelGrupoParaEvaluar( $idGrupo){
        $alumno=DB::select('SELECT alumno.idAlumno, CONCAT(alumno.nombres, " ", alumno.apPaterno, " ", alumno.apMaterno)AS nombre_completo from alumno 
INNER JOIN alumno_grupo on alumno.idAlumno = alumno_grupo.idAlumno 
INNER JOIN horario_temporal ON alumno_grupo.idGrupo = horario_temporal.idGrupo
INNER JOIN grupo on alumno_grupo.idGrupo = grupo.idGrupo
INNER JOIN curso on curso.idCurso = alumno_grupo.idCurso
WHERE  alumno_grupo.idGrupo=? AND (CURSO.estatus=1 AND alumno.estatus = 1)GROUP BY alumno.idAlumno', [$idGrupo]);
        return $alumno;
    }

    public function a( $idGrupo){
        $alumno=DB::select('SELECT alumno.*  from alumno 
INNER JOIN alumno_grupo ON alumno_grupo.idAlumno = alumno.idAlumno
INNER JOIN docente_grupo ON docente_grupo.idGrupo = alumno_grupo.idGrupo
INNER JOIN curso on alumno_grupo.idCurso = curso.idCurso
WHERE alumno_grupo.idGrupo = ? AND alumno.estatus = 1 AND curso.estatus = 1
ORDER BY alumno.apPaterno, alumno.apMaterno, alumno.nombres', [$idGrupo]);
        return $alumno;
    }


public function getNumerosGrupos( $idGrupo){
        $numeros=DB::select('SELECT alumno.numTel, grupo.nombre FROM alumno
        INNER JOIN alumno_grupo ON alumno_grupo.idAlumno = alumno.idAlumno
        INNER JOIN grupo ON alumno_grupo.idGrupo = grupo.idGrupo
        WHERE grupo.idGrupo =?', [$idGrupo]);
        return $numeros;
    }

     
    public function getTotalAlumnos($idGrupo){
        $alumno=DB::select('SELECT count(idAlumno)as total FROM alumno_grupo WHERE alumno_grupo.idGrupo='."'$idGrupo'");
        return $alumno;
    }

    public function deleteAlumnosGrupos($idAlumno, $idCurso){
        $docentes= DB::delete('DELETE from alumno_grupo where idAlumno=? AND idCurso=?',[$idAlumno, $idCurso]);
        return $docentes;
    }


    public function promovidoOno($estado,$idAlumno){
        $docentes = DB::update('UPDATE alumno SET promovido = ? where idAlumno =?',[$estado,$idAlumno]);
        

        return $docentes;
    }

    public function getNumEmailAlumnos($idGrupo){
        $docentes = DB::select('SELECT alumno.numTel, alumno.email FROM alumno INNER JOIN alumno_grupo ON alumno_grupo.idAlumno = alumno.idAlumno INNER JOIN grupo ON grupo.idGrupo = alumno_grupo.idGrupo WHERE grupo.idGrupo = ?',[$idGrupo]);
        
        return $docentes;
    }

    public function cambiarDeGrupo($idGrupo,$idAlumno){
        $docentes = DB::update('UPDATE alumno_grupo SET idGrupo = ? where idAlumno =?',[$idGrupo,$idAlumno]);
        

        return $docentes;
    }

    public function cambiarDeGrupoEvaluacion($idGrupo,$idAlumno){
        $docentes = DB::update('UPDATE evaluacion SET idGrupo = ? where idAlumno =?',[$idGrupo,$idAlumno]);
        

        return $docentes;
    }

    public function datosAlumnoCurso($idCurso){
        $docentes = DB::select('SELECT alumno.* FROM alumno INNER JOIN alumno_grupo ON alumno_grupo.idAlumno = alumno.idAlumno WHERE alumno_grupo.idCurso =?',[$idCurso]);
        return $docentes;
    }

    

    




}
