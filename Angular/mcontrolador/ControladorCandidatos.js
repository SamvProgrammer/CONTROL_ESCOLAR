 (function() {
    angular.module("primariaAngular")
    .controller("CandidatosCtrl", CandidatosController);

     

    function CandidatosController($scope, Flash, $http, toastr, serviciomateria, serviciogrupo, serviciocurso, servicioalugrupo, servicioevaluar, serviciomateria) {
        var vm = this;
        vm.obtenerPromedioFinal=obtenerPromedioFinal;
        vm.listaPromovidos = listaPromovidos;
        vm.comprobarPromovidos=comprobarPromovidos;
        vm.getCursoActual=getCursoActual;
        vm.ver=ver;


        var local = JSON.parse(localStorage.getItem('perfil'));
        vm.init=init;
        vm.prome = [];
        vm.aprobados=[];
        vm.reprobados=[];
        vm.parametros = [];
        vm.grupoNuevo={};



        init();

         function init(){
            obtenerGrupoDelDocente();
            promediosFinales();
            cursoEnEspera();
            getCursoActual();
            
          
        }

        function ver(p){
          
          vm.parametros.push(p);
          console.log(vm.parametros);
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

        function promediosFinales(){
            serviciomateria.promediosFinales(local.id_user).then(function(data){
                vm.promedios = data;
                console.log(vm.promedios);


                
                var obj = {};
                var id_alum = 0;
                
                

                for(var i = 0; i < vm.promedios.length; i++){
                  
                   

                  if(vm.promedios[i].idAlumno !== id_alum){
                    if(i !== 0){
                        vm.prome.push(obj);
                    }
                    
                  
                    obj = {};
                    obj.idAlumno = vm.promedios[i].idAlumno;
                    
                    obj.idCurso = vm.promedios[i].idCurso;
                    obj.idDocente = vm.promedios[i].idDocente;
                    obj.nombre_completo = vm.promedios[i].nombre_completo;
                    obj.datosMateria = {};
                    obj.datosMateria.idMateria = [];
                    obj.datosMateria.nombreMateria = [];
                    obj.datosMateria.promedio = [];
                    obj.datosMateria.idMateria.push(vm.promedios[i].idMateria);
                    obj.datosMateria.nombreMateria.push(vm.promedios[i].nombre);
                    obj.datosMateria.promedio.push(parseFloat(vm.promedios[i].promedio));

                  }else{
     
                    obj.datosMateria.idMateria.push(vm.promedios[i].idMateria);
                    obj.datosMateria.nombreMateria.push(vm.promedios[i].nombre);
                    obj.datosMateria.promedio.push(parseFloat(vm.promedios[i].promedio));

                  }
                  id_alum = vm.promedios[i].idAlumno;

                 
                }
                vm.prome.push(obj);
                console.log(vm.prome);



            });
        }


        function obtenerGrupoDelDocente() {
            serviciogrupo.getGrupoDocente(local.id_user).then(function(data) {
                vm.grupoDelDocente = data;
                console.log("grupo del dpocentre");
                console.log(vm.grupoDelDocente);
                
            })
        }


        function obtenerPromedioFinal(){
            serviciomateria.promedioCurso(local.id_user).then(function(data) {
                vm.p=data;
                console.log(vm.p);
                var arr=[];
                for(var j=0; j<vm.p.length; j++){
                    var aux={};
                    aux.idAlumno=vm.p[j].idAlumno;
                    aux.idCurso=vm.p[j].idCurso;
                    aux.idDocente=vm.p[j].idDocente;
                    aux.grado=vm.p[j].grado;
                    aux.nombre_completo=vm.p[j].nombre_completo;
                    var a=parseFloat(vm.p[j].promedioFinal);
                    var b=a.toFixed(1);
                    aux.promedioFinal=b;
                    arr.push(aux);
                    
                }

                
                //console.log(vm.p);
                
                for(var i=0; i < arr.length; i++){
                    if(vm.p[i].promedioFinal>=6){
                        vm.aprobados.push(arr[i]);

                    }else{
                        vm.reprobados.push(arr[i]);
                    }
                }
                console.log(vm.aprobados);
                console.log(vm.reprobados);
                mandarEstadoAlumno();
            });
            vm.aprobados=[];
            vm.reprobados=[];

            
        }

        function mandarEstadoAlumno(){
            for(var i=0; i < vm.aprobados.length; i++){
                if(vm.aprobados[i].promedioFinal >= 6){
                    servicioalugrupo.promovidoOno(1, vm.aprobados[i].idAlumno).then(function(data) {});
                }
                if(vm.aprobados[i].grado === 7){
                    servicioalugrupo.promovidoOno(3, vm.aprobados[i].idAlumno).then(function(data) {});
                }

            }

            for(var j=0; j< vm.reprobados.length; j++){
                    
                    servicioalugrupo.promovidoOno(0, vm.reprobados[j].idAlumno).then(function(data) {});
                }

            }
            //vamos a mandar el estado de Aprobado o reprobado al alumno
            //meter un for para recorrer la lista de promovidos if el promedio esta
            //entre 5.5 y 5.9, el estado del alumno es = 2

            //recorrer el arreglo de reprobados y ponerles estado = 0
        

        function cursoEnEspera(){
            serviciocurso.cursoEnEspera().then(function(data) {
                vm.cursoEnEspera=data;
                console.log(vm.cursoEnEspera);
            });

        }

        function listaPromovidos(){

            var obj={};
            var nuevo_grado =vm.grupoDelDocente[0].grado+1;
            obj.nombre = vm.grupoDelDocente[0].nombre;
            obj.grado = nuevo_grado;
            obj.maxAlumnos = 45;
            obj.totalAlumnos = vm.aprobados.length;
            obj.idCurso = vm.cursoEnEspera[0].idCurso;
            obj.estatus =1;
            serviciogrupo.addGrupo(obj).then(function(data) {
                    console.log(data);
                vm.grupoNuevo=data;

            for(var i=0; i < vm.aprobados.length; i++){
                var obj2={};
                obj2.idAlumno=vm.aprobados[i].idAlumno;
                obj2.idCurso=vm.cursoEnEspera[0].idCurso;
                obj2.idGrupo = vm.grupoNuevo.idGrupo;
                servicioalugrupo.agregarAluGrup(obj2).then(function(data) {});
                //actualizámos el grupo del alumno
                //serviciogrupo.actualizarGrupoAlumno(nuevo_grado,vm.grupoDelDocente[0].nombre, vm.aprobados[i].idAlumno).then(function(data) {});

            }

            //serviciogrupo.quitarleGrupoADocente(local.id_user).then(function(data) {});

            });

            var nuevoGrado=vm.grupoDelDocente[0].grado+1;

           serviciomateria.materiasDeGrado(nuevoGrado).then(function(data) {
            vm.materias=data;
            console.log(vm.materias);
            vm.eval=[];
            vm.arrCalifNuevo=[];
            vm.objCalifNuevo={};
            vm.cont=0;
            //crear los nuevos registros de la tabla evaluación
            for(var j=0; j < vm.aprobados.length; j++){
                for(var a=1; a < 6; a++){
                    

                    for(var b=0; b < vm.materias.length; b++){
                        vm.cont++;
                        vm.objCalifNuevo={};
                        vm.objCalifNuevo.idAlumno="";
                        vm.objCalifNuevo.idBimestre="";
                        vm.objCalifNuevo.idCurso="";
                        vm.objCalifNuevo.idDocente="";
                        vm.objCalifNuevo.idMateria="";
                        vm.objCalifNuevo.califMateria="";
                        vm.objCalifNuevo.promMateria="";
                        //-----------------
                        vm.objCalifNuevo.idAlumno=vm.aprobados[j].idAlumno;
                        vm.objCalifNuevo.idBimestre=a;
                        vm.objCalifNuevo.idCurso=vm.cursoEnEspera[0].idCurso;
                        vm.objCalifNuevo.idDocente=0;
                        vm.objCalifNuevo.idMateria=vm.materias[b].idMateria;
                        vm.objCalifNuevo.califMateria=0.0;
                        vm.objCalifNuevo.promMateria=0.0;
                        vm.arrCalifNuevo.push(vm.objCalifNuevo);
                    }
                    

                }
        }
        console.log(vm.cont);
        
        console.log(vm.arrCalifNuevo);
        servicioevaluar.saveAlumnoEvaluar(vm.arrCalifNuevo).then(function(data) {});
        //listaNoPromovidos();
        $scope.$emit('actualizame');
        swal("Exito!","Los Alumnos fueron promovidos", "success");
            
        });
       
        }

        function comprobarPromovidos(){
            if(vm.parametros.length > 0){
            swal({
                      title: "¿Seguro de realizar cambios?",
                      text: "los alumnos que faltan  por seleccionar no serán promovidos",
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    })
                    .then((willDelete) => {
                      if (willDelete) {
                        listaPromovidosConCondicones();
                        

                    }else{}
                  });

                }else{
                    swal({
                      title: "¡no haz seleccionado ningún alumno!",
                      text: "",
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    })

                }
        }

        function listaPromovidosConCondicones(){

            var obj={};
            var nuevo_grado =vm.grupoDelDocente[0].grado+1;
            obj.nombre = vm.grupoDelDocente[0].nombre;
            obj.grado = nuevo_grado;
            obj.maxAlumnos = 45;
            obj.totalAlumnos = vm.parametros.length;
            obj.idCurso = vm.cursoEnEspera[0].idCurso;
            obj.estatus =1;
            //serviciogrupo.addGrupo(obj).then(function(data) {
                    //console.log(data);
                //vm.grupoNuevo=data;
                //vm.aprobados = vm.parametros
            for(var i=0; i < vm.parametros.length; i++){
                var obj2={};
                obj2.idAlumno=vm.parametros[i];
                obj2.idCurso=vm.cursoEnEspera[0].idCurso;
                obj2.idGrupo = vm.grupoNuevo.idGrupo;
                servicioalugrupo.agregarAluGrup(obj2).then(function(data) {});
                //actualizámos el grupo del alumno
                //serviciogrupo.actualizarGrupoAlumno(nuevo_grado,vm.grupoDelDocente[0].nombre, vm.aprobados[i].idAlumno).then(function(data) {});

            }

            //serviciogrupo.quitarleGrupoADocente(local.id_user).then(function(data) {});

            //});

            var nuevoGrado=vm.grupoDelDocente[0].grado+1;

           serviciomateria.materiasDeGrado(nuevoGrado).then(function(data) {
            vm.materias=data;
            console.log(vm.materias);
            vm.eval=[];
            vm.arrCalifNuevo=[];
            vm.objCalifNuevo={};
            vm.cont=0;
            //crear los nuevos registros de la tabla evaluación
            for(var j=0; j < vm.parametros.length; j++){
                for(var a=1; a < 6; a++){
                    

                    for(var b=0; b < vm.materias.length; b++){
                        vm.cont++;
                        vm.objCalifNuevo={};
                        vm.objCalifNuevo.idAlumno="";
                        vm.objCalifNuevo.idBimestre="";
                        vm.objCalifNuevo.idCurso="";
                        vm.objCalifNuevo.idDocente="";
                        vm.objCalifNuevo.idMateria="";
                        vm.objCalifNuevo.califMateria="";
                        vm.objCalifNuevo.promMateria="";
                        //-----------------
                        vm.objCalifNuevo.idAlumno=vm.parametros[j];
                        vm.objCalifNuevo.idBimestre=a;
                        vm.objCalifNuevo.idCurso=vm.cursoEnEspera[0].idCurso;
                        vm.objCalifNuevo.idDocente=0;
                        vm.objCalifNuevo.idMateria=vm.materias[b].idMateria;
                        vm.objCalifNuevo.califMateria=0.0;
                        vm.objCalifNuevo.promMateria=0.0;
                        vm.arrCalifNuevo.push(vm.objCalifNuevo);
                    }
                    

                }
        }
        console.log(vm.cont);
        
        console.log(vm.arrCalifNuevo);
        servicioevaluar.saveAlumnoEvaluar(vm.arrCalifNuevo).then(function(data) {});
        listaNoPromovidos();
        $scope.$emit('actualizame');
        swal("Exito!","Los Alumnos fueron promovidos", "success");
            
        });
       
        }


        function listaNoPromovidos(){
            serviciogrupo.grupoExistente(vm.grupoDelDocente[0].grado, vm.grupoDelDocente[0].nombre).then(function(data) {
                vm.esta =data;
                if(vm.esta.length > 0){
                    for(var i=0; i< vm.reprobados.length;i++){
                    var obj2={};
                    var nuevo_grado =vm.grupoDelDocente[0].grado;

                    obj2.idAlumno=vm.reprobados[i].idAlumno;
                    obj2.idCurso=vm.cursoEnEspera[0].idCurso;
                    obj2.idGrupo =vm.esta[0].idGrupo;
                
                servicioalugrupo.agregarAluGrup(obj2).then(function(data) {});
                //actualizámos el grupo del alumno
                //serviciogrupo.actualizarGrupoAlumno(nuevo_grado,vm.grupoDelDocente[0].nombre, vm.reprobados[i].idAlumno).then(function(data) {});

                }
            }else{
                var obj={};
                var nuevo_grado =vm.grupoDelDocente[0].grado;
                obj.nombre = vm.grupoDelDocente[0].nombre;
                obj.grado = nuevo_grado;
                obj.maxAlumnos = 45;
                obj.totalAlumnos = vm.aprobados.length;
                obj.idCurso = vm.cursoEnEspera[0].idCurso;
                obj.estatus =1;
                serviciogrupo.addGrupo(obj).then(function(data) {
                        console.log(data);
                    vm.grupoNuevo=data;


            for(var i=0; i< vm.reprobados.length;i++){
                var obj2={};
                //var nuevo_grado =vm.grupoDelDocente[0].grado;
                obj2.idAlumno=vm.reprobados[i].idAlumno;
                obj2.idCurso=vm.cursoEnEspera[0].idCurso;
                obj2.idGrupo =vm.grupoNuevo.idGrupo;
                
                servicioalugrupo.agregarAluGrup(obj2).then(function(data) {});
                //hasta aquí ya agregue al alumno a la tabla alumno_grupo con el mismo grado

                //actualizámos el grupo del alumno
                //serviciogrupo.actualizarGrupoAlumno(nuevo_grado,vm.grupoDelDocente[0].nombre, vm.reprobados[i].idAlumno).then(function(data) {});
                    }
                });
            }
                //actualizámos el grupo del alumno
                //serviciogrupo.actualizarGrupoAlumno()
            });

            serviciomateria.materiasDeGrado(vm.grupoDelDocente[0].grado).then(function(data) {
            vm.materia=data;
            console.log(vm.materia);
            vm.eval=[];
            vm.arrCalifNuevo=[];
            vm.objCalifNuevo={};
            vm.cont=0;
            //crear los nuevos registros de la tabla evaluación
            for(var j=0; j < vm.reprobados.length; j++){
                for(var a=1; a < 6; a++){
                    

                    for(var b=0; b < vm.materia.length; b++){
                        vm.cont++;
                        vm.objCalifNuevo={};
                        vm.objCalifNuevo.idAlumno="";
                        vm.objCalifNuevo.idBimestre="";
                        vm.objCalifNuevo.idCurso="";
                        vm.objCalifNuevo.idDocente="";
                        vm.objCalifNuevo.idMateria="";
                        vm.objCalifNuevo.califMateria="";
                        vm.objCalifNuevo.promMateria="";
                        //-----------------
                        vm.objCalifNuevo.idAlumno=vm.reprobados[j].idAlumno;
                        vm.objCalifNuevo.idBimestre=a;
                        vm.objCalifNuevo.idCurso=vm.cursoEnEspera[0].idCurso;
                        vm.objCalifNuevo.idDocente=0;
                        vm.objCalifNuevo.idMateria=vm.materia[b].idMateria;
                        vm.objCalifNuevo.califMateria=0.0;
                        vm.objCalifNuevo.promMateria=0.0;
                        vm.arrCalifNuevo.push(vm.objCalifNuevo);
                    }
                    

                }
        }
        console.log(vm.cont);
        
        console.log(vm.arrCalifNuevo);
        servicioevaluar.saveAlumnoEvaluar(vm.arrCalifNuevo).then(function(data) {});

            
        });




            }
        

       




    }

})();