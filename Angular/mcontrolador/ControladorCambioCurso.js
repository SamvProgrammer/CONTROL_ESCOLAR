(function() {
    angular.module("primariaAngular")
    .controller("CambioCursoCtrl", CambioCursoController);

     

    function CambioCursoController(servicioevaluar, $scope, Flash, servicioalumno, toastr,serviciogrupo, servicioalugrupo,serviciocurso, serviciodocente) {
        var vm = this;
        vm.getAlumnosByGrupo=getAlumnosByGrupo;
        vm.getAlumnoById=getAlumnoById;
        vm.cambiar=cambiar;
        vm.getCursoActual=getCursoActual;
        
        vm.grupo_seleccionado="";
        vm.currentPage = 1;
        vm.pageSize = 10;
        vm.q = "";
        vm.grupo_nuevo="";
      

        var local = JSON.parse(localStorage.getItem('perfil'));
        vm.init=init;



        init();

         function init(){
             grupos();

             getCursoActual();
             getAlumnosByGrupo();
             $scope.$on('actualizame',getAlumnosByGrupo);
        }

        function getAlumnosByGrupo(){
            servicioalumno.getAlumnosByGrupo(vm.grupo_seleccionado).then(function (data) {
                vm.alumnos_grupo=data;
                console.log(vm.alumnos_grupo);
                getNombreGrupo();
            });
            } 

            function grupos(){
            serviciogrupo.getGrupo().then(function (data) {
                vm.datos_grupo=data;
            });
        }

        function getAlumnoById(id) { //id
            
            servicioalumno.getAlumnoById(id).then(function(data) {
                console.log("entró al método")
                vm.objAlumnoUpdate = data;
                console.log(vm.objAlumnoUpdate);

                getGruposByGrados();
            }).catch(function(err) {});
        }

        function getGruposByGrados(){ 
            serviciogrupo.getGruposByGrado(vm.nombreGrupo.grado).then(function(data) {
                vm.grupo_grado = data;
                console.log(vm.grupo_grado);

            });
        }

        


        function cambiar(g,a){
            servicioalugrupo.cambiarDeGrupo(g,a).then(function(data){
                vm.grupoNuevo=data;
                console.log(vm.grupoNuevo);
            serviciodocente.getDocenteByGrupo(g).then(function(data){
                vm.idDocente = data[0];
                console.log(vm.idDocente);
                ///////////////
                serviciodocente.getRegistrosDeAlumno(a).then(function(data){
                    vm.registros=data;
                    console.log(vm.registros);
                for(var i=0; i<vm.registros.length;i++){
                    serviciodocente.updateIdDocente(vm.idDocente.idDocente, a).then(function(data){
                        vm.idNuevo=data;
                        console.log(vm.idNuevo);
                    });

                }
                });
            })
                $scope.$emit('actualizame');
                swal("Bien!","se cambió el grupo correctamente","success");
                
            });
        }

        function getNombreGrupo(){
            serviciogrupo.getNombreGrupo( vm.grupo_seleccionado).then(function(data){
                vm.nombreGrupo=data[0];
                console.log(vm.nombreGrupo);
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