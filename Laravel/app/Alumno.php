<?php

namespace App;

use App\Http\Requests\AlumnoRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;

class Alumno extends Model
{
    protected $primaryKey='idAlumno';
    public $incrementing = true;
    public $timestamps = false;
    public $table = 'alumno';

    protected $fillable = [
        'idAlumno','curp', 'nombres', 'apPaterno','apMaterno', 'colonia','calle','tipoSangre','alergias','nombreTutor','numTel', 'email','password', 'idRol', 'edad','sexo', 'estatus','fechaNacimiento', 'promovido', 'procedencia','motivodebaja'
    ];

    //campo que no quieres que muestre el get
     protected $hidden =[
        'password'
        
    ];
    
    public function saveAlumno(AlumnoRequest $request){
        $input = Input::all();
        $password = Hash::make($request->input('password'));
        $alumnos = new Alumno();
        $alumnos-> fill($request->all());
        $alumnos-> idRol=3;
        $alumnos-> estatus = 1;
        $alumnos-> promovido= 1;
        $alumnos->password=$password;
        $alumnos->save();

        return $alumnos;
    }

    public function getAlumno(){
        $alumnos =DB::select('SELECT alumno.*, CONCAT(grupo.grado," " ,grupo.nombre) as grupo FROM alumno INNER JOIN alumno_grupo ON alumno_grupo.idAlumno =alumno.idAlumno INNER JOIN grupo ON grupo.idGrupo = alumno_grupo.idGrupo INNER JOIN curso on curso.idCurso = alumno_grupo.idCurso WHERE alumno.estatus =1 AND curso.estatus = 1');
        return $alumnos;
      
    }

    public function getAlumnosBaja(){
        $alumnos =DB::select('SELECT alumno.*, CONCAT(grupo.grado," " ,grupo.nombre) as grupo FROM alumno INNER JOIN alumno_grupo ON alumno_grupo.idAlumno =alumno.idAlumno INNER JOIN grupo ON grupo.idGrupo = alumno_grupo.idGrupo WHERE alumno.estatus =0');
        return $alumnos;
      
    }

    public function getAlumnoById($id){
      $alumnos = self::find($id);
        if(is_null($alumnos)){
          return false;
        }
        return $alumnos;
        
    }

    public function deleteAlumno($id){
        $alumnos = DB::update('UPDATE alumno SET estatus = 0 where idAlumno='."'$id'");
        return $alumnos;
    }
     


    public function actualizarAlumno($camp){
        $alumnos = self::find($camp);
        if(is_null($alumnos)){
            return false;
        }
         $input = Input::all();
        if(isset($input['password'])){
            $input['password'] = Hash::make($input['password']);
        }       
        $alumnos->fill($input);
        $alumnos->save();
        return $alumnos;
    }

    public function evaluaremail($email){
        $alumnos=DB::select('SELECT email FROM `alumno` WHERE email ='."'$email'" );
        return $alumnos;
    }

        public function evaluarcurp($curp){
        $alumnos=DB::select('SELECT curp FROM `alumno` WHERE curp ='."'$curp'" );
        return $alumnos;
    }

    public function getAlumnosInhabilitados(){
        $alumnos=DB::select('SELECT * from alumno WHERE estatus = 0');
        return $alumnos;
    }

    public function getAlumnosEgresados(){
        $alumnos=DB::select('SELECT * from alumno WHERE estatus = 2');
        return $alumnos;
    }

    public function ponerAlumnosEgresados($idAlumno){
        $alumnos=DB::update('UPDATE alumno SET estatus = 2 where idAlumno =',[$idAlumno]);
        return $alumnos;
    }

    public function getGradoAlumno($idAlumno){
        $alumnos=DB::select('SELECT grupo.nombre, alumno.nombres, alumno.apPaterno, alumno.apMaterno FROM grupo INNER JOIN alumno_grupo ON grupo.idGrupo = alumno_grupo.idGrupo INNER JOIN alumno on alumno_grupo.idAlumno = alumno.idAlumno WHERE alumno.idAlumno =? AND alumno.estatus = 1',[$idAlumno]);
        return $alumnos;
    }

    public function cambiarGrupoAlumno($grupo,$idAlumno){
        $alumnos = DB::update('UPDATE alumno_grupo SET  = 0 where idAlumno='."'$nombres'");
        return $alumnos;
    }
    public function agregarmotivodebaja($motivo,$idAlumno){
        $alumnos=DB::update('UPDATE alumno SET motivodebaja=? where idAlumno=?',[$motivo,$idAlumno]);
        return $alumnos;
    }

    public function traeralumnosActivos(){
        $alumnos=DB::select('SELECT alumno.idAlumno,alumno.nombres,alumno.apPaterno,alumno.apMaterno from alumno INNER JOIN alumno_grupo on alumno.idAlumno=alumno_grupo.idAlumno where alumno.estatus=1');
        return $alumnos;
    }

    public function getEgresados(){
        $alumnos=DB::select('SELECT alumno.*, CONCAT(grupo.grado-1," ",grupo.nombre)as grupo FROM alumno INNER JOIN alumno_grupo ON alumno_grupo.idAlumno = alumno.idAlumno INNER JOIN grupo ON alumno_grupo.idGrupo = grupo.idGrupo WHERE grupo.grado =7');
        return $alumnos;
    }

    public function getAlumnosByGrupo($idGrupo){
        $alumnos=DB::select('SELECT alumno.* FROM alumno
            INNER JOIN alumno_grupo ON alumno_grupo.idAlumno= alumno.idAlumno
            INNER JOIN grupo ON grupo.idGrupo = alumno_grupo.idGrupo
            WHERE grupo.idGrupo=? and alumno.estatus=1',[$idGrupo]);
        return $alumnos;
    }

     public function saveAlumnoBoleta(){

         $inputArray = Input::all();
         foreach ($inputArray as $key => $input) {
            $existe = DB::select('SELECT * FROM boleta WHERE boleta.idAlumno =? AND boleta.idCurso =?',[$input['idAlumno'], $input['idCurso']]);
            if(!$existe){
                DB::table('boleta')->insert(['idAlumno' => $input['idAlumno'],'bimestre'=>$input['bimestre'],'faltas'=>$input['faltas'], 'escritura'=>$input['escritura'], 'lectura'=>$input['lectura'], 'matematica'=>$input['matematica'], 'idCurso'=>$input['idCurso']]);
            }
            
         }    
    }

            public function saveAlumnoBole(){
                $input = Input::all();
                $alumno = new Boleta();
                $alumno-> fill($input);
                $alumno->save();
                

                return $alumno;
            }   


            public function getBoleta($idAlumno){
                $alumnos=DB::select('SELECT * FROM boleta WHERE idAlumno=? ORDER BY boleta.bimestre ASC',[$idAlumno]);
            return $alumnos;
            }


            public function actualizarBoleta(){
          
         $arregloBoleta = Input::get('bol');

        
         foreach ($arregloBoleta as $key => $boletas) {
            
            
        
            DB::table('boleta')
            ->where([
                ['idBoleta', '=', $boletas["idBoleta"]],
                ['idAlumno', '=',$boletas["idAlumno"]],
                ['bimestre', '=', $boletas["bimestre"]],
                ['idCurso', '=', $boletas["idCurso"]]
               // ['califMateria', '=', $calificaciones["califMateria"]],
                //['promMateria', '=', $calificaciones["promMateria"]],
            ])->update($boletas);
            
        }     
    
            }


            public function getBajaGrupo($idGrupo){
                $alumnos=DB::select('SELECT COUNT(alumno.idAlumno)as baja, alumno.edad, alumno.sexo FROM alumno
                INNER JOIN alumno_grupo ON alumno.idAlumno = alumno_grupo.idAlumno
                INNER JOIN grupo ON grupo.idGrupo = alumno_grupo.idGrupo
                INNER JOIN curso ON alumno_grupo.idCurso= curso.idCurso
                WHERE alumno.estatus = 0 AND grupo.idGrupo = ? AND curso.estatus =1',[$idGrupo]);
            return $alumnos;
            }


            
            


        
     

    /*public function allAlumnos(){
        return self::all();
    }


    public function getAlumnoByGrado($grado){
        $alumnos =DB::select('SELECT * from alumno where grado='."'$grado'");

        return $alumnos;
    }


    public function getAlumnoByGrupo($grupo){
        $alumnos =DB::select('SELECT * from alumno where grupo='."'$grupo'");

        return $alumnos;
    }*/




}
