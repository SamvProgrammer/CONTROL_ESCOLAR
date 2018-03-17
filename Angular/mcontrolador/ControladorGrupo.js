(function() {
    angular.module("primariaAngular").controller("GrupoCtrl", GrupoController);

    function GrupoController($http, serviciogrupo, servicioalugrupo, $scope,Flash,$auth,validaciones,  toastr, serviciocurso, servicioalugrupo) {
        var vm = this;
        vm.getGrupo =getGrupo;
        vm.agregarGrupo = agregarGrupo;
        vm.getGrupoByTagName=getGrupoByTagName;
        vm.buscarGradoEnGrupo = buscarGradoEnGrupo;
        vm.eliminarGrupo=eliminarGrupo;
        vm.updateGrupo=updateGrupo;
        vm.grupoExistente=grupoExistente;
        vm.Init = Init;
        vm.valida=valida;
        vm.getGruposByGrado=getGruposByGrado;
        vm.getevaluargrupo=getevaluargrupo;
        vm.limpiainputs=limpiainputs;
        vm.validarMaxAlumnos=validarMaxAlumnos;
        vm.getGruposBusqueda=getGruposBusqueda;
        vm.getGradoBusqueda = getGradoBusqueda;
        vm.getGrupoBusqueda = getGrupoBusqueda;
        //vm.getTotalAlumnos=getTotalAlumnos;
        //vm.ObtenInfoCodigoPostal = ObtenInfoCodigoPostal;
        //vm.validar_Datos = validar_Datos;
        vm.datos_grupo = [];
        vm.nombre = "";
        vm.grupo = {};
        vm.objGrupo = {};
        vm.addGrupo={};
        vm.gradoGrupo={};
        vm.upGrupo={};
        vm.eliminarG={};
        vm.grado_seleccionado = "";




        vm.grado = [
                      {idGrado : '1'},
                      {idGrado : '2'},
                      {idGrado : '3'},
                      {idGrado : '4'},
                      {idGrado : '5'},
                      {idGrado : '6'}

                   ];


        vm.currentPage = 1;
        vm.pageSize = 10;
        vm.q="";
        vm.parametro="";
        vm.valor="";
        vm.gru=false;
        vm.gra=false;
        vm.va=false;
        Init();
        //getPais();
        function Init() {
            getGrupo();
            $scope.$on('actualizame', getGrupo);
            getCursoActual();
        }


        function getGrupo() {
            serviciogrupo.getGrupo().then(function(data) {
                vm.datos_grupo = data;
                console.log(vm.datos_grupo);
                //getTotalAlumnos();
                
            }).catch(function(err) {});
        }

         function getGruposBusqueda(valor){
            console.log(valor);
            if(valor === "grado"){
                serviciogrupo.getGrados().then(function(data){
                vm.gradosBusqueda=data;
                console.log(vm.gradosBusqueda);
                vm.gra=true;
                });
            }
            if (valor === "grupo") {
                serviciogrupo.getGrupos().then(function(data){
                vm.gruposBusqueda=data;
                console.log(vm.gruposBusqueda);
                vm.gru=true;
                });
            }
            if (valor === "vacio") {
                serviciogrupo.getGruposVacios().then(function(data){
                vm.gruposVacios=data;
                console.log(vm.gruposVacios);
                vm.va=true;
                });
            }
            vm.gra=false;
            vm.gru=false;
            vm.va=false;

            
        }

        function getGradoBusqueda(){
            serviciogrupo.getGrados2(vm.valor).then(function(data){
                vm.gradoB=data;
                console.log(vm.gradoB);
                });
        }
        function getGrupoBusqueda(){
            serviciogrupo.getGrupo2(vm.valor).then(function(data){
                vm.grupoB=data;
                console.log(vm.grupoB);
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

        function getGrupoByTagName(nombre) {//id
            console.log(nombre);
            serviciogrupo.getGrupoByTagName(nombre).then(function(data) {
                console.log("entró al método")
                vm.objGrupo = data[0];
                console.log(vm.objGrupo);
            }).catch(function(err) {});
        }

        function eliminarGrupo(obj) {
            serviciogrupo.gruposNoPuedeEliminar(obj).then(function(data) {
                vm.grupoNoElim=data;
                if(vm.grupoNoElim.length > 0){
                    swal("Ups!","Este grupo está asignado a un docente y tiene alumnos, no se puede inactivar", "error");
                    
                 }else{
                    swal({
                      title: "¿Estás seguro?",
                      text: "¡Este grupo aún no tiene alumnos!",
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    })
                    .then((willDelete) => {
                      if (willDelete) {
                        serviciogrupo.eliminar(obj).then(function(data) {
                        vm.eliminarG = data;
                        console.log(vm.eliminarG);
                        $scope.$emit('actualizame');
                        swal("¡Bien!", "Grupo inactivado correctamente", {
                            icon:"success",
                        });
                        });
                        }
                     });
                    
                 }
            });
        }
        

        function agregarGrupo(obj) {
            console.log(obj);
            obj.idCurso=vm.datos_Curso_Actual.idCurso;
             serviciogrupo.grupoExistente(obj.grado,obj.nombre).then(function(data) {
                        vm.objGrupo.grado="";
                        vm.objGrupo.nombre="";
                        swal("Ups!", "¡El grupo que intentas agregar ya existe!", "error");  
            }).catch(function(er){

                       serviciogrupo.addGrupo(obj).then(function(data) {
                            console.log(vm.addGrupo);
                            swal("Exito!", "¡Grupo agregado correctamente!", "success");
                            vm.objGrupo={};
                       }).catch(function(err){
                
                            swal("Ups!", "¡No se han rellenado los campos!", "error");  
                       });

            });
            
        }

        function buscarGradoEnGrupo(obj) {
            serviciogrupo.buscarGradoEnGrupo(obj).then(function(data) {
                vm.gradoGrupo = data;
                console.log(vm.gradoGrupo);
            }).catch(function(err) {});
        }

        function updateGrupo(obj) {
            console.log(obj);
            serviciogrupo.actualizarGrupo(obj).then(function(data) {
             vm.upGrupo=data;    
                console.log("Se actualizo");
                $scope.$emit('actualizame');
                console.log("algo");
            });
            
        }
        
        function grupoExistente() {
            serviciogrupo.grupoExistente(vm.objGrupo.grado,vm.objGrupo.nombre).then(function(data) {
                vm.objGrupo.grado="";
                vm.objGrupo.nombre="";
                swal("Ups!", "¡Grupo ya existente!", "error");  
            }).catch(function(er){});
        }
        function limpiainputs(){
            vm.objGrupo={};
        }

        function valida($event, num) {
            console.log(num);

            switch (num) {
                case 1:
                    if (!validaciones.solodirecciones($event)) {
                        $event.preventDefault();
                        swal("Ups!",'¡Este campo permite letras, acentos, números y .,°#/!', 'error');  
                        
                    }

                    break;

                case 2:
                    if (!validaciones.solonumeros($event)) {
                        $event.preventDefault();
                        swal("Ups!",'¡Este campo solo permite números!', 'error'); 
                        
                    }
                    break;
                case 3:
                    if (!validaciones.letrasgrupo($event)) {
                        $event.preventDefault();
                        swal("Ups!",'¡Este campo solo permite letras!', 'error'); 
                        
                    }
                    break;
                case 4:
                    if (!validaciones.solonombres($event)) {
                        $event.preventDefault();
                        swal("Ups!",'¡Este campo solo permite letras y espacios!', 'error'); 
                        
                    }
                    break;
            }

        }

        function getGruposByGrado(){
           serviciogrupo.getGruposByGrado(vm.objGrupo.grado).then(function(data) {
                vm.datos_grupos = data;

            }).catch(function(err){
                  vm.datos_grupos = [];
                  vm.grupo.selected = undefined;
            
                 /* var message = 'No hay <strong>grupos </strong> registrados para este grado';
                  var id = Flash.create('warning', message, 2500, {class: 'custom-class', id: 'custom-id'}, true);*/
            });

        }

        function getevaluargrupo($event){
            var msj= validaciones.letrasgrupo($event);
           
            if(msj){
                   
            }else{
                 $event.preventDefault();
                 swal("Ups!",'¡Este campo solo permite letras!', 'error'); 
                
                
            }
        }
          function validarMaxAlumnos(max, total) {
            if(max < total){
                swal("Ups!","¡La capacidad de grupo no puede ser menor al total de alumnos","error");
            }
        }



    }
})();