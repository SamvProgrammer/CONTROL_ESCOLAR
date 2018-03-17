(function() {
    angular.module("primariaAngular")
    .controller("NuevosCtrl", NuevosController);

     

    function NuevosController($scope, Flash, $http, toastr, servicioevaluar, serviciogrupo,serviciocurso) {
        var vm = this;
        vm.habilitar = habilitar;
        vm.getCursoActual=getCursoActual;
        var local = JSON.parse(localStorage.getItem('perfil'));
        vm.init=init;
         vm.lista={};
        


        init();

         function init(){
          obtenerGrupoDelDocente();
          getCursoActual();
          
        }

        function obtenerGrupoDelDocente() {
            serviciogrupo.getGrupoDocente(local.id_user).then(function(data) {
                vm.grupoDelDocente = data;
                console.log("grupo del dpocentre");
                console.log(vm.grupoDelDocente);
                 listaPromovidos();
            })
        }

        function listaPromovidos(){
            servicioevaluar.getAlumnosNuevoDocente(vm.grupoDelDocente[0].grado, vm.grupoDelDocente[0].nombre).then(function(data) {
               vm.lista=data;
            console.log(vm.lista); 
            });
            

        }

        function habilitar(){
            
               for(var i=0; i<vm.lista.length; i++){
            servicioevaluar.asignarNuevoDocente(local.id_user, vm.lista[i].idAlumno).then(function(data) {});
                }
                 $scope.$emit('actualizame');
                swal("Bien!", "Los Alumnos pertenecen a tu grupo", "success");

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
       




    }

})();