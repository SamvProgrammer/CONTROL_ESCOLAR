<?php

namespace App;
use App\Http\Requests\DocenteRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Hash;

class Docente extends Model
{
    protected $primaryKey='idDocente';

    public $incrementing = true;

    public $timestamps = false;

    public $table = 'docente';

    protected $fillable = [
        'idDocente','rfc', 'nombres', 'apPaterno','apMaterno','tipo','numTel','email','password','colonia','calle',
        'tipoSangre','alergias','idRol','estatus','edad','motivodebaja'
    ];
    //campo que no quieres que muestre el get
     protected $hidden =[
        'password'
    ];
    public function allDocentes(){
        $docentes=DB::select('SELECT docente.* FROM docente WHERE estatus= 1 and idRol=2');
        return $docentes;
    }

    public function saveDocente(DocenteRequest $request){
        $input = Input::all();
        $password = Hash::make($request->input('password'));
        $docentes = new Docente();
        $docentes->fill($request->all());
        $docentes-> estatus=1;
        $docentes -> tipo=2;
        //$docentes-> idRol =2;
        $docentes->password=$password;
        $docentes->save();


        return $docentes;
    }
    //solo te muestra docentes con grupo asignado
    public function getDocente(){
        $docentes =DB::select('SELECT docente.*, CONCAT(grupo.grado," " ,grupo.nombre) as grupo FROM docente INNER JOIN docente_grupo ON docente_grupo.idDocente =docente.idDocente INNER JOIN grupo ON grupo.idGrupo = docente_grupo.idGrupo WHERE docente.estatus =1 AND docente.idRol <> 1 AND docente.idRol <> 4 AND docente.idRol <> 5');
        return $docentes;
       /* $docentes = self::find($nombres);
        if(is_null($docentes)){
          return false;
        }
        return $docentes;*/
    }

    /*public function getDocenteGrado($nombres){
        $docentes =DB::select('SELECT * from docente where grado='."'$nombres'");
        return $docentes;
    }

    public function getDocenteGrupo($nombres){
        $docentes =DB::select('SELECT * from docente where grupo='."'$nombres'");
        return $docentes;
    }*/

    public function getDocenteNombre($id){
        $docentes = self::find($id);
        if(is_null($docentes)){
          return false;
        }
        return $docentes;
    }

    public function evaluaremail($email){
        $docentes=DB::select('SELECT email FROM `docente` WHERE email ='."'$email'" );
        return $docentes;
    }

        public function evaluarrfc($rfc){
        $docentes=DB::select('SELECT rfc FROM `docente` WHERE rfc ='."'$rfc'" );
        return $docentes;
    }


    public function deleteDocente($nombres){
        $docentes = DB::update('UPDATE docente SET estatus = 0 where idDocente='."'$nombres'");
        

        return $docentes;
    }


    public function updateDocente($camp){
        $docentes = self::find($camp);
        if(is_null($docentes)){
            return false;
        }

         $input = Input::all();

         if(isset($input['password'])){
            $input['password'] = Hash::make($input['password']);
        }
       
        $docentes->fill($input);
        $docentes->save();

        return $docentes;

    }

    
    //obtiene los alumnos que pertenecen al mismo grado y grupo que el docente
    /*
    public function obtenerAlumnosByDocente($idDocente){
        $docentes = DB::select('SELECT alumno.idAlumno,alumno.curp, alumno.nombres, alumno.apPaterno, alumno.apMaterno, alumno.nombreTutor, alumno.numTel, alumno.tipoSangre,alumno.alergias, alumno.colonia, alumno.calle, alumno.email FROM alumno INNER JOIN alumno_grupo ON alumno.idAlumno = alumno_grupo.idAlumno INNER JOIN horario_temporal ON alumno_grupo.idGrupo = horario_temporal.idGrupo INNER JOIN docente on horario_temporal.idDocente = docente.idDocente WHERE docente.idDocente='."'$idDocente'".'AND alumno.estatus =1 GROUP BY alumno.idAlumno');
        

        return $docentes;
    }
    */

     public function obtenerAlumnosByDocente($idDocente){
        $docentes = DB::select(' SELECT alumno.idAlumno, alumno.curp, alumno.nombres, alumno.apPaterno, alumno.apMaterno, alumno.colonia, alumno.calle, alumno.tipoSangre, alumno.alergias, alumno.nombreTutor, alumno.numTel,alumno.email, alumno.edad, alumno.sexo FROM alumno
        INNER JOIN alumno_grupo ON alumno_grupo.idAlumno = alumno.idAlumno
        INNER JOIN docente_grupo ON docente_grupo.idGrupo = alumno_grupo.idGrupo
        WHERE docente_grupo.idDocente='."'$idDocente'".'AND alumno.estatus =1');
        

        return $docentes;
    }
   

    public function getDirectores(){
        $docentes = DB::select('SELECT * FROM docente WHERE tipo = 0');
        

        return $docentes;
    }

    public function cambiarDirector($tipo){
        $docentes = DB::select('UPDATE docente SET tipo = 1 where idDocente =?',[$tipo]);
        $docentes = DB::select('UPDATE docente SET idRol = 1 where idDocente =?',[$tipo]);
        

        return $docentes;
    }

    public function cambiarDocente($tipo){
        $docentes = DB::select('UPDATE docente SET tipo = 2 where idDocente =?',[$tipo]);
        $docentes = DB::select('UPDATE docente SET idRol = 2 where idDocente =?',[$tipo]);
        

        return $docentes;
    }

    public function cambiarDocenteEnUsers($tipo,$idDocente){
        $docentes = DB::select('UPDATE users SET rol_id = ? where id_user =?',[$tipo, $idDocente]);
        

        return $docentes;
    }

//traer docentes para mostrar en el admin
    public function traerDocentes(){
        $docentes = DB::select('SELECT docente_grupo.idDocente, CONCAT(docente.apPaterno," ", docente.apMaterno, " ", docente.nombres) nombre_completo FROM docente_grupo INNER JOIN docente ON docente_grupo.idDocente = docente.idDocente WHERE docente.estatus = 1 AND docente.tipo <> 4 AND docente.tipo <> 5 ORDER BY nombre_completo ASC');
        

        return $docentes;
    }
//trae los docentes para el director
    public function traerDocentesActivos(){
        $docentes = DB::select('SELECT docente.idDocente, CONCAT(docente.apPaterno, " ",docente.apMaterno," ", docente.nombres) as nombre_completo from docente where not exists (select docente_grupo.idDocente from docente_grupo where docente_grupo.idDocente = docente.idDocente) AND docente.estatus = 1 AND docente.tipo <> 1 AND docente.tipo <>4 AND docente.tipo <>5 ORDER BY nombre_completo ASC');
        

        return $docentes;
    }

    public function getDirectorActual(){
        $docentes = DB::select('SELECT docente.idDocente, CONCAT(docente.apPaterno, " ", docente.apMaterno, " ", docente.nombres) as nombre_completo FROM docente WHERE docente.tipo = 1');
        

        return $docentes;
    }

    public function getBajaDocentes(){
        $docentes = DB::select('SELECT docente.* from docente where estatus=0');

        /*$docentes = DB::select('SELECT docente.*, CONCAT(grupo.grado," " ,grupo.nombre) as grupo FROM docente INNER JOIN docente_grupo ON docente_grupo.idDocente =docente.idDocente INNER JOIN grupo ON grupo.idGrupo = docente_grupo.idGrupo WHERE docente.estatus =0');*/
        

        return $docentes;
    }

    public function getGradoDocente($idDocente){
        $docentes = DB::select('SELECT grupo.grado, grupo.nombre FROM grupo INNER JOIN docente_grupo ON grupo.idGrupo = docente_grupo.idGrupo INNER JOIN docente ON docente.idDocente = docente_grupo.idDocente WHERE docente.idDocente =?',[$idDocente]);
        return $docentes;
    }

    public function cambiarGrupoDocente($idDocenteN, $idDocenteA){
        $docentes = DB::update('UPDATE docente_grupo SET idDocente = ? where idDocente =?',[$idDocenteN, $idDocenteA]);
        $docentes = DB::update('UPDATE evaluacion SET idDocente = ? where idDocente =?',[$idDocenteN, $idDocenteA]);
        $docentes = DB::update('UPDATE horario_temporal SET idDocente = ? where idDocente =?',[$idDocenteN, $idDocenteA]);
        return $docentes;
    }

    
    public function agregarmotivodebaja($motivo,$idDocente){
        $docentes=DB::update('UPDATE docente SET motivodebaja=? where idDocente=?',[$motivo,$idDocente]);
        return $docentes;
    }

    public function getDocenteByGrupo($idGrupo){
        $docentes=DB::select('SELECT docente_grupo.idDocente FROM docente_grupo WHERE docente_grupo.idGrupo = ?',[$idGrupo]);
        return $docentes;
    }

    public function getRegistrosDeAlumno($idAlumno){
        $docentes=DB::select('SELECT * FROM evaluacion WHERE idAlumno = ?',[$idAlumno]);
        return $docentes;
    }

    public function updateIdDocente($idDocente,$idAlumno){
        $docentes=DB::update('UPDATE evaluacion SET idDocente=? where idAlumno=?',[$idDocente,$idAlumno]);
        return $docentes;
    }

    

    

    


    

    


    
    
        
    


    
    
   

    

}
