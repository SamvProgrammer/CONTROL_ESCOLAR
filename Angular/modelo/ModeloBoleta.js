(function(){
    'use strict';
    angular
        .module("primariaAngular")
        .factory('serviciofolio', dataservice);
        function dataservice($http,$q){
            var service = {
            	evaluarfolio: evaluarfolio,
                
            };

            return service;

            function evaluarfolio(folio) {

                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/boleta/folio'+folio)
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