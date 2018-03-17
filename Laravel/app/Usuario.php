<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;

class Usuario extends Model
{
    protected $primaryKey='id';

    public $incrementing = true;

    public $timestamps = false;

    public $table = 'users';

    protected $fillable = [
        'id','id_user','curp','email', 'password', 'rol_id', 'nombre', 'apPaterno','apMaterno', 'estatus'];
    //campo que no quieres que muestre el get
     protected $hidden =[
        'password'
        
    ];
    public function allUsuarios(){
        //$alumno=DB::select('select * from alumnos');
        //return $alumno;
        return self::all();
    }

    public function saveUsuario(){
        $input = Input::all();
        //$input['numero_control'] = Hash::make($input['numero_control']);
        $usuarios = new Usuario();
        $usuarios->fill($input);
        $usuarios->save();

        return $usuarios;
    }

    public function getUsuario($nombres){
        $usuarios =DB::select('SELECT * from users where id='."'$nombres'");
        return $usuarios;
    }
    public function deleteUsuario($nombres){
        $usuarios = DB::delete('DELETE from users where id='."'$nombres'");
        return $usuarios;
    }
    public function updateUsuario($camp){
        $usuarios = self::find($camp);
        if(is_null($usuarios)){
            return false;
        }
        $input = Input::all();
        $usuarios->fill($input);
        $usuarios->save();
        return $usuarios;

    }

    public function listaAlumnos($idDocente){
        $usuarios =DB::select('SELECT alumnos.* from alumnos INNER JOIN users on alumnos.grado=users.grado AND alumnos.grupo = users.grupo where users.password='."'$idDocente'");

        return $usuarios;
    }


    public function buscarUsuario($email, $password){
        $usuarios =DB::select('SELECT * FROM users WHERE email= '."'$email'".' AND password ='."'$password'");

        return $usuarios;
    }
}
