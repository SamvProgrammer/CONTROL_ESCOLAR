<?php

namespace App\Http\Controllers;
use App\Boleta;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
class BoletaController extends Controller
{
    //
    protected $boleta=null;

    public function __construct(Boleta $boleta){
    	$this->boleta = $boleta;
    }

     public function evaluarfolio($folio){
        $boleta = $this->boleta->evaluarfolio($folio);
        if(!$boleta){
            return Response::json(['response' => 'folio valido'],404);
        }
        return Response::json(['response' => 'folio invalido'],200);
    }

}
