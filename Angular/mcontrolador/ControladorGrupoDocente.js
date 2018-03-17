(function() {
    angular.module("primariaAngular").controller("GpoDocenteCtrl", GrupoDocenteController);

    function GrupoDocenteController($http, serviciogrupodocente, $scope) {
        var vm = this;
        vm.getDocentesGrupo =getDocentesGrupo;
        vm.agregarDocenteGrupo = agregarDocenteGrupo;
        
        vm.Init = Init;
        //vm.ObtenInfoCodigoPostal = ObtenInfoCodigoPostal;
        //vm.validar_Datos = validar_Datos;
        vm.datos_docentesgrupo = [];
        vm.nombre = "";
        vm.docentegrupo = {};
        
        Init();
        //getPais();
        function Init() {
            getDocentesGrupo();
            $scope.$on('actualizame', getDocentesGrupo);
        }


        function getDocentesGrupo() {
            serviciogrupodocente.getDocentegrupo().then(function(data) {
                vm.datos_docentesgrupo = data;
                console.log(vm.datos_docentesgrupo);
            }).catch(function(err) {});
        }

        function agregarDocenteGrupo(obj) {
            serviciogrupodocente.addDocentegrupo(obj).then(function(data) {
                vm.docentegrupo = data;
                console.log(vm.docentegrupo);
            })
        }






    }
})();