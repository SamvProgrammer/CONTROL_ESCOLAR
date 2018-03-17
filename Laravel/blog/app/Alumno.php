<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Alumno extends Model
{
    protected $primaryKey='idAlumno';

    public $incrementing = true;

    public $timestamps = false;

    public $table = 'alumnos';

    protected $fillable = [
        'idAlumno','curp', 'nombres', 'apPaterno','apMaterno','grado','grupo',
        'fechaNacimiento','nombreTutor','direccion','numeroTelefono','tipoSangre','alergias'
    ];
    //campo que no va a regresar el get
     protected $hidden =[
        'idAlumno'
    ];
    public function allAlumnos(){
        $alumno=DB::select('select * from alumnos');
        return $alumno;
    }
     

}
