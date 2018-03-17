(function() {
    angular.module("primariaAngular").controller("AluGrupCtrl", AluGrupController);

    function AluGrupController($http, servicioalugrup, $scope, Flash) {
        var vm = this;
        vm.agregarAluGrup = agregarAluGrup;
        vm.getAluGrup = getAluGrup;
        vm.updateAluGrup = updateAluGrup;
        vm.eliminarAluGrup = eliminarAluGrup;
        vm.getTotalAlumnos=getTotalAlumnos;
            
        vm.Init = Init;
        vm.datos_alumnos = [];
        vm.nombre = "";
        vm.alumno = {};
        vm.objAlumnoUpdate = {};
        vm.addAlumno = {};
        vm.objAlumno = {};
        vm.deleteAlumno = {};
        vm.totalalumnos={};
       
        Init();
        //getPais();
        function Init() {
            getAluGrup();
            $scope.$on('actualizame', getAluGrup);
            
        }
        function getAluGrup() {
            servicioalugrup.getAluGrup().then(function(data) {
                vm.datos_alumnos = data;
                console.log(vm.datos_alumnos);
            }).catch(function(err) {});
        }
         function updateAluGrup(obj) {
            
            servicioalugrup.updateAluGrup(obj).then(function(data) {    
                console.log("Se actualizo");
                $scope.$emit('actualizame');
                console.log("algo");
            });
            
        }

        function agregarAluGrup(obj) {
            console.log(obj);
            servicioalugrup.agregarAluGrup(obj).then(function(data) {
                vm.addAlumno = data;
                console.log(vm.addAlumno);
                 var message = 'Alumno <strong>agregado !</strong> correctamente';
                 var id = Flash.create('success', message, 2500, {class: 'custom-class', id: 'custom-id'}, true);
            }).catch(function(err){
               var message = '<strong>Error!</strong> al agregar';
                 var id = Flash.create('danger', message, 2500, {class: 'custom-class', id: 'custom-id'}, true);  
            })
        }

        function eliminarAluGrup(obj) {
           servicioalugrup.eliminarAluGrup(obj).then(function(data) {
                vm.deleteAlumno = data;
                console.log(vm.deleteAlumno);
            })
        }
                function getTotalAlumnos(obj) {
           servicioalugrup.getTotalAlumnos(obj).then(function(data) {
                vm.totalalumnos = data;console.log(vm.datos_alumnos);
            }).catch(function(err) {});
        }
    }
})();
        
