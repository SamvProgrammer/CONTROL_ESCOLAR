<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Input;

class uploadControler extends Controller
{
    //
    public function index(){
    	return view('C:\xampp\htdocs\Control\Angular\vista\admin\cargaimagenes.html');
    }

    public function uploading(){
    	$file=Input::file('archivo');
    	$aleatorio=str_random(6);
    	$nombre= $aleatorio.'-'.$file->getClientOriginalName();
    	$file->move('uploads', $nombre);
    }
}
