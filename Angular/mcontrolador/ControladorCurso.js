(function() {
    angular.module("primariaAngular").controller("CursoCtrl", CursoController);

    function CursoController($http, serviciocurso, $scope, Flash, validaciones, toastr, serviciogrupo, serviciohorario, servicioalugrupo) {
        var vm = this;
        vm.getCurso = getCurso;
        vm.getCursoByTagName = getCursoByTagName;
        vm.agregarCurso = agregarCurso;
        vm.updateCurso = updateCurso;
        vm.eliminarCurso = eliminarCurso;
        vm.getfecha=getfecha;
        vm.getCursoActual=getCursoActual;
        
        vm.Init = Init;
        vm.datos_Curso = [];
        vm.nombre = "";
        vm.curso = {};
        vm.objCurso = {};
        vm.addCurso = {};
        vm.delCurso = {};
        vm.upCurso = {};
        vm.objCursoUpdate = {};
        vm.currentPage = 1;
        vm.pageSize = 10;
        vm.q = "";
        vm.anioactual = (new Date).getFullYear();
        vm.anioposterior = vm.anioactual + 1;
        vm.limpiainputs=limpiainputs;
        vm.cursoCorrecto1 = cursoCorrecto1;
        vm.cursoCorrecto2 = cursoCorrecto2;
        vm.cursoEnEspera= cursoEnEspera;
        vm.nuevoCiclo = nuevoCiclo;


        Init();

        function Init() {
            getCurso();
            $scope.$on('actualizame', getCurso);
            cursoEnEspera();
            getCursoActual();
        }

        function getCurso() {
            serviciocurso.getcursoActual().then(function(data) {
                vm.datos_Curso = data;
                console.log(vm.datos_Curso);
            }).catch(function(err) {});
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
        function getCursoByTagName(nombre) { //id
            serviciocurso.getCursoByTagName(nombre).then(function(data) {
                vm.objCursoUpdate = data;
                //vm.objCursoUpdate.anioInicio = moment(data.anioInicio).format('DD-MM-YYYY');
                //vm.objCursoUpdate.anioFin = moment(data.anioFin).format('DD-MM-YYYY');
                vm.objCursoUpdate.anioInicio = moment(data.anioInicio).toDate();
                vm.objCursoUpdate.anioFin = moment(data.anioFin).toDate();
                console.log(vm.objCursoUpdate);
            }).catch(function(err) {});
        }

        function agregarCurso(obj) {
            var msj =  moment(obj.anioFin).isSameOrBefore(obj.anioInicio);
            //vm.resultado=data;
            if (msj) {
                
                swal("Ups!", "fecha inicial debe ser menor que la fecha final", "error");
                vm.objCurso.anioFin = null;
            } else {

                serviciocurso.addCurso(obj).then(function(data) {
                    console.log(vm.addCurso);
                    //var message='Curso <strong> agregado ! </strong> correctamente';
                    //var id = Flash.create('success', message, 2500, {class: 'custom-class', id: 'custom-id'}, true);
                     $scope.$emit('actualizame');
                    swal("Exito!", "Curso agregado correctamente!", "success");
                    vm.objCurso = {};
                }).catch(function(err) {
                    //var message = '<strong>Error!</strong> al agregar';
                    //var id = Flash.create('danger', message, 2500, {class: 'custom-class', id: 'custom-id'}, true);  
                    swal("Ups!", "Hubo un error al agregar Curso!", "error");
                })
            }
        }

        function updateCurso(obj) {


           var msj =  moment(obj.anioFin).isSameOrBefore(obj.anioInicio);

                if(msj) {
                     swal("Ups!", "La fecha final debe ser mayor que la fecha inicial", "error");
                     vm.objCurso.anioFin = null;

                } else {
                    
                    var fInicio = moment(obj.anioInicio).format("YYYY-MM-DD"); 
                    var fFinal = moment(obj.anioFin).format("YYYY-MM-DD"); 
                    var estaEnRango = moment(fInicio).isBetween( moment([new Date().getFullYear(), 7, 20]).format("YYYY-MM-DD"), moment([new Date().getFullYear(), 7, 31]).format("YYYY-MM-DD"));
    
                    var estaEnRango2 =moment(fFinal).isBetween( moment([new Date().getFullYear()+1, 6, 05]).format("YYYY-MM-DD"), moment([new Date().getFullYear()+1, 6, 15]).format("YYYY-MM-DD"));
                 //aux.anioInicio =  moment(obj.anioInicio).get('day')+"/"+moment(obj.anioInicio).get('month')+"/"+moment(obj.anioInicio).get('year');
                 //aux.anioFin =  new Date(moment(obj.anioFin).get('year'),moment(obj.anioFin).get('month'),moment(obj.anioFin).get('day'));
                 //aux.anioInicio =  new Date(moment(obj.anioInicio).get('year'), moment(obj.anioInicio).get('month'), moment(obj.anioInicio).get('day'));//moment(obj.anioInicio).toArray();
                    console.log(fInicio);
                     console.log(fFinal);
                    console.log(estaEnRango);
                    console.log("------");

                    if(estaEnRango){
                        if(estaEnRango2){
                                serviciocurso.updateCurso(obj).then(function(data) {
                                    vm.upCurso = data;
                                    console.log("Se actualizo");
                                    $scope.$emit('actualizame');
                                    swal("Exito!", "Curso actualizado correctamente!", "success");
                                });
                            }else{
                                swal("Ups!", "Fecha final no encuentra dentro del rango permitido", "error");

                            }
                        }else{
                             swal("Ups!", "Fecha inicial no encuentra dentro del rango permitido", "error");
                        }
                  //  console.log(obj);
                    /*
                    */
                    
                }
        }

        function eliminarCurso(obj) {
            swal({
                title: "Estas seguro?",
                text: "Actualmente este es el curso Activo",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
              if (willDelete) {
            serviciocurso.deleteCurso(obj).then(function(data) {
                vm.delCurso = data;
                console.log(vm.delCurso);
                $scope.$emit('actualizame');
                swal("Curso eliminado!", {
                icon: "success",
                });
            });
        }
    });
}

         function limpiainputs(){
            vm.objCurso={};
        }

        function getfecha(){
            console.log("entre a traer la fecha");
            var f = new Date();
            fechahoy=(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
        }


        function cursoCorrecto1(d){
            var fec = (d.getDate()+"/"+(d.getMonth() +1) + "/" + d.getFullYear());
            console.log(fec);
            
            var f = new Date();
            //fechahoy=(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
            var anioI = f.getFullYear();
            var minima= "21/8/"+anioI;
            var minima2= "22/8/"+anioF;
            var minima3= "23/8/"+anioF;
            var minima4= "24/8/"+anioF;
            var minima5= "25/8/"+anioF;
            var minima6= "26/8/"+anioF;
            var minima7= "27/8/"+anioF;
            var minima8= "28/8/"+anioF;
            
           

            if(fec === minima){
                console.log("bien");
            }else if(fec === minima2){
                console.log("bien");
            }else if(fec === minima3){
                console.log("bien");
            }else if(fec === minima4){
                console.log("bien");
            }else if(fec === minima5){
                console.log("bien");
            }else if(fec === minima6){
                console.log("bien");
            }else if(fec === minima7){
                console.log("bien");
            }else if(fec === minima8){
                console.log("bien");
            }else{
                 swal("Ups!","El rango de fechas es: 21/08/"+anioI+" al 28/08/"+anioI,"error");
                 vm.objCurso={};

            }

        }

        function cursoCorrecto2(d){
            var fec = (d.getDate()+"/"+(d.getMonth() +1) + "/" + d.getFullYear());
            console.log(fec);
            var f = new Date();
            //fechahoy=(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
            var anioI = f.getFullYear();
            var anioF = anioI+1;
            var minima1= "9/7/"+anioF;
            var minima2= "10/7/"+anioF;
            var minima3= "11/7/"+anioF;
            var minima4= "12/7/"+anioF;
            var minima5= "13/7/"+anioF;
            var minima6= "14/7/"+anioF;
            var minima7= "15/7/"+anioF;
            var minima8= "16/7/"+anioF;
            //var maxima = "16/7/"+anioF;

            if(fec === minima1){
                console.log("bien");
            }else if(fec === minima3){
                console.log("bien");
            }else if(fec === minima4){
                console.log("bien");
            }else if(fec === minima5){
                console.log("bien");
            }else if(fec === minima6){
                console.log("bien");
            }else if(fec === minima7){
                console.log("bien");
            }else if(fec === minima8){
                console.log("bien");
            }else{
                 swal("Ups!","El rango de fechas es: 09/07/"+anioF+" al 16/07/"+anioF,"error");
                 vm.objCurso={};

            }


        }


        function cursoEnEspera(){
            serviciocurso.cursoEnEspera().then(function(data) {
                vm.cursoEnEspera=data;
                console.log(vm.cursoEnEspera);
            });

        }

        function nuevoCiclo(){

           

           serviciocurso.cambiarCursoAUno(vm.cursoEnEspera[0].idCurso).then(function(data) {
            vm.cursoA=data;
            console.log(vm.cursoA);
            for(var i=0; i<vm.datos_Curso.length;i++){
                if (vm.datos_Curso[i].idCurso ===vm.cursoEnEspera[0].idCurso) {
                  
                }else{
                   serviciocurso.cambiarCursoACero(vm.datos_Curso[i].idCurso).then(function(data) {

                   });
                   
                }
            }
            //aquí vaciamos la tabla grupo_docente
            serviciocurso.allGrupoDocentes().then(function(data) {
                vm.datos_grupos=data;

                for(var j=0; j<vm.datos_grupos.length;j++){
            serviciogrupo.quitarleGrupoADocente(vm.datos_grupos[j].idDocente).then(function(data) {});

                }
                console.log(vm.datos_grupos);

           });
           //vaciamos la tabla de horarios
           serviciohorario.allHorario().then(function(data) {
            vm.all=data;
            for(var k=0; k < vm.all.length; k++){

            serviciohorario.deleteHorarios(vm.all[k].idDocente).then(function(data) {});
            }

           });

           

           

            $scope.$emit('actualizame');
                   swal("Bien!","El ciclo ha finalizado!", "success");

           }); 

        }


    }
})();