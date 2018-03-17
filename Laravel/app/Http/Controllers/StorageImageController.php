<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use Illuminate\Support\Facades\Response;

use Storage;

class StorageImageController extends Controller
{
    
   
    public function save(Request $request){
 
       //obtenemos el campo file definido en el formulario
       $file = $request->file('file');
       
       //obtenemos el nombre del archivo
       $nombre = $file->getClientOriginalName();
       //print_r($nombre);
 
 
       Storage::disk('local')->put('logo.PNG',  \File::get($file));
 		
 		 return Response::json(['response' => 'Actualizado correctamente'],200);
	}

	public function getImageLogo(){
		  
      $public_path = public_path();

      $archivo = 'logo.PNG';
      $archivo2 = 'logo2.PNG';
		  
     	
     	//$url = $public_path.'\storage\'.$archivo;
     	$file = Storage::get($archivo);
      $file2 = Storage::get($archivo2);
      //print_r($file);
      
      $imdata = base64_encode($file);     	
     	$imdata2 = base64_encode($file2);

     	$arr = array('base64Izq' => 'data:image/png;base64,'.$imdata, 'base64Der' => 'data:image/png;base64,'.$imdata2, );
		
     	//verificamos si el archivo existe y lo retornamos
     	if (Storage::exists($archivo) && Storage::exists($archivo2)){
       		 return json_encode($arr);
     	}
		
	}

  public function save2(Request $request){
 
       //obtenemos el campo file definido en el formulario
       $file = $request->file('file2');
       
       //obtenemos el nombre del archivo
       $nombre = $file->getClientOriginalName();
       //print_r($nombre);
 
 
       Storage::disk('local')->put('logo2.PNG',  \File::get($file));
    
     return Response::json(['response' => 'Actualizado correctamente'],200);
  }

  public function getImageLogo2(){
    $archivo = 'logo2.PNG';
    $public_path = public_path();
      
      //$url = $public_path.'\storage\'.$archivo;
      $file = Storage::get($archivo);
      //print_r($file);
      
      $imdata = base64_encode($file);

      $arr = array('base64' => 'data:image/png;base64,'.$imdata);
    
      //verificamos si el archivo existe y lo retornamos
      if (Storage::exists($archivo)){
           return json_encode($arr);
      }
    
  }

}
