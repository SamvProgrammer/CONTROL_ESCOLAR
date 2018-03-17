(function() {
    angular.module("primariaAngular").controller("MateriaCtrl",MateriaController);

    function MateriaController($http, serviciomateria, $scope,Flash,$auth,validaciones,toastr,serviciocurso) {
        var vm = this;
        vm.getMaterias = getMaterias;
        vm.agregarMateria = agregarMateria;
        vm.getMateriaByGrado = getMateriaByGrado;
        vm.getMateriaByTagName=getMateriaByTagName;
        vm.deleteMateria=deleteMateria;
        vm.updateMateria=updateMateria;
        vm.getMateriasByDocente=getMateriasByDocente;
        vm.materiaExistente=materiaExistente;
        vm.limpiainputs=limpiainputs;
        vm.getCursoActual=getCursoActual;
        vm.valida=valida;
        vm.Init = Init;
        //vm.getevaluarGrado =getevaluarGrado;

        vm.currentPage = 1;
        vm.pageSize = 10;
        vm.q="";
       
        vm.oculta = false;
        vm.advertencia = [];
        vm.datos_materias = [];
        vm.nombre = "";
        vm.objMateria={};
        vm.materia = {};
        vm.addMateria = {};
        vm.gradoMateria = {};
        vm.upMateria={};
        vm.eliminarMateria={};
        vm.getmateriaDocente={};
        vm.matexiste={};
        
        Init();
        //getPais();
        function Init() {
            getMaterias();
           // valida();
           getCursoActual();
            $scope.$on('actualizame', getMaterias);
            

        }


        function getMaterias() {
            serviciomateria.getMateria().then(function(data) {
                vm.datos_materias = data;
                console.log(vm.datos_materias);
            }).catch(function(err) {});
        }

        function agregarMateria(obj) {
            vm.oculta = false;
            vm.advertencia = [];
            serviciomateria.addMateria(obj).then(function(data) {
               // var message='Materia <strong> agregada ! </strong> correctamente';
               // var id = Flash.create('success', message, 2500, {class: 'custom-class', id: 'custom-id'}, true);
                swal("Exito!", "Materia agregada correctamente!", "success");
                vm.objMateria = {};

            }).catch(function(err){
                 vm.oculta = false;
                 vm.advertencia = err;
                 //var message = '<strong>Error!</strong> al agregar';
                 //var id = Flash.create('danger', message, 2500, {class: 'custom-class', id: 'custom-id'}, true);
                 swal("Ups!", "No se han llenado los campos!", "error");  
                 
        })
        }

         function getMateriaByTagName(id) {//busca por ID
            serviciomateria.getMateriaByTagName(id).then(function(data) {
                vm.objMateria = data;
                console.log(vm.objMateria);
            }).catch(function(err) {});
        }

        function getMateriaByGrado(grado) {
            serviciomateria.getMateriaByGrado(grado).then(function(data) {
                vm.gradoMateria = data;
                console.log(vm.gradoMateria);
            }).catch(function(err) {});
        }
        function updateMateria(obj) {
            serviciomateria.materiaExistente(obj.nombre,obj.grado).then(function(data){
                swal("Ups!", "Materia ya existente!", "error");  

            }).catch(function(er){
                 serviciomateria.updateMateria(obj).then(function(data) {
                
                swal("Ok!", "Materia actualizada correctamente!", "success");  
                console.log("Se actualizo");
                $scope.$emit('actualizame');
            }).catch(function(err){
                    console.log("no se que poner")
            });
            });
           
        }

        function deleteMateria(obj) {
                swal({
                      title: "Estas seguro?",
                      text: "Esta materia esta asignada a un grado ahora!",
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    })
                    .then((willDelete) => {
                      if (willDelete) {
                        
                         serviciomateria.deleteMateria(obj).then(function(data) {
                         vm.eliminarMateria = data;
                        console.log(vm.eliminarMateria);
                        $scope.$emit('actualizame');
                        swal("Materia inactivada!", {
                            icon: "success",
                            });
                    });

                    }else{}
                  });


        }

        function getMateriasByDocente(obj) {
            console.log(obj);
            serviciomateria.getMateriasByDocente(obj).then(function(data) {
                vm.getmateriaDocente = data;
                console.log(vm.getmateriaDocente);
            })
        }
        
        function materiaExistente() {
            serviciomateria.materiaExistente(vm.objMateria.nombre,vm.objMateria.grado).then(function(data) {
                //vm.objMateria.nombre="";
                //vm.objMateria.grado="";
                swal("Ups!", "Esta materia ya existe", "error");  
            }).catch(function(er){});
        }

        /*
         function materiaExistente(obj) {
            console.log(obj);
            serviciomateria.materiaExistente(obj).then(function(data) {
                vm.matexiste=data;;
                toastr.warning('Materia ya existente','Advertencia');
            }).catch(function(er){});
        }

        */

        function valida($event, num) {
            console.log(num);

            switch (num) {
                case 1:
                    if (!validaciones.solodirecciones($event)) {
                        $event.preventDefault();
                        swal("Ups!", "Este campo permite letras,acentos,numeros y .,°#/!", "error");  
                        
                    }

                    break;

                case 2:
                    if (!validaciones.solonumeros($event)) {
                        $event.preventDefault();
                        swal("Ups!", "Este campo solo permite numeros", "error");  
                        
                    }
                    break;
                case 3:
                    if (!validaciones.letrasgrupo($event)) {
                        $event.preventDefault();
                        swal("Ups!", "Este campo solo permite letras!", "error");  
                        
                    }
                    break;
                case 4:
                    if (!validaciones.solonombres($event)) {
                        $event.preventDefault();
                        swal("Ups!", "Este campo solo permite letras y espacios!", "error");  
                        
                    }
                    break;
                case 5:
                    if (!validaciones.solohoras($event)) {
                        $event.preventDefault();
                        swal("Ups!", "Este campo solo permite numeros del 1 al 9!", "error"); 
                        
                    }
                    break;
            }

        }

      

        function limpiainputs(){
            vm.objMateria = {};
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

        /*function getevaluarGrado($event) {

            var msj = validaciones.validarGrado(vm.objMateria.grado);
                console.log(vm.objMateria.grado);
                if(!msj){
                     vm.objMateria.grado = "";
                    toastr.warning('Solo acepta grados del 1 - 6!', 'Advertencia'); 
               } 
        }*/

    }
})();