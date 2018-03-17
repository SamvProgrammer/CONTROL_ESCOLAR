(function(){
    'use strict';
    angular
        .module("primariaAngular")
        .factory('servicioalumno', dataservice);
        function dataservice($http,$q){
            var service = {
                getAlumno: getAlumno,
                getAlumnoById: getAlumnoById,
                getAlumnoByGrado: getAlumnoByGrado,
                getAlumnoByGrupo: getAlumnoByGrupo,
                getevaluaremail :  getevaluaremail,
                getevaluarcurp:getevaluarcurp,
                updateAlumno: updateAlumno,
                addAlumno: addAlumno,
                deleteAlumno: deleteAlumno,
                agregarAlumnoAtuGrupo: agregarAlumnoAtuGrupo,
                /*getAlumnosInhabilitados: getAlumnosInhabilitados,
                getAlumnosEgresados: getAlumnosEgresados,
                ponerAlumnosEgresados: ponerAlumnosEgresados,*/
                getGradoAlumno: getGradoAlumno,
                getAlumnosBaja: getAlumnosBaja,
                traeralumnosActivos:traeralumnosActivos,
                getInfoCodigoPostal:getInfoCodigoPostal,
                getEgresados: getEgresados,
                getAlumnosByGrupo: getAlumnosByGrupo,
                saveAlumnoBoleta: saveAlumnoBoleta,
                saveAlumnoBole: saveAlumnoBole,
                getBoleta: getBoleta,
                actualizarBoleta: actualizarBoleta,
                getBajaGrupo: getBajaGrupo,
                agregarmotivodebaja:agregarmotivodebaja,
               
                
            };
            return service;
        
        function getAlumno() {

                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnos/alumnosActivos')
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

            function getAlumnosBaja(){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnos/verAlumnos/baja')
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
            function getAlumnoById(id){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnos/'+id)
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

            function getevaluaremail(email){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnos/email/'+email)
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

            function getevaluarcurp(curp){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnos/curp/'+curp)
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

            function actualizarBoleta(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.put('http://localhost/Control/Laravel/public/api/alumnos/actualiza/boleta',obj)
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
            function agregarAlumnoAtuGrupo(obj){
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

            function getGradoAlumno(idAlumno){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnos/gradoAlumno/'+idAlumno)
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

            

            function traeralumnosActivos(){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnos/estatus/habilitados')
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

            
            function getInfoCodigoPostal(cp) {
            var defered = $q.defer();
            var promise = defered.promise;
            var conf = {
                method: "GET",
                url: "https://api-codigos-postales.herokuapp.com/v2/codigo_postal/" + cp,
                skipAuthorization: true
            };
            $http(conf).success(exito).error(intenta_de_nuevo);

            function exito(response) {
                defered.resolve(response);
            }

            function intenta_de_nuevo(err) {
                defered.reject(err)
            }
            return promise;
        }

            function getEgresados(){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnos/getAlumnos/Egresados')
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

            function getAlumnosByGrupo(grupo){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnos/getAlumnos/byGrupo/'+grupo)
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

            function saveAlumnoBoleta(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.post('http://localhost/Control/Laravel/public/api/alumnos/saveBoleta/alumno',obj)
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

            function saveAlumnoBole(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.post('http://localhost/Control/Laravel/public/api/alumnos/saveBole/alum',obj)
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

            function getBoleta(id){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnos/boleta/alumno/'+id)
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

            function getBajaGrupo(idgrupo){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/alumnos/getBajas/grupos/'+idgrupo)
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

            function agregarmotivodebaja(motivo,idAlumno){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.put('http://localhost/Control/Laravel/public/api/alumnos/motivo/'+motivo+'/alumno/'+idAlumno)
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
