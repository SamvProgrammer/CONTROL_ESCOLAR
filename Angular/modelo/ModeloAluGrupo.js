(function(){
    'use strict';
    angular
        .module("primariaAngular")
        .factory('servicioalugrupo', dataservice);
        function dataservice($http,$q){
            var service = {
                agregarAluGrup : agregarAluGrup,
                getAluGrup : getAluGrup,
                updateAluGrup : updateAluGrup,
                eliminarAluGrup : eliminarAluGrup,
                contarRegistros: contarRegistros,
                contarHombres: contarHombres,
                contarMujeres: contarMujeres,
                obtenerEdadAlumnos: obtenerEdadAlumnos,
                obtenerAlumnoEvaluar: obtenerAlumnoEvaluar,
                obtenerAlumnosDelGrupo :obtenerAlumnosDelGrupo,
                getTotalAlumnos:getTotalAlumnos,
                getLogo : getLogo,
                getLogo2 : getLogo2,
                deleteAlumnosGrupos: deleteAlumnosGrupos,
                promovidoOno: promovidoOno,
                getNumEmailAlumnos: getNumEmailAlumnos,
                contarRegistrosInicial: contarRegistrosInicial,
                cambiarDeGrupo: cambiarDeGrupo,
                cambiarDeGrupoEvaluacion: cambiarDeGrupoEvaluacion,
                contarRegistrosF: contarRegistrosF,
                alumnosHombresF: alumnosHombresF,
                alumnasMujeresF: alumnasMujeresF,
                obtenerEdadAlumnosF :obtenerEdadAlumnosF,
                obtenerEdadAlumnosF2:obtenerEdadAlumnosF2,
                datosAlumnoCurso: datosAlumnoCurso
            };

            return service;
        
        function getAluGrup() {

                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnogrupo')
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
            

            function updateAluGrup(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.put('http://localhost/Control/Laravel/public/api/alumnogrupo/update/'+obj.idAlumno, obj)
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
            function agregarAluGrup(obj){
                
                var defered = $q.defer();
                var promise = defered.promise;
                $http.post('http://localhost/Control/Laravel/public/api/alumnogrupo',obj)
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

            function eliminarAluGrup(nombre){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.delete('http://localhost/Control/Laravel/public/api/alumnogrupo/'+nombre)
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

            function contarRegistros(nombre){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnogrupo/contar/'+nombre)
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


            function contarHombres(grupo){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnogrupo/contarHombres/'+grupo)
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

            function contarMujeres(grupo){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnogrupo/contarMujeres/'+grupo)
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

            

            function obtenerEdadAlumnos(grupo, sexo){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnogrupo/contarAlumnosCon/grupo/'+grupo+'/sexo/'+sexo)
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

            function obtenerAlumnoEvaluar(idGrupo){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnogrupo/obtenerAlumno/'+idGrupo)
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


            function obtenerAlumnosDelGrupo(idGrupo){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnogrupo/alumnosGrupo/'+idGrupo)
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


            function getTotalAlumnos(idGrupo){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnogrupo/totales/'+idGrupo)
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

                function getLogo(){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/image/mostrarLogo')
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
              function getLogo2(){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/image/mostrarLogo2')
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

            function deleteAlumnosGrupos(alu, cur){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.delete('http://localhost/Control/Laravel/public/api/alumnogrupo/eliminar/'+alu+'/curso/'+cur)
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

            function promovidoOno(estado, alumno){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.put('http://localhost/Control/Laravel/public/api/alumnogrupo/promovido/'+estado+'/alumno/'+alumno)
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

            function getNumEmailAlumnos(grupo){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnogrupo/numeros/emailAlumnos/'+grupo)
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

            function contarRegistrosInicial(grupo){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnogrupo/registrosInicial/alumnos/'+grupo)
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

            function cambiarDeGrupo(grupo, alumno){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.put('http://localhost/Control/Laravel/public/api/alumnogrupo/cambiarGrupo/'+grupo+'/alumno/'+alumno)
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

            function cambiarDeGrupoEvaluacion(grupo, alumno){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.put('http://localhost/Control/Laravel/public/api/alumnogrupo/cambiarGrupo/evaluacion/'+grupo+'/alumno/'+alumno)
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

                        function contarRegistrosF(idC){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnogrupo/contar/registros/curso/'+idC)
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

            function alumnosHombresF(idC){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnogrupo/contarHombres/curso/'+idC)
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

            function alumnasMujeresF(idC){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnogrupo/contarMujeres/curso/'+idC)
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

            function obtenerEdadAlumnosF(sexo, idC){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnogrupo/contarAlumnos/sexo/'+sexo+'/cursoTotal/'+idC)
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

            function obtenerEdadAlumnosF2(sexo, idC){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnogrupo/contarAlumnos/sexo/'+sexo+'/cursoExistencia/'+idC)
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

            function datosAlumnoCurso(idC){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnogrupo/datos/alumnos/curso/'+idC)
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
