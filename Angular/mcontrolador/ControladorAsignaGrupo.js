(function() {
    angular.module("primariaAngular").controller("AsignaGpoCtrl", AsignaGrupoController);

    function AsignaGrupoController($http, $scope, Flash, $auth,validaciones,toastr, serviciogrupo, serviciocurso, serviciodocente) {
        var vm = this;
        vm.Init = Init;
        vm.getGruposNoOcupados = getGruposNoOcupados;
        vm.verSeleccionado = verSeleccionado;
        vm.saveDocenteGrupo = saveDocenteGrupo;

        
        
        
         vm.currentPage = 1;
        vm.pageSize = 10;
        vm.q = "";
        vm.grados={};
        vm.grado="";
        vm.grupo_selected="";
        vm.docente_selected="";
        vm.grupoNoOcupado={};
        vm.datos_docentes_activos={};
        
        
        Init();
       
        function Init() {
          getGrados();
          getCursoActual();
          traerDocentesActivos();
            
        }


        function getGrados(){
          serviciogrupo.getGruposActivos().then(function(data) {
            vm.grados=data;
            console.log(vm.grados);
          });
        }


        function getGruposNoOcupados(){
          console.log(vm.grado);
           serviciogrupo.getGruposNoOcupados(vm.grado).then(function(data) {
                vm.grupoNoOcupado = data;
                console.log(vm.grupoNoOcupado);

            });        

        }

        function verSeleccionado(){
          console.log("grupo");
          console.log(vm.grupo_selected);
          console.log("docente");
          console.log(vm.docente_selected);
          //saveDocenteGrupo();

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

        function traerDocentesActivos() {
            serviciodocente.traerDocentesActivos().then(function(data) {
                vm.datos_docentes_activos = data;
                console.log(vm.datos_docentes_activos);
            }).catch(function(err) {});
        }

        function saveDocenteGrupo() {
          var grupo={};
          var nuevoGrupo =[];
            grupo.idDocente= parseInt(vm.docente_selected);
            grupo.idCurso= vm.datos_Curso_Actual.idCurso;
            grupo.idGrupo = parseInt(vm.grupo_selected);
            nuevoGrupo.push(grupo);

            serviciogrupo.saveDocenteGrupo(nuevoGrupo).then(function(data) {
                vm.grupo_docente = data;
                swal("Exito!", "Docente(a) asignado(a) al grupo ","success");
                vm.docente_selected=" ";
                vm.grupo_selected=" ";
                vm.grados={};
                console.log(vm.grupo_docente);
                
            });
        }

        

        
        






        

    }
})();