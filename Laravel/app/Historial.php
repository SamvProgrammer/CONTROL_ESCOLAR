<?php  
 
namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash; 
use Illuminate\Support\Facades\Input;

use Illuminate\Support\Facades\DB; 
   
class Historial extends Model 
{

	public function getHistorialUsuario(){
        $tabla = DB::select('SELECT historial_usuario.id_usuario, historial_usuario.tipo_usuario,
                    (CASE
                    	 WHEN historial_usuario.tipo_usuario = "DIRECTOR" THEN (SELECT CONCAT(docente.nombres, " ", docente.apPaterno, " ", docente.apMaterno) FROM docente WHERE docente.idDocente = historial_usuario.id_usuario AND docente.idRol = 1 LIMIT 1)
                        WHEN historial_usuario.tipo_usuario = "DOCENTE" THEN (SELECT CONCAT(docente.nombres, " ", docente.apPaterno, " ", docente.apMaterno) FROM docente WHERE docente.idDocente = historial_usuario.id_usuario AND docente.idRol = 2 LIMIT 1)
                        WHEN historial_usuario.tipo_usuario = "ALUMNO" THEN (SELECT CONCAT(alumno.nombres, " ", alumno.apPaterno, " ", alumno.apMaterno) FROM alumno WHERE alumno.idAlumno = historial_usuario.id_usuario AND alumno.idRol = 3 LIMIT 1)
                    ELSE "-----"
                    END) AS nombre_usuario, historial_usuario.accion, historial_usuario.id_objetivo ,historial_usuario.tipo_objetivo,
                    (CASE
                        
                        WHEN historial_usuario.tipo_objetivo = "DOCENTE" THEN (SELECT CONCAT(docente.nombres, " ", docente.apPaterno, " ", docente.apMaterno) FROM docente WHERE docente.idDocente = historial_usuario.id_objetivo AND docente.idRol = 2 LIMIT 1)
                        WHEN historial_usuario.tipo_objetivo = "ALUMNO" THEN (SELECT CONCAT(alumno.nombres, " ", alumno.apPaterno, " ", alumno.apMaterno) FROM alumno WHERE alumno.idAlumno = historial_usuario.id_objetivo AND alumno.idRol = 3 LIMIT 1)
                    ELSE "-----"
                    END) AS nombre_objetivo, historial_usuario.campos_cambiados, historial_usuario.valores_antiguos, historial_usuario.valores_nuevos, historial_usuario.fecha
                    FROM historial_usuario ORDER BY historial_usuario.fecha DESC', []);
        return $tabla;
    }

    public function getDocenteBy($id){
        $docente = DB::select('SELECT * from docente where docente.idDocente='."'$id'");
        return $docente;
    }

    public function getAlumno($id){
        $alumno = DB::select('SELECT alumno.*, CONCAT (grupo.grado, grupo.nombre) nombre_grupo FROM grupo INNER JOIN alumno_grupo ON alumno_grupo.idGrupo = grupo.idGrupo INNER JOIN curso ON grupo.idCurso=curso.idCurso INNER JOIN alumno ON alumno_grupo.idAlumno = alumno.idAlumno INNER JOIN users ON users.curp = alumno.curp WHERE alumno.idAlumno=? AND users.estatus=1', [$id]);
      return $alumno;
    }

    public function insertHistorialUsuario($id_usuario, $tipo_usuario, $accion, $id_objetivo, $tipo_objetivo, $campos_cambiados, $valores_antiguos, $valores_nuevos){ 
        DB::insert('INSERT INTO historial_usuario (id_usuario, tipo_usuario, accion, id_objetivo, tipo_objetivo, campos_cambiados, valores_antiguos, valores_nuevos) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [$id_usuario, $tipo_usuario, $accion, $id_objetivo, $tipo_objetivo, $campos_cambiados, $valores_antiguos, $valores_nuevos]);
    }
 
    public function getUltimosRegistrosIngresados($rol, $usuario, $accion, $horas){
        if ($rol == 4) {
            if($usuario == 'docente'){
                 $tabla=DB::select('SELECT historial_usuario.* FROM historial_usuario INNER JOIN docente ON docente.idDocente = historial_usuario.id_objetivo WHERE (historial_usuario.tipo_objetivo = "DOCENTE") AND historial_usuario.accion = ? AND historial_usuario.fecha >= (SELECT date_sub(NOW(), INTERVAL ? DAY_HOUR)) AND historial_usuario.fecha <= (SELECT NOW())',[$accion, $horas]);
                return $tabla;
            }
            if($usuario == 'alumno'){ 
                $tabla=DB::select('SELECT historial_usuario.* FROM historial_usuario INNER JOIN alumno ON alumno.idAlumno = historial_usuario.id_objetivo WHERE historial_usuario.tipo_objetivo = "ALUMNO" AND historial_usuario.accion = ? AND historial_usuario.fecha >= (SELECT date_sub(NOW(), INTERVAL ? DAY_HOUR)) AND historial_usuario.fecha <= (SELECT NOW())',[$accion, $horas]);
                return $tabla;
            }
        }else{
            if($usuario == 'alumno'){ 
                $tabla=DB::select('SELECT historial_usuario.* FROM historial_usuario INNER JOIN alumno ON alumno.idAlumno = historial_usuario.id_objetivo 

                    WHERE historial_usuario.tipo_objetivo = "ALUMNO" AND historial_usuario.accion = ? AND historial_usuario.fecha >= (SELECT date_sub(NOW(), INTERVAL ? DAY_HOUR)) AND historial_usuario.fecha <= (SELECT NOW())',[ $accion, $horas]);
                return $tabla;
            }
        }
    }
    /*
    SELECT 0 AS id_usuario, "ADMIN" AS tipo_usuario FROM users WHERE users.curp = ' ."'$curp_usuario'" .' AND users.rol_id = ' .$rol_usuario .'
        UNION ALL


        SELECT 0 AS id_objetivo, "ADMIN" AS tipo_objetivo FROM users WHERE users.curp = ' ."'$curp_objetivo'" .' AND users.id_rol = 0
        UNION ALL
    */


    public function getIDSyTIPOconCURPS($curp_usuario, $rol_usuario, $curp_objetivo, $rol_objetivo){
        $tabla=DB::select('SELECT t1.*, t2.* FROM 
        (SELECT docente.idDocente AS id_usuario, "DOCENTE" AS tipo_usuario FROM docente WHERE docente.rfc = ' ."'$curp_usuario'" .' AND docente.idRol = ' .$rol_usuario .'
        UNION ALL
        SELECT docente.idDocente AS id_usuario, "DIRECTOR" AS tipo_usuario FROM docente WHERE docente.rfc = ' ."'$curp_usuario'" .' AND docente.idRol = ' .$rol_usuario .'
        UNION ALL
        SELECT alumno.idAlumno AS id_usuario, "ALUMNO" AS tipo_usuario FROM alumno WHERE alumno.curp = ' ."'$curp_usuario'" .') AS t1, 



        (SELECT docente.idDocente AS id_objetivo, "DOCENTE" AS tipo_objetivo FROM docente WHERE docente.rfc = ' ."'$curp_objetivo'" .'  AND docente.idRol = ' .$rol_objetivo .'
        UNION ALL
        
        SELECT alumno.idAlumno AS id_objetivo, "ALUMNO" AS tipo_objetivo FROM alumno WHERE alumno.curp = ' ."'$curp_objetivo'" .') AS t2');
        return $tabla;
    }

   
 

   
}  
