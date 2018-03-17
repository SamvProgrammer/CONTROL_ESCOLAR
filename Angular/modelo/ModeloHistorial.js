(function(){
    'use strict';
    angular
        .module("primariaAngular")
        .factory('serviciohistorial', dataservice);
        function dataservice($http,$q){
            var service = {

                getHistorialUsuario: getHistorialUsuario,
                getDocenteById: getDocenteById,
                getAlumnoById: getAlumnoById,
                insertHistorialUsuario: insertHistorialUsuario,
                getUltimosRegistrosIngresados: getUltimosRegistrosIngresados,
                getIDSyTIPOconCURPS: getIDSyTIPOconCURPS,
                
               
                
            };
            return service;
        
        

            function getHistorialUsuario() {
			var defered = $q.defer();
			var promise = defered.promise;
			$http.get('http://localhost/Control/Laravel/public/api/historial/HistorialUsuario')
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

		function getDocenteById(id) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get('http://localhost/Control/Laravel/public/api/historial/id/'+ id)
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

         function getAlumnoById(id) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get('http://localhost/Control/Laravel/public/api/historial/'+id)
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

        function insertHistorialUsuario(id_usuario, tipo_usuario, accion, id_objetivo, tipo_objetivo, campos_cambiados, valores_antiguos, valores_nuevos) {
			var defered = $q.defer();
			var promise = defered.promise;
			$http.post('http://localhost/Control/Laravel/public/api/historial/addHistorialUsuario/id_usuario/' + id_usuario + '/tipo_usuario/' + tipo_usuario + '/accion/' + accion + '/id_objetivo/' + id_objetivo + '/tipo_objetivo/' + tipo_objetivo + '/campos_cambiados/' + campos_cambiados + '/valores_antiguos/' + valores_antiguos + '/valores_nuevos/' + valores_nuevos)
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


		function getUltimosRegistrosIngresados(rol, usuario, accion, horas) {
			var defered = $q.defer();
			var promise = defered.promise;
			$http.get('http://localhost/Control/Laravel/public/api/historial/ultimosRegistrosAgregados/' + rol + '/' + usuario + '/' + accion + '/' + horas)
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

        function getIDSyTIPOconCURPS(curp_usuario, rol_usuario, curp_objetivo, rol_objetivo) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get('http://localhost/Control/Laravel/public/api/historial/IDSyTIPOconCURPS/usuario/' + curp_usuario + '/rol_usuario/' + rol_usuario + '/objetivo/' + curp_objetivo + '/rol_objetivo/' + rol_objetivo)
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

