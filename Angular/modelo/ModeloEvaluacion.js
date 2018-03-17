(function(){
    'use strict';
    angular
        .module("primariaAngular")
        .factory('servicioevaluar', dataservice);
        function dataservice($http,$q){
            var service = {
                saveAlumnoEvaluar: saveAlumnoEvaluar,
                getEvaluaciones: getEvaluaciones,
                updateEvaluacionesAlumno: updateEvaluacionesAlumno,
                getFechasEval: getFechasEval,
                updateFechaEvalBim: updateFechaEvalBim,
                getAllEvaluaciones: getAllEvaluaciones,
                getNumMaterias: getNumMaterias,
                boletaPDF: boletaPDF,
                getEvaluacionDeAlumno: getEvaluacionDeAlumno,
                getBoleta: getBoleta,
                getAlumnosByDocente: getAlumnosByDocente,
                agregarRegistrosNuevosAlumnoAprobados: agregarRegistrosNuevosAlumnoAprobados,
                getAlumnosNuevoDocente: getAlumnosNuevoDocente,
                asignarNuevoDocente: asignarNuevoDocente,
                getEvaluacionBimestrales: getEvaluacionBimestrales,
                getcaliFinalAlumno: getcaliFinalAlumno,
                getEvaluacionesAlumnoDirector: getEvaluacionesAlumnoDirector,
                getEvaluacionesD: getEvaluacionesD,
                getEvaluacionesEdFisica: getEvaluacionesEdFisica,
                promedioFinalNivel: promedioFinalNivel,
    
            };
            return service;
        
        
            function saveAlumnoEvaluar(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.post('http://localhost/Control/Laravel/public/api/evaluacion/altaCalificacion',obj)
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

            function getEvaluaciones(idDocente, idBimestre){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/evaluacion/evaluaciones/'+idDocente+'/bimestre/'+idBimestre)
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

            function getEvaluacionesD(idDocente, idBimestre){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/evaluacion/evaluacionesD/'+idDocente+'/bimestre/'+idBimestre)
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

            function getEvaluacionesEdFisica(idAlumno, idBimestre){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/evaluacion/evaluacionesED/'+idAlumno+'/bimestre/'+idBimestre)
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

            

            function updateEvaluacionesAlumno(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.put('http://localhost/Control/Laravel/public/api/evaluacion/evaluaciones',obj)
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

            function getFechasEval(){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/evaluacion/fechas')
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

            function updateFechaEvalBim(bim,fi,ff){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.put('http://localhost/Control/Laravel/public/api/evaluacion/cambiarFecha/bimestre/'+bim+'/fechaInicio/'+fi+'/fechaFin/'+ff)
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

            function getAllEvaluaciones(){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/evaluacion/todoEvaluaciones')
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

            function getNumMaterias(idDocente, idAlumno){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/evaluacion/numateria/docente/'+idDocente+'/alumno/'+idAlumno)
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

            function getEvaluacionDeAlumno(idBimestre, idAlumno){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/evaluacion/califDeAlumno/bimestre/'+idBimestre+'/alumno/'+idAlumno)
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

            function getBoleta(idAlumno){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/evaluacion/boleta/'+idAlumno)
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

            function getAlumnosByDocente(idDocente){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/evaluacion/alumnosDocente/'+idDocente)
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

            function agregarRegistrosNuevosAlumnoAprobados(obj){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.post('http://localhost/Control/Laravel/public/api/evaluacion/crear/nuevosregistros/aprobados',obj)
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

            function getAlumnosNuevoDocente(grado, grupo){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/evaluacion/alumnos/nuevoDocente/'+grado+'/grupo/'+grupo)
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

            function asignarNuevoDocente(doc, alu){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.put('http://localhost/Control/Laravel/public/api/evaluacion/cambiar/docente/'+doc+'/alumno/'+alu)
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

            function getEvaluacionBimestrales(alu){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/evaluacion/evaluacionBim/alumno/'+alu)
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

            function getcaliFinalAlumno(alu){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/evaluacion/finales/alumno/'+alu)
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

            function getEvaluacionesAlumnoDirector(idA, idB){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/evaluacion/evaluaciones/alumno/'+idA+'/bimestre/'+idB)
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

            function promedioFinalNivel(idA){
                var defered = $q.defer();
                var promise = defered.promise;
                $http.get('http://localhost/Control/Laravel/public/api/evaluacion/promedioFinal/deNivel/'+idA)
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

            

            

            


            

            



            

            

             function boletaPDF(arre) {
            var cuerpoHorario = [];
            for (var i = 0; i < arre.length; i++) {
                var arreh = [];
                for (var j = 0; j < arre[i].length; j++) {
                    var objDH = {
                        text: arre[i][j],
                        alignment: 'left',
                        border: [true, false, true, true]
                    };
                    arreh.push(objDH);
                }
                cuerpoHorario.push(arreh);
            }
            console.log(cuerpoHorario);
           
            var pdf_salida = {
                pageOrientation: 'landscape',
                content: [{
                    fontSize: 7,
                    alignment: 'center',
                    margin: [30, 0, -55, 0],
                    table: {
                        widths: ['10%', '10%', '10%', '20%', '10%', '10%', '10%'],
                        body: [
                            //PRIMER BLOQUE
                            [{
                                text: '',
                                alignment: 'center',
                                border: [false, false, false, false]
                            }, {
                                text: '',
                                alignment: 'center',
                                border: [false, false, false, false]
                            }, {
                                text: '',
                                alignment: 'center',
                                border: [false, false, false, false]
                            }, {
                                text: 'HORARIO',
                                alignment: 'center',
                                border: [false, false, false, false],
                                fontSize: 15
                            }, {
                                text: '',
                                alignment: 'center',
                                border: [false, false, false, false]
                            }, {
                                text: '',
                                alignment: 'center',
                                border: [false, false, false, false]
                            }, {
                                text: '',
                                alignment: 'center',
                                border: [false, false, false, false]
                            }]
                        ]
                    }
                }, {
                    fontSize: 7,
                    alignment: 'center',
                    margin: [30, 0, -55, 0],
                    table: {
                        widths: ['10%', '10%', '10%', '20%', '10%', '10%', '10%'],
                        body: [
                            //PRIMER BLOQUE
                            [{
                                text: ' ',
                                alignment: 'center',
                                border: [false, false, false, false]
                            }, {
                                text: ' ',
                                alignment: 'center',
                                border: [false, false, false, false]
                            }, {
                                text: ' ',
                                alignment: 'center',
                                border: [false, false, false, false]
                            }, {
                                text: ' ',
                                alignment: 'center',
                                border: [false, false, false, false],
                                fontSize: 15
                            }, {
                                text: ' ',
                                alignment: 'center',
                                border: [false, false, false, false]
                            }, {
                                text: ' ',
                                alignment: 'center',
                                border: [false, false, false, false]
                            }, {
                                text: ' ',
                                alignment: 'center',
                                border: [false, false, false, false]
                            }]
                        ]
                    }
                }, {
                    fontSize: 7,
                    alignment: 'center',
                    margin: [30, 0, -55, 0],
                    table: {
                        widths: ['12%', '15%', '15%', '15%', '15%', '15%'],
                        body: [
                            //PRIMER BLOQUE
                            [{
                                text: 'HORAS',
                                alignment: 'center',
                                border: [true, true, true, true],
                                fontSize: 9
                            }, {
                                text: 'LUNES',
                                alignment: 'center',
                                border: [true, true, true, true]
                            }, {
                                text: 'MARTES',
                                alignment: 'center',
                                border: [true, true, true, true]
                            }, {
                                text: 'MIERCOLES',
                                alignment: 'center',
                                border: [true, true, true, true]
                            }, {
                                text: 'JUEVES',
                                alignment: 'center',
                                border: [true, true, true, true]
                            }, {
                                text: 'VIERNES',
                                alignment: 'center',
                                border: [true, true, true, true]
                            }]
                        ]
                    }
                }, {
                    fontSize: 8,
                    
                    margin: [30, 0, -55, 0],
                    table: {
                        widths: ['12%', '15%', '15%', '15%', '15%', '15%'],
                        alignment: 'center',
                        body: cuerpoHorario
                    }
                }]
            };

            pdfMake.createPdf(pdf_salida).open();
        }


            

            

            

            

           


           


           
            
        }

})();
