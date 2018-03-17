(function() {
	'use strict';
	angular
		.module("primariaAngular")
		.factory('serviciocorreo', dataservice);

	function dataservice($http, $q) {
		var service = {
			checkEmail: checkEmail,
			getTokenToChangePassword: getTokenToChangePassword,
			comprobarTokenPassword: comprobarTokenPassword,
			changePassword: changePassword,
			sendEmail: sendEmail,
		};
		return service;

		function checkEmail(correo, usuario) {
			var defered = $q.defer();
			var promise = defered.promise;
			$http.get('http://localhost/Control/Laravel/public/api/correo/checkEmail/' + correo + '/' + usuario)
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

		function getTokenToChangePassword(correo, usuario) {
			var defered = $q.defer();
			var promise = defered.promise;
			$http.get('http://localhost/Control/Laravel/public/api/correo/email/' + correo + '/' + usuario)
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

		function comprobarTokenPassword(token) {
			var defered = $q.defer();
			var promise = defered.promise;
			$http.get('http://localhost/Control/Laravel/public/api/correo/token/' + token)
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

		function changePassword(user, correo, newpassword, token) {
			var defered = $q.defer();
			var promise = defered.promise;
			$http.get('http://localhost/Control/Laravel/public/api/correo/token/'+token)
				.success(exito1)
				.error(intenta_de_nuevo1);

			function exito1(response) {
				$http.get('http://localhost/Control/Laravel/public/api/correo/'+user+'/usuario/'+correo+'/newpassword/'+newpassword)
					.success(exito)
					.error(intenta_de_nuevo);
			}

			function intenta_de_nuevo1(err) {
				defered.reject(err)
			}

			function exito(response) {
				defered.resolve(response);
			}

			function intenta_de_nuevo(err) {
				defered.reject(err)
			}

			return promise;
		}

		function sendEmail(nombre, correo, tipo, mensaje) {
			var defered = $q.defer();
			var promise = defered.promise;
			$http.get('http://localhost/Control/Laravel/public/api/correo/nombre/' + nombre + '/usuario/' + correo + '/tipo/' + tipo + '/mensaje/' + mensaje)
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