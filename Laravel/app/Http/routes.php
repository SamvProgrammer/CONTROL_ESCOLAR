<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
use Illuminate\Http\Request;

Route::group(['prefix' => 'api'], function () {
     Route::post('autenticar','AuthenticateController@authenticate');
       Route::get('autenticar/info', 'AuthenticateController@getAuthenticatedUser');
    //------------------------

       

//-------------------------
       Route::get('/autentificacion',function(Request $request){
        $respuesta = $request -> code;
        echo "REDIRECCIONANDO A PÁGINA";
        $client = new GuzzleHttp\Client();
        $uriToken = "https://www.googleapis.com/oauth2/v4/token?";
        $code = "code=".$respuesta."&";
        $clienteId = "client_id=883242617561-hic5mdsfklaqru4dq0b80t937jdoe9e5.apps.googleusercontent.com&";
        $clienteSecreto = "client_secret=xgZBHB7EIuxcjOGC46DvUOet&";
        $redireccion = "redirect_uri=http://localhost/Control/Laravel/public/api/autentificacion&";
        $grant_type="grant_type=authorization_code";
        $uri = $uriToken.$code.$clienteId.$clienteSecreto.$redireccion.$grant_type;

        $res = $client->post($uri);
        
        $respuestaPeticion = (string) $res->getBody();
        $request->session()->put('token',$respuestaPeticion);
        return Redirect::to('/Control/Angular/#/home/genera_aviso');;
       });
       Route::get('/obtenerToken', function(Request $request){          
            return $request->session()->get('token');
       });

       Route::get('/listaBackups', function(Request $request){          
        $path    = 'C:\xampp\htdocs\Control\Laravel\public\storage\backups';
        $files = scandir($path);
        return $files;
   });

   Route::get('/restaurarBase', function(Request $request){          
    $ruta = $request -> ruta;
    $path    = 'C:\xampp\htdocs\Control\Laravel\public\storage\backups\\';
    $rutaCompleta = $path.$ruta;
    exec("2>&1 mysql -u root -p12345 escuela < ".$rutaCompleta."",$output);
    return "Base de datos restaurada";
});


    Route::group(['prefix' => 'alumnos'], function () {
        //Route::get('', ['uses' => 'AlumnoController@allAlumnos']);//get
        Route::post('', ['uses' => 'AlumnoController@saveAlumno']);//post
        Route::get('/alumnosActivos', ['uses' => 'AlumnoController@getAlumno']);
        Route::get('/verAlumnos/baja', ['uses' => 'AlumnoController@getAlumnosBaja']);
        Route::get('{id}', ['uses' => 'AlumnoController@getAlumnoById']);
        Route::delete('{id}', ['uses' => 'AlumnoController@deleteAlumno']);
        Route::get('/grado/{grado}', ['uses' => 'AlumnoController@getAlumnoByGrado']);
        Route::get('/grupo/{grupo}', ['uses' => 'AlumnoController@getAlumnoByGrupo']);
        Route::get('/email/{email}', ['uses' => 'AlumnoController@getevaluaremail']);
        Route::get('/curp/{curp}', ['uses' => 'AlumnoController@getevaluarcurp']);
        
        Route::put('/update/{camp}', ['uses' => 'AlumnoController@actualizarAlumno']);
        Route::get('/inhabilitados', ['uses' => 'AlumnoController@getAlumnosInhabilitados']);
        Route::get('/obtener/egresados', ['uses' => 'AlumnoController@getAlumnosEgresados']);
        Route::put('/poneregresados/{idA}', ['uses' => 'AlumnoController@ponerAlumnosEgresados']);
        Route::get('/gradoAlumno/{idA}', ['uses' => 'AlumnoController@getGradoAlumno']);
        
        Route::get('/estatus/habilitados', ['uses' => 'AlumnoController@traeralumnosActivos']);
        Route::get('/getAlumnos/Egresados', ['uses' => 'AlumnoController@getEgresados']);
        Route::get('/getAlumnos/byGrupo/{idGrupo}', ['uses' => 'AlumnoController@getAlumnosByGrupo']);
        Route::post('/saveBoleta/alumno', ['uses' => 'AlumnoController@saveAlumnoBoleta']);
        Route::post('/saveBole/alum', ['uses' => 'AlumnoController@saveAlumnoBole']);
        Route::get('/boleta/alumno/{idA}', ['uses' => 'AlumnoController@getBoleta']);
        Route::put('/actualiza/boleta', ['uses' => 'AlumnoController@actualizarBoleta']);
        Route::get('/getBajas/grupos/{idG}', ['uses' => 'AlumnoController@getBajaGrupo']);
        Route::put('/motivo/{motivo}/alumno/{idAlumno}', ['uses' => 'AlumnoController@agregarmotivodebaja']);
        
        
        
        
        
        

        
        
        
    });

    Route::group(['prefix' => 'docentes'], function () {
        Route::get('', ['uses' => 'DocenteController@allDocentes']);
        Route::post('', ['uses' => 'DocenteController@saveDocente']);
        Route::get('/docentesActivos', ['uses' => 'DocenteController@getDocente']);
        
        Route::get('/grado/{nombre}', ['uses' => 'DocenteController@getDocenteGrado']);
        Route::get('/grupo/{nombre}', ['uses' => 'DocenteController@getDocenteGrupo']);
        Route::get('/id/{id}', ['uses' => 'DocenteController@getDocenteNombre']);
        Route::get('/email/{email}', ['uses' => 'DocenteController@getevaluaremail']);
        Route::get('/rfc/{rfc}', ['uses' => 'DocenteController@getevaluarrfc']);
        Route::delete('{nombre}', ['uses' => 'DocenteController@deleteDocente']);
        Route::put('/update/{campo}', ['uses' => 'DocenteController@updateDocente']);
        Route::get('/lista/{camp}', ['uses' => 'DocenteController@obtenerAlumnosByDocente']);
        Route::get('/directores', ['uses' => 'DocenteController@getDirectores']);
        Route::put('/tipo/{tipo}', ['uses' => 'DocenteController@cambiarDirector']);
        Route::put('/tipoDocente/{tipo}', ['uses' => 'DocenteController@cambiarDocente']);
        Route::put('/tipoDocenteUser/{tipo}/id/{idDocente}', ['uses' => 'DocenteController@cambiarDocenteEnUsers']);
        Route::get('/traerDocentes/', ['uses' => 'DocenteController@traerDocentes']);
        Route::get('/directorActual/', ['uses' => 'DocenteController@getDirectorActual']);
        Route::get('/los/activos', ['uses' => 'DocenteController@traerDocentesActivos']);
        Route::get('/verDocentes/baja', ['uses' => 'DocenteController@getBajaDocentes']);
        Route::get('/grado/docente/{id}', ['uses' => 'DocenteController@getGradoDocente']);
        Route::put('/nuevo/{n}/anterior/{A}', ['uses' => 'DocenteController@cambiarGrupoDocente']);
        Route::put('/motivo/{motivo}/docente/{idDocente}', ['uses' => 'DocenteController@agregarmotivodebaja']);
        Route::get('/idDocente/grupo/{idGrupo}', ['uses' => 'DocenteController@getDocenteByGrupo']);
        Route::get('/getRegistros/alumno/{idAlumno}', ['uses' => 'DocenteController@getRegistrosDeAlumno']);
        Route::put('/update/docente/{idDocente}/alumno/{idAlumno}', ['uses' => 'DocenteController@updateIdDocente']);
       
        

        
        
        
        
        
        
        
        
        
    });
    Route::group(['prefix' => 'materias'], function () {
        Route::get('', ['uses' => 'MateriaController@allMaterias']);
        Route::post('', ['uses' => 'MateriaController@saveMateria']);
        Route::get('/grado/{grado}', ['uses' => 'MateriaController@getMateriaByGrado']);
        Route::get('/{id}', ['uses' => 'MateriaController@getMateriaByTagName']);
        Route::delete('/{id}', ['uses' => 'MateriaController@deleteMateria']);
        Route::put('/update/{campo}', ['uses' => 'MateriaController@updateMateria']);
         Route::get('/listar/{campo}', ['uses' => 'MateriaController@getMateriasByDocente']);
        Route::get('/materiasByGrado/{grupo}/docente/{id}', ['uses' => 'MateriaController@getMateriasByGrado']);
        Route::get('/nombre/{campo1}/grado/{campo2}',['uses' => 'MateriaController@materiaExistente']);
        Route::get('/alumno/{idAlumno}',['uses' => 'MateriaController@getMateriasByAlumno']);
        Route::get('/alumno/{idAlumno}/bimestre/{idBimestre}',['uses' => 'MateriaController@califBim1Grado1']);
        Route::get('/primerGrado',['uses' => 'MateriaController@verCalifG1']);
        Route::get('/promedios/finales/{grado}',['uses' => 'MateriaController@promediosFinales']);
        Route::get('/promedio/curso/{docente}',['uses' => 'MateriaController@promedioCurso']);
        Route::get('/traer/materiasgrado/{grado}',['uses' => 'MateriaController@materiasDeGrado']);
        
        
        
        
        
        

        

    });
    Route::group(['prefix' => 'grupodocente'], function () {
        Route::get('', ['uses' => 'GrupoDocenteController@allDocentes']);
        Route::post('/grupodocente', ['uses' => 'GrupoDocenteController@saveDocenteGrupo']);
        
    });

    Route::group(['prefix' => 'grupo'], function () {
        Route::get('', ['uses' => 'GrupoController@allGrupo']);
        Route::post('', ['uses' => 'GrupoController@saveGrupo']);
        Route::get('/{id}', ['uses' => 'GrupoController@getGrupo']);
        Route::get('{grado}/grado', ['uses' => 'GrupoController@getGrupoByGrado']);
        Route::get('/gradoGrupo/{nombre}', ['uses' => 'GrupoController@getGrado']);
        Route::delete('/eliminar/{id}', ['uses' => 'GrupoController@deleteGrupo']);
        Route::get('/grupoDocente/{campo}', ['uses' => 'GrupoController@getGrupoDocente']);
        Route::get('/grupoGradoDocente/{campo}', ['uses' => 'GrupoController@getGrupoGradoDocente']);
        Route::get('/grado/{campo}', ['uses' => 'GrupoController@getGruposNoAsignadosAun']); 
        Route::put('/update/{campo}', ['uses' => 'GrupoController@actualizarGrupo']);
        Route::get('/maxAlumnos/{campo}', ['uses' => 'GrupoController@getMaxAlumnos']);
        Route::get('/grado/{campo1}/nombre/{campo2}',['uses' => 'GrupoController@grupoExistente']);
        Route::post('/primero',['uses' => 'GrupoController@guardarPrimerGrado']);
        Route::get('/gposActivos/gp',['uses' => 'GrupoController@getGruposActivos']);
        Route::get('/Grupos/NoOcupados/{idGrupo}',['uses' => 'GrupoController@getGruposNoOcupados']);
        Route::post('/save/grupoDocente',['uses' => 'GrupoController@saveDocenteGrupo']);
        Route::get('/docente/activo/{idDocente}',['uses' => 'GrupoController@docenteActivo']);
        Route::get('/gruposNo/Eliminar/{idGrupo}',['uses' => 'GrupoController@gruposNoPuedeEliminar']);
        Route::get('/guardar/cicloNuevo',['uses' => 'GrupoController@saveGrupoParaCicloNuevo']);
        Route::put('/inhabiliar/grupoAnterior/{idGrupo}',['uses' => 'GrupoController@inhabilitarGrupoAnterior']);
        Route::delete('/quitar/grupoDocente/{idDocente}',['uses' => 'GrupoController@quitarleGrupoADocente']);
        Route::get('/obtener/{grado}/idGrupo/{nombre}',['uses' => 'GrupoController@obtenerIdGrupo']);
        Route::get('/comprobar/{grado}/nombre/{nombre}',['uses' => 'GrupoController@comprobarGrupo']);
        Route::get('/cabecerahorario/alumno/{id}',['uses' => 'GrupoController@datosCabeceraHorarioAlumno']);
        Route::put('/cambiar/{nuevo}/id/{id}',['uses' => 'GrupoController@cambiarCurso']);
        Route::put('/total/alumnosGrupo/{id}',['uses' => 'GrupoController@totalAlumnos']);
        Route::get('/cabecera/estadisticaGrupo/{id}',['uses' => 'GrupoController@cabeceraEstadistica']);
        Route::get('/cabecera/boletaEgresado/{idAlumno}',['uses' => 'GrupoController@cabeceraBoletaEgresado']);
        Route::get('/getGrupo/id/{idG}',['uses' => 'GrupoController@getNombreGrupo']);
        Route::get('/get/grados',['uses' => 'GrupoController@getGrados']);
        Route::get('/get/grupos',['uses' => 'GrupoController@getGrupos']);
        Route::get('/get/grados/idG/{grado}',['uses' => 'GrupoController@getGrados2']);
        Route::get('/get/grupos/idN/{nombre}',['uses' => 'GrupoController@getGrupo2']);
        Route::get('/get/grupos/vacios',['uses' => 'GrupoController@getGruposVacios']);
        Route::get('/get/grupos/byID/{idG}',['uses' => 'GrupoController@getGruposByID']);
        

        
        
        
        
        
        
        
        
        
        
        
        
          
    });

    
    Route::group(['prefix' => 'curso'], function () {
        Route::get('', ['uses' => 'CursoController@allCurso']);
        Route::get('/cursoActual', ['uses' => 'CursoController@getCursoActual']);
        //http://localhost/Control/Laravel/public/api/curso/cursoActual
        Route::post('', ['uses' => 'CursoController@saveCurso']);
        Route::get('/{nombres}', ['uses' => 'CursoController@getCurso']);
        Route::delete('{id}', ['uses' => 'CursoController@deleteCurso']);
        Route::put('/update/{campo}', ['uses' => 'CursoController@actualizarCurso']);
        Route::get('/curso/espera', ['uses' => 'CursoController@cursoEnEspera']);
        Route::put('/cambiara/uno/{idCurso}', ['uses' => 'CursoController@cambiarCursoAUno']);
        Route::put('/cambiara/cero/{idCurso}', ['uses' => 'CursoController@cambiarCursoACero']);
        Route::get('/all/docenteGrupo', ['uses' => 'CursoController@allGrupoDocentes']);
        
        
        

        
    });

     Route::group(['prefix' => 'horarioTemp'], function () {
        Route::get('/docente/{idDocente}/grupo/{idGrupo}/dia/{dia}', ['uses' => 'HorarioTemporalController@getHorarioByIdDocenteGrupo']);
         Route::get('/docente/{idDocente}/grupo/{idGrupo}/all', ['uses' => 'HorarioTemporalController@getAllHorarioDocente']);
          Route::get('/personalizado', ['uses' => 'HorarioTemporalController@getHorarioPersonalizado']);
        Route::post('', ['uses' => 'HorarioTemporalController@saveHorarioTemporal']);
        Route::put('', ['uses' => 'HorarioTemporalController@updateHorarioTemporal']);
        Route::get('/docente/{idDocente}',['uses'=> 'HorarioTemporalController@getgruposasociadosadocentes']);
        Route::get('/noasignados', ['uses' => 'HorarioTemporalController@DocentesNoAsignados']);
        Route::get('/diasMateria/{docente}', ['uses' => 'HorarioTemporalController@materiasPorDia']);
        Route::get('/horarioGrupo/{grupo}', ['uses' => 'HorarioTemporalController@getHorarioPorGrupo']);
        Route::get('/alumno/{idAlumno}', ['uses' => 'HorarioTemporalController@getGrupoAlumno']);
        Route::get('/horasMaterias/materia/{idMateria}/docente/{idDocente}', ['uses' => 'HorarioTemporalController@gethorasmaterias']);
         Route::get('/docente/{idDocente}/horasAsignadas', ['uses' => 'HorarioTemporalController@verificaHorarioCompleto']);
         Route::get('/grupo/{idGrupo}', ['uses' => 'HorarioTemporalController@evaluarAlumnos']);
         Route::get('/grupoDocente/{idDocente}', ['uses' => 'HorarioTemporalController@getGrupoDocente']);
         Route::get('/all/horarios', ['uses' => 'HorarioTemporalController@allHorario']);
         Route::delete('/delete/allHorario/{id}', ['uses' => 'HorarioTemporalController@deleteHorarios']);
         Route::get('/obtenerIdDocente/byGrupo/{idGrupo}', ['uses' => 'HorarioTemporalController@obtenerIdDocenteByIdGrupo']);
         Route::get('/horario/edf', ['uses' => 'HorarioTemporalController@getHorarioEDF']);
         
         

     
    });



     Route::group(['prefix' => 'alumnogrupo'], function () {
        Route::get('', ['uses' => 'AlumnoGrupoController@allAluGrup']);
        Route::post('', ['uses' => 'AlumnoGrupoController@saveAluGrup']);
        Route::get('{nombres}', ['uses' => 'AluGrupController@getAluGrup']);
        Route::delete('{nombre}', ['uses' => 'AluGrupController@deleteAluGrup']);
        Route::put('/update/{campo}', ['uses' => 'AluGrupController@upAluGrup']);
        Route::get('/alumno',['uses'=>'AlumnoGrupoController@getAlumnoById']);
        Route::get('/contar/{idGrupo}',['uses'=>'AlumnoGrupoController@contarRegistros']);
        Route::get('/contarHombres/{idGrupo}',['uses'=>'AlumnoGrupoController@alumnosHombres']);
        Route::get('/contarHombres/curso/{idCurso}',['uses'=>'AlumnoGrupoController@alumnosHombresF']);
        Route::get('/contarMujeres/curso/{idCurso}',['uses'=>'AlumnoGrupoController@alumnasMujeresF']);
        
        
        Route::get('/contarMujeres/{idGrupo}',['uses'=>'AlumnoGrupoController@alumnasMujeres']);
        Route::get('/contarAlumnosCon/grupo/{idGrupo}/sexo/{sexo}',['uses'=>'AlumnoGrupoController@obtenerEdadAlumnos']);
        Route::get('/obtenerAlumno/{idGrupo}',['uses'=>'AlumnoGrupoController@obtenerAlumnoDelGrupoParaEvaluar']);
        Route::get('/alumnosGrupo/{idGrupo}',['uses'=>'AlumnoGrupoController@a']);
        Route::get('/numeros/{idGrupo}',['uses'=>'AlumnoGrupoController@getNumerosGrupos']);
         Route::get('/totales/{idGrupo}',['uses'=>'AlumnoGrupoController@getTotalAlumnos']);
         Route::delete('/eliminar/{idAlu}',['uses'=>'AlumnoGrupoController@deleteAlumnosGrupos']);
         Route::put('/promovido/{estado}/alumno/{alumno}',['uses'=>'AlumnoGrupoController@promovidoOno']);
         Route::get('/numeros/emailAlumnos/{idGrupo}',['uses'=>'AlumnoGrupoController@getNumEmailAlumnos']);
         Route::get('/registrosInicial/alumnos/{idGrupo}',['uses'=>'AlumnoGrupoController@contarRegistrosInicial']);
         Route::put('/cambiarGrupo/{idGrupo}/alumno/{idAlumno}',['uses'=>'AlumnoGrupoController@cambiarDeGrupo']);
         Route::put('/cambiarGrupo/evaluacion/{idGrupo}/alumno/{idAlumno}',['uses'=>'AlumnoGrupoController@cambiarDeGrupoEvaluacion']);
         Route::get('/contar/registros/curso/{idCurso}',['uses'=>'AlumnoGrupoController@contarRegistrosF']);
         Route::get('/contarAlumnos/sexo/{sexo}/cursoTotal/{idCurso}',['uses'=>'AlumnoGrupoController@obtenerEdadAlumnosF']);

        Route::get('/contarAlumnos/sexo/{sexo}/cursoExistencia/{idCurso}',['uses'=>'AlumnoGrupoController@obtenerEdadAlumnosF2']);
                 Route::get('/datos/alumnos/curso/{idCurso}',['uses'=>'AlumnoGrupoController@datosAlumnoCurso']);
         
         
         
         
         
         
         
        
    
    });



    Route::group(['prefix' => 'usuarios'], function () {
        Route::get('', ['uses' => 'UsuariooController@allUsuarios']);
        Route::get('{nombre}', ['uses' => 'UsuarioController@getUsuario']);
        Route::get('/lista/{camp}', ['uses' => 'UsuarioController@listaAlumnos']);
        Route::get('/getUser/email/{nombres}/password/{password}', ['uses' => 'UsuarioController@buscarUsuario']);
       
    });


    Route::group(['prefix' => 'evaluacion'], function () {
        Route::post('/altaCalificacion', ['uses' => 'EvaluacionController@saveAlumnoEvaluar']);
        Route::get('/evaluaciones/{idDocente}/bimestre/{idBimestre}', ['uses' => 'EvaluacionController@getEvaluacionesAlumno']);
        Route::get('/evaluaciones/{idDocente}', ['uses' => 'EvaluacionController@getEvaluacionesAlumno']);
        Route::put('/evaluaciones', ['uses' => 'EvaluacionController@updateEvaluacionesAlumno']);
         Route::get('/fechas', ['uses' => 'EvaluacionController@getFechasEval']);
        Route::put('/cambiarFecha/bimestre/{id}/fechaInicio/{fi}/fechaFin/{ff}', ['uses' => 'EvaluacionController@updateFechaEvalBim']);
        Route::get('/todoEvaluaciones', ['uses' => 'EvaluacionController@getAllEvaluaciones']);
        Route::get('/numateria/docente/{doc}/alumno/{alu}', ['uses' => 'EvaluacionController@getNumMaterias']);
        Route::get('/califDeAlumno/bimestre/{bim}/alumno/{alu}', ['uses' => 'EvaluacionController@getEvaluacionDeAlumno']);
        Route::get('/boleta/{idalumno}', ['uses' => 'EvaluacionController@getBoleta']);
        Route::get('/alumnosDocente/{iddocente}', ['uses' => 'EvaluacionController@getAlumnosByDocente']);
        Route::get('/alumnos/nuevoDocente/{grado}/grupo/{grupo}', ['uses' => 'EvaluacionController@getAlumnosNuevoDocente']);
        Route::put('/cambiar/docente/{idD}/alumno/{idA}', ['uses' => 'EvaluacionController@asignarNuevoDocente']);
        Route::get('/evaluacionBim/alumno/{id}', ['uses' => 'EvaluacionController@getEvaluacionBimestrales']);
        Route::get('/finales/alumno/{id}', ['uses' => 'EvaluacionController@getcaliFinalAlumno']);
        Route::get('/evaluaciones/alumno/{id}/bimestre/{idBim}', ['uses' => 'EvaluacionController@getEvaluacionesAlumnoDirector']);
        Route::get('/evaluacionesD/{idA}/bimestre/{idBimestre}', ['uses' => 'EvaluacionController@getEvaluacionesAlumnoD']);
        Route::get('/evaluacionesED/{idAlumno}/bimestre/{idBimestre}', ['uses' => 'EvaluacionController@getEvaluacionesEdFisica']);
        Route::get('/promedioFinal/deNivel/{idAlumno}', ['uses' => 'EvaluacionController@promedioFinalNivel']); 
        
        

        
        
        
        

      
    });


    Route::group(['prefix' => 'historial'], function () {
        Route::get('HistorialUsuario', ['uses' => 'HistorialController@getHistorialUsuario']);
        Route::get('id/{id}', ['uses' => 'HistorialController@getDocenteBy']);
        Route::get('{id}', ['uses' => 'HistorialController@getAlumno']);
        Route::post('addHistorialUsuario/id_usuario/{id_usuario}/tipo_usuario/{tipo_usuario}/accion/{accion}/id_objetivo/{id_objetivo}/tipo_objetivo/{tipo_objetivo}/campos_cambiados/{campos_cambiados}/valores_antiguos/{valores_antiguos}/valores_nuevos/{valores_nuevos}', ['uses' => 'HistorialController@insertHistorialUsuario']);
        Route::get('ultimosRegistrosAgregados/{rol}/{usuario}/{accion}/{horas}', ['uses' => 'HistorialController@getUltimosRegistrosIngresados']);
        Route::get('IDSyTIPOconCURPS/usuario/{curp_usuario}/rol_usuario/{rol_usuario}/objetivo/{curp_objetivo}/rol_objetivo/{rol_objetivo}', ['uses' => 'HistorialController@getIDSyTIPOconCURPS']);
 
    });
    Route::group(['prefix' => 'correo'], function () { 
        Route::get('checkEmail/{correo}/{user}', ['uses' => 'CorreoController@checkEmail']);
        Route::get('/comprobarEstadoEmailUsuario/{identificador}/{pass}', 'CorreoController@comprobarEstadoEmailUsuario');
        Route::get('email/{email}/{user}', ['uses' => 'CorreoController@getTokenToChangePassword']);
        Route::get('token/{token}', ['uses' => 'CorreoController@comprobarTokenPassword']); 
        Route::get('{user}/usuario/{correo}/newpassword/{newpassword}', ['uses' => 'CorreoController@changePassword']);
        Route::get('nombre/{name}/usuario/{correo}/tipo/{tipo}/mensaje/{mensaje}', ['uses' => 'CorreoController@sendEmail']);
    }); 


   

        



   Route::group(['prefix' => 'email'],function(){

        Route::get('{email}/basic', ['uses' => 'MailController@basic_email']);

    });

    Route::group(['prefix' => 'image'],function(){

        Route::post('/upload', ['uses' => 'StorageImageController@save']);
        Route::get('/mostrarLogo', ['uses' => 'StorageImageController@getImageLogo']);
        Route::post('/upload2', ['uses' => 'StorageImageController@save2']);
        Route::get('/mostrarLogo2', ['uses' => 'StorageImageController@getImageLogo2']); 
 

    });

     Route::group(['prefix' => 'boleta'],function(){
        Route::get('/folio/{folio}', ['uses' => 'BoletaController@evaluarfolio']);

    });



    //------------------------
    //
    ////------------------------
   

});

Route::get('/', function () {
    return view('welcome');
});