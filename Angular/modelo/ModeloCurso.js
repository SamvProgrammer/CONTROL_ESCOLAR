(function() {
    'use strict';
    angular
        .module("primariaAngular")
        .factory('serviciocurso', dataservice);

    function dataservice($http, $q) {
        var service = {
            getCurso: getCurso,
            getCurso1: getCurso1,
            getCursoByTagName: getCursoByTagName,
            addCurso: addCurso,
            updateCurso: updateCurso,
            deleteCurso: deleteCurso,
            getcursoActual: getcursoActual,
            cursoEnEspera: cursoEnEspera,
            cambiarCursoAUno: cambiarCursoAUno,
            cambiarCursoACero: cambiarCursoACero,
            allGrupoDocentes: allGrupoDocentes,
        };
        return service;



        function getCurso1() {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get('http://localhost/Control/Laravel/public/api/curso')
                .success(exito)
                .error(intenta_de_nuevo);

            function exito(response) {
                defered.resolve(response);

            }

            function intenta_de_nuevo(err) {
                defered.reject(err)
            }
            return promise;
        }
        function getCurso(id) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get('http://localhost/Control/Laravel/public/api/curso/'+id)
                .success(exito)
                .error(intenta_de_nuevo);

            function exito(response) {
                defered.resolve(response);

            }

            function intenta_de_nuevo(err) {
                defered.reject(err)
            }
            return promise;
        }

        function getcursoActual() {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get('http://localhost/Control/Laravel/public/api/curso/cursoActual')
                .success(exito)
                .error(intenta_de_nuevo);

            function exito(response) {
                defered.resolve(response);

            }

            function intenta_de_nuevo(err) {
                defered.reject(err)
            }
            return promise;
        }

        function getCursoByTagName(nombre) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get('http://localhost/Control/Laravel/public/api/curso/' + nombre)
                .success(exito)
                .error(intenta_de_nuevo);

            function exito(response) {
                defered.resolve(response);

            }

            function intenta_de_nuevo(err) {
                defered.reject(err)
            }
            return promise;
        }


        function addCurso(obj) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post('http://localhost/Control/Laravel/public/api/curso', obj)
                .success(exito)
                .error(intenta_de_nuevo);

            function exito(response) {
                defered.resolve(response);
            }

            function intenta_de_nuevo(err) {
                defered.reject(err)
            }
            return promise;
        }

        function updateCurso(obj) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.put('http://localhost/Control/Laravel/public/api/curso/update/' + obj.idCurso, obj)
                .success(exito)
                .error(intenta_de_nuevo);

            function exito(response) {
                defered.resolve(response);

            }

            function intenta_de_nuevo(err) {
                defered.reject(err)
            }
            return promise;
        }

        function deleteCurso(nombre) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.delete('http://localhost/Control/Laravel/public/api/curso/' + nombre)
                .success(exito)
                .error(intenta_de_nuevo);

            function exito(response) {
                defered.resolve(response);
            }

            function intenta_de_nuevo(err) {
                defered.reject(err)
            }
            return promise;
        }

        function cursoEnEspera() {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get('http://localhost/Control/Laravel/public/api/curso/curso/espera')
                .success(exito)
                .error(intenta_de_nuevo);

            function exito(response) {
                defered.resolve(response);
            }

            function intenta_de_nuevo(err) {
                defered.reject(err)
            }
            return promise;
        }

        function cambiarCursoACero(cero) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.put('http://localhost/Control/Laravel/public/api/curso/cambiara/cero/'+cero)
                .success(exito)
                .error(intenta_de_nuevo);

            function exito(response) {
                defered.resolve(response);
            }

            function intenta_de_nuevo(err) {
                defered.reject(err)
            }
            return promise;
        }

        function cambiarCursoAUno(uno) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.put('http://localhost/Control/Laravel/public/api/curso/cambiara/uno/'+uno)
                .success(exito)
                .error(intenta_de_nuevo);

            function exito(response) {
                defered.resolve(response);
            }

            function intenta_de_nuevo(err) {
                defered.reject(err)
            }
            return promise;
        }

        function allGrupoDocentes() {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get('http://localhost/Control/Laravel/public/api/curso/all/docenteGrupo')
                .success(exito)
                .error(intenta_de_nuevo);

            function exito(response) {
                defered.resolve(response);
            }

            function intenta_de_nuevo(err) {
                defered.reject(err)
            }
            return promise;
        }

        

        

        



    }
})();