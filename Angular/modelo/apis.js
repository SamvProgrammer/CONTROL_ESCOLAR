(function(){
    'use strict';
    angular
        .module("primariaAngular")
        .factory('servicioapi', dataservice);
        function dataservice($http,$q){
            var service = {
            	getNumerosGrupos: getNumerosGrupos,
                
            };

            return service;

            function getNumerosGrupos(idGrupo){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnogrupo/numeros/'+idGrupo)
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
