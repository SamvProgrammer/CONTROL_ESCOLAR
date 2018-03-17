(function() {
    angular.module("primariaAngular").controller("AsignaDirecCtrl", AsignaDirecController);

    function AsignaDirecController($http, $scope, Flash, $auth,validaciones,toastr, serviciocambio, Upload, serviciodocente, serviciogrupo,serviciocurso) {
        var vm = this;

        vm.CambiarDirect=CambiarDirect;
        vm.CambiarDocente =CambiarDocente;
        vm.ver =ver;
        vm.ver2 =ver2;
        vm.cambioGrupo = cambioGrupo;
        vm.getCursoActual=getCursoActual;
        
        
        
         vm.currentPage = 1;
        vm.pageSize = 10;
        vm.q = "";
        vm.docentes={};
        vm.seleccionado={};
        vm.estado = true;
        vm.actual={};
        vm.submit = submit;
        vm.submit2 = submit2;
        vm.upload = upload;
        vm.upload2 = upload2;
        vm.seleccionado2={};
        
        
        
        vm.Init = Init;
        
        Init();
       
        function Init() {
             TraerDocentes();
             directorActual();
             //CambiarDirect();
             $scope.$on('actualizame', directorActual);
             traerDocenteSingrupo();
            getCursoActual();
            
        }

         function submit() {
            if (vm.file) {
              upload(vm.file);
            }
        }
        function submit2() {
            if (vm.file2) {
              upload2(vm.file2);
            }
        }

    // upload on file select or drop
      function upload (file) {
        Upload.upload({
            url: 'http://localhost/Control/Laravel/public/api/image/upload',
            data: {file: file}
        }).then(function (resp) {
          swal("Exito!", "Imagen subida correctamente!", "success");
            //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            //console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    }
    function upload2 (file) {
        Upload.upload({
            url: 'http://localhost/Control/Laravel/public/api/image/upload2',
            data: {file2: file}
        }).then(function (resp) {
          swal("Exito!", "Imagen subida correctamente!", "success");
            //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            //console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    }

        function ver(obj){
          vm.seleccionado= obj;
          console.log(vm.seleccionado);
          obtenerGrupo();
        }
        function ver2(obj){
          vm.seleccionado2= obj;
          console.log(vm.seleccionado2);
        }

        function directorActual(){
          serviciocambio.getDirectorActual().then(function(data) {
            vm.actual =data;
            console.log(vm.actual);

          });
        }

        function obtenerGrupo(){
          serviciogrupo.getGrupoDocente(vm.seleccionado).then(function(data) {
            vm.grup =data[0];
            console.log(vm.grup);

          });
        }

        function cambioGrupo(){
          serviciocambio.cambiarGrupoDocente(vm.seleccionado2,vm.seleccionado).then(function(data){
          console.log(data);
          swal("Bien!","Se hizo el cambio de Grupo","success");
           });
        }


        function CambiarDirect(){
              serviciocambio.docenteActivo(vm.seleccionado).then(function(data){
                vm.activo=data;
                if(vm.activo.length > 0){
                
                  swal({
                      title: "Estas seguro?",
                      text: "Este docente esta asignado a un grupo, por lo tanto necesitas asignar el grupo a cargo a otro docente",
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    })
                    .then((willDelete) => {
                      if (willDelete) {
                        var modal = document.getElementById('cambioGrupo');
                        modal.style.display = "block";
                        /*serviciocambio.cambiarGrupoDocente(vm.seleccionado,vm.actual[0].idDocente).then(function(data){
                          console.log(data);
                        });
                        serviciocambio.cambiarDocente(vm.actual[0].idDocente).then(function(data) {});
                        serviciocambio.cambiarDocenteEnUsers(2, vm.actual[0].idDocente).then(function(data) {});
                        
                      serviciocambio.cambiarDirector(vm.seleccionado).then(function(data) {
                      serviciocambio.cambiarDocenteEnUsers(1, vm.seleccionado).then(function(data) {
                        });
                      
              vm.director=data;
              console.log(vm.director);
              
              
              $scope.$emit('actualizame');
              swal("Muy bien!", "Director Agregado Correctamente", "success");
              
              }); */
                        

                    }else{}
                  });


              }else{

                  serviciocambio.cambiarDocente(vm.actual[0].idDocente).then(function(data) {
                  });
                  serviciocambio.cambiarDocenteEnUsers(2, vm.actual[0].idDocente).then(function(data) {
                  });
                serviciocambio.cambiarDirector(vm.seleccionado).then(function(data) {

              vm.director=data;
              console.log(vm.director);
              serviciocambio.cambiarDocenteEnUsers(1, vm.seleccionado).then(function(data) {
                        });
              
              $scope.$emit('actualizame');
              swal("Muy bien!", "Director Agregado Correctamente", "success");
              
              }); 
                        


                
              }
            });
            
            
        }


        function CambiarDocente(id){
            serviciocambio.cambiarDocente(id).then(function(data) {
              vm.docenteTipo=data;
              console.log(vm.docenteTipo);
              
              });
        }

        function TraerDocentes(){
            serviciocambio.traerDocentes().then(function(data) {
              vm.docentes=data;
              console.log(vm.docentes);
              
              });
        }


        function traerDocenteSingrupo(){
            serviciodocente.traerDocentesActivos().then(function(data) {
              vm.docentes_sinGrupo=data;
              console.log(vm.docentes_sinGrupo);
              
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