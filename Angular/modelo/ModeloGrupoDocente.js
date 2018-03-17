(function(){
    'use strict';
    angular
        .module("primariaAngular")
        .factory('serviciogrupodocente', dataservice);
        function dataservice($http,$q){
            var service = {
                getDocentegrupo: getDocentegrupo,
                addDocentegrupo: addDocentegrupo,
                
                
            };
            return service;



            function getDocentegrupo() {

                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/grupodocente')
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


            function addDocentegrupo(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.post('http://localhost/Control/Laravel/public/api/grupodocente/grupodocente',obj)
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