<?php

namespace App;
use App\Http\Requests\CursoRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;

class Curso extends Model{
	protected $primaryKey='idCurso';
	public $incrementing=true;
	public $timestamps=false;
	public $table='curso';

	protected $fillable=[
		'idCurso','anioInicio','anioFin','estatus'
	];

	public function allCurso(){
		return self::all();
	}
	public function saveCurso(CursoRequest $request){
		$input=Input::all();
		$curso=new Curso();
		$curso->fill($request->all());
		$curso->estatus=2;
		$curso->save();
		return $curso;
	}
 
	public function getCursoActual(){
		$curso = DB::select('SELECT curso.* FROM curso WHERE curso.estatus = 1',[]);
        //$curso = DB::select('SELECT idCurso,DATE_FORMAT(anioInicio, "%d/%m/%Y") as anioInicio ,DATE_FORMAT(anioFin, "%d/%m/%Y") as anioFin FROM curso where estatus=1');
		if(is_null($curso)){
          return false;
        }
        return $curso;
	}

	public function getCurso($id){
		
        $curso = self::find($id);
        
       // $curso = DB::select('SELECT idCurso,DATE_FORMAT(anioInicio, "%d/%m/%Y") as anioInicio ,DATE_FORMAT(anioFin, "%d/%m/%Y") as anioFin FROM curso where curso.idCurso='."'$id'");
        if(is_null($curso)){
          return false;
        }

        return $curso;
    }
     public function deleteCurso($id){
        $curso = DB::update('UPDATE curso SET estatus =0 where idCurso='."'$id'");
        return $curso;
    }
     public function actualizarCurso($camp){
        $curso = self::find($camp);
        if(is_null($curso)){
            return false;
        }
        $input = Input::all();      
        $curso->fill($input);
        $curso->save();
        return $curso;
    }

    public function cursoEnEspera(){
        $curso = DB::select('SELECT curso.idCurso FROM curso WHERE curso.estatus=2');
        return $curso;
    }

    public function cambiarCursoACero($idCurso){
        $docentes = DB::select('UPDATE curso SET estatus = 0 where idCurso =?',[$idCurso]);
        

        return $docentes;
    }

    public function cambiarCursoAUno($idCurso){
        $docentes = DB::select('UPDATE curso SET estatus = 1 where idCurso =?',[$idCurso]);
        

        return $docentes;
    }

    public function allGrupoDocentes(){
        $docentes = DB::select('SELECT * FROM docente_grupo');
        

        return $docentes;
    }



    

}