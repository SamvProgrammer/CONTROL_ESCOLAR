(function() {
    angular.module("primariaAngular")
    .controller("MiHorarioCtrl", MiHorarioController);

     

    function MiHorarioController(serviciohorario, $scope, Flash, serviciogrupo,serviciocurso) {
        var vm = this;

        
        var local = JSON.parse(localStorage.getItem('perfil'));

        vm.mostrarHorarioPorGrupo = mostrarHorarioPorGrupo;
        vm.horarioPDF = horarioPDF;
        vm.getCursoActual=getCursoActual;



        init();

         function init(){
          ;
          getHorarioPorGrupoIdAlumno(local.id_user);
          cabeceraHorario();
          getCursoActual();
        }

        function cabeceraHorario(){
            serviciogrupo.datosCabeceraHorarioAlumno(local.id_user).then(function(data) {
                vm.datos =data;
                console.log(vm.datos);
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

       

        function getHorarioPorGrupoIdAlumno(id_alumno) {
            vm.horarioXdia = {};
            vm.horarioXdia.h7_8grupo = [];
            vm.horarioXdia.h8_9grupo = [];
            vm.horarioXdia.h9_10grupo = [];
            vm.horarioXdia.h10_11grupo = [];
            vm.horarioXdia.h11_12grupo = [];
            vm.horarioXdia.h12_13grupo = [];
            vm.horarioXdia.h13_14grupo = [];
            vm.horarioXdia.h14_15grupo = [];
                
                serviciohorario.getGrupoAlumno(local.id_user).then(function(data) {
                  vm.idGrupo = data;
                console.log(vm.idGrupo);
                serviciohorario.getHorarioPorGrupo(vm.idGrupo[0].idGrupo).then(function(data) {
                vm.getHorarioGrupo = data;
                console.log("HORARIO ALUMNO");
                console.log(vm.getHorarioGrupo);
                //INICIA LOGICA PARA  MOSTRAR HORARIO
                angular.forEach(vm.getHorarioGrupo, function(value, key) {
                    if (value.hora === '08:00:00 - 08:50:00') {
                        vm.horarioXdia.h7_8grupo.push(value.dia);
                        var val = value.nombre_materia;
                        vm.horarioXdia.h7_8grupo.push(val);
                    }
                    if (value.hora === '08:50:00 - 09:40:00') {
                        vm.horarioXdia.h8_9grupo.push(value.dia);
                        var val = value.nombre_materia;
                        vm.horarioXdia.h8_9grupo.push(val);
                    }
                    if (value.hora === '09:40:00 - 10:30:00') {
                        vm.horarioXdia.h9_10grupo.push(value.dia);
                        var val = value.nombre_materia;
                        vm.horarioXdia.h9_10grupo.push(val);
                    }
                    if (value.hora === '11:00:00 - 11:50:00') {
                        vm.horarioXdia.h10_11grupo.push(value.dia);
                        var val = value.nombre_materia;
                        vm.horarioXdia.h10_11grupo.push(val);

                    }
                    if (value.hora === '11:50:00 - 12:30:00') {
                        vm.horarioXdia.h11_12grupo.push(value.dia);
                        var val = value.nombre_materia;
                        vm.horarioXdia.h11_12grupo.push(val);

                    }

                });
                console.log("Horario por grupo");
                console.log(vm.getHorarioGrupo);
                console.log("h11_12");
                console.log(vm.horarioXdia.h11_12grupo);
                    }).catch(function(err) {

                 });
            }).catch(function(err) {

            });
        }





        function mostrarHorarioPorGrupo(dia, hora) {
            vm.salida = "";
            if (vm.getHorarioGrupo !== undefined) {
                switch (hora) {
                    case '08:00:00 - 08:50:00':
                        var indice3 = vm.horarioXdia.h7_8grupo.indexOf(dia);
                        if (indice3 !== -1) {
                            vm.salida = vm.horarioXdia.h7_8grupo[indice3 + 1];
                            //console.log("ESTOY EN EL IF 7 A 8");
                            //console.log(vm.horarioXdia.h7_8);
                        }
                        break;
                    case '08:50:00 - 09:40:00':

                        var indice3 = vm.horarioXdia.h8_9grupo.indexOf(dia);
                        if (indice3 !== -1) {
                            vm.salida = vm.horarioXdia.h8_9grupo[indice3 + 1];
                            //console.log("ESTOY EN EL IF 7 A 8");
                            //console.log(vm.horarioXdia.h7_8);
                        }
                        break;
                    case '09:40:00 - 10:30:00':
                        var indice3 = vm.horarioXdia.h9_10grupo.indexOf(dia);
                        if (indice3 !== -1) {
                            vm.salida = vm.horarioXdia.h9_10grupo[indice3 + 1];
                            //console.log("ESTOY EN EL IF 7 A 8");
                            //console.log(vm.horarioXdia.h7_8);
                        }
                        break;
                    case '11:00:00 - 11:50:00':
                        var indice3 = vm.horarioXdia.h10_11grupo.indexOf(dia);
                        if (indice3 !== -1) {
                            vm.salida = vm.horarioXdia.h10_11grupo[indice3 + 1];
                            //console.log("ESTOY EN EL IF 7 A 8");
                            //console.log(vm.horarioXdia.h7_8);
                        }
                        break;
                    case '11:50:00 - 12:30:00':
                        var indice3 = vm.horarioXdia.h11_12grupo.indexOf(dia);
                        if (indice3 !== -1) {
                            vm.salida = vm.horarioXdia.h11_12grupo[indice3 + 1];
                            //console.log("ESTOY EN EL IF 7 A 8");
                            //console.log(vm.horarioXdia.h7_8);
                        }
                        break;
                    
                }
            }
            //console.log(vm.salida);
            return vm.salida;
        }


        function horarioPDF() {
            vm.arreHorario = [];
            var valores_rH = ['08:00:00 - 08:50:00', '08:50:00 - 09:40:00', '09:40:00 - 10:30:00','10:30 - 11:00', '11:00:00 - 11:50:00', '11:50:00 - 12:30:00'];
            var diasH = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
            for (var i = 0; i < valores_rH.length; i++) {
                var arreh = [valores_rH[i]];
                for (var j = 0; j < diasH.length; j++) {
                    var matH = mostrarHorarioPorGrupo(diasH[j], valores_rH[i]);
                    arreh.push(matH);
                }
                vm.arreHorario.push(arreh);
            }
            var anioI= new Date(vm.datos[0].anioInicio);
            var anioF= new Date(vm.datos[0].anioFin);
            cabecera ={
                grado: vm.datos[0].grado,
                grupo: vm.datos[0].nombre,
                profesor: vm.datos[0].nombre_completo,
                ciclo: anioI.getFullYear().toString() + "-" + anioF.getFullYear().toString()
            };
            serviciohorario.horarioPDF(vm.arreHorario, cabecera);
        }









    }

})();