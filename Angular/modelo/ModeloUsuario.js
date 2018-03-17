(function(){
    'use strict';
    angular
        .module("primariaAngular")
        .factory('serviciousuario', dataservice);
        function dataservice($http,$q){
            var service = {
                getUsuario: getUsuario,
                getUsuarioById: getUsuarioById,
                addUsuario: addUsuario
                
            };
            return service;
        
        function getUsuario() {

                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/usuarios')
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
            function getUsuarioById(nombre){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/usuarios/'+nombre)
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

            function addUsuario(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.post('http://localhost/Control/Laravel/public/api/usuarios',obj)
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

            function listaAlumnos(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.post('http://localhost/Control/Laravel/public/api/usuarios/lista/',obj)
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

         



            /*
            function getAlumnoByGrado(grado){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnos/grado/'+grado)
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

            function getAlumnoByGrupo(grupo){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnos/grupo/'+grupo)
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

            function updateAlumno(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.put('http://localhost/Control/Laravel/public/api/alumnos/update/'+obj.idAlumno, obj)
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
            function addAlumno(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.post('http://localhost/Control/Laravel/public/api/alumnos',obj)
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

            function deleteAlumno(nombre){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.delete('http://localhost/Control/Laravel/public/api/alumnos/'+nombre)
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

           */
            
        }

})();
