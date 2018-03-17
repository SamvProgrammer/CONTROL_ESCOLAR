<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;

class GrupoDocente extends Model
{


	protected $primaryKey='idGrupo';

    public $incrementing = true;

    public $timestamps = false;

    public $table = 'grupodocente';

    protected $fillable = [
        'idGrupo','nombres', 'apPaterno','apMaterno','grado','grupo'
    ];
    //campo que no quieres que muestre el get
     protected $hidden =[
        
    ];


    public function allDocentes(){
        //$alumno=DB::select('select * from alumnos');
        //return $alumno;
        return self::all();
    }



    public function saveDocenteGrupo(){
        $input = Input::all();
        //$input['numero_control'] = Hash::make($input['numero_control']);
        $docente = new GrupoDocente();
        $docente->fill($input);
        $docente->save();

        return $docente;
    }
}
