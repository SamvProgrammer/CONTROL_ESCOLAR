(function() {
    angular.module("primariaAngular").controller("registroEvalCtrl", RegistroEvalController);

    function RegistroEvalController($http, $scope, Flash, $auth,validaciones,toastr, servicioevaluar, servicioalumno, serviciogrupo,serviciocurso) {
        var vm = this;
  
        vm.currentPage = 1;
        vm.pageSize = 10;
        vm.q = "";
        vm.bim="";
        vm.grupo="";
        vm.datos_grupo={};
        vm.alumnos={};
        vm.alumno="";

        vm.obtenerEvaluaciones =obtenerEvaluaciones;
        vm.pruebaValida = pruebaValida;
        vm.updateEvaluacionesAlumno=updateEvaluacionesAlumno;
        vm.updateEvaluacionesAlumno=updateEvaluacionesAlumno;
        vm.traerAlumnosGrupo=traerAlumnosGrupo;
        vm.serviciocurso=serviciocurso;
        

        vm.Init = Init;
        
        Init();
       
        function Init() {
           grupos();
           getCursoActual();
            
        }
        vm.bimestres = [
                      {idBimestre : 1, nombre: 'BIMESTRE 1'},
                      {idBimestre : 2, nombre: 'BIMESTRE 2'},
                      {idBimestre : 3, nombre: 'BIMESTRE 3'},
                      {idBimestre : 4, nombre: 'BIMESTRE 4'},
                      {idBimestre : 5, nombre: 'BIMESTRE 5'}
            ];

            function grupos(){
            serviciogrupo.getGrupo().then(function (data) {
                vm.datos_grupo=data;
            });
        }

        function traerAlumnosGrupo(){
            servicioalumno.getAlumnosByGrupo(vm.grupo).then(function (data) {
                vm.alumnos=data;
                console.log(vm.alumnos);
            });
        }

        function obtenerEvaluaciones() {
            console.log("entro a evaluacion");
            //valiFechasEval(1);
            
            servicioevaluar.getEvaluacionesAlumnoDirector(vm.alumno, vm.bim).then(function(data) {
              vm.getEvaluaciones=data;
              console.log(vm.getEvaluaciones);
              servicioevaluar.getNumMaterias(vm.getEvaluaciones[0].idDocente, vm.getEvaluaciones[0].idAlumno).then(function(data) {
                vm.getNumMaterias=parseFloat(data[0].numMat) ;
              console.log(vm.getEvaluaciones);
              console.log(vm.getNumMaterias);
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
                    obj.nombre_completo = vm.getEvaluaciones[i].nombre_completo;
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
            });
        }

        function pruebaValida(calif,j,i) {
          //var tecla  = String.fromCharCode($event.keyCode);
          //
          console.log("*****************++");
          console.log(calif);
          if(angular.equals(calif,'10')){
              return;
          }else{
            var msj=validaciones.solocalificaciones(calif, j, i);
              if(!msj){
                swal("Ups!", "Formato inválido, solo acepta (5.0 - 10)!", "error");
                vm.evaluaciones[j].datosMateria.califMateria[i] = 0;
                
              }
          }
        }

        function updateEvaluacionesAlumno($event){
          vm.evaluacionArr = {
              calif : []
              };

                for(var j=0; j < vm.evaluaciones.length; j++){
                  for(var i=0; i < vm.evaluaciones[0].datosMateria.idMateria.length; i++){
                  vm.evaluacion={};
                  vm.evaluacion.idAlumno= vm.evaluaciones[j].idAlumno;
                  vm.evaluacion.idBimestre =vm.bim;
                  vm.evaluacion.idCurso =vm.evaluaciones[j].idCurso;
                  vm.evaluacion.idDocente=vm.evaluaciones[j].idDocente;
                  
                  
                    vm.evaluacion.califMateria=vm.evaluaciones[j].datosMateria.califMateria[i];
                    vm.evaluacion.promMateria=vm.evaluaciones[j].datosMateria.promMateria[i];
                    vm.evaluacion.idMateria=vm.evaluaciones[j].datosMateria.idMateria[i]; 
                  
                                     
                  vm.evaluacionArr.calif.push(vm.evaluacion);
                  }
                }
                  console.log(vm.evaluacionArr);
                  //var msj=validaciones.solocalificaciones(vm.evaluacionArr.calif);
                  //if(msj){
                        servicioevaluar.updateEvaluacionesAlumno(vm.evaluacionArr).then(function(data) {
                        swal("Exito!", "Actualizado correctamente!", "success");
                      //AQUÍ UN MENSAJE QUE DIGA QUE SE ACTUALIZÓ
                    }).catch(function(err){});
                 // }else{
                 //       vm.evaluacionArr.calif="";
                 //       swal("Ups!", "Este campo solo permite numeros del 5 al 10!", "error");
                 // }
                  


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