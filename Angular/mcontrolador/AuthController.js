(function() {

	'use strict';

	angular
		.module('primariaAngular')
		.controller('AuthController', AuthController);

	function AuthController($auth, $state, $http, $rootScope, appConf,Flash, serviciodocente) {

		var vm = this;
		vm.mensaje = "";
		vm.loginError = false;
		vm.loginErrorText;
		vm.conf = appConf;
		vm.perfil = {};
		vm.datos = datos;
		vm.guardarContenidoDiv=guardarContenidoDiv;
		

		vm.myInterval = 5000;
		vm.noWrapSlides = false;
		vm.active = 0;
		//var slides = vm.slides = [];
		var currIndex = 0;
		vm.email="";
		vm.password="";
		vm.contenedor="";
		vm.uno=false;
		vm.dos=false;
		vm.tres=false;
		vm.cuatro=false;
		vm.cinco=false;
		vm.seis=false;
		vm.direc=false;
		vm.docente=false;

		function guardarContenidoDiv(o){
			vm.contenedor=o;
			console.log(vm.contenedor);
		}

		datos();

		function datos(){
			if($auth.isAuthenticated()){
				try{
					return $http.get('http://localhost/Control/Laravel/public/api/autenticar/info')
					.then(function(response){
						vm.info = response.data.user;
						console.log(vm.info);
						rol();
						grado();
					});
				}catch(err){

				}
			}
		}

		function rol(){
			if (vm.info.rol_id === 1) {
				vm.es = "DIRECTOR"
				
			}if (vm.info.rol_id === 2) {
				vm.es = "DOCENTE"
				vm.docente=true;
			}if (vm.info.rol_id === 3) {
				vm.es = "ALUMNO"
			}if (vm.info.rol_id === 4) {
				vm.es = "ADMIN"
			}
			if (vm.info.rol_id === 5) {
				vm.es = "EDFISICA"
				
			}
		}

		function grado(){
			serviciodocente.getGradoDocente(vm.info.id_user).then(function(data) {
				vm.gradoD = data;
				console.log(vm.gradoD);
				if(vm.gradoD[0].grado === 1){
					vm.uno = true;
				}if(vm.gradoD[0].grado === 2){
					vm.dos = true;
				}if(vm.gradoD[0].grado === 3){
					vm.tres = true;
				}if(vm.gradoD[0].grado === 4){
					vm.cuatro = true;
				}if(vm.gradoD[0].grado === 5){
					vm.cinco = true;
				}if(vm.gradoD[0].grado === 6){
					vm.seis = true;
				}
			});
		}


		vm.login = function() {
			vm.mensaje = "";
			console.log(vm.email);
			

			if(angular.equals(vm.email, 'rosario@hotmail.com') && angular.equals(vm.password, 'rosario') ){
				
				var credentials = {
					email: vm.email,
					password: vm.password,
					admin :  'ok'
				}



			}else{

				var credentials = {
					email: vm.email,
					password: vm.password
				}

			}
			

			$auth.login(credentials)
			  .then(function(response) {


			  		return $http.get('http://localhost/Control/Laravel/public/api/autenticar/info').then(function(response) {

							vm.mensaje = "";
							var user = JSON.stringify(response.data.user);
							localStorage.setItem('perfil', user);

							$rootScope.authenticated = true;

							$rootScope.currentUser = response.data.user;

							// Everything worked out so we can now redirect to
							// the users state to view the data
							//appConf.isAuthorized = true;
							$state.go('app.persona', {}, {
								reload: true
							});

							//$state.reload();
							//$state.go('app');
						});
			  		
			  })
			  .catch(function(response) {
			    	//console.log(error);
						vm.loginError = true;
						//vm.loginErrorText = error.data.error;
						//vm.mensaje = "Usuario o contraseña invalido!!";
						vm.message=swal("Exito!", "Acceso Permitido!", "success");
						$state.go('app.iniciarSesion', {}, {
							reload: true
						});
						//var message = '<strong>Error al iniciar sesión</strong>';
						swal("Error!", "email o contraseña invalidos!", "error");  
						vm.email = "";
						vm.password = "";
			  });

			
		}
		

		vm.logout = function() {

			$auth.logout().then(function() {

				// Remove the authenticated user from local storage
				localStorage.removeItem('perfil');

				// Flip authenticated to false so that we no longer
				// show UI elements dependant on the user being logged in
				$rootScope.authenticated = false;

				// Remove the current user info from rootscope
				$rootScope.currentUser = null;

				$state.go('app.persona', {}, {
					reload: true
				});
			})

		}


		vm.isAuthenticated = function() {
				//$state.reload();
				appConf.isAuthorized = $auth.isAuthenticated();


				/*if ($auth.isAuthenticated() && $auth.getPayload().rol === 0) {

					//console.log($auth.getPayload().sub);
					appConf.isAdmin = true;

				} else {
					appConf.isAdmin = false;

				}*/

				

				if ($auth.isAuthenticated() && $auth.getPayload().rol === 1) {

					//console.log($auth.getPayload().sub);
					appConf.isDirector = true;

				} else {
					appConf.isDirector = false;
				}


				if ($auth.isAuthenticated() && $auth.getPayload().rol === 2) {

					//console.log($auth.getPayload().sub);
					appConf.isTeacher = true;

				} else {
					appConf.isTeacher = false;
				}
				
				if ($auth.isAuthenticated() && $auth.getPayload().rol === 3) {

					//console.log($auth.getPayload().sub);
					appConf.isStudent = true;

				} else {
					appConf.isStudent = false;
				}

				if ($auth.isAuthenticated() && $auth.getPayload().rol === 4) {

					//console.log($auth.getPayload().sub);
					appConf.isAdmin = true;

				} else {
					appConf.isAdmin = false;
				}

				if ($auth.isAuthenticated() && $auth.getPayload().rol === 5) {

					//console.log($auth.getPayload().sub);
					appConf.isEdFisica = true;

				} else {
					appConf.isEdFisica = false;
				}

				
				return $auth.isAuthenticated();
			}
			

		/*function onBlur() {
			vm.email = vm.email.toUpperCase();
		}*/



		




	}

})();