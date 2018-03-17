(function(){
    'use strict';
    angular
        .module("primariaAngular")
        .factory('serviciogrupo', dataservice);
        function dataservice($http,$q){
            var service = {
                getGrupo: getGrupo,
                addGrupo: addGrupo,
                getGruposByGrado : getGruposByGrado,
                buscarGradoEnGrupo:buscarGradoEnGrupo,
                eliminar:eliminar,
                actualizarGrupo:actualizarGrupo,
                getGrupoByTagName:getGrupoByTagName,
                getGrupoDocente:getGrupoDocente,
                getGrupoGradoDocente:getGrupoGradoDocente,
                getGrupoNoAsignado:getGrupoNoAsignado,
                getMaxAlumnos:getMaxAlumnos,
                grupoExistente:grupoExistente,
                guardarPrimerGrado: guardarPrimerGrado,
                getGruposActivos: getGruposActivos,
                getGruposNoOcupados: getGruposNoOcupados,
                saveDocenteGrupo: saveDocenteGrupo,
                docenteActivo: docenteActivo,
                gruposNoPuedeEliminar: gruposNoPuedeEliminar,
                saveGrupoParaCicloNuevo: saveGrupoParaCicloNuevo,
                inhabilitarGrupoAnterior: inhabilitarGrupoAnterior,
                quitarleGrupoADocente: quitarleGrupoADocente,
                obtenerIdGrupo: obtenerIdGrupo,
                comprobarGrupo: comprobarGrupo,
                datosCabeceraHorarioAlumno: datosCabeceraHorarioAlumno,
                cambiarCurso: cambiarCurso,
                totalAlumnos: totalAlumnos,
                cabeceraEstadistica: cabeceraEstadistica,
                cabeceraBoletaEgresado: cabeceraBoletaEgresado,
                getNombreGrupo: getNombreGrupo,
                getGrados: getGrados,
                getGrupos: getGrupos,
                getGrados2: getGrados2,
                getGrupo2: getGrupo2,
                getGruposVacios: getGruposVacios,
                getGruposByID: getGruposByID
                
            };
            return service;



            function getGrupo() {

                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/grupo')
                    .success(exito)
                    .error(intenta_de_nuevo);

                    function exito(response){
                        defered.resolve(response);

                    }

                    function intenta_de_nuevo(err){
                         defered.reject(err)
                    }   
                    return promise;                   
            }
            function getGrupoByTagName(nombre){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/grupo/'+nombre)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);

                    }

                    function intenta_de_nuevo(err){
                         defered.reject(err)
                    }   
                    return promise;
            }
             function getGruposByGrado(grado) {

                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('  http://localhost/Control/Laravel/public/api/grupo/'+grado+'/grado')
                    .success(exito)
                    .error(intenta_de_nuevo);

                    function exito(response){
                        defered.resolve(response);

                    }

                    function intenta_de_nuevo(err){
                         defered.reject(err)
                    }   
                    return promise;                   
            }
          
            function addGrupo(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.post('http://localhost/Control/Laravel/public/api/grupo',obj)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }


            function buscarGradoEnGrupo(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.post('http://localhost/Control/Laravel/public/api/grupo/gradoGrupo/',obj)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }


            function eliminar(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.delete('http://localhost/Control/Laravel/public/api/grupo/eliminar/'+obj)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }

            function actualizarGrupo(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.put('http://localhost/Control/Laravel/public/api/grupo/update/'+obj.idGrupo, obj)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);

                    }

                    function intenta_de_nuevo(err){
                         defered.reject(err)
                    }   
                    return promise;
            }

            function getGrupoDocente(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/grupo/grupoDocente/'+obj)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);

                    }

                    function intenta_de_nuevo(err){
                         defered.reject(err)
                    }   
                    return promise;
            }

            function getGrupoGradoDocente(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/grupo/grupoGradoDocente/'+obj)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);

                    }

                    function intenta_de_nuevo(err){
                         defered.reject(err)
                    }   
                    return promise;
            }

            function getGrupoNoAsignado(grado){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/grupo/grado/'+grado)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);

                    }

                    function intenta_de_nuevo(err){
                         defered.reject(err)
                    }   
                    return promise;
            }

            function getMaxAlumnos(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/grupo/maxAlumnos/'+obj)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);

                    }

                    function intenta_de_nuevo(err){
                         defered.reject(err)
                    }   
                    return promise;
            }
            function grupoExistente(grado,nombre){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/grupo/grado/'+grado+'/nombre/'+nombre)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);

                    }

                    function intenta_de_nuevo(err){
                         defered.reject(err)
                    }   
                    return promise;
            }

            function guardarPrimerGrado(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.post('http://localhost/Control/Laravel/public/api/grupo/primero',obj)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }

            function getGruposActivos(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/grupo/gposActivos/gp')
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }

            function getGruposNoOcupados(idGrupo){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/grupo/Grupos/NoOcupados/'+idGrupo)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }

            function saveDocenteGrupo(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.post('http://localhost/Control/Laravel/public/api/grupo/save/grupoDocente',obj)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }

            function docenteActivo(idDocente){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/grupo/docente/activo/'+idDocente)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }

            function gruposNoPuedeEliminar(idGrupo){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/grupo/gruposNo/Eliminar/'+idGrupo)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }

            function saveGrupoParaCicloNuevo(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.post('http://localhost/Control/Laravel/public/api/grupo/guardar/cicloNuevo',obj)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }

            function inhabilitarGrupoAnterior(grupo){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.put('http://localhost/Control/Laravel/public/api/grupo/inhabiliar/grupoAnterior/'+grupo)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }

            function quitarleGrupoADocente(id){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.delete('http://localhost/Control/Laravel/public/api/grupo/quitar/grupoDocente/'+id)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }

            function obtenerIdGrupo(grado, nombre){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/grupo/obtener/'+grado+'/idGrupo/'+nombre)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }

            function comprobarGrupo(grado, nombre){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/grupo/comprobar/'+grado+'/nombre/'+nombre)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }

            function datosCabeceraHorarioAlumno(id){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/grupo/cabecerahorario/alumno/'+id)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }

            function cambiarCurso(nuevo,id){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.put('http://localhost/Control/Laravel/public/api/grupo/cambiar/'+nuevo+'/id/'+id)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }

            function totalAlumnos(id){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.put('http://localhost/Control/Laravel/public/api/grupo/total/alumnosGrupo/'+id)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }

            function cabeceraEstadistica(id){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/grupo/cabecera/estadisticaGrupo/'+id)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }

            function cabeceraBoletaEgresado(id){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/grupo/cabecera/boletaEgresado/'+id)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }

            function getNombreGrupo(idG){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/grupo/getGrupo/id/'+idG)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }

            function getGrados(){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/grupo/get/grados')
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }

            function getGrupos(){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/grupo/get/grupos')
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }

            function getGrados2(grado){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/grupo/get/grados/idG/'+grado)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }
            function getGrupo2(grupo){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/grupo/get/grupos/idN/'+grupo)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }

            function getGruposVacios(){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/grupo/get/grupos/vacios')
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }

            function getGruposByID(idG){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/grupo/get/grupos/byID/'+idG)
                    .success(exito)
                    .error(intenta_de_nuevo);
                    function exito(response){
                        defered.resolve(response);
                    }

                    function intenta_de_nuevo(err){
                        defered.reject(err)
                    }   
                    return promise;
            }

            

            

            

            
            
                   





        }
    })();