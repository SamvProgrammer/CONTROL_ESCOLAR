(function(){
    'use strict';
    angular
        .module("primariaAngular")
        .factory('serviciomateria', dataservice);
        function dataservice($http,$q){
            var service = {
                getMateria: getMateria,
                addMateria: addMateria,
                getMateriaByTagName: getMateriaByTagName,
                getMateriaByGrado: getMateriaByGrado,
                deleteMateria:deleteMateria,
                updateMateria:updateMateria,
                getMateriasByDocente:getMateriasByDocente,
                getMateriasByGrado:getMateriasByGrado,
                materiaExistente:materiaExistente,
                getMateriasByAlumno: getMateriasByAlumno,
                califBim1Grado1: califBim1Grado1,
                verCalifG1: verCalifG1,
                promediosFinales: promediosFinales,
                promedioCurso: promedioCurso,
                materiasDeGrado: materiasDeGrado,
            };
            return service;
        
        function getMateria() {

                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/materias')
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

            function addMateria(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.post('http://localhost/Control/Laravel/public/api/materias',obj)
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

            function getMateriaByTagName(id){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/materias/'+id)
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

            function getMateriaByGrado(grado){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/materias/grado/'+grado)
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

            function deleteMateria(id){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.delete('http://localhost/Control/Laravel/public/api/materias/'+id)
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
            

            function updateMateria(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.put('http://localhost/Control/Laravel/public/api/materias/update/'+obj.idMateria, obj)
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



            function getMateriasByDocente(nombre){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/materias/listar/'+nombre)
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

            function getMateriasByGrado(grado, docente){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/materias/materiasByGrado/'+grado+'/docente/'+docente)
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
            function materiaExistente(nombre,grado){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/materias/nombre/'+nombre+'/grado/'+grado)
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

            function getMateriasByAlumno(idAlumno){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/materias/alumno/'+idAlumno)
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

            function califBim1Grado1(idAlumno, idBimestre){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/materias/alumno/'+idAlumno+'/bimestre/'+idBimestre)
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

            function verCalifG1(){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/materias/primerGrado')
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

            function promediosFinales(grado){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/materias/promedios/finales/'+grado)
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

            function promedioCurso(docente){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/materias/promedio/curso/'+docente)
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
            function materiasDeGrado(grado){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/materias/traer/materiasgrado/'+grado)
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
