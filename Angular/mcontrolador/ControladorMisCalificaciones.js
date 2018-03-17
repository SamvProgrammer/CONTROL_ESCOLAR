(function() {
    angular.module("primariaAngular").controller("MiCalificacionCtrl", MiCalificacionController);
	
	function MiCalificacionController($auth, $scope,Flash, servicioevaluar ,toastr,serviciocurso) {
	        var vm = this;
          vm.Init = Init;
	        
           
            vm.obtenerEvaluaciones =obtenerEvaluaciones;
            vm.getCursoActual=getCursoActual;
            
            
            var local = JSON.parse(localStorage.getItem('perfil'));
            vm.materiaDocente={};
            vm.bim="";
           
            vm.datos_materias_alumno={};
             vm.fechaInicio;
              vm.fechaFin;
            


             vm.bimestres = [
                      {idBimestre : 1, nombre: 'BIMESTRE 1'},
                      {idBimestre : 2, nombre: 'BIMESTRE 2'},
                      {idBimestre : 3, nombre: 'BIMESTRE 3'},
                      {idBimestre : 4, nombre: 'BIMESTRE 4'},
                      {idBimestre : 5, nombre: 'BIMESTRE 5'}
            ];
            
	       
	        Init();

	        function Init() {
                getCursoActual();

            }

           


        function obtenerEvaluaciones() {
            console.log("entro a evaluacion");
            //valiFechasEval(1);
            servicioevaluar.getEvaluacionDeAlumno(vm.bim, local.id_user).then(function(data) {
              vm.getEvaluaciones=data;
              //console.log(vm.getEvaluaciones);
             
                vm.evaluaciones = [];
                var obj = {};
                var id_alum = 0;
                
                


                for(var i = 0; i < vm.getEvaluaciones.length; i++){
                  
                 

                  if(vm.getEvaluaciones[i].idAlumno !== id_alum){
                    if(i !== 0){
                      vm.evaluaciones.push(obj);
                    }
                    obj = {};
                    obj.idAlumno = vm.getEvaluaciones[i].idAlumno;
                    obj.idBimestre = vm.getEvaluaciones[i].idBimestre;
                    obj.idCurso = vm.getEvaluaciones[i].idCurso;
                    obj.idDocente = vm.getEvaluaciones[i].idDocente;
                    obj.datosMateria = {};
                    obj.datosMateria.idMateria = [];
                    obj.datosMateria.nombreMateria = [];
                    obj.datosMateria.califMateria = [];
                    obj.datosMateria.promMateria = [];
                    obj.datosMateria.idMateria.push(vm.getEvaluaciones[i].idMateria);
                    obj.datosMateria.nombreMateria.push(vm.getEvaluaciones[i].nombre);
                    obj.datosMateria.califMateria.push(parseFloat(vm.getEvaluaciones[i].califMateria));
                    obj.datosMateria.promMateria.push(parseFloat(vm.getEvaluaciones[i].promMateria));
                  }else{
                    obj.datosMateria.idMateria.push(vm.getEvaluaciones[i].idMateria);
                    obj.datosMateria.nombreMateria.push(vm.getEvaluaciones[i].nombre);
                    obj.datosMateria.califMateria.push(parseFloat(vm.getEvaluaciones[i].califMateria));
                    obj.datosMateria.promMateria.push(parseFloat(vm.getEvaluaciones[i].promMateria));
                  }
                  id_alum = vm.getEvaluaciones[i].idAlumno;
                }
                vm.evaluaciones.push(obj);
                console.log(vm.evaluaciones);


                });
            //});
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