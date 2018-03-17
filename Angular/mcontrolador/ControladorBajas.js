(function() {
    angular.module("primariaAngular").controller("bajasCtrl", BajasController);

    function BajasController($http, $scope, Flash, $auth,validaciones,toastr,servicioalumno, serviciodocente,serviciocurso) {
        var vm = this;
        vm.getCursoActual=getCursoActual;
  
        vm.currentPage = 1;
        vm.pageSize = 10;
        vm.q = "";
        vm.bajaAlumnos=[];
        vm.bajaDocentes=[];
        vm.Init = Init;
        
        Init();
       
        function Init() {
            getAlumnosBaja();
            getBajaDocentes();
            getCursoActual();
           
            
        }

        function getAlumnosBaja(){
          servicioalumno.getAlumnosBaja().then(function(data) {
            vm.bajaAlumnos = data;
          });


        }

        function getBajaDocentes(){
          serviciodocente.getBajaDocentes().then(function(data) {
            vm.bajaDocentes = data;
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





        

    }
})();