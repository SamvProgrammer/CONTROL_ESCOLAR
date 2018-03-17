(function () {
    angular.module("primariaAngular")
        .controller("ApiCtrl", ApiController);


    function ApiController($http, $scope, Flash, toastr, $auth, servicioapi, servicioalugrupo, serviciogrupo,serviciocurso) {
        var vm = this;
        vm.Init = Init;
        vm.getDatosGrupos = getDatosGrupos;
        vm.enviarMensaje = enviarMensaje;
        vm.agregarEvento=agregarEvento;
        vm.ver=ver;
        vm.validaFechaNacimiento=validaFechaNacimiento;
        
        //vm. compartir2 =  compartir2;
        var local = JSON.parse(localStorage.getItem('perfil'));
        vm.texto = "";
        vm.numero = "";
        vm.region = "+52";
        vm.grupo="";
        vm.datos={};
        vm.datos_grupo={};
        var url = "https://api.clockworksms.com/http/send.aspx";
        var apiKey = "85e7d6659a96de8905d9f2cdca63524a88b78bbb";
        var apiKeyGoogle = "AIzaSyAUqs9SGGJZC74LiQ44fgOZQR8VMdsFjf4";
        var idCalendario="dmnt_srd13@hotmail.com";
        var Init = function () { }

        $scope.identificadorCalendario = "";

        $scope.arreglo = [];

        $scope.calendario = "";
        $scope.txtEventoCalendario = "";

        $scope.txtCorreoCalendario = "";
        vm.calendario="";
        vm.textoCalendario="";
        grupos();
        var emails={};
        vm.getCursoActual=getCursoActual;
        getCursoActual();

        $scope.insertarCalendarios = function () {
            var uriListaCalendarios = "https://www.googleapis.com/calendar/v3/users/me/calendarList?key=" + apiKeyGoogle;
            $http.get("http://localhost/Control/Laravel/public/api/obtenerToken").then(function (response) {
                var tokenizacion = response.data.token_type + " " + response.data.access_token;
                var xhr = new XMLHttpRequest();
                xhr.open('GET', uriListaCalendarios, false);
                xhr.setRequestHeader("Authorization", tokenizacion);
                xhr.send();
                $scope.arreglo = [];
                if (xhr.readyState == 4) {
                    var jsonVerdadero = JSON.parse(xhr.responseText).items;
                    for (var x = 0; x < jsonVerdadero.length; x++) {
                        $scope.arreglo[x] = jsonVerdadero[x];
                    }
                    console.log($scope.arreglo);
                }
                swal("Bien!","Calendario agregado correctamente","success");
            });

        }
        function ver(){
            
        }

        function enviarMensaje() {
            var numeros=[];
            for(var i=0; i < emails.length;i++){
                
                numeros.push(emails[i].numTel);
                
            }
            console.log(numeros);
            
            for(var j=0; j<numeros.length; j++){

            var aux = url + "?key=" + apiKey + "&to=" + vm.region + numeros[j] + "&content=" + vm.texto;
            aux = aux.replace(/\s/g, '+');
            $http.get(aux).then(function (response) {
                console.log(response);
                swal("Bien!","Mensaje enviado","success");
            });
        }
        }
        $scope.enviar = function () {
            var uriAutentificacion = "https://accounts.google.com/o/oauth2/v2/auth?";
            var clienteId = "client_id=883242617561-hic5mdsfklaqru4dq0b80t937jdoe9e5.apps.googleusercontent.com&";
            var responseType = "response_type=code&";
            var scopeManejarCalendarios = "scope=https://www.googleapis.com/auth/calendar%20";
            var scopeVistaCalendarios = "https://www.googleapis.com/auth/calendar.readonly&";
            var redireccionUri = "redirect_uri=http://localhost/Control/Laravel/public/api/autentificacion";
            var uri = uriAutentificacion + clienteId + responseType + scopeManejarCalendarios +
                scopeVistaCalendarios + redireccionUri;
            document.location.href = uri;
        }
        

         function agregarEvento() {
            
            var correos=[];
            for(var i=0; i < emails.length;i++){
                var obj={};
                obj.email=emails[i].email;
                correos.push(obj);
            }
            
            console.log(correos);

            var uriAgregarEvento = "https://www.googleapis.com/calendar/v3/calendars/"+idCalendario+"/events?key=" + apiKeyGoogle;
            $http.get("http://localhost/Control/Laravel/public/api/obtenerToken").then(function (response) {
                var tokenizacion = response.data.token_type + " " + response.data.access_token;
                var identificador = idCalendario;
                var fecha = vm.calendario;
                var d = new Date(fecha);
                var fec =(d.getFullYear()+"-"+(d.getMonth() +1) + "-" + d.getDate());
                var objetoEnviar = {
                    "end": 
                    {
                      "date": fec
                    },
                    "start": 
                    {
                      "date": fec
                    },
                    "summary": vm.textoCalendario,
                    "attendees":correos
                  }
                
                var obj = JSON.stringify(objetoEnviar);
                var xhr = new XMLHttpRequest();
                xhr.open("POST",uriAgregarEvento);
                xhr.onreadystatechange = function(response){
                    if(xhr.readyState == 4){
                      swal("Bien!","Evento agregado", "success");
                    }
                }
                xhr.setRequestHeader("Authorization", tokenizacion);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(obj);
            });
        }

       

        $scope.compartir = function(email){
            //for(var i=0; i< vm.datos.length; i++){
          var correo = $scope.txtCorreoCalendario;
          var uri = "https://www.googleapis.com/calendar/v3/calendars/"+$scope.identificadorCalendario+"/acl?key="+$scope.apiKeyGoogle;
          $http.get("http://localhost/Control/Laravel/public/api/obtenerToken").then(function (response) {
            var tokenizacion = response.data.token_type + " " + response.data.access_token;
           console.log("antes del for");
            for(var i=0; i< vm.datos.length; i++){
                console.log("dentro del for");
                var objetoEnviar = {
                "role": "reader",
                "scope": 
                {
                  "type": "user",
                  "value": vm.datos[i].email
                }
              }
            console.log("pasé");
            var obj = JSON.stringify(objetoEnviar);
            var xhr = new XMLHttpRequest();
            xhr.open("POST",uri);
            xhr.onreadystatechange = function(response){
                if(xhr.readyState == 4){
                  alert("Calendario compartido");
                }else{
                    alert("no se pudo compartir");
                }
            }
            xhr.setRequestHeader("Authorization", tokenizacion);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(obj);

            }
        
          });
      //}
      
        }

        function getDatosGrupos() {
            servicioalugrupo.getNumEmailAlumnos(vm.grupo).then(function (data) {
                emails = data;
                console.log(emails);
            }).catch(function (err) { });

        }

        function grupos(){
            serviciogrupo.getGrupo().then(function (data) {
                vm.datos_grupo=data;
            });
        }

        function getCursoActual() {
            serviciocurso.getcursoActual().then(function(data) {
                vm.datos_Curso_Actual = data[0];
                var anioI= new Date(vm.datos_Curso_Actual.anioInicio);
                var anioF= new Date(vm.datos_Curso_Actual.anioFin);
                vm.ciclo=anioI.getFullYear().toString() + "-" + anioF.getFullYear().toString(),

                console.log("curso actual");
                console.log(vm.ciclo);
            }).catch(function(err) {});
        }

        function validaFechaNacimiento(){
             
                    pre = moment(vm.fechaInicio, "DD/MM/YYYY", true);
                   
                        if(pre.isValid()){
                            var actual = moment(new Date());
                            var fNacimiento = moment([pre.get('year'), pre.get('month'), pre.get('date')]);
                            //vm.objAlumno.edad =   actual.diff(fNacimiento, 'years');
                             
                        }else{
                             swal("Ups!",'Fecha invalida!', 'error');
                             
                        }   
                        

        }



    }

})();