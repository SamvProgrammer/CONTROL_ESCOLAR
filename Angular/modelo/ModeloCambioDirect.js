(function(){
    'use strict';
    angular
        .module("primariaAngular")
        .factory('serviciocambio', dataservice);
        function dataservice($http,$q){
            var service = {
                cambiarDirector: cambiarDirector,
                cambiarDocente: cambiarDocente,
                traerDocentes: traerDocentes,
                cambiarDocenteEnUsers: cambiarDocenteEnUsers,
                getDirectorActual: getDirectorActual,
                docenteActivo:docenteActivo,
                cambiarGrupoDocente: cambiarGrupoDocente,
            };

            return service;

            function cambiarDirector(obj) {

                var defered = $q.defer();
                var promise = defered.promise;
                $http.put('http://localhost/Control/Laravel/public/api/docentes/tipo/'+obj)
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

            function cambiarDocente(obj) {

                var defered = $q.defer();
                var promise = defered.promise;
                $http.put('http://localhost/Control/Laravel/public/api/docentes/tipoDocente/'+obj)
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

            function cambiarDocenteEnUsers(obj, id) {

                var defered = $q.defer();
                var promise = defered.promise;
                $http.put('http://localhost/Control/Laravel/public/api/docentes/tipoDocenteUser/'+obj+'/id/'+id)
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

            

            

            function traerDocentes() {

                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/docentes/traerDocentes')
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

            function getDirectorActual() {

                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/docentes/directorActual')
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

            function cambiarGrupoDocente(n,a){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.put('http://localhost/Control/Laravel/public/api/docentes/nuevo/'+n+'/anterior/'+a)
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
