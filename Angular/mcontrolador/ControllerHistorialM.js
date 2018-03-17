(function() {
    angular.module("primariaAngular").controller("HistorialCtrl", HistorialController);

    function HistorialController($http, $scope, Flash, validaciones, toastr, serviciohistorial) {
        var vm = this;
        vm.Init = Init;
        vm.getHistorialUsuario = getHistorialUsuario;
        vm.getDocenteById = getDocenteById;
        vm.getAlumnoById = getAlumnoById;


        vm.currentPage = 1;
        vm.pageSize = 10;
        vm.q = "";

        Init();

        function Init() {
            console.log("ENTRO A ControllerHistorialM.js");
            getHistorialUsuario();
        }


        function getHistorialUsuario() {
            serviciohistorial.getHistorialUsuario().then(function(data) {
                vm.historial_usuario = data
                console.log(vm.historial_usuario);
            }).catch(function(err) {
                console.log("error al obtener el historial");
            });
        }

        function getDocenteById(id) {
            serviciohistorial.getDocenteById(id).then(function(data) {
                vm.docente = data[0];
                console.log(vm.docente);
            }).catch(function(err) {});

        }


        function getAlumnoById(id) {
            serviciohistorial.getAlumnoById(id).then(function(data) {
                vm.alumno = data[0];
                console.log(vm.alumno);
            }).catch(function(err) {});
        }



        





    }
})();