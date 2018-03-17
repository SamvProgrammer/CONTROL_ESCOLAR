(function() {
	angular
		.module("primariaAngular")
		.controller("mail", MailController);

	function MailController($state, $http, serviciocorreo, $scope, Flash, toastr) {
		var vm = this;
		vm.Init = Init;
		vm.restorePassword = restorePassword;
		vm.correo = "";
		vm.usuario="";
		vm.password1 = "";
		vm.password2 = "";
		vm.prueba = prueba;
		vm.new_password = {};
		vm.esValido = false;
		vm.comprobarTokenPassword = comprobarTokenPassword;
		vm.changePassword = changePassword;
		Init();

		function Init() {}

		function prueba() {

		}

		function comprobarTokenPassword() {
			vm.tokenPassword = vm.tokenPassword.replace(new RegExp(' ', 'g'), '');
			serviciocorreo.comprobarTokenPassword(vm.tokenPassword).then(function(data) {
				vm.correo = data[0].correo;
				vm.correo_user = data[0].user;
				//console.log(data[0].token);
				vm.esValido = true;
			}).catch(function(err) {
				swal("Ups!", "El token ingresado no es correcto", "error");
			});
		}

		function restorePassword() {
			serviciocorreo.checkEmail(vm.correo, vm.usuario).then(function(datos) {
				console.log(datos);
				serviciocorreo.getTokenToChangePassword(datos[0].email, datos[0].rol).then(function(data) {
					console.log(data);
					serviciocorreo.sendEmail(datos[0].nombre, datos[0].email, "sendTokentoEmail", data[0].token).then(function(data) {
						console.log(data);
						swal("Bien!", ""+(data[0].mensaje)+"", "success");
						$state.go('app.changePassword', {}, {
							reload: true
						});
					}).catch(function(err) {

					});
				}).catch(function(err) {
					swal("Ups!", "Problema al buscar los datos", "error");
				});
			}).catch(function(err) {
				swal("Ups!", "No existe el correo que ingresaste, intenta nuevamente", "error");
			});
		}

		
		function changePassword() {
			if (vm.password1 !== vm.password2) {
				swal("Ups!", "Verifica la contraseña, ambas deben ser iguales", "error");
			} else {
				
				serviciocorreo.changePassword(vm.correo_user, vm.correo, vm.password1, vm.tokenPassword).then(function(data) {
					console.log(data);
					swal("Bien!", "Cambio de contraseña correcto! ahora puedes dar en Acceder", "success");
					serviciocorreo.sendEmail(data[0].nombres, data[0].email, "sendNewPasswordtoEmail", vm.password1).then(function(dataaa) {
						//console.log(data);
						swal("Bien!", ""+dataaa[0].mensaje+"", "success");
					}).catch(function(errr) {});
				}).catch(function(err) {
					console.log(err);
					 swal("Ups!", ""+err.response+"", "error");
				});
			}
		}
	}
})();