<?php

namespace App\Http\Controllers;

use App\Alumno;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Response;


class AlumnoController extends Controller
{
    protected $alumno = null;

    public function __construct(Alumno $alumno){
    	$this->alumno = $alumno;
    }

    public function allAlumnos(){
    		return $this->alumno->allAlumnos();
    	//return User::orderBy('id', 'asc')->get();
		
	}
}
