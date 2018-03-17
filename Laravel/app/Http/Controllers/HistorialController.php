<?php 
 
namespace App\Http\Controllers;

use App\Historial;

use Illuminate\Http\Request;

use App\Http\Requests; 

use Illuminate\Support\Facades\Response; 

class HistorialController extends Controller
{
	protected $tabla = null;

    public function __construct(Historial $tabla){
    	$this->tabla = $tabla;
    }

	public function getHistorialUsuario(){
		$tabla = $this->tabla->getHistorialUsuario();
		if(!$tabla){
			return Response::json(['response' => 'no se encontraron datos en el historial'], 404);
		}
		return Response::json($tabla,200);
	}

	public function getDocenteBy($id){
		$tabla = $this->tabla->getDocenteBy($id);
		if(!$tabla){
			return Response::json(['response' => 'Docente no encontrado'], 404);
		}
		return Response::json($tabla, 200);
	}


	public function getAlumno($id){
		$tabla = $this->tabla->getAlumno($id);
		if(!$tabla){
			return Response::json(['response' => 'Alumno no encontrado'],404);
		}
		return Response::json($tabla,200);
	}

	public function insertHistorialUsuario($id_usuario, $tipo_usuario, $accion, $id_objetivo, $tipo_objetivo, $campos_cambiados, $valores_antiguos, $valores_nuevos){
		try {
			$this->tabla->insertHistorialUsuario($id_usuario, $tipo_usuario, $accion, $id_objetivo, $tipo_objetivo, $campos_cambiados, $valores_antiguos, $valores_nuevos);
			return Response::json(['response' => 'Resgistro Agregado a Historial_Usuario' ], 200);
		} catch (\Illuminate\Database\QueryException $ex) {
			//echo "entro al catch";
			return Response::json(['response'=>$ex],500);
			//return Response::json(['response'=>$ex->getCode()],500);
		}
	}

	public function getUltimosRegistrosIngresados($rol, $usuario, $accion, $horas){
		$tabla = $this->tabla->getUltimosRegistrosIngresados($rol, $usuario, $accion, $horas);
		if(!$tabla){
			return Response::json(['response' => 'no se encontraron registros'], 404);
		}
		return Response::json($tabla,200);
	}


	public function getIDSyTIPOconCURPS($curp_usuario, $rol_usuario, $curp_objetivo, $rol_objetivo){
		$tabla = $this->tabla->getIDSyTIPOconCURPS($curp_usuario, $rol_usuario, $curp_objetivo, $rol_objetivo);
		if(!$tabla){
			return Response::json(['response' => 'no se encontraron registros'], 404);
		}
		return Response::json($tabla,200);
	}


	


	
	
	
}
