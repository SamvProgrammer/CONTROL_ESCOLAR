<?php

namespace App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;

class Boleta extends Model{
	protected $primaryKey='idBoleta';
	public $incrementing=true;
	public $timestamps=false;
	public $table='boleta';
	protected $fillable=[
		'idAlumno','bimestre','faltas','escritura','lectura','matematica', 'idCurso','bim','asignatura','obs','recom','folio'
	];

	public function allBoleta(){
		return self::all();
	}

	public function evaluarfolio($folio){
        $boletas=DB::select('SELECT * FROM `boleta` where folio='."'$folio'" );
        return $boletas;
    }
	
}