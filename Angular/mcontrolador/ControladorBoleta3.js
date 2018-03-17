(function() {
    angular.module("primariaAngular").controller("BoletatresCtrl", BoletatresController);

    function BoletatresController($http, $scope, Flash, $auth,validaciones,toastr,  servicioevaluar, Upload, serviciogrupo, servicioalumno, serviciocurso,serviciocambio) {
        var vm = this;
        vm.llena=llena;
        vm.cabeceraAlumno =cabeceraAlumno;
        vm.evaluaciones=evaluaciones;
        vm.calificacionesPorMateria=calificacionesPorMateria;
        vm.valida = valida;
        vm.guardarBoleta = guardarBoleta;
        vm.verRadiofila1=verRadiofila1;
        vm.verRadiofila2=verRadiofila2;
        vm.verRadiofila3=verRadiofila3;
        vm.verRadio2=verRadio2;
        vm.verRadio3=verRadio3;

        vm.Init = Init;
        vm.alumnoSelect="";
        var local = JSON.parse(localStorage.getItem('perfil'));
        vm.alumnos={};
        vm.cabecera={};
        vm.eval={};
        vm.uno="";
        vm.dos="";
        vm.tres="";
        vm.cuatro="";
        vm.cinco="";
        vm.b1=false;
        vm.b2=false;
        vm.b3=false;
        vm.b4=false;
        vm.b5=false;
        vm.escB1="";
        vm.escB2="";
        vm.escB3="";
        vm.escB4="";
        vm.escB5="";
        vm.lecB1="";
        vm.lecB2="";
        vm.lecB3="";
        vm.lecB4="";
        vm.lecB5="";
        vm.matB1="";
        vm.matB2="";
        vm.matB3="";
        vm.matB4="";
        vm.matB5="";
        vm.bimest="";
        vm.especificas="";
        vm.apoyos="";
        vm.asignatura="";
        vm.datos_boleta={};
        vm.click=true;
        vm.folio="";
        Init();
       
        function Init() {
            //llena();
            getAlumnosByDocente();
            obtenerGrupoDelDocente(); 
            fechaValida();
            getCursoActual(); 
            getDirector();           
        }

        function getDirector(){
            serviciocambio.getDirectorActual().then(function(data) {
                vm.director=data[0];
                console.log(vm.director);
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

        function obtenerGrupoDelDocente() {
            serviciogrupo.getGrupoDocente(local.id_user).then(function(data) {
                vm.grupoDelDocente = data;
                console.log("grupo del dpocentre");
                console.log(vm.grupoDelDocente);
                
            })
        }
        function getAlumnosByDocente() {
            
            servicioevaluar.getAlumnosByDocente(local.id_user).then(function(data) {
              vm.alumnos=data;
              console.log(vm.alumnos);
              
              });

          }

          function cabeceraAlumno(){
            serviciogrupo.datosCabeceraHorarioAlumno(vm.alumnoSelect).then(function(data){
                console.log(vm.alumnoSelect);
                vm.cabecera=data;
                console.log(vm.cabecera);
            });
          }

          function evaluaciones(){
            servicioevaluar.getEvaluacionBimestrales(vm.alumnoSelect).then(function(data){
                vm.eval =data;
                console.log(vm.eval);
                calificacionesPorMateria();
                calificaionFinal();
                obtenerBoleta();
            });
          }
          function calificacionesPorMateria(){
            servicioevaluar.getBoleta(vm.alumnoSelect).then(function(data){
                vm.cal= data;
                console.log(vm.cal);
            });
          }

          function calificaionFinal(){
            servicioevaluar.getcaliFinalAlumno(vm.alumnoSelect).then(function(data){
                vm.caliFinal= data;
                console.log(vm.caliFinal);
            });
          }

          function fechaValida(){
            var fecha_actual = new Date();
            var m= fecha_actual.getMonth() + 1;
            var d= fecha_actual.getDate();
            console.log(m);
            console.log(d);
            if(m>=8 && m<=10){
                
                    vm.b1=true;
                                
            }if(m>=10 && m<=12){
                
                    vm.b2=true;
                               
            }if(m>=1 && m<=2){
                
                    vm.b3=true;
                              
            }if(m>2 && m<=4){
                
                    vm.b4=true;
                               
            }if(m>=5 && m<=7){
                
                    vm.b5=true;
                                
            }
            
          }

          function valida($event, num) {
            console.log(num);

            switch (num) {
                case 1:
                    if (!validaciones.soloinasistencia($event)) {
                        $event.preventDefault();
                        swal("Ups!",'Este campo permite solo numeros del 0 al 5', 'error');  
                        
                    }

                    break;

                
            }

        }

       function verRadiofila1(obj){
            vm.seleccionado= obj;
          console.log(vm.seleccionado);
        }
        function verRadiofila2(obj){
            vm.seleccionadof2= obj;
          console.log(vm.seleccionadof2);
        }
        function verRadiofila3(obj){
            vm.seleccionadof3= obj;
          console.log(vm.seleccionadof3);
        }


        function verRadio2(obj){
            vm.seleccionado2= obj;
          console.log(vm.seleccionado2);
        }

        function verRadio3(obj){
            vm.seleccionado3= obj;
          console.log(vm.seleccionado3);
        }

        function guardarBoleta(){

            var faltas=[vm.uno,vm.dos,vm.tres,vm.cuatro, vm.cinco];
            var escritura=[vm.escB1,vm.escB2,vm.escB3,vm.escB4,vm.escB5];
            var lectura=[vm.lecB1,vm.lecB2,vm.lecB3,vm.lecB4,vm.lecB5];
            var matematica =[vm.matB1,vm.matB2,vm.matB3,vm.matB4,vm.matB5];
            var bim =[vm.bimest,vm.bimest,vm.bimest,vm.bimest,vm.bimest];
            var asig =[vm.asignatura,vm.asignatura,vm.asignatura,vm.asignatura,vm.asignatura];
            var espe =[vm.especificas,vm.especificas,vm.especificas,vm.especificas,vm.especificas];
            var apo =[vm.apoyos,vm.apoyos,vm.apoyos,vm.apoyos,vm.apoyos];
            var boleta=[vm.datos_boleta[0].idBoleta, vm.datos_boleta[1].idBoleta,vm.datos_boleta[2].idBoleta,vm.datos_boleta[3].idBoleta,vm.datos_boleta[4].idBoleta];
            console.log(faltas);
            console.log(escritura);
            console.log(lectura);
            console.log(matematica);
            vm.arr = {
              bol : []
              };
            
                for(var a=0; a < 5; a++){
                        vm.obj={};
                        //-----------------
                        vm.obj.idBoleta= boleta[a]
                        vm.obj.idAlumno=parseInt(vm.alumnoSelect);
                        vm.obj.bimestre=a+1;
                        vm.obj.faltas=parseInt(faltas[a]);
                        vm.obj.escritura=escritura[a];
                        vm.obj.lectura=lectura[a];
                        vm.obj.matematica=matematica[a];
                        vm.obj.idCurso=vm.datos_Curso_Actual.idCurso;
                        vm.obj.bim = bim[a];
                        vm.obj.asignatura = asig[a];
                        vm.obj.obs = espe[a];
                        vm.obj.recom=apo[a];
                        vm.obj.folio=vm.folio;

                        console.log(vm.obj);
                        vm.arr.bol.push(vm.obj);

                        
                }
                  servicioalumno.actualizarBoleta(vm.arr).then(function(data){
                        console.log(data);
                        });
        }

        function obtenerBoleta(){
            servicioalumno.getBoleta(vm.alumnoSelect).then(function(data){
                vm.datos_boleta=data;
                if(vm.datos_boleta.length >0){
                    vm.click=false;
                }
                console.log(vm.datos_boleta);
                vm.uno=vm.datos_boleta[0].faltas;
                vm.dos=vm.datos_boleta[1].faltas;
                vm.tres = vm.datos_boleta[2].faltas;
                vm.cuatro= vm.datos_boleta[3].faltas;
                vm.cinco = vm.datos_boleta[4].faltas;

                vm.escB1= vm.datos_boleta[0].escritura;
                vm.escB2= vm.datos_boleta[1].escritura;
                vm.escB3= vm.datos_boleta[2].escritura;
                vm.escB4= vm.datos_boleta[3].escritura;
                vm.escB5= vm.datos_boleta[4].escritura;

                vm.lecB1= vm.datos_boleta[0].lectura;
                vm.lecB2= vm.datos_boleta[1].lectura;
                vm.lecB3= vm.datos_boleta[2].lectura;
                vm.lecB4= vm.datos_boleta[3].lectura;
                vm.lecB5= vm.datos_boleta[4].lectura;

                vm.matB1= vm.datos_boleta[0].matematica;
                vm.matB2= vm.datos_boleta[1].matematica;
                vm.matB3= vm.datos_boleta[2].matematica;
                vm.matB4= vm.datos_boleta[3].matematica;
                vm.matB5= vm.datos_boleta[4].matematica;

                vm.bimest= vm.datos_boleta[0].bim;
                vm.bimest= vm.datos_boleta[1].bim;
                vm.bimest= vm.datos_boleta[2].bim;
                vm.bimest= vm.datos_boleta[3].bim;
                vm.bimest= vm.datos_boleta[4].bim;

                vm.asignatura= vm.datos_boleta[0].asignatura;
                vm.asignatura= vm.datos_boleta[1].asignatura;
                vm.asignatura= vm.datos_boleta[2].asignatura;
                vm.asignatura= vm.datos_boleta[3].asignatura;
                vm.asignatura= vm.datos_boleta[4].asignatura;

                vm.especificas= vm.datos_boleta[0].obs;
                vm.especificas= vm.datos_boleta[1].obs;
                vm.especificas= vm.datos_boleta[2].obs;
                vm.especificas= vm.datos_boleta[3].obs;
                vm.especificas= vm.datos_boleta[4].obs;
                vm.folio=vm.datos_boleta[0].folio;
            })
        }

        function llena(){
            var anioI= new Date(vm.cabecera[0].anioInicio);
            var anioF= new Date(vm.cabecera[0].anioFin);
            var datos={
                nombre: vm.cabecera[0].nombres,
                apPat: vm.cabecera[0].apPaterno,
                apMat: vm.cabecera[0].apMaterno,
                curp: vm.cabecera[0].curp,
                grupo: vm.cabecera[0].nombre,
                ciclo: anioI.getFullYear().toString() + "-" + anioF.getFullYear().toString(),
                folio: vm.folio
           };

            var calif={
                cn1: vm.eval[0].califMateria,
                cn2: vm.eval[1].califMateria,
                cn3: vm.eval[2].califMateria,
                cn4: vm.eval[3].califMateria,
                cn5: vm.eval[4].califMateria,
                ea1: vm.eval[5].califMateria,
                ea2: vm.eval[6].califMateria,
                ea3: vm.eval[7].califMateria,
                ea4: vm.eval[8].califMateria,
                ea5: vm.eval[9].califMateria,
                ef1: vm.eval[10].califMateria,
                ef2: vm.eval[11].califMateria,
                ef3: vm.eval[12].califMateria,
                ef4: vm.eval[13].califMateria,
                ef5: vm.eval[14].califMateria,
                es1: vm.eval[15].califMateria,
                es2: vm.eval[16].califMateria,
                es3: vm.eval[17].califMateria,
                es4: vm.eval[18].califMateria,
                es5: vm.eval[19].califMateria,                
                fc1: vm.eval[20].califMateria,
                fc2: vm.eval[21].califMateria,
                fc3: vm.eval[22].califMateria,
                fc4: vm.eval[23].califMateria,
                fc5: vm.eval[24].califMateria,
                ed1: vm.eval[25].califMateria,
                ed2: vm.eval[26].califMateria,
                ed3: vm.eval[27].califMateria,
                ed4: vm.eval[28].califMateria,
                ed5: vm.eval[29].califMateria,
                ma1: vm.eval[30].califMateria,
                ma2: vm.eval[31].califMateria,
                ma3: vm.eval[32].califMateria,
                ma4: vm.eval[33].califMateria,
                ma5: vm.eval[34].califMateria,

            };
            console.log(vm.uno);
          
            if(vm.uno === ""|vm.uno ===null){
                
                 var u=0; 
                
            }else{
                var u =parseInt(vm.uno);
            }if(vm.dos === ""|vm.dos ===null){
                
                 var d=0; 
                 
            }else{
                var d =parseInt(vm.dos);
            }if(vm.tres === ""|vm.tres ===null){
                 
                 var t=0; 
                 
            }else{
                var t =parseInt(vm.tres);
            }if(vm.cuatro === "" |vm.cuatro ===null){
                 
                 var cu=0; 
                 
            }else{
                var cu =parseInt(vm.cuatro);
            }if(vm.cinco === "" | vm.cinco ===null){
                
                   var ci=0; 
               
            }else{
                var ci =parseInt(vm.cinco);
            }
                
                var sum = u+d+t+cu+ci;
            

            var asistencias={
                uno: u,
                dos: d,
                tres: t,
                cuatro: cu,
                cinco: ci,
                total: sum
            };


            var cn=parseFloat(vm.cal[0].promedio);
            var cnt = cn.toFixed(1);
            var ea=parseFloat(vm.cal[1].promedio);
            var ear = ea.toFixed(1);
            var ef=parseFloat(vm.cal[2].promedio);
            var efi = ef.toFixed(1);
            var es=parseFloat(vm.cal[3].promedio);
            var esp = es.toFixed(1);
            var fc=parseFloat(vm.cal[4].promedio);
            var fce= fc.toFixed(1)
            var ma=parseFloat(vm.cal[5].promedio);
            var mat=cn.toFixed(1);
            var en=parseFloat(vm.cal[6].promedio);
            var env = en.toFixed(1);
            var f=parseFloat(vm.caliFinal[0].promedioFinal);
            var final=f.toFixed(1);
            
            //if(vm.b5 === true){ 
                var porMateria={
                ea: ear,
                ef: efi,
                fc: fce,
                en: env,
                ma: mat,
                es: esp,
                cn: cnt,
                fin: final
                }
            /*}else{
                var porMateria={
                ea: "",
                ef: "",
                fc: "",
                en: "",
                ma: "",
                es: "",
                cn: "",
                fin: ""
                }
            }*/
            var recomendaciones={
                eb1: vm.escB1,
                eb2: vm.escB2,
                eb3: vm.escB3,
                eb4: vm.escB4,
                eb5: vm.escB5,
                lb1: vm.lecB1,
                lb2: vm.lecB2,
                lb3: vm.lecB3,
                lb4: vm.lecB4,
                lb5: vm.lecB5,
                mb1: vm.matB1,
                mb2: vm.matB2,
                mb3: vm.matB3,
                mb4: vm.matB4,
                mb5: vm.matB5,
            }
            console.log(vm.escB1);

            if(vm.escB1 !== ""){
                var ecb1="x";
            }else{
                var ecb1="";
            }
            if(vm.escB2 !== ""){
                var ecb2="x";
            }else{
                var ecb2="";
            }
            if(vm.escB3 !== ""){
                var ecb3="x";
            }else{
                var ecb3="";
            }
            if(vm.escB4 !== ""){
                var ecb4="x";
            }else{
                var ecb4="";
            }
            if(vm.escB5 !== ""){
                var ecb5="x";
            }else{
                var ecb5="";
            }
            if(vm.lecB1 !== ""){
                var lcb1="x";
            }else{
                var lcb1="";
            }
            if(vm.lecB2 !== ""){
                var lcb2="x";
            }else{
                var lcb2="";
            }
            if(vm.lecB3 !== ""){
                var lcb3="x";
            }else{
                var lcb3 ="";
            }
            if(vm.lecB4 !== ""){
                var lcb4="x";
            }else{
                var lcb4 ="";
            }
            if(vm.lecB5 !== ""){
                var lcb5="x";
            }else{
                var lcb5 ="";
            }
            if(vm.matB1 !== ""){
                var mtb1="x";
            }else{
                var mtb1 ="";
            }
            if(vm.matB2 !== ""){
                var mtb2="x";
            }else{
                var mtb2 ="";
            }
            if(vm.matB3 !== ""){
                var mtb3="x";
            }else{
                var mtb3 ="";
            }
            if(vm.matB4 !== ""){
                var mtb4="x";
            }else{
                var mtb4 ="";
            }
            if(vm.matB5 !== ""){
                var mtb5="x";
            }else{
                var mtb5 ="";
            }

            var bim={
                eb1: ecb1,
                eb2: ecb2,
                eb3: ecb3,
                eb4: ecb4,
                eb5: ecb5,
                lb1: lcb1,
                lb2: lcb2,
                lb3: lcb3,
                lb4: lcb4,
                lb5: lcb5,
                mb1: mtb1,
                mb2: mtb2,
                mb3: mtb3,
                mb4: mtb4,
                mb5: mtb5,

            };



            var observacionesEspecificas={
                bim:vm.bimest,
                asig: vm.asignatura,
                obs: vm.especificas,
                rec: vm.apoyos
            };
            //image: 

            if(vm.seleccionado === "ago1"){
                var a1='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC'; 
            }else{
                var a1='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionado === "nov1"){
                var n1= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var n1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionado === "mar1"){
                var m1= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var m1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionado === "jun1"){
                var j1= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var j1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionado === "ago2"){
                var a2='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC'; 
            }else{
                var a2='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionado === "nov2"){
                var n2= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var n2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionado === "mar2"){
                var m2= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var m2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionado === "jun2"){
                var j2= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var j2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionado === "ago3"){
                var a3='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC'; 
            }else{
                var a3='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionado === "nov3"){
                var n3= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var n3 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionado === "mar3"){
                var m3= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var m3 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionado === "jun3"){
                var j3= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var j3 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionado === "ago4"){
                var a4='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC'; 
            }else{
                var a4='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionado === "nov4"){
                var n4= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var n4 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionado === "mar4"){
                var m4= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var m4 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionado === "jun4"){
                var j4= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var j4 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }



            if(vm.seleccionadof2 === "ago5"){
                var a5='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC'; 
            }else{
                var a5='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof2 === "nov5"){
                var n5= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var n5 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof2 === "mar5"){
                var m5= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var m5 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof2 === "jun5"){
                var j5= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var j5 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof2 === "ago6"){
                var a6='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC'; 
            }else{
                var a6='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof2 === "nov6"){
                var n6= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var n6 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof2 === "mar6"){
                var m6= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var m6 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof2 === "jun6"){
                var j6= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var j6 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof2 === "ago7"){
                var a7='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC'; 
            }else{
                var a7='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof2 === "nov7"){
                var n7= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var n7 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof2 === "mar7"){
                var m7= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var m7 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof2 === "jun7"){
                var j7= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var j7 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof2 === "ago8"){
                var a8='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC'; 
            }else{
                var a8='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof2 === "nov8"){
                var n8= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var n8 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof2 === "mar8"){
                var m8= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var m8 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof2 === "jun8"){
                var j8= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var j8 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }


            if(vm.seleccionadof3 === "ago9"){
                var a9='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC'; 
            }else{
                var a9='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof3 === "nov9"){
                var n9= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var n9 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof3 === "mar9"){
                var m9= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var m9 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof3 === "jun9"){
                var j9= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var j9 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof3 === "ago10"){
                var a10='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC'; 
            }else{
                var a10='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof3 === "nov10"){
                var n10= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var n10 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof3 === "mar10"){
                var m10= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var m10 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof3 === "jun10"){
                var j10= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var j10 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof3 === "ago11"){
                var a11='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC'; 
            }else{
                var a11='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof3 === "nov11"){
                var n11= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var n11 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof3 === "mar11"){
                var m11= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var m11 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof3 === "jun11"){
                var j11= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var j11 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof3 === "ago12"){
                var a12='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC'; 
            }else{
                var a12='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof3 === "nov12"){
                var n12= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var n12 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof3 === "mar12"){
                var m12= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var m12 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            if(vm.seleccionadof3 === "jun12"){
                var j12= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhP3ZKtioVQFIVFEFGvTRRsRqPtRkUxGgSD8SI+lM9gMBgMRqOPYjD4AGs4ci6Onu0wDEyY+WC1vT72+ZHwC/wT6TzPqOsaQRDAsiz4vo/X64VpmvgEDSndtg1VVeHxeECWZUiSdIphGCiKYp+jIKVsGya8yj5H0zRkWcYbZwRp3/f7JpToGtM00bYtbx4I0rIsScFdoijizQNB6nkeWb4Lu4YrgtR1XbJ8F1VVefNAkOZ5Tpbv8nw+efNAkHZd9+2HYnNN0/DmgSBlsG3ZsSjRO4qiIAxD3jhDStd13f+gruukkG0YxzGWZeGNM6T0zTiOSNMUjuPsMtu2kSQJhmHgEzRfSn/KX5ECHwcie0KVabB6AAAAAElFTkSuQmCC';
            }else{
                var j12 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE7SURBVDhP1ZMtjoRAEEY5AIIDIBCIkUgEYiQCgUAgECMQCO4yB0AgkAgEAoFAIBBIJIIDjEAgEIiaVKdmO738iM2K3ZeQzldpXofqQoJf5h8L+76HOI7hfr+DpmlgmiZEUQRt29KOY3bCZVnYi6qqwvP5hKZpYJom6LqOZawHQcD2HbEToszzPJjnmSoiKHo8HuD7PlVEBGFZlqDr+unpH7ZtA8MwIM9zqnAEYRiGkGUZpWvwcNd1KXEEIZ46DAOla7AliqJQ4gjC2+0G4zhSugbbIssyJY4gxGYf9eWIqqrAtm1KHEFYFAX77HVdqXIMXoplWZAkCVU4ghDBGcPnTIoyHC3HcagishNis3HG8O9I0/Srp7jiBGCf8XZfrxerf2cn/FDXNRtwnEtJktiKGXt3xanwp/x1IcAb6tAxUiS/ItUAAAAASUVORK5CYII=';
            }
            

            var comprension={
                ag1: a1,
                no1: n1,
                ma1: m1,
                ju1: j1,
                ag2: a2,
                no2: n2,
                ma2: m2,
                ju2: j2,
                ag3: a3,
                no3: n3,
                ma3: m3,
                ju3: j3,
                ag4: a4,
                no4: n4,
                ma4: m4,
                ju4: j4,
                ag5: a5,
                no5: n5,
                ma5: m5,
                ju5: j5,
                ag6: a6,
                no6: n6,
                ma6: m6,
                ju6: j6,
                ag7: a7,
                no7: n7,
                ma7: m7,
                ju7: j7,
                ag8: a8,
                no8: n8,
                ma8: m8,
                ju8: j8,
                ag9: a9,
                no9: n9,
                ma9: m9,
                ju9: j9,
                ag10: a10,
                no10: n10,
                ma10: m10,
                ju10: j10,
                ag11: a11,
                no11: n11,
                ma11: m11,
                ju11: j11,
                ag12: a12,
                no12: n12,
                ma12: m12,
                ju12: j12

            }

            
            if(vm.seleccionado2 === "riesgo1"){
                var r1= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAmCAYAAACRWlj1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJESURBVGhD7ZY/qgIxEIe3Ef+BhYIWgo2tlYdQr2Jh5w0sRDyIhaUHsPAcnsDCwgPk8Vszj3nzJll5TOSt7AcDJptJ8iXZrJn7cCrBslMJlp1KcLlcuizL3OVy8TVPUEa95Hq95vUyUA/G4/GPepRBKI+CM5/P8zrqM0ahIDqCJIJTJBgaHEKHw8GXnpNFcEJ9A+of89ntdr42TFQQE8Hg2oBWgvhNu0jEBCEFOS1PIyoIOVolOTErQZRfPR2A56MN2sYICsqJQpQfpSJBHlwAE+TPuCwR6lvWo1+5OJKgYEiIVqxI8JUdxBiviBBSCP3ExgJBQbnSFDSAhSBAmV4DItQ3zUGGzOeogjSAnCRfcStB9Ik6jtY37ZYECy7zOaqgPAoETR6D0SR44EhTGxloD6QgwHNepwnyC49Dbal/iSr4SVSCZacS/CuPx8Pt93u3WCzcaDRyw+Ew/73dbvNn7yKJ4Pl8dv1+37Vare9blKLdbufP0OYdmAti4vV6/ZeYDMifTieflQ5TQRw97I4mpEW323X3+91np8FUEO+cdixDgZ1er9c+Ow2mgrhENJFYTKdTn50GU0HclppELJrNps9Og6ngYDBQJWKBY5oSU8HZbKZKxGIymfjsNJgKbjYb12g0VBEtarWaW61WPjsNpoK48nu9niqjRafTcbfbzWenwVQQ4OONi0MT4oE2x+PRZ6XDXBBAEh9x7R8NjiV27h1yIIkgwHHFRxzfOewWZHGh4J1LfSw5yQT/C5Vg2akEy41zXxIGzZoPSRWMAAAAAElFTkSuQmCC';
            }else{
                var r1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAlCAYAAAAXzipbAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJrSURBVGhD7ZcvjmoxFIdZAAKJQJCAQLAEJAkbQCCRkCAQSByCEBaCQCIQCARLQCAIK0AgWMCZ/Do9SefQ3nvfe6c3707ulzQz7W1P+/XvTIV+OaVg0SkFi06i4HQ6pUqlQpfLxZZ8gzzKJY/Hw5TLhHLQarV+lCMPQu04uQwGA1PGMdNIFEQgSCK5pAmGOofQbrezue/BIrmEYgOOj/FsNhtbmkxQEANB574OtQTxO68ikyQIKcj52oUICkKOZ0kOTEsQ+ay7A7jtUQd10/BGkgOFqLuV0gTd5ApggO43V5YJxZbliCsnx4dXMCTEM5YmmGUF0UcWEUYKIU5SX4xXUM40J+5AQxAgz8eACcXmMcgk20s+InEHcpDujGsJIibKXHyxebUkmHDZXvLRSm4FhgePzngQbsKW5joyoT6QggDf3TKfoHvhuXBdju/jc1p+GaVg0SkF/4b3+03b7ZaGwyF1u13qdDrm9/V6bb7librg+XymZrNJo9HI3I7X65Vutxvt93saj8fmG+rkhaogBl6r1YxMiMPhQPV63fzMAzVBbD2sTpIcczweqdFo0Ov1siXxUBPEmcO2zMpkMqHlcmlz8VATxCUi/0pJ4nQ6Ub/ft7l4qAnitsSFkhVsT5zX2KgJttttut/vNpcOzmy1WrW5eKhu0SwXDIMbt9fr2Vw81ARXq5V557Iyn89psVjYXDzUBHGmcPVned/w7w3ewufzaUvioSYI+BHHDRmC5f5kO/8LqoIAkljJ2WxmRLGyuFBw5rAt85QD6oIAUnjE8c7hKcBtiQsFZy6PbekSRfB/ohQsOqVgsSH6AsyBOZoYPzdrAAAAAElFTkSuQmCC';
            }
            if(vm.seleccionado2 === "riesgo2"){
                var r2= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAmCAYAAACRWlj1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJESURBVGhD7ZY/qgIxEIe3Ef+BhYIWgo2tlYdQr2Jh5w0sRDyIhaUHsPAcnsDCwgPk8Vszj3nzJll5TOSt7AcDJptJ8iXZrJn7cCrBslMJlp1KcLlcuizL3OVy8TVPUEa95Hq95vUyUA/G4/GPepRBKI+CM5/P8zrqM0ahIDqCJIJTJBgaHEKHw8GXnpNFcEJ9A+of89ntdr42TFQQE8Hg2oBWgvhNu0jEBCEFOS1PIyoIOVolOTErQZRfPR2A56MN2sYICsqJQpQfpSJBHlwAE+TPuCwR6lvWo1+5OJKgYEiIVqxI8JUdxBiviBBSCP3ExgJBQbnSFDSAhSBAmV4DItQ3zUGGzOeogjSAnCRfcStB9Ik6jtY37ZYECy7zOaqgPAoETR6D0SR44EhTGxloD6QgwHNepwnyC49Dbal/iSr4SVSCZacS/CuPx8Pt93u3WCzcaDRyw+Ew/73dbvNn7yKJ4Pl8dv1+37Vare9blKLdbufP0OYdmAti4vV6/ZeYDMifTieflQ5TQRw97I4mpEW323X3+91np8FUEO+cdixDgZ1er9c+Ow2mgrhENJFYTKdTn50GU0HclppELJrNps9Og6ngYDBQJWKBY5oSU8HZbKZKxGIymfjsNJgKbjYb12g0VBEtarWaW61WPjsNpoK48nu9niqjRafTcbfbzWenwVQQ4OONi0MT4oE2x+PRZ6XDXBBAEh9x7R8NjiV27h1yIIkgwHHFRxzfOewWZHGh4J1LfSw5yQT/C5Vg2akEy41zXxIGzZoPSRWMAAAAAElFTkSuQmCC';
            }else{
                var r2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAlCAYAAAAXzipbAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJrSURBVGhD7ZcvjmoxFIdZAAKJQJCAQLAEJAkbQCCRkCAQSByCEBaCQCIQCARLQCAIK0AgWMCZ/Do9SefQ3nvfe6c3707ulzQz7W1P+/XvTIV+OaVg0SkFi06i4HQ6pUqlQpfLxZZ8gzzKJY/Hw5TLhHLQarV+lCMPQu04uQwGA1PGMdNIFEQgSCK5pAmGOofQbrezue/BIrmEYgOOj/FsNhtbmkxQEANB574OtQTxO68ikyQIKcj52oUICkKOZ0kOTEsQ+ay7A7jtUQd10/BGkgOFqLuV0gTd5ApggO43V5YJxZbliCsnx4dXMCTEM5YmmGUF0UcWEUYKIU5SX4xXUM40J+5AQxAgz8eACcXmMcgk20s+InEHcpDujGsJIibKXHyxebUkmHDZXvLRSm4FhgePzngQbsKW5joyoT6QggDf3TKfoHvhuXBdju/jc1p+GaVg0SkF/4b3+03b7ZaGwyF1u13qdDrm9/V6bb7librg+XymZrNJo9HI3I7X65Vutxvt93saj8fmG+rkhaogBl6r1YxMiMPhQPV63fzMAzVBbD2sTpIcczweqdFo0Ov1siXxUBPEmcO2zMpkMqHlcmlz8VATxCUi/0pJ4nQ6Ub/ft7l4qAnitsSFkhVsT5zX2KgJttttut/vNpcOzmy1WrW5eKhu0SwXDIMbt9fr2Vw81ARXq5V557Iyn89psVjYXDzUBHGmcPVned/w7w3ewufzaUvioSYI+BHHDRmC5f5kO/8LqoIAkljJ2WxmRLGyuFBw5rAt85QD6oIAUnjE8c7hKcBtiQsFZy6PbekSRfB/ohQsOqVgsSH6AsyBOZoYPzdrAAAAAElFTkSuQmCC';
            }
            if(vm.seleccionado2 === "riesgo3"){
                var r3= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAmCAYAAACRWlj1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJESURBVGhD7ZY/qgIxEIe3Ef+BhYIWgo2tlYdQr2Jh5w0sRDyIhaUHsPAcnsDCwgPk8Vszj3nzJll5TOSt7AcDJptJ8iXZrJn7cCrBslMJlp1KcLlcuizL3OVy8TVPUEa95Hq95vUyUA/G4/GPepRBKI+CM5/P8zrqM0ahIDqCJIJTJBgaHEKHw8GXnpNFcEJ9A+of89ntdr42TFQQE8Hg2oBWgvhNu0jEBCEFOS1PIyoIOVolOTErQZRfPR2A56MN2sYICsqJQpQfpSJBHlwAE+TPuCwR6lvWo1+5OJKgYEiIVqxI8JUdxBiviBBSCP3ExgJBQbnSFDSAhSBAmV4DItQ3zUGGzOeogjSAnCRfcStB9Ik6jtY37ZYECy7zOaqgPAoETR6D0SR44EhTGxloD6QgwHNepwnyC49Dbal/iSr4SVSCZacS/CuPx8Pt93u3WCzcaDRyw+Ew/73dbvNn7yKJ4Pl8dv1+37Vare9blKLdbufP0OYdmAti4vV6/ZeYDMifTieflQ5TQRw97I4mpEW323X3+91np8FUEO+cdixDgZ1er9c+Ow2mgrhENJFYTKdTn50GU0HclppELJrNps9Og6ngYDBQJWKBY5oSU8HZbKZKxGIymfjsNJgKbjYb12g0VBEtarWaW61WPjsNpoK48nu9niqjRafTcbfbzWenwVQQ4OONi0MT4oE2x+PRZ6XDXBBAEh9x7R8NjiV27h1yIIkgwHHFRxzfOewWZHGh4J1LfSw5yQT/C5Vg2akEy41zXxIGzZoPSRWMAAAAAElFTkSuQmCC';
            }else{
                var r3 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAlCAYAAAAXzipbAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJrSURBVGhD7ZcvjmoxFIdZAAKJQJCAQLAEJAkbQCCRkCAQSByCEBaCQCIQCARLQCAIK0AgWMCZ/Do9SefQ3nvfe6c3707ulzQz7W1P+/XvTIV+OaVg0SkFi06i4HQ6pUqlQpfLxZZ8gzzKJY/Hw5TLhHLQarV+lCMPQu04uQwGA1PGMdNIFEQgSCK5pAmGOofQbrezue/BIrmEYgOOj/FsNhtbmkxQEANB574OtQTxO68ikyQIKcj52oUICkKOZ0kOTEsQ+ay7A7jtUQd10/BGkgOFqLuV0gTd5ApggO43V5YJxZbliCsnx4dXMCTEM5YmmGUF0UcWEUYKIU5SX4xXUM40J+5AQxAgz8eACcXmMcgk20s+InEHcpDujGsJIibKXHyxebUkmHDZXvLRSm4FhgePzngQbsKW5joyoT6QggDf3TKfoHvhuXBdju/jc1p+GaVg0SkF/4b3+03b7ZaGwyF1u13qdDrm9/V6bb7librg+XymZrNJo9HI3I7X65Vutxvt93saj8fmG+rkhaogBl6r1YxMiMPhQPV63fzMAzVBbD2sTpIcczweqdFo0Ov1siXxUBPEmcO2zMpkMqHlcmlz8VATxCUi/0pJ4nQ6Ub/ft7l4qAnitsSFkhVsT5zX2KgJttttut/vNpcOzmy1WrW5eKhu0SwXDIMbt9fr2Vw81ARXq5V557Iyn89psVjYXDzUBHGmcPVned/w7w3ewufzaUvioSYI+BHHDRmC5f5kO/8LqoIAkljJ2WxmRLGyuFBw5rAt85QD6oIAUnjE8c7hKcBtiQsFZy6PbekSRfB/ohQsOqVgsSH6AsyBOZoYPzdrAAAAAElFTkSuQmCC';
            }

            var riesgo={
                ri1:r1,
                ri2:r2,
                ri3:r3
            };

            if(vm.seleccionado3 === "promovido"){
                var p='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAAAWCAYAAAAFH+TSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANuSURBVGhD7Zg7TuxAEEUnQfwkApAgQCIhJWIRwFYIyNgBAUIshICQBRDMOlgBAQELaHRGvtJ1Tblto3kvQH2kFna7q7o+d2zjRWk0EpowGilNGI2UJoxGShPGH+X7+7s8Pz+Xm5ubcnZ2Vk5PT1fHj4+Pq2tjNGH8Qd7f38vx8XHZ29sri8WiN/b391fXWFOjCeM/cH5+XpbLZXdW5+npqdze3nZn86Hh29vba4KIA9G8vb11VusMCuP6+rrniOTEx8dH7xojS6bmAygC86zLeHl5Sa/LzgcxgWLLGkGMipNY8A+sjf5irGIspwh7ZPkRB/YxTsX/G3hEcDfw+Grj8PCwfH19ddZ9qsKgAYJzJajg1Qzg3NdTsFgQFUOwnjXMZY2UDy9+9AESkHxg47EIX4PPKAxH+3iOU3KK1GLBlhHBRrHNgXeK7PExNLiz3N/fd9Z9JgvDi5cJw5MkKW+mw7z8ShhZgdhPzZOvbF+BvZqW7R/n5BsyYcCYT8F81nzAr8Qo8IXfoX1Vl7nwcom/OePy8rKz7rMRYehchc4aLbzYKkBWIO3vDak1h2vug2NvSMxnijDc59ScnCG/HovHIWp51uC/D/abM3Z3dzvrPutRd2SFVGEkBB/+K462DvMqoh+7jfyDF8nXR2ITYiNjjFOE4fNTc3JcWEK5KZbMdiieMU5OTlZ2cwaPk4zB3QnWHXiRY3Ks9eQ49vWON8yL4gLwNVEYOo74OvDics3jgynC4Lrmp+bkxJggCkF781dozoU8haurq5XdnHFxcdFZ96kKgyQyojB0ruRqDfSGxCLhQ82QLy9urWBZc7QXe2hP4XHIbwR/im9qTg5z0S9rmYvDYx+KZ4yHh4eys7Oz5ntobG1tlbu7u866z0aEAaz35LgeG8UaL24UBuux8zmK6zbRB+AnxgNqJtcizNeEkfnkfCwnJ/odErb2EjHnqfCv59HR0crXlHFwcFA+Pz876z4bE0aWtJqi4Q0H/Puc/PqvLyuSBOQjQ/5iMyETho+hxozlFGEN/oE4slhi3rEuc+CjFS+UHmM2WPP6+tpZrTMojMZmqP3AhviNjYM4+HiVfQHl8cGdoiYKaML4x3AXmPPr193D77y/gccKH6/4TsHdAZHwosk7xdDjw2nCaKQ0YTRSmjAaKU0YjYRSfgBeULuSrdQ2VAAAAABJRU5ErkJggg==';
            }else{
                var p='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAAAXCAYAAAAhgVxJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOXSURBVGhD7ZgtTixBFIVnAQgkAkECAsESkCRsAIFEQoJAIHEIQlgIAolAIBAsAYEgrACBYAFFvkmfl/NuV1XXkHlPkPqSznRVV926P2e6q3uWOp0CXRydIl0cnSJdHJ0iXRy/lK+vr3Rzc5MODg7Szs5O2t7enp9fXV3Nr7XQxfELeXp6ShsbG+nw8DDd3t6ml5eX9Pr6mu7u7tLR0dH8GmOm6OL4D2xubqbn5+ehVef6+jqdnJwMrcWh6Kurq3MhlLi/v09ra2vz3xpFcezv76fZbPbnIEDx/v7+1zWOXEA1G0Ai6GdcDlSfu655fuATyLdcMfBRfuIL9oGx0V70VUzFFGGNXHz4wfzop/z/CTwuuCvUhCEeHh7S+vp6+vz8HHrGVMVBEQRtBakAVBCg7eNJWkyKEiIYz5hckkA2vADRBkhEssEc90X4GGxGcThax2NsiSlS84W5HBHmyLdFYI/Bo6SV4+PjdHFxMbTGNIvDE5gThwdKYF5Qh37ZlThySWI9FVC2cusK5qtwufVjn2xDThwwZVPQnxMAYFeCFNjCbmld5WVR2HAqphYeHx/T3t7e0BqzFHGoLcdyxRaecCUhlySt70WpFYhrboNzL0qMp0UcbrM1Jqdk131xP0Qtzhq8lbD5bIVHCvuTEmPPB3LJVHIkBj/83xznOvQrkX7uc2QfPFE+PhILEYsZfWwRh/e3xuS4uIRiky+5uSV/ptja2kpvb29Daxr2KCsrK0NrTNEDHMZBHZ7oGCBjPUDOfbzjRfPEuAh8TBSHziM+DjzBXHP/oEUcXFd/a0xO9AmiGLQ2v0J9LuYWeKy0bEYFbza7u7tDa0xVHASSI4pDbQVYK6IXJSYKGyqIbHmCa0nLFUhrsYbWFO6H7EawJ/9aY3Loi3YZS1883PeSP1NcXl7Ov2O0cnZ2ls7Pz4fWmKWIAxjvAcaAgTGe4CgOxjPP+0iwz4k2ADvRH1BBc4mmvyaOnE3aUzE50W5J3FpLxJhbYQ/B6+nU9wvAF751fHx8DD1jliaOXOAqjA4vOmDf+2TX/4W5RElEfuSQvVhQyInDj1JxpmKKMAb7gB85X2LcMS+LoA9cvImUkDCmHkFFcXSWQ+1PVuIncxwEwh3k9PR0LhLuKGw+2WPwKGkRBnRx/GO4GyxyF9BdxO/APwFB8IGL7xi8rvJWwuaTPUbtUeJ0cXSKdHF0inRxdIp0cXSKdHF0CqT0DUVqeGv7DMUFAAAAAElFTkSuQmCC';
            }
            if(vm.seleccionado3 === "nopromovido"){
                var np='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ4AAAAWCAYAAAAxZiXOAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAP4SURBVGhD7Zk9TuRAEIUnQfxJBCBBgERCSsQhgKsQkHEDAoQ4CAEhByDgHJyAgIADePeb9ZMe5bLdTeJF6k9qjbvdVV0/D3tndtU1GgvQhNdYhCa8xiI04TWq+fr66h4fH7urq6vu5OSkOz4+Xl/f39+v75XQhNeo4vX1tTs8POx2dna61Wr1bezu7q7vsWeOJrxfzNPTU3d5ednP5kEc7+/v/aweBLW5uTkQXByI8uXlpbfKGRUeCeGE5BzWHx4e+tk/tFfj9PS0vzPk7e3t216Gn3F9fT24H4s15wO0zt4MYszuy06DeATXWaOJj718EofnH2vDiLFCSU4RzonxK5YsTuKPvSuFVyhPsxjj2Njf3+8+Pz976yGTwlNzHNY9ePbEJCWeDBVYaK4CYuvN5izfTzN8P6jYHhdz4soaIHEw1NzMB3h+MXaBjfbIt2Ddfeocz7E0J2cqFtUfHw42HlsN/Jsue72ODZ6Mt7e3vfWQXB1/UcEI1JP3QsYiO9FOZAVzn1F4aoCKiF+JxVHzBNdaiw3gPMUuX/FcofMliux8X5NfEYUHJT6BNc/JwSe+I/jCb3Yu+Lk18OUB25pxfn7eWw+ZFZ6SV/M8obFmAetZYWqFx7UaqYZFIUFspq5jA/x8b/hY84F78sGn5xXzwYfihXi+kM+anJzMr8cS4xBTeU7Bt1d814zt7e3eesis8HQtMcT1rKjAOvcjWaOYq/Cc48G7CKNthHtqkq6jDf4UszfBbSOeZxQK6x5jqfC0XpOTI+E6xOGxZLZTPZvi6Oho7a9m8Lodo0h4/pfn61x7ok4sglChfaiJ4Hbaq+Jp7vtFFITbSWBxTxSeriO+D7wG3NM5UCo89rBek5MTYwLPGTib4Uz1bIqLi4u1/5pxdnbWWw8pEh4QrBLROp9eZCcrDKjQY7jwQOcKbDO/seHsUxMUJ5/uy2NkPWtI1nydhX8/E2IcXi8hn4qvNCeHdffLXvxkw2PP4inh7u6u29raSv1nY2Njo7u5uemthxQLD+TU15nHhmE7VrBa4Wm/isfZPgft8eYxV2PVaF8DYpRN5gNYywTJemw+RLGM1dF9lubkRL/Mx+L0fZ5zDfw0cnBwsPZXMvb29rqPj4/eekiV8AgYpzFwkvFDsR1DBR0jCg9iURWHDxcUxDXsXRAQm+AC1Yg1EPjjvosF8BeFF33G+kFJTg5xqc6KO8YCMe85v1PwozBfGDzGbLDn+fm5t8oZV0Djv2buDzjjJzYRxMePw9n/YPB65Uk3JzpowvvF8CSreXrx9PM3x0/htcuPw/xOx9MNEfJFgn/TTb1enSa8xiI04TUWoQmvsQhNeI1FaMJrLEDX/QH+sD5oJ82DXQAAAABJRU5ErkJggg==';
            }else{
                var np='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ0AAAAVCAYAAABcxexjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQWSURBVGhD7ZgtTixBFIVnAQgkAkECAsESkCRsAIFEQoJAIHEIQlgIAolAIBAsAYEgrACBYAH13tevT3L6UtVdjZg8kvqSznTdrrp1f85MT/ciNRpLpomusXSa6BpLp4muMZuvr690c3OTDg4O0s7OTtre3u7Or66uumtTNNE1ZvH09JQ2NjbS4eFhur29TS8vL+n19TXd3d2lo6Oj7hpzxmii+8XQ9P39/X40zWKxSO/v7/1oPohpdXW1E1iJ+/v7tLa21n2WKIqOZAiSxBzs19fX/egfmqtjc3Ozv/Kd5+fnwVwO3+Pk5OTb9VioKR8gO3NzEGPuutbpIB7Bea7JxMdcPonD84+14YixQk1OEfaJ8SuWXJzEH3tXC7dNfsXGBCceHh7S+vp6+vz87C1DRkWnxjjYPXDmxAQlnBwqrtBYxWOtN5q9fD6N8PmgQntcjIkrV3wJg0ONzfkAzy/GLlijOfItsLtP7eM51ubkjMWi+uPDYY3HNgf+w3FLreX4+DhdXFz0oyF5ZfxFxSJIT9yLGAvsxHUiVyz3GUWn4quA+JVQHDVOcC5bLD77KXb5ivsK7S9B5PZ3m/yKKDqo8QnYPCcHn/iO4Au/uX3B950DDwq5GEs8Pj6mvb29fjRkUnRKXI3zZEqNAuy5oswVHedqopoVRQSxkTqPxff9vdmlxgPX5INPzyvmgw/FC3F/IZ9zcnJyfj2WGIcYy3MMnlJ5aKiFWyv//3JMik7nEkK05woK2LkeyTXJi84+jHW4AOPaCNfUIJ3HNfhTzN4AXxvxPKNIsHuMtaKTfU5OjkTrEIfHkls71rMxtra20tvbWz+ahv+AKysr/WhIlej8G+d2zj1JJxZAqMh+qIHg6zRXhdPY54soBl8nccU5UXQ6j/g88BpwTftAreiYg31OTk6MCTxnYG8OZ6xnY3B7rXmIEDzp7u7u9qMhVaIDAlUSsvPpBXZyRQEVuYSLDrSvKIkjNtsboDj5dF8eI/ZcM3KN11749z0hxuH1EvKp+GpzcrC7X+biJ3d47Ll4ari8vOzew9VydnaWzs/P+9GQatGBknA749gs1paKNVd0mq/CsbePQXO8cYzVVDXZbUCMWpPzAdhyYsQeGw9RKKU6us/anJzol3EpTp/nOc+B/2i8Bhl7/yaInXd1Hx8fvWXILNERbK4QJIJdB2tLqJglouggFlRx+OFigmhjvYsBYgNcnDpiDQT+uO5CAfxF0UWfsX5Qk5NDXKqz4o6xQMx7yu8YevHLk2kJfDNn7FZc7n7jv4bmIqA5/GRNBOHxi3d6etqJj19AHhr4D8ctdUpw0ET3i+EXbM6vFr96fsf4KQiNF7+8h+O1CE+pPDTwH650S3Wa6BpLp4musXSa6BpLp4musWRS+gON4cAnunzqdAAAAABJRU5ErkJggg==';
            }
            if(vm.seleccionado3 === "concondicion"){
                var cc='data:image/png;base64,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';
            }else{
                var cc='data:image/png;base64,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';
            }

            var promovido={
                pro:p,
                nop:np,
                con:cc

            };
            var fecha = new Date();
            var anio=fecha.getFullYear();
            var mes=fecha.getMonth()+1;
            var dia=fecha.getDate();

            var docentes={
                director:vm.director.nombre_completo,
                docente:local.nombre+" "+local.apPaterno+" "+local.apMaterno,
                anio:anio,
                mes:mes,
                dia: dia
            };




            pdf(datos, calif, asistencias,porMateria, recomendaciones, bim, observacionesEspecificas, comprension, riesgo, promovido, docentes);
        }
function pdf(datos, calif, asis, pormat, reco, bim, obs, comp, ri, prom, doc){
            

var dd = {
         pageMargins: [30,5,30,30],
         pageSize: 'LETTER', 
         
                      
                   
    content: [
        {
            
        columns:[
                //imagen sep
                [
                {
                  image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAABnCAYAAAC6lX9uAAAgAElEQVR4XuydeXhdVdX/v991zr1Jmw606ciogMyjgIIoUiaRUZr05iaFSn8MBQotoyCiBhBRFEpLi1TfV6S0yb03SaFWQAXEAREBfZksM1SZSmlLB9omuWev7++PJCVNh4BaUJrP8+R5cs/Ze59z7rlnnbXXXgPQQw899NBDDz300EMPPfTQQw899PDxRZJJYnftevjPxrpr0EMPHxNiAOkeofXfTY/A6mFzIVq0aFEaQLq7hj3859IjsHrYLHjuuefikpKS9KJFi3q0rP9i4u4a9NDDx4EhQ4ZYS0tLOp1OC0AJgObu+nwcqGts3IXOA7KjRs7MNzSdJaAawEBIjaHYcsPJJ5+8fFZj46csaAqA1YA9k82MvIKk6gtNx0LaJsT8xckVFa91d6wPg543TQ+bBa+99lq5mfWJ47iF5MrBgwev6K7PfyuFQmGwy34m1w0gvwriC9VVlZ/M5WbvLfrjCtjDIlwrKDVsyKDjF7y9+BEEnP3cc08/uvOuezxj4FkB6k/iNMGmUfpGdVXFF7o77odBj4bVw2ZBa2trnEql0gDUp0+foqSYZNJdv/8G5syZ03fJkiXF0t597hA4K5OpnFmfb3iYRCTpFpBV06dPTyXJqleiVKmbWbw6zTGlreHNN99adBrJYdXVlX8GgPpc4/1OHQPxH6AGI4n+r3cZjul6zLq6ukGMS46rzlT8bL0ntYnosWH1sFkQx3HU3NycDiGkW1paPhbG90KhkK7LN120qqV479ixY5slNBG4vT7fdE1E1Ys8IYr0GAD161e+98knn7wcwCI3DB970klLAawkbdhaMy2iBFBz0rrypxSWMkqeebelZYeux47juATSTz5se2CPwOphs2DZsmURgLS7p4vFYuqdd95JddfnP5Vcbvau9YXGRwOik2qqKq6HtKhQKPSHF+8k8BSgTIBNArFLJpNpBfAkI34aACC8S2hgPt90CABEDDcBWJnL3bHDjBkzygAcSdqr6XSv47NVlUcTPtPE47ueQ+J2IYD4yiuvZF1d3aD6fOPj+XzTiPWc7r+VHoHVw2aBu8etra3plpaWdAghHcdx6sPWDv5dtKSxEIIoPwAAKEwJ4hk1NTWLALxUTNnBkGIIh+dys3eV8AcXDp47d25vEIL8FId+CNcJmUxmCaXzRK9LlfS+T+BUSQnIS2c1Nn5KYIrCk52PP7OpaWtSnwSgHXfcsQ/j9D2AXqiqqngAAOoLTSfdfffdJRs6/3+FHoHVw2ZBkiRRkiTp1tbWVAgh1dLSkvpvteF+deTIxQZeLnDcrFmzBlRVVd4L4HPTp09PCfpjqiXsNmzIoOMBTHH6fmZ4HdKry5cvL3F6FRVNjOgHVVePeggAstlR9yxfuujzzatWjKipqriuuqryp8WYxzDgcwbOzGZHzel8fCvqgkB9GwCjuPTHEHYTOBsAZsyYUQZp+rIVK+fmcrP33tA1/LP8V75heujhg/LQQw/tEsfxVqlUqrlXr14r+vXrt2z48OGLSK7sru9Hze1NTcNPqah4s+v2+nzTQwDuq66q+FZdruk8yuaSyYEgT81WVR69/tH+NeryjRUkzmxORVWlreFNAf+PwE+KLauGjhkzZmUu3zBJ4IHLly4+pF//8snLly2eOG7cuGJ3475fegRWD5sFDz744O5RFG2bSqWa+/Tps6KsrGxpnz59Fg0YMGBpd30/SurzDZcCPJmyTDY78pnO+/L5poMdugvQdyDuu3zZ4lP/ncJhQ9x9990lIYTo3dWtR8B1NKhh1VWjRtYVCgdR9iChSUbdkslkXgSAulzDuNh0f8fnf4X/SpW4hx4+KK2trXEcx2mSoVgspkMIqTiO/6MN77nc7F2FkK6uqtxzffurqir+mMvNPkim7SOGWz6osMrlGkaK+FTHZwlLQa6k49licdUzY8aMWa/2ecwxx7QAQG1t7S922nXPXQisnNnUtDUS/Y+E60BrDsA+AF4EABJfCrLDAFStb7wPQo+G1cNmwf333/9pSduXlJQ0l5WVrdhiiy3e6du379uDBg1aQFLd9f8oKBQKg4Psr4AeBXgwhNUyP7kmk3mwu74bolAoDCsCwyxYCQyzKJ0fSI+kAQ4baPTtAe4gYG8AQeCfAf3ci813tbtFrJf6fONZAK6M6DtlMpllHdunT5+e6rdF+QLRRlHhQgo/zWZHzd7QON3Ro2H1sFnQ2toamVlJsVj0EEKqubk5Li0t7TC8fyDNZFNSVyh8nrBLAYREuEP04yPYF+G8LlhoNvFbAP4pgZXPNx3s0qUG3Cliewq/NtMLECeLfLtNgWFpS8rGppqb6SUlpXHRPy/ypChVelNdvuleMNxSk8n8ruvY1VWVtxQKhd8H2VX1habHQuvqOel0eqXDTpfQi9KhHtuEVAj/UoRBzyphD5sFxWIxSpIk5e6pJElSklLFYjEG8B8zLZREihMjeDVd/0PgKnM7E26/TVJ4LQW8C3B+d+NsCMErIU0FNJrEyyBGB/E6p9343DNPf9XkMwLw03RRTWapY+KiHxlS9ogDt0X0A0n8im631OUbf1dXKBzUdfxMJjPvuWeevoBAryhV+sMg+3F77OIt1VUV3xpdUfHyvHnzFtcXGu+cVSh8Zv1nuXF6BFYPmwVJksStra3pJEnSxWIxXSwWUyGE/ygH0iuvvJIC91y5cmWSzY76RUQ/FESN6F+MEj0SFI2O6N/qbhy0Tf12RFuozfRZhcJ+ACByW5Fbk5antBDgDYKtoPy2nXfb40mJS1L0PwL4PcgTnHRL9A2Dzk8UXd4acy6MlwOYRlldLt80bdasWQM6H7e2ttazmYofU9H3k5hXABgI8rft5xTttOue/wPx4Mi5+wZOfaP0CKweNgtaWlriYrGYbmlpSYUQUkmSpEIIcRRFUXd9Pyxqa2udwKLS3n2vRpvG8grAW0jEzatWbF9dVXFlJpN5d2Nj1BeaTs3lmj6duJ1aVzdnqIjPG6JLAUCwnxDIyHUpyDMdehTQUNErKP0Ght9K0R6CngC4KAJfFG2WRxwP6I500S+DdLjJnmtOR/tKKre45NX6fOPtdfnGis7nkc2e9FLU0lKE0BIhzLv77rtLEkUzCT9GQYe2pqO7crnZOz3wwAMfyCz1gRr30MN/KyGESFI6juOkWCyumRauXr36I38GcrmmA2A6FK5XnX6Jye6uLzRtR8cPBPV32K/Hjh27Jh3OrEJhv8hTS7PZk17qPE59/Z3bUMVdnZQB+zNKdhYxVcKQ+nzjGZIvM3oViNUB0ZEmXU4iJ0Q7C74Mwi+cqlfMLyiAEE5FEl0RxT7Kwb5w/2UU6f8C8GRJC/IgHMBKgK+IYZ2pak1NzaIZM2YcYiVln1n27qpJBPam7BhEuixV9BNEPbZg4aJldXV1Z7Z76XdLj4bVw2ZBa2tr3DEdTJIklSRJHEKIoij6SAVWXa7xWkHnSNxC5GWm6CYP+Lxcbwi6iNKDNZmRv0Gbm8Pe9YWmSpM95Kbtu45FK14oYDWBtIA7Je/nwkLKnwI4lKS788QgzpI0aNiQ8kMl7AXJBD4u8GEA/4iCMgAiSV9UVNzHHYNjhlvJaFHi0WhK3zToYbh+LOB0uP8mUnRWLt80rVAorBVUPmbMmJUhaCGEveDRIaLOArRlEnOX6qpRh4v6AS397a7XsiF6BFYPmwUhhChJknTHdNDdU62tralisRhL+kieg7p8Y8aIs2R2e3VVxTeGDSnfX9RSRqysyVaeX52tzGazo2ahfaon+mfoeA3kHELbdh4rl2s4SsDuEknwMxD2kvGKmP6Mg58G0EvC9k7bimAJyeYFCxc1Naejr4E4icAwGpY68F0BFcWYD8B4eST7B8x/E8TpDs+2lNjtIg9zi5bS8GXRX6XhOBf+FqC7AmzujNmzh3Q+t5qayr9F9F2iqLgIwlHN6bhijee+oi8IWOMG0R0fyY3qoYcPm9bW1qhYLKbbDe+pJEliSXH7SuFH8hzE9CdAXE35PXX5pq8deuihwcSrAF8rBq++vnF/SP8LaJSok+V6le5rpoj1+YaLRTuM5F0kFjrQC9RggN93jxMadwJwMKWdIA0KSctXXVoq8anS1nATXbMADYS8yhyLIQxNt2o7uQ8R/OuQbQnwJQKfLG0Nv4DwOXjYPlAFg80UsIREf4P2RNB3UkXNvW327PLO15DJZFYDCCD+0J7aBgAwfMjAG2qylVfgffKR3KgeeviwSZIk7tCsQggpd08Vi8XYzKKPypabyWSey2Yqb4BrBKHz8oWm2e6eAPZ853ai9gFgFG4B+OmyXqnaQL6Ty83eaVZT0/YStxbwdtv0T4tJ7UiwL6Ss4FdReBvQPiI+T6JcpaVlBn2GxGKQvwDxWYA7SPYrmA4H0Cj6kbHpf0CUiP48yCcJFSQ8JOh6xfyNKbpZ8PEED4T0CYDbILJPgLgqXdTcmTNn9utyvasF3J3LN96VyzdMAoARI0YkADBj9uwhdYXZ3cY/fiQ36qPkBz/4QVlpaZ/PumsfEuWSjNQSAIvd+VSvXvHjGwpx+NGPfjSkuVl9pPTS0tJWrVy5svWSSy7pNnh2ypQp/dyjneNYC88999y/d90/derUcjNzAIiiqGXcuHGruvaP4zgCgIULB62src20dh2jh43j7iwWi+lUKtVaLBY7fLDiEEIM4ENdKSwUCoMBpDOZzOsAUF096qG6urp9FaWbaDYnxNh3rQ5tAdqJyK0BDVvV3Fofw66tyo58vs1lIXrJhEcBWw2GUyH8QeSzEE6B4QZ3HQRgMoHBMP4pDjpetOflOsjkf3ewaMaHQBwB4TkBj1I8MYCvAhgSeTRJ1L4AHjHji3J8nsXUnWTrdwH7mQMX01gFqTekQynlYWyMUiV1ko7vHElQU1VZP3PmzLuKxWJroVAY5rBKCduj6FkBfQqFwpYbWwndbATWD37wg7KSkrLLBZ3j8i1AQGjz7VV7hBINaG5JltfW1pbX1taulT53+vTpqebW5GyLtSXQcmwxwVbpkt6YPGXaBo74HmofOwQcC2AdgeWO0e76lIAjikmyS9cxBaCYtN3zAQPfxuQp0xYB+DuEeyXWn3/+OWvlK+phXUIIZmbWEUfYrm1FSZJES5cu/VB9sYKicYCurss3zqPwOxjvjRDubYWfGzu3O7li1NoFHwL+hgiBsnsdITHYo81pvlxf37g/xbEyfVLSISB3guwdwFvlSMXm2cRtIoE+IPaH62sEDpDjkzD8idQKjzgPCQ6UfABgL4D2tLknIMsFXCFgSTHNl1NFXy7aeAlzadgDSD4n8QbRTqP7T0BcAOJSOJ4QeSqdPwT1+Vyh8SIAP+x8Oel0mnGq9E8ONELYH9DDAPvTdUKmeuNuG5tFLOH106ZtEwc+AGgHAItBXuGJfldSwgWrpT6x8wuQvg1gJwDFiRPGbzR97ve//799S3utng9wYKfNiwH8X6fPvQGWAfpU2/9AMO1x4bnn/m3dEduora2NBwwc8higNTYMAQsNulayoqidDDhJwDadujmEW8hw4YQJE1rWP3IP11133Sgz+2IqlWrt27fvkvLy8rcGDRr0xuDBg18fOnToP/r377+kuzH+XcyZM6fvqubWesCeaLNXcURbJR8+WF1VcWjX9g888EC8YOGiv1PREe2b0o5wIMg3BISoI4BZONVpX4+RzAtuv3LiIoPOF+w+QM8YdJiLy0mUU7pL5CkAXwEABeURYTsCk0F+HdDFEfyrAXYLAi5khAMk7CtgLsRP0LCC0EAIp8o1HsZZlL4m8jqBkw06EorGi+G3cJxQXV3Z+dlAoVDon8lkluXyDT8UOM7Ak6qqKu7reu1d+dhrWNOnT081t4S57cKqBbJDJ044++lOTd4BUHfDDf/zyyjV8iC0ljBYL5deetqKG6dMfZzAYWs2kvdOPO+c6q5tC4VCtGDB26cLuCUNLOi6vzO1tbXJ5ClTHwS4RmAReHLChHNv7Pg8ffr0i5tbipMAjm/fZCDOkSIDcPZ6B+4BATC4WwghCiHE7h63J/WzdjvWh0I+33TEu83FaMshg76yYOHiGwGWK7Ruh7h0f3MtXF+fESNGJHX5psmgFwDVA1wC2EEIus4i3CrHEBgvADEZ5vNDiMYSGDu6quLhXK5hKIhPgjhNwiMgd6b8HpH1IP4eInwtSnwsY/s0gs8HeS+hUSKnOOxISItkHC5hFYFnCBzRXGLfLm0NWRHHCLieZlcbUO1EDsC3CV3nwPlkuBrkBTDdXFtbe3Btba13XFMmk1lWn2u8WcBYuI6rqq68HwBuvfXW0tJefW+ozlaes77v4mNvdF/dkpzaSWP55cSJawmrNVx44elLKJwP6H3Zhwi+ryDOTCYTJkwYPx3A04sWLep++VZdEsoJa2USGDduXHHihHPPBXXbWu2IcZOmTv00elgvXiwyBEWSzN3jYrHYIbii1atXfygCq1AoRAE45YVnnr53xIgRSTZTcR6gXzFK18RI5mWzFX/dUN+Y4XoAkwRLHPgHITPTfhIegnQKoPEmvGCJDqquqrgym614OJebvauMYwntB+kvBLOEDykrK/25gHMBfjMu+p4AvwL5UDeWgHpBQKukpQD6Eyyh4zUKlwksBTCstDWMgfA5gDNJVAm61aEJcJ0C4TJA3wPwdQD3Sdge0Gs777rHqV2vyc1/RuKy6upR99fXN+6byzdMKe3d93VQW63/W9gMBBaAk9b8J6yVAK0rEyaM/7XAlzfWphMfbPol5LraxdbbjHxfArNfn7KzBHR+I5POr26ky2ZNCMHcE3N3a7dfxZKiEEJE8kN5DoqyIwgdustue5wzc+bMfiRVXTWqFsIu3VXxyWQyobqq8qc1VRXXja6qvNsjXOXkaSROJqNFBOYGaCsQe3X0cW9+G9KDAu6jokY5zoioc1aubD6awAhC+zjZF9BSieUEegHMFFN2Pl2LJXwZssthOspjnEC4U2oUuA+IZkhfkGs2hUMl/knkEYS+AdhxFP5CaE9CW4GWBzGxUCj06nxNozOZRyQNqM835hnhCIHzABKe3uBM4UO5UR8lBHda8z+x5cZbAxH5voJLBYTu2nRm4sTx13TXpg13vA/Gjh3bTGGtmnAE1pvorYe2TAjuHrULrDiEECdJErl71Nra+qFoWBF0NMlrBHzVUqWv5fJN0/L5poOJ6PoPmo1zdGXlCzVVlV9sXrViazFUurCwTetp+10WCoVesJLqtmrO2Eb0C2CYmMgOIG05gCWQykj2hfgKiS1M0VOUrkoVNRGGQwG2tI3Hdy3gOxE1hbRFhPYGuBOhRQQPFPSwmWRUGdq87OeSbBE4gtJvAI2HVBfECV2vw6k7KfuuwX8G4EoQE6OoxXP5xp/Pampax5v/Yy+wAF+jCQmonDRp+vCNtT7vvHPu2dj+TQ31/pPJyfyRzp8JbhaLKP8MbRqWd/xFHe4Mkj40DUtieTZT8ePqTOUBEfhlwYc79FsxOQn/BHWFwudLy/rOpuI6CoeS6O3Cs2grw/Ut0ntL7E3iNULLCS4nMFDyUhIvuxjLvQTkGyCGOMNuZnqS0J4kYwqXiKpw+sOA+oVQMsCpayX9CFSpxOEgXyW5D9qET0HksXT/k+DllCbLeJWE/yUwDGRV1+wOozOZx7PZkU8ERNPahsDBLl7utJvWd80fe6M7yPkQdmv/1NuiZM73v/+/h1966Wnvywb1oWNdrVYbhm5vdV7nlbT2cngPa0gS0UxdhVYUQrBisRhJ4qbMPFrX2LhL5L7Go7uqquKPAP6YyzUcZ6bH0B7UbG4XQpjk3vLS6NGj31nfWG2rjMXpcOzrMU4w+GchfDXQD2BSfA0AzPC2RNG4A9wfkDEj18Myf9Rk59LtWtLHgjwEwUYByTY0O9Kd/US1IPBXjHQ4xMhgk+C6DCxeJcfvQZ5C101OO9zgvV1cRdmvSZzRuzQ1blVL8XYIq0QcZOL5Dp0BoU7iy4xKvg3g/M7Xk8vN3hvS9iCu8aQlZ1Y6rKw0+vuJJ564zjP6obxZPlKcd3fZckBpr+YHpkyZsvUGenykfBANC9BansQA/7Chlps77sHaMzYYAHYIrHYNi5vaxYcJLnfYKYVCoVd9vnFyfaHx7rrC7MOy2VG/yGQyCwDAZHNAvoQIP2ZcelZ9vul7XccpFApbrWou/hlAFJLmzzJgd0g/o3TayZnMUx1CToIo/Q3S75w2hq4rSVSa20wBy7LZkc9H9BoTL4L5V2E8gfJHQOyVxDYBhv0d/iDhWyx/Z/HhMg4nMcSI3SH8AcZtCD1I2F1mWCL4RQRGtLS0JEpaT4fQAsePq6oqHgA5S2A1KSdxXj7fdAQ6kc2OfCJbVbG/wGWM0i+Kfu+q5tYXcvnGnxcKhT6d237sBVZzc8kMrBtcuZ8QPTJlys1f3EC3jwxR719gGffq9Gm11LpW/bge3sM9YZAsadewkiTpWDG09inhJn0WRFo2U3lNkH0PwNEAf0J4bed8UBJuB9RfYs6gjELLD+tyjdd1xOVJYoAVIDyUzVRko3SvQwnkBF7RESSN9lTIoj8qYrxoz0fAzxw8EI7jCX3HoD/mCo2XJIq+KehyQIskJCJvAjk/KqKS0I6UnRfAX/btW76rAWdAanTx3vcWCLiTA1/KZiqvgfATo5/osro4jlfCsE11deVjdbnGGyOE30XmVwksJXCvQ9NyuaYDOn8/9fUNhwK6GK5jqqsqh1dXjRrmwG2JM9u53Sa9Sf8JXHrpaStEnrueXcMF/Wby5Ju/vp59HxhupIrwTTfdtOfkm6ZO2dD+f4b2qsXvVSGhbjz//PPf2minzRhJVAgGd5PEziuExWLRNrWGBWl+fb7pzwDOBnlhdabiDjkefuONN/p2NHn+2ae/0ZyOvi2G+yU8pTjerpi276db/era2lqrLzQdB6k5Mh+XzzdWQmoQ+K2aqorr1j6UD3h+3ryHQPaD+5FODKHxRRhyIPZ3oL/A10kNcyACuA2pFRF9T7iWG/xtyPJOvzaSvchIVwv8C2mvkvpMbP51uN6QlCgoX19obJJheJB9D8T/hWB7QSyZ1dS0HQ0HhJAeENzmIrTcZvRTQrH5gGy24tG1vh+zI+k2qqO4K9puSGfHbGCzsGEBOP+8c2ZOmTJtHwEXddlloL47ecrN27+zZOHZ78ftYEMIOHHyTdPeS6gmxQD7Aki50AfAv1X7mTL1R+Mg7NP+8cF3Fg+p7abLZk2H3apDq3L3CEDk7mZmm1xg1WQrr5hVKNwReWqpHCGXb5giYFBNJztVu2PlUgB/ATAmn286OGoNx7pFd+yyy56fETURAbVOjhI5Q+JFNdmKdYzTIWXzdtttt/JEEImt6f57B7Zqm/kiArlIjm0ILCLxBQH3Etw5gfak2SpIQyV9mR69I4ZygPcA+ITDLwLQq2i2fQr+C4nf612WemVVS/GTJElpoCdoYoRLKJ9kCY8D8GeyeACIO2ipL4XAeVFc+v8AnNf5nJ2hwWjX5gqN9wGIBB4CaaeWkngtz/+PvYbVwXnnnXMJoBvWv1enDxg4+M7a2tp/RYCr039l7cIqBtCnfedGvdw/CFOmTD0b8sntH+cQ4diegOiNk0gM7dPBdhcHS5KEIQS2a1ib7FmoKxS+ePfdd5eMzmT+ks2e9FJ19UnzBVvF9lznG6KqquKPDu6ANpecPhAO8BQXiLwVwPj1CSsAGF1R8bI7P0uopa2vrWyz06mPw14zKSG0K4iV7WMvFvBJc24HVyWJEkCvmikRdTeAy4sp3tC/b1mFwb5jAYcH2RWKcMOq5uLpDj8L0i0BmMJIJ7aF/WAviQbXz2U8vyUVXSfabs899/QTMOyxzjlnMo8rwZWStpG4NaEHii2rDu6cigabi4YFAO0rQBfdeNO01yj8cD0/0GO3GDj4egATNzDERiHw8wnnjV9rvg0AkybdvL1FKpB4XylgN8TkydOOhukQiF9UW5HKXxGYOmHC+F9317cHwEMwB8xd7JgSSrK2bB2b1uhOt1N69er1x1yuYayDu9ZkK78m6GnBN1oB59Y77tgCrb7S4DsCfBLCG0xwBoifwfXCxvo67JMGfxLADgEaSHAQiFcBPiZwD0CvQdxd0DUEzjFpqsghEJZI7EtiLzkMiGJRE9KJVy9fvnI5AHjM+y3oKHN+KYnZkA5oSYDzTbiJiEZmsyOfyOWbDgcd2arK3+UamgamEx3vSfMPa2trvT7fuHBmU9PWJ1dUrLWqzUgjQR6UHTXysFxh9rdSJb1frs81NmWrKsZ3rOBusrfKfyrnnzd+EqSRANYpCklgwpQp00avv+fG0QaWxC+44JyXRb8Wjn+pJLqZPwfH/cF0ZkhaBk2cMP6EHmH1/lEIdMncZZIYQrBORvdNJrDmzJnTF+SOCxYuPl3EcICvzpkzpy+EXRhKNhpVUdLqk724+hZ3xiFoBQgj0VfgizI7ffr06RvMMmEmCfyEoGcI7RYxNABYHSP5B4ADIW4n4JXnn/3bT0S/UODBgL6ANntfqYC5MPRDrF+GmH82+M8EjhD4pSjRzp60ngZxjyjxPyfOUTVVlfWEJop+y+1NTcOtLY7wsFyhaSwCTqM0KY5L90GbvfeXcdDx6541yyL4VxoaGgYA+hZlh4v4dV1Dw5qQs81Gw+rMxInnzpk0adqBFuFuAJ/ovE/A9TfccMPsCy+8cPWGR/hgKLF5FuFfmrKdd955rwB4pbt2Pawfdze5DPAODYsd2lWxWORbb721SQTWu0ky2KByEDVwDiO19arm4mQS71RnT9xgps1CoZB2qazm5JOX1+cbPXjzfItKh9NVR8MJov20X//y2+tyja+QWgoAkrXQ8PcI4S7A73LYUa2p6KZU0a9NxNkEPgGiVSF1AaLiF0n6zjvvfiBkhwPqBdhWgt9H2mBJ+zano9NKm5M9Y+LiTDZzOoAxdXWNe8F4hqVKvu0IFxjsrwgDfuAAACAASURBVCDOqM839BZsAIib4qAfBXGexzzVEl2iyJ9x2WiDbp8xY8bOwfSktRWL/VHnayaxAsBWAdGegN7IZkc+XZ9v/Emk6JsdbTY7DauDCy4Y/4yH+HMAn+iya2gUpdcj/dfGPsB3d8EF45+ZMGH83O7aoc0Pa+0Hh5vmzb+5kUh0l3nb6uoaodVmLSCHDh26Sb7nF556an5E36c6U3lIdbZyp+qqyt4ec0cJP+7crq6ublB9vumKuXPn9kZb7GCrwEEzZ87sR3C30aNHrzCwjhEPCTEn12RG/qY6W5mFt16vwHtAe9pMCVxHBnFOkiQrslWVJ6SKYQylX4o+Fo7Pu0eDzFr3hjgUQBqGiyUskdnPIM0jeL5Cyy0ktjv1K19ZxogHA2gtFAr90Zaf/cnqbOV5Ebwais6SNKh55YrPgTyV1Ao6H4N0IMmVlNIghsCjzxowDNCf4pLebRlOXOskyexVkpoU3M6mNEb0DNoqSh/UOe3MZqlhdXDBBePevH7atOPjoMc757Yi+QUAhY311SaaQohiF0/3TXKczQ0liXkUG9rsVsR78YUkySVLlrzvF9AHoXNKlQ5GV1S83J7NYA1xHMdBuHDF6tV/APA7ABB0U5QubaBwVS7fNIWIfiD4GVFRv6nPNbbFPxIrCCaCEjn+Gpl/OwTbnpa+CsA5cDwk40RCN5La3YFd2ZaNFHAdBvBdUO+Y/EsinhXsJYvSt4nom883HglEvwBVXZQdDGCNE3Ymk3mxPt/4O4CfLi3rd7ikb0M4im15up5w1yKInwUxMCKeCMKXSfwN0tAY0bsBer3r99Lu2b7W6mFXNslN+k+htrZ2zY9zQ1w0fvyrAtcqM+ToPkiam0qQ+NrjChs//x7eH5IoiOG96SDbPd7ZbsP6SMlkMgsofImItsrlGr5cKBR61VRVNsnxhMPPl7deKYaL4bqjOlu5U+9eqX08tOzvScuIkDQfqaT1OBgfcdn91dWVf4ahLaWSca+IfhkVXSuzVQb9HsSZZjK2/U8SZ4r2cETNJbQS0u0IuFDkdjLtQmpVROzf9Zyrqyp/AmhLCRXVmYrZAPqL3AfinwEECJ8CsCQELTRyAMDXAUQB6m+GdQTW++FjLbAGDBhy+uSpU4/qrl3SGue6bOo2dYy0aQJmxbUFlME2yXE2NxKJCm5woEPl6fwy+zCE1qzGxk/NKhT2q883TuhaoOG22bPLEwvNAL4C2omr47g3AFRXVVwKcD6j9OXZTMU5MJw5d+7c3ieeeOKK0aNHv2NWspNFJVcxSp8ghOckzJvV2Pgpia/U19/xCXj0y+B2YcRwOuRnOmxHur4l4AgRQwC+TteVcJ0UZCMEfoa0NxjhAAB7QP4JAMsketfAZQBIYjuL1H4kJSInsNyA+4z22bbgcj7GmJ+QFDvwOsAt0e642nmc2traNb/zQqEQ1dc37j+zUFgn+8jH+mEQfSvCdumu3cUXj1vUedWQRLc5sUj/wHnAp0yZsvX06dN7b6wNibXGFbRZT9v/XShxk5yg2MVOyGKxuMmFFQCY40cmmwzh7FSq11oPY5wkO0SyMQCaBF+QKvrhaHfHyWYqvgZiu0Jh9uEkHluxquXLaKtVWAXDKSIHgLjQYPvIcbUFzIkZvgtLKsFwDanEnbuANpWmkSJrTLyBwGBBTwMYCGEKgAPputGhHdsr8dwHcRc4/ww4GZeckMs3TCoUCsM6zvuUioo3EXTunDlz+iYtq+4l1f+ZZ556UNCnSQwRw68J7QcgStHnE9gWUplprVxu2G233bYuFAoDASBBfJiofWLx5K4zpI+1wCLQR9IJ3bWbNGnSFgDWhEgoqFsDudocQztt0FrJydaHFJ23alWy3cbaUF3GBco20LSHD4AUOvmdOLo+CJtSw5pVKOyXzzeNgGO+6JfQUC/5gI4HFO3J7KqrKi+RNA6OX1M4PJebvSvahZYbLnNqYoj4K4DH1tU17iXXfhJaCB1t4jhJAxjhXKef+s4777wA2mcg/UTAuw5sJeH4AB8PoQVAKxTVtRWBsPk0nu5APY3jJGwfMcwyKQEQiX60xBIA77q4PMiuqss1nN7xHVZXj/rDiSeeuGLMmDErKS6ora11CfcD+Gpobn62Le8WygE811Yv0SJ3rZWJwT3a0j3eplAo9Kd8FEzPSuybyzUe1lnT+lgLLMB6ETzspptuOnijrazklA7jtqDfTJw4fq08U+tDnQQc2jrvuOHW7Sqv4fjSUlu8sXaiegTWJiCEdgHVaUHD3TeZkOqMiV9y4HukFhN2qYRRAm+YN2/eOr55JPrC7GhIt8H80Hy+6Yi6fOPxoysrX4Cwq7XGzYS/jgjXkxgC4F0AfQL0SZA1DtxpIf1mvwHl90P+Ig1fFmyFwf5q1HzKtozMr3FoNzGcZLDpovYR/B8GZFx4ksZX3GNzsi+phYAdhbYF610BpAk1m5nl8k31M5ua1sp6Ygzj0WbKmAUgsrKyAYD1d+ATmUwmCLa0rZqdd0kd41sCWB2C7QKi3Jx9BbTCeGwkWxMo/fEWWPJSAHDZrJtuumm92TgnTZ16EKhr2z++ERv+3/vJi8QuhnkBu0+ZMvWSm2++ea15/vTp01OTpk799MCBg3MQti8vL9+owILYNZ/18H8xZKgHAFHUfk87iSgz6/Y+/zvw2GaBepOwu+iaDeFvHlo+u74VRDrPAXQyDLOD8HKQjiLxjUKhEAl8GFb8YURdHYHfBfiKEbvDdbQRwyH+gsDFsOQhgFOa0/F1Dhts8OGiquF6OAKvcY+GKsIfQH7eqWNIenssYN7gSyCVOnTEiqWL7xCYgvQ6zH4D6J22ij3WR9CXnJgRJ7qxvtC0Jl97JpMJaE8ZI2Aegcjlj1l7JlSDLzFTqjmO13LcdmAwoP6ewhI5XnLYju3CeHC7dgZ87N0aDMX2N+p2Lnt88pRpcyHeL8MCQlu2ldzGyPbv4ckkwnETx5/7anfDTpo0bR+sZyVR4HXFRNdNnjKt2P5lo7kl6W1gSfuT8XTHDV0fU6dOLQ+Oz3bZ3Ld/+ZDjANy5gW49vA/IqNMc0ND5pZRKpSR9gLQ+H4Dbm5qGW8AekIoJfaXBakn8zFhSCeAnXdu3ZzHYvi7fWE3gYhE/pLg80O6k6zswTA+yFkAgcR7FaTJ8iuJjxvD8ypUrFw8aNMhWrGy5urQ1HAryj3A0y/xlibtDuI3yUgRuC9d3SFRD+qPM/gHyM5Q/TqKfMzzUb4vyKRIWw1vPNUuPcrCfmV539+dBO5xAjcvvJdCvPt+YL6bsvDEjR66xTRn429Vmy8os/DbIzgAAkPNdOK40SaZ2vu62l4c+FyXRL2BhgYT+gBIC70jvKVYfa4GVGL+TCqCAkQDKAZwI6sQu+tNThH66ZMmQm7sLIJ48eeoxIM8EMLQ9or4FQEeV5gEgBkDoupKyqv2vBWLdeobFpEnT9jHjFUHaAcDrADpXzkkZdP2UKTdPlLCYxOQJE87pSdT3AYljc9IEUl1yjm0SQdVB3OqfhLEB4EtE1F/wiQC+QaJ+Q31yuYYTHTwhZjgawMBMJvOr+vrGfWGcRjEDaGCSrJ538sknd2gpD6xnmItmzJhRFpf2+ayciwBWK8VbLPGsYr5N55akPinjLyGNgHyZU3ca+BWJK2oyox7NNczeDQwv0kqOk/Q5tv02l5rZuwJuI/xs0LYFtBVck1OJ357LNVyfzY5qCxmj5pcViyvmzZu3fOdd9ngRbS/15whdnclk1ookMYQ7gqI5UPg9pH4ASyUmAHrLbI1z94cyh/+oKRQK0ZtvLt7VLRlEoByIDAjLEcLjPTmkNg9OP/30CenS0mP7lpWtKCsrW9GnT5/lw4YN+8ewYcNe2WabbV4ZOHDgS+Xl5evEl/47mDF79pBUq38zMv9RcLuMhr9UjaqYsj7TQz7fNMKhGVR0aDZ70kv1+aarKNzpxnJIexH6jiLsW1NZ+SwAtAkynA2hhbDpZsnKTCazVghXLtdwooivApwPcDXF28BwNoCQrRp1cX2+6QpAO4O8xxFeNNntIebhcZHlpPoEaEcIe7Ety+hfJZaAeBLBF9F4icBHCH3GaTdSfhyAENG/0RJF5adUVLwJALlC47nZTOXUQqGwc3D7VXW2cq2QOLStep4iaRWBWoIPAxokYNv+fXt/7phjjmnBx13D6qB9GrbeeoQ9bB6QkSLSAYik2oWFzGyTTQc7GDNy5MK6usZbnDyDhufgWg4A9fnGHzWno693TqHi7gnMXnL6VwBcT3GmWTIfsHM94JeIcFEgl9U1Nu5SU1n57LBh5U8tWLD4R4B6gWGHxO3Arl702eyoOV3zsRUKhe8XzfoCQDYz8ppcYfZ36F4SgeVufmYcrFr0fqI9Y8B2Al6WC6S2JPG8hC+Y2dxA3gT3YwEsprwK5Ksg/i/A7iwJ4QIAb7ZdmP0BAJIkWWxRyVqZS3L5hu9LPKk15kEAkS56uSSHYQsXvtkhrPCxN7r30EM7jM1hbVPCDs2G5BqBNXDgwPdVXu2fpaam8m8CX3ThlJZ09PNcoWksgGewdGlz53bV1aP+EDFkAf2/WYXCZ6QwyJ2HZzOVN9TUVP4NwP0WwlAmuKs+1zj97bff3omG22C4GEBrTbbyfWXQzWQyC0ZXVr6ADreJGD8Gsa/DdobbSZAGgTyszfkTW1B8pN0u2yppkMRXBI2PpFUGPSrinvaaiH3gqpThwqBoen2h6RS0G+EBoKVXr0TwtZxGRXsYxIp0UWc7GQDMEvEQPTo9UvRc57Y9AquHzYKUmRvoRlOHlhVFkQNQKpXSW2+9tUm0rFlNTdvX5xqfyeUaRnnMewDelir6oQB+DGCnsWPHriWwAGDw4MGLDHzIZPeQ2CqbHXVPrtD4rVyu6dPPPfP0VyNF40V8W44pRaAXiDyFuQIruo5VX2g6trMfU6FQWG8NxtEVFX932GskBlNqApCG42mBCwDtYBbeofEfIF8ibLCZTMDdAfpuW+pkxhH9FMDbUsEE7A/oJbjWqptQViyK5J86b6vOVNyhkDoG0La9WpKjPWn5LslYDL8Tw33oRI/A6mGzgKRokbflw6BIujoxdOjQTSKwRldUvByZf0Xk7Zb4SEVqbPf8vu25Z55ep7AoAIwYMSLJVlWcAY/3cfLM+kJTAa757mrZeed9h4kaHNPr49iXKorekmMr0c6C8TdoDznK5Zum1eUaxgEaH8n+lMs1fHnOnDl9XZy0vmMCQMxwPaD+QGq+aH8VsQsVPh1RF5WUlLxVnan4X7S5ILwMcQ+QrphjAnCmXPsF2XmkNYqYTSAd6DdWZytP73yMTCazzODrZP6tqTnxreqqyjPd9Obo0aPfoXxvgDMpfa1zu83C6N5DDxMmXHBmHEfH9Opduqqsd+93+/btu2zo0KF/Hz58+Pzhw4fP32GHHV4i+W/LgdaZuXPn9l61qnXfAO1YnamYkWuYfXyfXun7jj/++FXohlyuYaS3FSFd2ea4qbcALIvovwqKznnumae+udOue5xi0J5GXZ54NC62cH+QnQPgGJLfo/CyqH0FVEPYPaLvnslkXiwUCjsmbqfVZCu/Xp9vuJhkCcQtBZkDcyMpEbG/Qvp/LS6OheuJ1SXxn9Kt4bORuET0YwnbCmrLa0VioHv0XHX1V9brGlRXmH0Yg79TXV35f523zywU9uzfq9dLxx9//KpcruHLwbR4dCazXuftHoHVw2bBhRdeeIZF0ZdLS0pWlZX1XdmvX5+lQ4YM+fvw4cPnb7PNNvO33Xbbl0muMz37d1IoFKJE9pW2kBd7NVCDR1dV/qq7fp2pyzWdT2plW6YEYMaMGWWlpaVxJpNZVpdvPB7gSYRvDWB3j+0LoysqXm7PZfVuIqs2aE+Bx8DjY2DJ7wFsF9F3CLJ5HmGvxGxJutVrBb5E6HwQ24B4WoYqcx7i0g8FjFrfed99990lnQ3kAFCfb7g4omYWZXsbWA/4pOqqUVevuZ7C7KMZ/B0JqxHblnSvFHHP8CHlc95++23LZNZ2Nfr3rBIWRkV46c1O0edxfyBpm24WrQwpT2+wr6LeCCzZ4P4oKYVHG47To5cAttGA4o1QAuif6+v2F3zzt2vNr7vjyfIjjoBzv+7arQ9Kq2TWbRaJ9SKsBLVBHzOKq2W+wYc1cjQHtw1rH+at8DbfscDYI0Vr6kA+u6z38gwaNugs+2FBUpFZiKJI7cZ2j6LIoyjqWCXcpEZ3tAX1fpHw78n4JOQxYX+szzfsA6BXddWo91X1yEwpid/NFRqHG3wqgGUOOxvA1OefefqunXfefQWACMZTRldUvDyrqWm7UNTVIcXLrUVPwmyeWygwat2esPkOr4qAVhLfMech6RCOFXAfqRERtWtAVAXo/yFgOqDVBPqSHJLLzd4jmx35dKFQiDKZTMjlZu+9bMXKSgDfRHuER59Bg7aJQpgbZN+OpJ8DdnBVVeWz1e3F6QqFQhQUDkZkfwX4LpC8C/I4On66YOGiK0T8CsBa9q73BNb3Pr8tkug4UNsCGABgGKjeELcD0GGoK3uviCJKALQ97C+81cUc5u99jgD4xkxlAjYWISEDNhopw03t+7d+Ip8C4AMJLIrHA1iv3aJbSHyQGqvrsNGuAjcSVucAuNEoFq653TECwPfk064DWvEUjuz4uGpN6h6htaNqC4gA599FrSLwJoGlgv5uwF27v3PfP9Y53D+BmbmZOUk3g5tZaA9JCe7u3X1D/yq5XMNRUrgY4Eq6XeXUMYSWgzwV0hvd9Ud7fvh3W1p+t+WQwZMWvL2kIrhdB+IoEK/WFxorIOwJYgGB2yQ9j3ZjOoAxaBMQLUF2hUfR906pqHjz1jvuOKl14eKVAwYM6Nu2KogvARwAcilllxURRpj7q4jsFkInOjDQoBuDsNiop+oLTSND8Lfq8w1HCb4rxFX1+cbJTr+VHn0BRe0QyKVOv5WRLa+pHPlstlOZlkSWMekPkA8meboT10JcCcP+lB6iuEXX7+A9gXXZg/8AcHPXBmvxg6PKkKxqE1hRXIKQtAmsxCLE/p6GlVh/dORxYigDbF0Ny9QbWp9mpV4AStfdjlIA62paRAmEf05LEkpg/2Rf8PHuWnRFrseNbOiu3fpwYpVJ/5SG5cJKI9fRsCSt1nqmQRSaZevac8zR4qZ17S6uVkRtwidKzEOnStuxtDyhAgBE6WRVaC1rAQCVFlv3fuvXnT36Nykdq4KdBFeIoihEUeSpVMo3tYZVVVV5b32+cVsaj3LoMqN+L+EKCA8A696bDgqFQhQQnQBh91XNScSQTBsxYkQCIF9XKCyg+GwE1RfNejNg9yS2h+KiH05gpCSS1Kympu0s8VtKStKZZSFcc8pJJ72NpqbhcUv4ftmAAdcERaMBjafzECdGDB8y8AdvLlw8KhKfk+EsJZpcU1NZV1/fuL+MP0/Ra4OsmdCOMg4lsbKsV8nYDptcLt8wxSxcnHg0Dq6nGCEyxxEAnl376ngkDI8KXA3hERMzDsyksBeMbvC1cr7jA08JL/n1yi5hIz18APZaet+tAG7trt1mwTJ8qJjFAhDahZXiOA5t2pa5pE2uYZFUfX3j4xI+B6CXCxNJjqN7X5EH1eUaxtVkR03v2m/w4MF8a+Hi0wUsEXAno/TVAM4GgJpM5ncd6ZTr803XAFidKoYxranojHTRr8s1NP2pLtdwq0J4zJNizf9v78zjo6rOPv57nnPvzCRk3wTc6tta1KqtVan11beudamILwmThYq7lIRMIIpaa9tY0aogSWaSYKiKG1luElxQrLaKr9bWutSlVhGXqoAsSQgkkGTm3nue94+ZiQGDaIsVYb6fTz4fuOeec+/M3PnNOc95lokTJ/cB6Jsa9b53CXq563KqkAgxlhcV5j8P4PmmpvYjmdULWrs+ALUrV77xFgCQwnECvJyUlGRv6Y/Uaie8iJQ5QwRb+vsjR7VY7ccwdJ3WeNaBuocYHcX+yfHai9ss7QCAIKYWSgZkskH6Ei38N2bcpDW9AaBzpLjbLyZYCRJ8TWFTaUMpHVsGaqWUo5Rytdba4/F86YIFACkp3je39A8eCJAXkHsV9MtgZLlC84jpBwA+JVgnn3yyc8+SJVM9tr6GBJOF+c6Wlo7jQLgQJK+NSvLeE53ZSIqQfow0j71g0qTue5csOdq09RPEdBaBJsLw7tPc2j4OwAYAabB1thDdQ5A1YDocLq4REbr3gQeyYMtMJvtnQnwBILkHH3zwx00tbcUi8nOX5MwtWwZ/qJmWM3tuJOHbmJ31PT1d/akZ2aOLCv0ugLZmqyNsD259cuR3IoZAQPIxgf6iwSUCPAbBgYD0F03Ory0eoUtCsBLsFXiU0kSfLAk5aoB3lVJaRxO7f+mCNWHChH4ROc2ylpzqCn7sEv1RQecr0ie6mucAQFNrR7NB7iy/3z9UKfyCSZO6AcxGNBngeA0uIaJlAt25ZWs42NTSvk6TXqSELhCmRxELB0K04C4AoKWl4/uacDILlrsmutmRyvTU5Kt6e7cWQLC6uLjglaIiodi1LgaAxYsXtyvlOY8N7+OAbFIk44v9/jX3d3TspyJ6nFJyoyv4ua3UzWlp2YcASAeAxa3tZ0Ck1fSNKhCRZcPf26ihXT1Lom8HqAYipSD9joAKCPQyIAcQ+OodfR4Jt4YEewXXX3/9FKXUKaZpRpKSkvqzs7PX7rPPPquzs7NX5eXlfbTvvvvuNK3QrmLRokW+pOTUBwV0NIm+yDH5VcPRM12DQ8rRM5kkuH0A83Asy0pyoU6HyDmj87JL16/vOQTkXq7BWRB5T1g/agIvf1YqozgtVnsltHQR8cda6/7i4sl/brY6fgKRKQIaZJIPIDgShJeK/AU3t1jt07UmL4l+WSl5xe/3b4mPdf/996cpM+laAk4TLWVFRfkvbC88IkLNVscTELxSUlRwVXNr20MAjiHwMoGYonBzPLB7JBKClWCvYM6cOcVEdIrH44kkJSX15eTkrMvJyVmdm5u7euzYsR/l5uZ+rp26XUlLS9s5Qnw1SLohWCugdxlynSY9ocTv/9OIfayOy0XLLBC1iYgpJt0e2wkcoqm1fQJBpjkGX3Z+fv7aZqvjfIjeZ3ReTk1nZ+dYW6mhlZVypVgL3mdCnqtoKTu6iIB0JqkCoIYLEqJimRITy1sB6iTIeg2kECGVBBsE2KJIX7J9+pjtxjjAEVVFWt8hTHexcEFamu+d7X24RiIhWLsBIkINDQ37lJWVrUOCL4Ubb7yxSCl1kmmadkpKyubMzMx1OTk5H+fl5a2K/X0l772IUGvbkstE5CoBZgF0eElh/m/jbdvPUJqt9mX2YP9k05O8ULOeS8KHgvTHtmG8EVvORc9rbjsJjGtJME8TT2GSv4krL4KpggAlBIJQHkT+DsJLxYUFdyEqdk8ZpE93RP2OAVegs4sLJ0/a/r6bmtq/w6wGV6x47Z8Hfve7acMzTliW5dne4dOyrHF+v38okPn+jo792JE/QqSaCYcI0Q+1HT5rypQpPdtfazgJwfqKaWhoyLRdmSGgFTPLS/8ll4cEO+fmm2/2M/NJpmlG0tLSejIzM9dnZ2d/nJubu3r//fdflZqa2rmzMXY1ra0dJ2uRaSAcDdA9gBQCYgE4UlzPDLB9VUlRwRXD+0SFiOYAsBTp3wE4QGs6REBngCSXBEsLCwvuiwudZVnpLvi5wa19x1x00UWDLVZ7pQv9J9J0DAMfAcgSokpAlhHRVi307ZLC/AuarY5zFdzfu+BnRudmn9DZ2ZnjOJytFI3RhP0E9BFBcilaYceI5sByfzvSMnSxZY1noQnFhZN/GX8NzKxd0Ycq4pUCfa4IZb+94o0LR0obPZw9yuheX1+f4rp8sAh3V1RM+6iuru5A22YFAOIRRji8prKycgAAQqHQWAAHiRj94fCWlV6v13FdYyifulLOmkAgELYsS61Z0zVU6YYIZkXF9JWhUOOhrrutd7jrqt4rr5zW1dDQkJmUlDQQj8SfP/+OLKJIBgAwK6eiYtpHiP2C1tYuyBOhxZGId+gLU19fP3pHs61QKHSQ4ygCAMNwB0WkOxAIhAHgllvuTPV4wrnxc4dfa2+HmWWYsd1hZmfYTuFObT1fBkTui46hVigHNxLhQ7hqgqvsVCV8GSm7A8A3AGwjWMXFk58GcMKwQ2/H/h6qqqriQw47vLzFar8CwLxY+2gAbvxZjAz2N5q+5DbFutgFP6igJziO53FmN0u0m8nEbYhmUHg4lhzww1U9PVkm1Hgi3UWk39NADwl/U0RSo2KLHwG4K+YmPvReLl++3Fi7vutyEmSQ4J2owZ2qQPyiK5I2zI1jpIypI7LHZGuoqak/1nEwV0QnAc6liApCGit5h1kfoTQKPB5PXn19/eiaYH2TCP8YQFiT/r7Hk3xDIBAIK6VLWMkCNvBjgXqttvb2g/1+v0uGHMtKnoSBI4nk4vr6+iwhN58MHM1KniKFi0jJ2R6PcwYA2LZcs3lL/5T4vfX2rt7ESlrYkPNBdkUw2PD7oek+y+msZPFVV108ZCtwXNxeW1s//KEcQkTtx0peV0q+I0IFGsaTNcGGasuy1NVXX9LHLNcrJTeRIccKOTstcba3EBMsVyllM7NtmqZjmqarlHJd1/1KBMvv9285Pz9/bUlh/sXF/vz7hN3xStQdAH4PwesCrLyvo2NMc2vblTsby7KsA8aN+85/i4BBvDJ+3HVpPxIM2bimTp26FYI/aKhCEXrChfoJOJIPQBUXT/5zUdGkob7RIGUaO3XSpA3F/vyHtRLH1VypNGUX+/PbSoom36GdyCWK9JHFhQWzhy8DGxsbzfUbNtaB1QqAvqlZrXY110DjMYieQVqNaKPbGXvMDItZzhCwMWZ0zl/ffBMvAYBtGxuVoaWiYsZQxsXaYP0jDCwNBMrujnV9qbp6QTxdazeA1RXlpbfXBhuOF9Y/7hnk5gAAE7hJREFUAPAOC3oE6J1VXvrgsGIQN8TGu44hzwYCZU9UVVVxY2Nj8kDYOYIEZwK4E9ESX7q2tn4TgV4qLy9dFgw19Nx6610pAPpIqI8Im+NT+FAodJAWGUNEAQAjfKhOL6AigUDZUkR3nBb29vW/snZt17sA6oWwkUBbZpaXtn66796LivlgeTwe2zRNm5kdInKUUk5mZqa9s/7/CUoKC6zm5vb3wWgE4X4GCTkyCaDyFqt9a5G/4FOe34ilH9YAoOgjCCb29nSdblnWAbm5uR+vXdu9LjbLGkI74bvZ9LYYpC9whec7HjXTtKUSwDXDz7MsK8WVoVA8sNAEATZD4LZYHYtaWpZUxxLzfcrulJqRXaLJvZ/BJ0DkARH9I4hxq7BzD4BqiDuqqakpp6SkZJvsoztjj5lhEcliQE5dt67z2fT07uEVbTgYbLg6GKwPBYNBL4BTAXptWDtmzZr+QfzfAiTV19ePFogb7vcOTyubFww2XF0bqp+DHVBVVaUHws4UYbkBBB0KLThleLuITq2rqzueQPVXX33JdnXZ4ueoSxXDL8DJdXV1n1l0FQAuuuiiQYE8RCSnxY8J5Ie1tQ0/rwnWT/3s3nsPhmFo0zQjSqmIUso2TdM2DMMxDMMdvoz5Kmlubb9MGLcR0Algtmi9GKAqAWaI0Db1/4YjoDUimA2RRkA/kp6ZXaqF56/f0P1Iaqr3n4DsO7x+4JQpU3ogWKG1OUpA5HOcMKD19sn9XJeOIui/IuY/pRXda7CuE6ZroFEn0KUj3Q8AEOjbLOoCAb0rRAcy6CGw0wHSv2DCd5jlAFLeLxxXu8cIVnl5+T/tiDFeCOtYucNnFzoQKL3FVrg1ZuvZLKLH7GgcBo1xHFQwkDEwsGp4GNKGQKD0Foc/5Y28bQVhoJBdPgKa3tOit/lAhPA9V+g3GvIBRmDu3LmjABzvunwGgBWOjoZg7Awi2iqgoV8qAv2loqL0t676/LaBPR1mdk3TjJimaXs8nqEZlmmazu4iWMWFBb9jkVoN+hiEV6H4UBCmw8WHBGQ0t7ZVIerQmWlZ1pCtstif/4AifaQifWBx4eR5Rf6C2qLCggImXTgwMMAQetru7e1qtjoK433ENW8ScgrhyhwNvpBE3e0Inx1vb2lpm9Lbu/F5AZ3W3Nx2kivcRC6d67o8hoBOYSonppeH33+z1b602Wp/BtGwm+9pyJ8g+tsk0iekfyMuLoKogIA6hWlass+Yiy/IHiNYweCCo668clpXWkpyCYhyAMAwbIpmZhG6oqxsVUNDQyYEC0H0i1tuuXOownJNTcM4ABAijwCrAoHSawVQmZm5NwKAjqYyIAAYGucTzFg7qkOhkwjSUVFRulDr8KUATg2FQgcBAAgsxM9rR00lwq+DwYYfITozJBFhAPB6k39KRDdUVJQuZNKlBLp40aJF2wSCu66i4Z9bVVWVAZFzROs7EG3g+HhJRNv40OzNmKbpKKUihmHYRGQrpWyPx+PEDO67hWAhWjBiiTiDV7DQzRD5lYiMKikpeF0gkwGaAQDK9F7qaJ5RVVU19Bz4/f7N27sSxI5tIaK+pOTUDtLa29LSdlZVVRWXlExcr0keNwwdFoEwO4OkZVNcCDWQkpaR8wcIXikunvx0cWFBYUlh/m3FxQWvDPb3XQxXbiucPGnbuooaXRCJbkQJ3cDAeQBSNOAhUbOJ8UuCvCAiU1xFMyZOnDjiKuOz2GPcGmpDdTdBc58QMhVheXl56WO1tfUngFADwQMATM366c3d3c9kZOWWEuEUaLwOklQIv97Ts2FxZmbebEAfrLVdmZycLINhZyGIfg8NDZKfQaiNSMa6LtfNmjX9g3nzGnMMj93KwGJALxXiOSS6IRAIvAYAwWB9SEj6tGOGlHIahOhxn0fdGQ7ro4T0rzXJHBYaD8EJTPqXWqs5SulpM2bM6EbUPvawAE8keY3GadOm2fikNuJvIbgPoF5A9hPB0pkzy16cP39+kjI8cwm0ryY8Qxp5FRVln6sowZ7O3Xff/WOl1FE+n68/OTl5U3p6end2dvb6nJyctV+F0+iOsCzrIFfzH4XwPkGeA/GLGu4apelgEE4c6N9ylTcp9ddEmKlIH/ZZHvHb09TUfiQpuQmgwwB5l8DvC7AJ0Q0qk4AUkOwLohwWuq6wMP8LpU9qtjouhOh9QPwBBBWAvKVIz9Hgn4iID0AKhA7Rbnj6zvytdsQeI1gJEnwW999//6lKqSOTkpL6k5KSNqenp3dnZmZuSE9PXzt69OgN2I2wLCvXFQqIcDdIekhwPYBlIKSCkCzQ8whqVrE/37+zsXbEokWLfJ60tLFw3W0K/5rAmuFxjCPR2NhopqVlfx+MowTYnJGavOTss88OL3rggQyf7TZB8A9xzXna65jKweWIFgjezEQthYX5z3zW2DsjIVgJ9gosy/oRMx/u8/kGkpOTN6empnZnZGR05uXlrU1PT9+4s/5fFZZlKTsWxKzAZ2oHD5JChQDPhfv7WkequtPU0jGTQcuGuyjsClpaOo4F6QIB9wHSKyCTSRzNeDwe/xcrBJsPose0Pfjnf3UmtSMSgrWLCAbrJ23c2Pngzjx1vyhVVVVGVlbuuYFA2ZKdnZtgx1iWdYJpmofFloS96enpG3NycjYkJSWt+7IqPu8qmpoe2oeUXQXgDABdGqgi13yZOXIcwKuY3V5X1AuAflqRTHXBz0AgvZu6j4ubEv4dli9fbqzbsPEXIpIJwpNERABcERnFhP8S0BrSWFFUlP+iZVlJGjxbBNcL8MeSwoLTsQvZY/ywvkpqQqF8CCQrK8scSgG8C6iqsjwZ2Z3na+jVOzs3wWfj8/kcpdTQLqFpmrbruk5WVta//YX+sjGMcI8jvJwg70GbrVOKz1vV3PzAN4ToLkCWueAxgLwN0NOu0O8BvARgS2p69o3Nre3HA3hzdF52aWdn5/4ian9NGANX3gPLRBJ+tKgo//mW1vZ2rXAduZgN4Dlo4w+DPulLst3L1m3oOoWAdwh8n0COhmAKIAZE7tSKHiRXTxGmWS0tHZf6/fl/A/Cbxa3tLynhz21f+7zsdjOsYDCYBqgJIjQKAJixSsR5SjOfTi5H/asYW7Qjb86aVfZqNLyl/kQwjTMVlpaVla0LBoP7ifCZhkGPlJWVrZs7d+4ojydpghDlECFFoF+ZWV7+OABUV9cfahh6c3l5+ZDhNSoU6yeQVqMBpGnGW0qcx1wyziKIV9vhhysrKwfmz5+fxKbvHNLII5KtpsnLpk+fviH6OhaM37gx+9WqqujOTSgUGusK/0SRfnT4tWprG44GcHRU6GS9z2c82W/bR7DLxyiln54xY8bKefMaczwe5xwR9ZzrSr9S7llE5IjI5jFj8h72+/1uKBQ6Qmv1Q63l2Vmzyt6Kjr3gcECOJ3KeDAQC731yPX0UmHIA2iRu5IGZM2euj95zw2mBQOkXMrR+XXjssceOVUp9y+PxDI4aNapv1KhRG9PT0zvHjh27loicnfXfXVi+fLmxbn13EITTIXgZTI+KyCYmHOgqWqpsShbSZUX+/PIWa8kvQHI8RLYCdDqAdAIeh0irMPeJyDQBqiP9fU/5klPfHezv+5ZvVNqpEDkLQDEBz4PwiNZiE+hkMHIg8hdN8iC7nm6wczUAvwgWGqzn+v3+Lz2P7G7n1hAIBHo1cBog+9m2WiKCLYFAIMwa/wWSc30+1UpC7zLj1trausWIhV0Q8Jt4/F0gEFhNRNPLysrW1dbefrDpTX4aUG/MDJTVkbgNLOoH8euxop9rzRXx/9fU1OyTmdX5J9K8tqKitN51B2tIcHQgEAiT4GiCnFJZWTnQ0NCQqQzvYwru3ysqSusB+mfE1n+Nh9RoSEFmZldHzFkV5eXlHxNQOFysAEAp3QWSIJHTAqYLBsP2zUrrDSBp3Lo1aS0AXHnltC4NutTnozWVldPXgOgqgN8E0Tlr13degagv1scgaXSc/qHYQddFD0gavV7vRwBQG6qfK4TCnp68eyvKy24mkTXMnkMQE26BPFhXV5eNPRDDMBzTNO2486jX67U9Hs9u44P1eens7NxHgAiA54lktQjyCKgW0EZ25FZNMtsl3dhidZSCsNqNDBYJKAOE9xl0imhcJ0TTIfpyImglkunzpRxLwN98vpTjSGSakF5sh/sPEKBDgJ8S0e+EiEXLEiLqZaFbwfbdRPgw+izKKtu2/yNa8h+5yBeFBC4AfeWV07o2btzwXOywDUJk2rRpmwOB6S8YBiaB6Meh0IKzXdYOaNsHTyNaREHIvZ4hD1VUTH8DMUEcGPBWIyZOALYI4cLGxsZkACA2roLgxYqKsj8jWs9uIDzgvTU2qoaO/hrbrlwLyMvl5eUrouOW/h9B7gRhLgAQtAJJkoZ6IO5LRcCnjLsiYgOQqCDKIyCkEJEGANPcPPTLz4AdS+ULAFpEXIK8pkErEasKAwBer/eTPhx2AODyyy93QqHQIRCUJnnVL+KzvkCgbOnAgPdvAECKLhLgYa15m0q9ewper9dl5rine4SZba/Xa/8nMo3uSvx+/5qSooKZxYUF5xcVTr6SojtwDJGJJPIoQ9IU+AYAClrOVKa3nYnaRudmjxeSQ8D0EyG+5u23/nGmCBZqol4ijHaB25WSf0BkIQnPN7zJpxcXFtxV7C/4bxL1LRb9BBHZ0PIBiO8G8Z0i6BMt44hwHhveqibLGjH+dVeyWwoWAIBwQk2w7tqsrJxpIzWXlZVtAfCSiBw6UjvFKrUQ5LsAbWMDiofFMBuXMblzGfL8QNiJBSvTDs/fjvEQWjv8gCZ5EcDBiIZLGKLtKQDQ29f/UGNjY7LQCBVnYkSXsRjHkOt3dE5fX98nXy6WcwR0nhL5XDMEF/xdAOu3N8JeffUlfdFluHgV6fkCmb59iMaeQNzTPeYwaiulbMdxdnv71c5QrK+AVqcUFxYUCtE1IjgKrtSA6D2QnEiC6iJ//kJEqyetTvYZ81mje9yhhz/HhAMN0u8J06Xk4kNX1DTNqr+4sOCHLMJNre1+AGC2PxBCHgjThagGWs6E6BICzgDhz4rknOLCgoodJR3cley2RncCPVMRKLspFq4yIgJKhdIr2DW6QG76do39sXFWinyS2zpOY2OjORB2jifNGwB5jxilAH4H0EqQfOr8TyP/BOPw4UdYeJQAbyA6SzQkGmiarwzvksGw0wHwDo3ngUBgNYBfAUDUAdTrer3edAADAKCh9cxYGhkAgKZHtKZ7WLlvz5vXuC8QzTiQmpo6ZJcUSWJCdMIlDt4mJfsGg8HcQCCwXe4nvpAEm7Wo7xOJvXbthnPiweJ7Cl6v12HmiMfjiXi9XtswDHt3CXr+d4hl9vwAALRBZ1FYUkpKJv+jpWXJtwHjf4qK/vc9xIpZiMgjrW0d1wrhQg3MIC37C/GzAlzu+LjTtF2bhO5ottrfh+bSksKoW4Tf73erqqrmjjvsiDeIsC9Er4+EB/44derU/3gFrd10hiUsIkkAYBjJBwCACBskNFRDMBRacApBNm7q6lo2ZkzW+wC64sHG1dX13xPIawDgRgORp9TW1k2M962trZsYDjt+kL6zoqJ04ZgxubMB5NbU1P0PwbkNwInBYN3FIkLx8xG1EymwGAAgLv8WQmdUh0InIR4iA5wPwXWI5c0S8YyqrKwcILjngTAAyInbv1IiMocVqgViy1AQnnMcOhex/Fg8fNZHMIlgejy6C6Aekd6B2Djo7+/PAIBg8PbDTNP2AEBbWxvPmlX2KgTtAnVvdXV1BgDMn79g35qauh8I6MSKirJfVVSULhSi24T+xWKvuzGx1DIRIrKJKGKapo2oLWiPYUp+/oclJQX/AICiokkr42IVp7W1vQSCQnHNE4iYiDBHkz4LIplmRN+iSJYO9vcdBpEXhGShZVkp8b5VVVW62J//aJE/f2FR0eSHvgqxwu64SxhLz3IxEUYL0M0i7ujRefVr13cVQst4MK0gEdGETZu6O9vifk+hUOgQLTSDgA8B6vR6jcWfhLM0HgB2LiAhn5CICD4koVSl9CMzZsxYCQA1oYafApJmD/bf4/V6kwHjYiFJFREXRB9t6s69Lyurs0SERpkmmkpLS3uCweA3hfgSEt4sgh7XkKcqy8renTt37ijTl3wBabxeUVH2J8QELSM79/KZ5WXbFKsNhULHuEIFDOPeQOBnb8aPV1c3jmHDqRSRHhLuikS2Lp49e/bWYDCYK6QqAHSKwGWopwKBn71ZU9NwJFiXMLgfgFez/gtrvUqDi+NjiwjV1i0oINHHgWgTgDQBPUta5/X05N1bVeWPVFc3jiFlV4hLLbNmlX3hYrG7K2+99dY3tNZ5SqnB5OTkrRkZGZvT0tK+UGqTrzuWZR1kA+lT/P5Xm62OS0jj9aKi/BcRDas5F1puEQP/+1lFIL5qdjvBSpDgy+Dvf//7/l6vN9vj8YQ9Hs9Wn8+3OSsr60vfhv86YVmW+jyVdr5KEoKVYK9gxYoVY5OSkjKIKOzz+bbm5uZuJqIdVnZJsHuy2xrdEyTYlRiG4TBzhJkjXq83sqfZr/YWEoKVYK/A5/O5zBwxDMOORCI2Ee3WS58EI5MQrAR7BcnJyY7jOBGv1xtJS0tLzK6+puymbg0JEuxaHMdxh4lVQrC+piQEK8FeQTgcduNi9XULx0mQIMFehoiYIuJBgq81CRtWgr0FN1rFLUGCBAkSJEiQIEGCBAkSJEiQIEGCBAkSJEiQIAH+Hx/6sJEmgF2TAAAAAElFTkSuQmCC',
                  width : 130,
                  height: 40, style: 'tableHeader',  alignment: 'left', border: [false, false, false, false] 
                }
                ],
   
                [
                {
                    text: 'SISTEMA EDUCATIVO NACIONAL',fontSize:9,alignment: 'center'                  
                },
                {   
                    width:400,
                      margin: [ -30, 0, -50, 0 ], 
                    text:'INSTITUTO ESTATAL DE EDUCACIÓN PÚBLICA DE OAXACA', fontSize:8,alignment: 'center'               
                },
                {
                    text: 'REPORTE DE EVALUACIÓN',fontSize:8,alignment: 'center'               
                },
                {
                    margin: [ -30, 0, -50, 0 ],
                    text: ['3° GRADO DE EDUCACIÓN PRIMARIA   CICLO ESCOLAR ',{text:datos.ciclo}], fontSize:8,  style: 'tableHeader', border: [false, false, false, false], alignment: 'center'
                }
                ],
                //imagen centenario
                [{ 
                    image: 'data:image/png;base64,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',
                    width : 90,
                    height: 35, style: 'tableHeader',  alignment: 'right', border: [false, false, false, false]//, rowSpan:4 
                }], 

             ]
        },

        {
        style: 'tableExample',
            table: {
                widths:[90,5,100,10,93,10,85,5,82],

                
                body: [

                    [

                        {
                            border: [false, false, false, false],
                            fillColor: '#eeeeee',
                            fontSize:6,
                            text: 'DATOS DEL(DE LA) ALUMNO(A)',
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false, false, false, false],
                            text: datos.apPat
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false, false, false, false],
                            text: datos.apMat
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false, false, false, false],
                            text: datos.nombre
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false, false, false, false],
                            text: datos.curp
                        },
                        
                        
                    ],
                    [
                        {
                            
                            border: [false, false, false, false],
                            fillColor: '#eeeeee',
                            text: ''
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false, true, false, false],
                            text: 'PRIMER APELLIDO',
                            width:180
                        },
                        {
                            border: [false, true,false, false],
                            text: ''
                        },
                        {
                            border: [false,true,false, false],
                            text: 'SEGUNDO APELLIDO'
                        },
                        {
                            border: [false,true,false, false],
                            text: ''
                        },
                        {
                            border: [false,true,false, false],
                            text: 'NOMBRE(S)'
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false,true,false, false],
                            text: 'CURP'
                        },
                        
                    ],
                    [
                        {
                            colSpan:9,
                            border: [false, false, false, false],
                            text: ''
                        },
                    ],
                ]
            },
            //layout: 'noBorders'
        },

        {
        style: 'tableExample',
            table: {
                widths:[90,5,260,10,17,3,17,3,75],

                body: [

                    

                    [
                        {
                            border: [false, false, false, false],
                            fillColor: '#eeeeee',
                            text: 'DATOS DE LA ESCUELA',
                            fontSize:6,
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },

                        {
                            border: [false, false,false, true],
                            text: 'ROSARIO CASTELLANOS'
                        },

                        
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false, false, false, true],
                            text: datos.grupo
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false, false, false, true],
                            text: '100'
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false, false, false, true],
                            text: '20DPR3331V'
                        },
                        
                    ],
                    [
                        {
                            
                            border: [false, false, false, false],
                            fillColor: '#eeeeee',
                            text: ''
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false, false, false, false],
                            text: 'NOMBRE DE LA ESCUELA',
                            alignment:'center'
                        },
                    
                        {
                            border: [false, false, false, false],
                            text: '     '
                        },
                        {
                            border: [false, false, false, false],
                            text: 'GRUPO'
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false,false, false,false],
                            text: 'TURNO'
                        },
                        {
                            border: [false, false,false, false],
                            text: ''
                        },
                        {
                            border: [false, false, false, false],
                            text: 'CCT'
                        },
                    ],
                     [
                        {
                            colSpan:9,
                            border: [false, false, false, false],
                            text: ''
                        },
                    ],
                ]
            },
        },

        //////////////////////////////////////////////////////////////////
        {
        style: 'tableExample',
            table: {
                 widths:[11,9,49,15,15,28,28,10,10,8,8,8,9,8,8,1,6,8,8,8,8,1,4,8,8,8,9,7],
                headerRows: 1,
                body: [

                    [
                        {
                            colSpan:15,
                            rowSpan:3,
                            border: [true, true, true, true],
                            alignment:'left',
                            text: 'El(la) maestro (a) registrará las calificaciones y los promedios que se generen de las evaluaciones por asignatura, grado escolar o nivel\neducativo y se expresarán con un número truncado a décimos.'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '2'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '3'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '4'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '5'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '6'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '7'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '8'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '9'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '10'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '11'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '12'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '13'
                        },
                        {
                            
                            border: [false, true, true, false],
                            text: '14'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: '15'
                        },
                        {
                            
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            fillColor: '#eeeeee',
                            border: [true, true, true, true],
                            text: 'EDUCACIÓN BÁSICA - PRIMARIA'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '2'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '3'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '4'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '5'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '6'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '7'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '8'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '9'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '10'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '11'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '12'
                        },

                        
                    ],
                    [
                        {
                            colSpan:15,
                            border: [true, true, true, true],
                            text: '1'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '2'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '3'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '4'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '5'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '6'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '7'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '8'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '9'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '10'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '11'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '12'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '13'
                        },
                        {
                            
                            border: [false, false, true, false],
                            text: '14'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: '15'
                        },
                        {
                            
                            border: [false, false,false, false],
                            text: ''
                        },
                        {
                            colSpan:2,
                            border: [true, true, true, true],
                            text: '1°'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '2'
                        },
                        {
                            colSpan:2,
                            
                            border: [true, true, true, true],
                            text: '2°'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '4'
                        },
                        {
                            colSpan:2,
                            fillColor: '#909497',
                            border: [true, true, true, true],
                            text: '3°'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '6'
                        },
                        {
                            colSpan:2,
                            border: [true, true, true, true],
                            text: '4°'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '8'
                        },
                        {
                            colSpan:2,
                            border: [true, true, true, true],
                            text: '5°'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '10'
                        },
                        {
                            colSpan:2,
                            border: [true, true, true, true],
                            text: '6°'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '12'
                        },
                        
                    ],
                    [
                        {
                            
                            border: [true, true, true, true],
                            text: '1'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '2'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '3'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '4'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '5'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '6'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '7'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '8'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '9'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '10'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '11'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '12'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '13'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '14'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '15'
                        },
                        {
                            
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            
                            border: [true, true, false, true],
                            text: ''
                        },

                        {
                            colSpan:5,
                            alignment:'right',
                            border: [false, true, true, true],
                            margin:[0,0,-20,0],
                            text: '2° PERIODO ESCOLAR'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '2'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '3'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '4'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '5'
                        },
                        {
                            
                            border: [true, true, false, true],
                            text: ''
                        },
                        {
                            colSpan:5,
                            alignment:'right',
                            border: [false, true, true, true],
                            margin:[0,0,-20,0],
                            text: '3er PERIODO ESCOLAR'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '8'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '9'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '10'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '11'
                        },
                        
                        
                    ],
                    [
                        {
                            colSpan:3,
                            rowSpan:2,
                            fillColor:'#909497',
                            fontSize:4,
                            border: [true, true, true, true],
                            text: 'ASIGNATURAS'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '2'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '3'
                        },
                        {
                            colSpan:9,
                            fillColor: '#eeeeee',
                            fontSize:4,
                            border: [true, true, true, true],
                            text: 'BIMESTRES'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '5'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '6'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '7'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '8'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '9'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '10'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '11'
                        },
                         {
                            
                            border: [true, true, true, true],
                            text: '12'
                        },
                        {
                            colSpan:3,
                            rowSpan:2,
                            fillColor:'#909497',
                            alignment:'center',
                            fontSize:4,
                            border: [true, true, true, true],
                            text: 'PROMEDIO FINAL'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '14'
                        },
                        {
                            
                            border: [false, false, false, true],
                            text: '15'
                        },
                        {
                            
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            border: [false, false, false, false],
                            text: ''
                        },
                        
                        
                    ],
                    [
                        {
                            colSpan:15,
                            border: [true, true, true, true],
                            text: '1'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '2'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '3'
                        },
                        {
                            colSpan:2,
                            fillColor: '#eeeeee',
                            border: [true, true, true, true],
                            text: 'I'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            fillColor: '#eeeeee',
                            border: [true, true, true, true],
                            text: 'II'
                        },
                        {
                            fillColor: '#eeeeee',
                            border: [true, true, true, true],
                            text: 'III'
                        },
                        {
                            fillColor: '#eeeeee',
                            colSpan:2,
                            border: [true, true, true, true],
                            text: 'IV'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            colSpan:3,
                            fillColor: '#eeeeee',
                            border: [true, true, true, true],
                            text: 'V'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '12'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '13'
                        },
                        {
                            
                            border: [false, true, true, false],
                            text: '14'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: '15'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            fillColor: '#eeeeee',
                            border: [true, true, true, true],
                            fontSize:4,
                            text: 'MARQUE SI EL APRENDIZAJE DEL(DE LA)\nALUMNO(A) SE ENCUENTRA EN RIESGO'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '2'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '3'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '4'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '5'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '6'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '7'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '8'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '9'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '10'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '11'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '12'
                        },
                       
                    ],
                    [
                        {
                            colSpan:3,
                            border: [true, true, true, true],
                            fontSize:4,
                            text: 'ESPAÑOL'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            colSpan:2,
                            border: [true, true, true, true],
                            //text: calif.es1
                            text:[{text: calif.es1}]
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            border: [true, true, true, true],
                            text: calif.es2
                        },
                        {
                         
                            border: [true, true, true, true],
                            text: calif.es3
                        },
                        {
                           
                            colSpan:2,
                            border: [true, true, true, true],
                            //text: calif.es4
                            text:[{text: calif.es4}]
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            colSpan:3,
                            border: [true, true, true, true],
                            text: calif.es5
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '12'
                        },
                        {
                            colSpan:3,
                            border: [true, true, true, true],
                            text: pormat.es
                        },
                        {
                            
                            border: [false, true, true, false],
                            text: '14'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: '15'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:4,
                            border: [true, true, true, true],
                            //text: 'ALERTA',
                            image: ri.ri1,
                            width: 20,
                            height: 11, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '2'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '3'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '4'
                        },
                        {
                            colSpan:4,
                            border: [true, true, true, true],
                            //text: 'ALERTA',
                            image: ri.ri2,
                            width: 20,
                            height: 11, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '6'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '7'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '8'
                        },
                        {
                            colSpan:4,
                            border: [true, true, true, true],
                            //text: 'ALERTA\n',
                            image: ri.ri3,
                            width: 20,
                            height: 11, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '10'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '11'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '12'
                        },
                       
                    ],
                    [
                        {
                            rowSpan:2,
                            colSpan:3,
                            border: [true, true, true, true],
                            fontSize:4,
                            text: 'MATEMÁTICAS'
                        },
                        {
                            
                            border: [true, true, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, false],
                            text: ''
                        },
                        {
                            colSpan:2,
                            border: [true, true, true, false],
                            //text: calif.ma1
                            text:[{text: calif.ma1}]

                        },
                        {
                            
                            border: [true, true, true,false],
                            text: ''
                        },
                        {
                            border: [true, true, true, false],
                            text: calif.ma2
                        },
                        {
                         
                            border: [true, true, true, false],
                            text: calif.ma3
                        },
                        {
                           
                            colSpan:2,
                            border: [true, true, true,false],
                            //text: calif.ma4
                            text:[{text: calif.ma4}]
                        },
                        {
                            
                            border: [true, true, true, false],
                            text: ''
                        },
                        {
                            colSpan:3,
                            border: [true, true, true, false],
                            text: calif.ma5
                        },
                        {
                            
                            border: [true, true, true,false],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, false],
                            text: '12'
                        },
                        {
                            colSpan:3,
                            border: [true, true, true, false],
                            text: pormat.ma
                        },
                        {
                            
                            border: [false, true, true, false],
                            text: '14'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: '15'
                        },
                        {
                            
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            border: [false, false, false, false],
                            text: ''
                        },
                    ],
                    [
                        {
                            colSpan:3,
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            colSpan:2,
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                         
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                           
                            colSpan:2,
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            colSpan:3,
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true,false, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: '12'
                        },
                        {
                            colSpan:3,
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            
                            border: [false, true, true, false],
                            text: '14'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: '15'
                        },
                        {
                            
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            fillColor: '#eeeeee',
                            border: [true, true, true, true],
                            text: 'PROMEDIO FINAL DEL GRADO ESCOLAR'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '2'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '3'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '4'
                        },
                        {
                            colSpan:4,
                            border: [true, true, true, true],
                            text: '5'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '6'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '7'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '8'
                        },
                        {
                            colSpan:4,
                            border: [true, true, true, true],
                            text: '9'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '10'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '11'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '12'
                        },
                    ],
                    [
                        {   rowSpan:2,
                            colSpan:3,
                            border: [true, true, true, true],
                            fontSize:4,
                            text: 'CIENCIAS NATURALES'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '2'
                        },
                        {
                             
                            border: [true, true, true, true],
                            text: '3'
                        },
                        {   
                            rowSpan:2,
                            colSpan:2,
                            border: [true, true, true, true],
                            //text: calif.cn1
                            text:[{text: calif.cn1}]
                        },
                        {
                             
                            border: [true, true, true, true],
                            text: '5'
                        },
                        {   
                            rowSpan:2,
                            border: [true, true, true, true],
                            text: calif.cn2
                        },
                        {
                            rowSpan:2,
                            border: [true, true, true, true],
                            text: calif.cn3
                        },
                        {
                            rowSpan:2,
                            colSpan:2,
                            border: [true, true, true, true],
                            //text: calif.cn4
                            text:[{text: calif.cn4}]
                        },
                        {
                             
                            border: [true, true, true, true],
                            text: ''
                        },
                        {   
                            rowSpan:2,
                            colSpan:3,
                            border: [true, true, true, true],
                            text: calif.cn5
                        },
                        {
                             
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '12'
                        },
                        {   
                            rowSpan:2,
                            colSpan:3,
                            border: [true, true, true, true],
                            text: pormat.cn
                        },
                        {
                            
                            border: [false, true, true, false],
                            text: '14'
                        },
                        {
                             
                            border: [true, false, true, false],
                            text: '15'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   

                            colSpan:12,
                            border: [true, false, true, false],
                            text:''
                        }
                        
                    ],
                    [
                        {
                            rowSpan:2,
                            colSpan:3,
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {   
                            rowSpan:2,
                            colSpan:2,
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            rowSpan:2,
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                         
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            rowSpan:2,
                            colSpan:2,
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {   
                            rowSpan:2,
                            colSpan:3,
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '12'
                        },
                        {   
                            rowSpan:2,
                            colSpan:3,
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [false, true, true, false],
                            text: '14'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: '15'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                       {
                            colSpan:4,
                            border: [false,false,false,false],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '2'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '3'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '4'
                        },
                        {
                            colSpan:4,
                            border: [true, true, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '6'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '7'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '8'
                        },
                        {
                            colSpan:4,
                            border: [false,false,true,false],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '10'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '11'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '12'
                        }
                    ],

                    [
                        {   rowSpan:2,
                            colSpan:3,
                            border: [true, true, true, true],
                            fontSize:4,
                            text: 'LA ENTIDAD DONDE VIVO'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '2'
                        },
                        {
                             
                            border: [true, true, true, true],
                            text: '3'
                        },
                        {   
                            rowSpan:2,
                            colSpan:2,
                            border: [true, true, true, true],
                            //text: calif.ed1
                            text:[{text: calif.ed1}]
                        },
                        {
                             
                            border: [true, true, true, true],
                            text: '5'
                        },
                        {   
                            rowSpan:2,
                            border: [true, true, true, true],
                            text: calif.ed2
                        },
                        {
                            rowSpan:2,
                            border: [true, true, true, true],
                            text: calif.ed3
                        },
                        {
                            rowSpan:2,
                            colSpan:2,
                            border: [true, true, true, true],
                            //text: calif.ed4
                            text:[{text: calif.ed4}]
                        },
                        {
                             
                            border: [true, true, true, true],
                            text: ''
                        },
                        {   
                            rowSpan:2,
                            colSpan:3,
                            border: [true, true, true, true],
                            text: calif.ed5
                        },
                        {
                             
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '12'
                        },
                        {   
                            rowSpan:2,
                            colSpan:3,
                            border: [true, true, true, true],
                            text: pormat.en
                        },
                        {
                            
                            border: [false, true, true, false],
                            text: '14'
                        },
                        {
                             
                            border: [true, false, true, false],
                            text: '15'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   

                            colSpan:4,
                            border: [true, false, true, false],
                            text:''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   

                            colSpan:4,
                            border: [true, false, true, false],
                            //text: pormat.fin
                            text:[{text: pormat.fin}]
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   

                            colSpan:4,
                            border: [true, false, true, false],
                            text:''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        
                    ],
                    [
                        {
                            rowSpan:2,
                            colSpan:3,
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {   
                            rowSpan:2,
                            colSpan:2,
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            rowSpan:2,
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                         
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            rowSpan:2,
                            colSpan:2,
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {   
                            rowSpan:2,
                            colSpan:3,
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '12'
                        },
                        {   
                            rowSpan:2,
                            colSpan:3,
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [false, true, true, false],
                            text: '14'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: '15'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                       {
                            colSpan:4,
                            border: [false,false,false,false],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '2'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '3'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '4'
                        },
                        {
                            colSpan:4,
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '6'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '7'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '8'
                        },
                        {
                            colSpan:4,
                            border: [false,false,true,false],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '10'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '11'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '12'
                        },
                    ],
                    [
                        {   
                            colSpan:3,
                            border: [true, true, true, true],
                            fontSize:4,
                            text: 'FORMACIÓN \nCÍVICA  Y ETICA'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {   
                            
                            colSpan:2,
                            border: [true, true, true, true],
                            //text: calif.fc1
                            text:[{text: calif.fc1}]
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {   
                            
                            border: [true, true, true, true],
                            text: calif.fc2
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: calif.fc3
                        },
                        {
                            
                            colSpan:2,
                            border: [true, true, true, true],
                            //text: calif.fc4
                            text:[{text: calif.fc4}]
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {   
                            
                            colSpan:3,
                            border: [true, true, true, true],
                            text: calif.fc5
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '12'
                        },
                        {   
                            
                            colSpan:3,
                            border: [true, true, true, true],
                            text: pormat.fc
                        },
                        {
                            
                            border: [false, true, true, false],
                            text: '14'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: '15'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                       {
                            colSpan:4,
                            border: [true, false,false,false],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '2'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '3'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '4'
                        },
                        {
                            colSpan:4,
                            border: [false,false,false,false],
                            text: 'NÚMERO'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '6'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '7'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '8'
                        },
                        {
                            colSpan:4,
                            border: [false, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '10'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '11'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '12'
                        },
                    ],
                    [
                        {
                            colSpan:3,
                            margin:2,
                            border: [true, true, true, true],
                            fontSize:4,
                            text: 'EDUCACIÓN FÍSICA'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            colSpan:2,
                            border: [true, true, true, true],
                            //text: calif.ef1
                            text:[{text: calif.ef1}]
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            border: [true, true, true, true],
                            text: calif.ef2
                        },
                        {
                         
                            border: [true, true, true, true],
                            text: calif.ef3
                        },
                        {
                           
                            colSpan:2,
                            border: [true, true, true, true],
                            //text: calif.ef4
                            text:[{text: calif.ef4}]
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            colSpan:3,
                            border: [true, true, true, true],
                            text: calif.ef5
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '12'
                        },
                        {
                            colSpan:3,
                            border: [true, true, true, true],
                            text: pormat.ef
                        },
                        {
                            
                            border: [false, true, true, false],
                            text: '14'
                        },
                        {
                            
                            border: [true, true, true, false],
                            text: '15'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:6,
                            border: [true, false, false, false],
                            //text: 'PROMOVIDO(A) O'
                            image: prom.pro,
                            width: 53,
                            height: 7, style:'tableHeader', alignment:'center', border:[false, false, false, false]
                        },
                        {
                            
                            border: [false, true, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:6,
                            border: [false, false, true, false],
                            //text: 'NO PROMOVIDO(A)  O'
                            image: prom.nop,
                            width: 56,
                            height: 6, style:'tableHeader', alignment:'center', border:[false, false, true, false]
                        },
                        
                    ],
                    [
                        {
                            colSpan:3,
                            margin:3,
                            border: [true, true, true, true],
                            fontSize:4,
                            text: 'EDUCACIÓN ARTÍSTICA'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            colSpan:2,
                            border: [true, true, true, true],
                            //text: calif.ea1
                            text:[{text: calif.ea1}]
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            border: [true, true, true, true],
                            text: calif.ea2
                        },
                        {
                         
                            border: [true, true, true, true],
                            text: calif.ea3
                        },
                        {
                           
                            colSpan:2,
                            border: [true, true, true, true],
                            //text: calif.ea4
                            text:[{text: calif.ea4}]
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            colSpan:3,
                            border: [true, true, true, true],
                            text: calif.ea5
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '12'
                        },
                        {
                            colSpan:3,
                            border: [true, true, true, true],
                            text: pormat.ea
                        },
                        {
                            
                            border: [false, true, true, false],
                            text: '14'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: '15'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            border: [true, false, true, false],
                            //text: 'PROMOVIDO(A)    O \n CON CONDICIONES'
                            image: prom.con,
                            width: 58,
                            height: 13, style:'tableHeader', alignment:'center', border:[false, false, true, false]
                        },
                       
                    ],
                    [
                        {   
                            rowSpan:2,
                            colSpan:3,
                            fillColor: '#909497',
                            margin:3,
                            border: [true, true, true, true],
                            text: 'INASISTENCIAS'
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            rowSpan:2,
                            colSpan:2,
                            border: [true, true, true, true],
                            //text: asis.uno
                            text:[{text: asis.uno}]
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            rowSpan:2,
                            border: [true, true, true, true],
                            text: asis.dos
                        },
                        {
                            rowSpan:2,
                            border: [true, true, true, true],
                            text: asis.tres
                        },
                        {
                            rowSpan:2,
                            colSpan:2,
                            border: [true, true, true, true],
                            //text: asis.cuatro
                            text:[{text: asis.cuatro}]
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            rowSpan:2,
                            colSpan:3,
                            border: [true, true, true, true],
                            text: asis.cinco
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '12'
                        },
                        {
                            rowSpan:2,
                            colSpan:3,
                            fontSize:3.5,

                            border: [true, true, true, true],
                            text: [ {text: asis.total},'\nTOTAL INASISTENCIAS',]
                        },
                        {
                            
                            border: [false, true, true, false],
                            text: '14'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            border: [false, false, true, false],
                            text: ''
                        },
                    ],
                    [
                        {
                            colSpan:3,
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            colSpan:2,
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                         
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                           
                            colSpan:2,
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            colSpan:3,
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, true, true, true],
                            text: '12'
                        },
                        {
                            colSpan:3,
                            fontSize:4.5,

                            border: [true, true, true, true],
                            text: ''
                        },
                        {
                            
                            border: [false, true, true, false],
                            text: '14'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            border: [false, true, false, false],
                            text: ''
                        },
                    ],
                    [
                        {
                            colSpan:16,
                            border: [false, false, false, false],
                            text:''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            border: [true, true, true, true],
                            fillColor: '#eeeeee',
                            text:'FIRMA DE LA MADRE,PADRE DE FAMILIA O TUTOR(A)'
                        },
                    ],
                    [
                        {
                            colSpan:15,
                            border: [true,true,true,true],
                            fillColor: '#909497',
                            text:'EVALUACIÓN DE HABILIDADES FUNDAMENTALES PARA EL APRENDIZAJE                 EN CASO DE REQUERIR MÁS ESPACIO, UTILICE HOJAS ADICIONALES'
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            alignment: 'left',
                            border: [true,false, true, false],
                            text:'BIMESTRE I'
                        },
                    ],
                    [
                        {
                            colSpan:15,
                            border: [true,true,true,true],
                            fillColor: '#909497',
                            alignment:'right',
                            text:'¿REQUIERE APOYO FUERA DEL HORARIO ESCOLAR?'
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            alignment: 'left',
                            border: [true, false, true, false],
                            text:''
                        },
                    ],
                    [
                        {
                            colSpan:12,
                            border: [true,true,true,true],
                            fillColor: '#eeeeee',
                            alignment:'center',
                            text:'OBSERVACIONES Y/O RECOMENDACIONES'
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   
                            colSpan:2,
                            fillColor: '#eeeeee',
                            border: [true, false, true, true],
                            text: 'BIMESTRE'
                        },
                        {

                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            fillColor: '#eeeeee',
                            border: [true, false, true, true],
                            text: 'SÍ'
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            alignment: 'left',
                            border: [true, false, true, true],
                            text:''
                        },
                    ],
//ESCRITURA,LECTURA, MATEMATICA
                    [
                        {
                            rowSpan:5,

                            border: [true,true,true,true],
                            fillColor: '#eeeeee',
                            alignment:'center',
                            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAB9CAYAAAAhtnqkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPNSURBVHhe7ZrtjeJADEApgRYogRoogRa2BCqgAiqgAhqgABqgAmqggazeSj55c/YkcUw+tHPS+3HMJHny2POR7Ob9fjdLpcpFqXJRqlyUKhelykX5O3LP57O5XC5mW4TRcq/Xq7ler83xeGw2m80PVr8IYbn7/d58fX012+32nxQgafWPMEiOYTudTs1ut/sltN/vf4aTduu6KJ1yMmwIaCEE5TfrugxcOYZN55EIEbnH4/HT53w+zyMnQuQUuXW73f7rM7ucJwazyZHgOs+sCM4mJ1gVKrmH7KxyGqJmzW26SDIZJCfI9HI4HH5JElGG2romQkhOI+upHnarX4TRchqGdlGR+yS95FgtgFyz2oF2yUGrPUJRjuq0KlP3oTB0vtFft4/BlSMSWkpDXpFfepKWSs3cmbhysugzr8lw8mCEiI4MIVJEr319Bq4cAtYQ6Ygi3m7PxJXj4UTHayNiVlsmYTmvLZP1ykWx7hehWBDWg7uYZJ5bAlUuiivHHo3lqAvW3+zDtODKWcleQi9zWbhyVpQsmO9EkHXXuleUlJwjYrJDWdQrMIG8Qy5z5UiTA4me1RYhVU7yz2qLkCrHNmqRyxeFQNRme7NpQSEwpSAG7JStfhFcuciuJHvbniLHUHrv8MaQWhDZrFOOJP/UebQvrhy5NMUhpkSVi7JeOeY6BIdi3S9CUS6Kdb8IRTn2Z6yVQ8h85V8LIso65RBrv5yeGlduCaxTjpyLYt0vgisX2abDIk9fn6DKReklJ+tm/WqocOWIhJbScPipXw2tHwEBa4h0ROtXQ4suOa8tk/XKRbHuF6FYENaDu5hknlsCf0OOiTr7A50rJ5Nt37fjTMj05zqrPYIrN/RhrLX0z1w1XDlZQ602D/pzndUWwZUjCkMnWvpzndUWYZ1yke9Y9J9kEpaC6Ptxlz0d/Sf59iXV10dQb+czN56uHEg0gGHm/MBvTC8IsS3XW/XszWdRDpCRqJT4xBupTjlgaUKSfKIiNdmHGk0vubkYLUfhlA7bYyjK8WBvbW3nIkNMf6tvFFdOdiU8tN2mq1iDbGYUXTk5VLeTnYdLxGTq4DeZtDOr1pXjQdYOQ/4Koh1Rkc48zxblrCHl4bRZuUh/2tq/R3HlrIVfouZFZzI5ySFyjygx2fJ/8P4SYrJh1Ymv8dZPqeDM9dWVAwSpPoYLELD6geTiJO/nhsIEPNnRcAm4chTB0OWIQum7c+6DK0f+WPNcSWCyqcSTKwlUOahyHaxXLop1vwiunLWu9qG9kxmDK7cEqlyUKhdl0yz2X9N8A98fLJHmg0q9AAAAAElFTkSuQmCC',
                            width : 09,
                            height: 30, style: 'tableHeader',  alignment: 'left', border: [true, true, true, true] 
                        },
                        {   
                            colSpan:11,
                            
                            border: [true, false, true, false],
                            text: [reco.eb1,' ',reco.eb2,' ',reco.eb3,' ',reco.eb4,' ',reco.eb5]
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   
                            colSpan:2,
                            margin:-1,
                            border: [true, false, true, true],
                            text: 'I'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: bim.eb1
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            margin:-1,
                            alignment: 'left',
                            border: [true, false, true, false],
                            text:'BIMESTRE II'
                        },
                    ],
                    [
                        {
                            
                            border: [true,true,true,true],
                            fillColor: '#eeeeee',
                            alignment:'center',
                            text:''
                        },
                        {   
                            colSpan:11,
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   
                            colSpan:2,
                            margin:-1,
                            border: [true, false, true, true],
                            text: 'II'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: bim.eb2
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            margin:-1,
                            alignment: 'left',
                            border: [true, false, true, false],
                            text:''
                        },
                    ],
                    [
                        {
                            
                            border: [true,true,true,true],
                            fillColor: '#eeeeee',
                            alignment:'center',
                            text:''
                        },
                        {   
                            colSpan:11,
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   
                            colSpan:2,
                            margin:-1,
                            border: [true, false, true, true],
                            text: 'III'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: bim.eb3
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            margin:-1,
                            alignment: 'left',
                            border: [true, false, true, false],
                            text:''
                        },
                    ],
                    [
                        {
                            
                            border: [true,true,true,true],
                            fillColor: '#eeeeee',
                            alignment:'center',
                            text:''
                        },
                        {   
                            colSpan:11,
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   
                            colSpan:2,
                            margin:-1,
                            border: [true, false, true, true],
                            text: 'IV'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: bim.eb4
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            margin:-1,
                            alignment: 'left',
                            border: [true, false, true, true],
                            text:''
                        },
                    ],
                    [
                        {
                            
                            border: [true,true,true,true],
                            fillColor: '#eeeeee',
                            alignment:'center',
                            text:''
                        },
                        {   
                            colSpan:11,
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   
                            colSpan:2,
                            margin:-1,
                            border: [true, false, true, true],
                            text: 'V'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: bim.eb5
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            margin:-1,
                            alignment: 'left',
                            border: [true, false, true, false],
                            text:'BIMESTRE III'
                        },
                    ],

                    [
                        {
                            rowSpan:5,
                            border: [true,true,true,true],
                            fillColor: '#eeeeee',
                            alignment:'center',
                            
                
                  image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAABnCAYAAABl0pAdAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAL5SURBVGhD7ZltjQIxEECRgAUkoAEJWEACClCAAhRgAAEYQAEaMNDLI5lLrzc7bYfuwpJe8v4w3e3bdvp5i8fjET6BLpLSRVK6SEoXSflekdvtFo7HoxqzaCJyv9/D6XQK2+02LBaLJ1o5i5dELpdL2O12Yblc/goAQlp5i2oRmn6/34fVavWn8vV6/ewS4tpzOYpEpOmpLK4cGflNe64GU4Smj/tdKqdFrtfrs8zhcBhfRConB8iF8/n8r8ykIkMSMIkIyRfnhdYyk4gI2kiRXEFsMpEYWkObO+IE9lAtIsiQ3mw2f4RoKbpLe8bCLRIj60vcdVo5iyYiMXTP21qkBcUizLJAbmhxIC45o8UtsiKMEm2ExGVI2jg/KB/HSzBF+MJYIIY8IB/iCU9GjGcFNkVkwWPekC6hEirnq6UbEKBV0udrMEWoTGvmuKWQTOMeTBEq4quHYrSEFvPwkshQzMN8RLxo77PIJqtWSY7m88iUdJEUU4Q9BlN2DtYj78FKMEW0RLSIl4JaTBHt6zWYT0SGdUh7V45mOUJLyEr8tmsJgTxBxDPjNhUBaRUtZtFcRPJFi1k0F2Fr8PYpniSlNSa5MdIgSRnGSAA7OK2chSniWX29W8dmInTH0B1KCc2T1cs8REjAV88rpZgi9H3LDbJFF0mZjwhzCTK1aO+zyIp40d5nkRVhf8HaUYPnmrMna8o8RJBIL+7GwhSphSOF98RnijAC6J7SrR+bIsrznBa3MEVqX8ywpbxnl2aKyDWmFhuC8p5jpyniGTWU5zktZjEPEc9hifK1z0BRspae7tlWUr75AUtGQYlM/F8Mzz7XFAH5SqCrmGn5jSFN5Wyw5QYARjlgCVQsX2vxynJQJAJM3wjR/4yMGFpl1Mu8KZmHiGfbRwI3v8wjAcmB9HerMsrznBazcIlYlXWRmphFF0nJinjR3mdhipSsLxrN9yNT8r0ibAWa7+I9jDJqPHSRlO8W4YVetPdZmCJ9Zn0nXSTlc0TCR/yF8APlXfQcPYKfLQAAAABJRU5ErkJggg==',
                  width : 07,
                  height: 30, style: 'tableHeader',  alignment: 'left', border: [true, true, true, true] 
                
                        },
                        {   
                            colSpan:11,
                            border: [true, false, true, false],
                            text: [reco.lb1,' ',reco.lb2,' ',reco.lb3,' ',reco.lb4,' ',reco.lb5]
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   
                            colSpan:2,
                            margin:-1,
                            border: [true, false, true, true],
                            text: 'I'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: bim.lb1
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            margin:-1,
                            alignment: 'left',
                            border: [true, false, true, false],
                            text:''
                        },
                    ],
                    [
                        {
                            
                            border: [true,true,true,true],
                            fillColor: '#eeeeee',
                            alignment:'center',
                            text:''
                        },
                        {   
                            colSpan:11,
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   
                            colSpan:2,
                            margin:-1,
                            border: [true, false, true, true],
                            text: 'II'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: bim.lb2
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            margin:-1,
                            alignment: 'left',
                            border: [true, false, true, false],
                            text:''
                        },
                    ],
                    [
                        {
                            
                            border: [true,true,true,true],
                            fillColor: '#eeeeee',
                            alignment:'center',
                            text:''
                        },
                        {   
                            colSpan:11,
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   
                            colSpan:2,
                            margin:-1,
                            border: [true, false, true, true],
                            text: 'III'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: bim.lb3
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            margin:-1,
                            alignment: 'left',
                            border: [true, false, true, true],
                            text:''
                        },
                    ],
                    [
                        {
                            
                            border: [true,true,true,true],
                            fillColor: '#eeeeee',
                            alignment:'center',
                            text:''
                        },
                        {   
                            colSpan:11,
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   
                            colSpan:2,
                            margin:-1,
                            border: [true, false, true, true],
                            text: 'IV'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: bim.lb4
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            margin:-1,
                            alignment: 'left',
                            border: [true, false, true, false],
                            text:'BIMESTRE IV'
                        },
                    ],
                    [
                        {
                            
                            border: [true,true,true,true],
                            fillColor: '#eeeeee',
                            alignment:'center',
                            text:''
                        },
                        {   
                            colSpan:11,
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   
                            colSpan:2,
                            margin:-1,
                            border: [true, false, true, true],
                            text: 'V'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: bim.lb5
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            margin:-1,
                            alignment: 'left',
                            border: [true, false, true, false],
                            text:''
                        },
                    ],

                   [
                        {
                            rowSpan:5,
                            border: [true,true,true,true],
                            fillColor: '#eeeeee',
                            alignment:'center',
                            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAACZCAYAAACG09KfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARtSURBVHhe7Zp9UeRAEEdXAhaQgAYkYAEJKEABCjAABhCAARSgAQO5etQ11eR+2ZtOepNOZa7q/XHMJDVvpnu+Nqfh77+vr6/d0iWq0CWq0CWq0CWq0CWq0CX+x8fHx/D09CTLMkmX+Pz8HJ6fn4e7u7vhdDp9o+plkibx9vY23N/fD1dXVz+NB2RU/UwWSRAuDw8Pw/X19a+G39zcfIcR5eq5bMISFi401DccEfubeu6SNEsQLj7OreGMxPv7+3edx8fH2hLWcGKe2H99ff2nzm4kpgSgvASJ6vNAjUh5CUPNSJYbSO1CwsMoqLXBJ/saLJIwbNq9vb39JcMIEWLqmUxSJDy2X/Lhpuplki5hMDovLy+1RoLFjl5t3QtZkvOcKs+kWSLaKBKb+jynyjNplmCNYBZSZVNQn+dUWSbNEvQqs48qm8JmK1WWybEkmDLnhFP0mTmEE7v1zMziR/1SJzubbVpE2I4wAtRFRtXJpFkCrHfBNn38jWmXhrOw+Z3uGtMrhCSARlsvnwNB9fwlCEuAv5ZhBvIwGmtdEBizJKrRJarQLKGStxX1vkyaJVpmJEWpFbsyx5Jg/l9jCzGHUGKzmKmyrekSVTieBHM+IlHU+zIJScxFvS+TkAQHHg5AEda4WO6JXYVjSSAQPTfbNb8qy6RZopX+WcRMFkmoHyGBqZgwWuvWIyzRP4u4EM0S1nBinthXXxXsRmJKAMpLkKg+D9SIlJcw1IxkuYHULiQ8jIJaG3yyr8EiCaN/FpFAuoSHkNrlSGzBsSRIXEIjSqnzhJ91oqj3ZRKWYF1QPT5FqZHwO1jWg0o35KHEHm/HWanp7bUOP1OEJAzbP/ntBnJIqvqXZpaEZ3zKY6UmD9iKqPqXYLGEYRcFJgP8v9Q1ZisWal5G1cskVYJeH2/NCS9VN5MUCbUNJ9GnjrHZzJZQM5SdH9aecsMSW/e6olmCxlfodUWzhDWexN1qUZsiLBGF0VPvy6RZYnz32kopicp0iSo0SzAjRTdzrB3lztgscuO/n2uoLYqqLJPFEuca2iUCdAnoEkmEJOai3pdJs4Tfhkfoe6dGjiXBKa7S/asnlNhqdqpAl6jC8SSY8xGJot6XSUhiLup9mYQkuPHghBeh1NU+EmuExhy6RBWaJRDgKl+VbU2zxBy4MS91ZdNK/8x6Josk7Ccv/5UZsJ4QRmv9ABOW6J9ZX4hmCWs4MU/sqx8adyMxJQDlJUhUnwdqRMpLGGpGstxAahcSHkZBrQ0+2ddgkYTRP7NOIF3CQ0jtciS24FgSJC6hEaXUecLPOlHU+zIJS7AuqB6fotRI+B0s60Gla/5QYo+346zU9PZah58pQhKG7Z/8dgM5JFX9SzNLwjM+5bFSkwf9M+sgaRKGhZqXUfUySZWg18dbc8JL1c0kRUJtw0n0qWNsNrMl1Axl54e1p9ywxNa9rmiWoPEVel3RLGGNJ3G3WtSmCEtEYfTU+zJplhjfvbZSSqIyXaIKXaIKPxL7/TcMfwCWPCrZQ2YmRwAAAABJRU5ErkJggg==',
                              width : 12,
                              height: 33, style: 'tableHeader',  alignment: 'left', border: [true, true, true, true] 
                        },
                        {   
                            colSpan:11,
                            border: [true, false, true, false],
                            text: [reco.mb1,' ',reco.mb2,' ',reco.mb3,' ',reco.mb4,' ',reco.mb5]
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   
                            colSpan:2,
                            margin:-1,
                            border: [true, false, true, true],
                            text: 'I'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: bim.mb1
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            margin:-1,
                            alignment: 'left',
                            border: [true, false, true, false],
                            text:''
                        },
                    ],
                    [
                        {
                            
                            border: [true,true,true,true],
                            fillColor: '#eeeeee',
                            alignment:'center',
                            text:''
                        },
                        {   
                            colSpan:11,
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   
                            colSpan:2,
                            margin:-1,
                            border: [true, false, true, true],
                            text: 'II'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: bim.mb2
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            margin:-1,
                            alignment: 'left',
                            border: [true, false, true, true],
                            text:''
                        },
                    ],
                    [
                        {
                            
                            border: [true,true,true,true],
                            fillColor: '#eeeeee',
                            alignment:'center',
                            text:''
                        },
                        {   
                            colSpan:11,
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   
                            colSpan:2,
                            margin:-1,
                            border: [true, false, true, true],
                            text: 'III'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: bim.mb3
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            margin:-1,
                            alignment: 'left',
                            border: [true, false, true, false],
                            text:'BIMESTRE V'
                        },
                    ],
                    [
                        {
                            
                            border: [true,true,true,true],
                            fillColor: '#eeeeee',
                            alignment:'center',
                            text:''
                        },
                        {   
                            colSpan:11,
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   
                            colSpan:2,
                            margin:-1,
                            border: [true, false, true, true],
                            text: 'IV'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: bim.mb4
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            margin:-1,
                            alignment: 'left',
                            border: [true, false, true, false],
                            text:''
                        },
                    ],
                    [
                        {
                            
                            border: [true,true,true,true],
                            fillColor: '#eeeeee',
                            alignment:'center',
                            text:''
                        },
                        {   
                            colSpan:11,
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   
                            colSpan:2,
                            margin:-1,
                            border: [true, false, true, true],
                            text: 'V'
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: bim.mb5
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:12,
                            margin:-1,
                            alignment: 'left',
                            border: [true, false, true, true],
                            text:''
                        },
                    ],
                    [
                        {
                            colSpan:28,
                            border:[false,false,false,false],
                            text:''
                        },
                    ],
                    /////
                    [
                        {
                            colSpan:19,
                            fillColor: '#909497',
                            border:[true,true,true,true],
                            text:'OBSERVACIONES Y/O RECOMENDACIONES POR BIMESTRE Y ASIGNATURA'
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:'19'
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                    ],
                    [
                        {
                            colSpan:19,
                            alignment:'justify',
                            fontSize:4.5,
                            border:[true,true,true,true],
                            text:'El(la) maestro(a) registrará, al concluir el segundo bimestre o en el momento del ciclo escolar en el que observe dificultades en el desempeño del(de la) alumno(a), información acerca de las\n necesidades de apoyo que éste(a) requiere y, las acciones que la escuela y la familia deben realizar conjuntamente con el educando para favorecer que avance en los aprendizajes\n esperados, establecido en los programas de estudio. En caso de requerir más espacio, utilice hojas adicionales.'
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:'19'
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        
                    ],
                    [
                        {
                            colSpan:2,
                            border: [true,true,true,true],
                            fillColor: '#eeeeee',
                            fontSize:4,
                            alignment:'center',
                            text:'BIMESTRE'
                        },
                        {   
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            colSpan:2,
                            fillColor: '#eeeeee',
                            fontSize:4,
                            border: [true, false, true, true],
                            text: 'ASIGNATURA'
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:4,
                            fillColor: '#eeeeee',
                            fontSize:4,
                            border: [true, false, true, true],
                            text: 'OBSERVACIONES ESPECÍFICAS'
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:11,
                            fillColor: '#eeeeee',
                            fontSize:4,
                            border: [true, false, true, true],
                            text: 'RECOMENDACIONES (ESPECIFICAR LOS APOYOS REQUERIDOS)'
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                         {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, true],
                            text:''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                         {
                            colSpan:9,
                            border: [true, false, false, false],
                            text: ''
                        },
                        
                    ],

                    
                    ///fila en blanco
                    [
                        {
                            colSpan:2,
                            border: [true,false,true,false],
                            //text:obs.bim
                            text:[{text:obs.bim}]
                        },
                        {   
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            colSpan:2,
                            border: [true, false, true, false],
                            //text: obs.asig
                            text:[{text: obs.asig}]
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:4,
                            border: [true, false, true, false],
                            //text: obs.obs
                            text:[{text: obs.obs}]
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:11,
                            border: [true, false, true, false],
                            text: obs.rec
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, true],
                            text:''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:9,
                            border: [true, false, false, false],
                            text: ''
                        },
                        
                    ],
                    [
                        {
                            colSpan:2,
                            border: [true,false,true,false],
                            text:''
                        },
                        {   
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            colSpan:2,
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:4,
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:11,
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, true],
                            text:''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                          colSpan:4,
                            
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                          colSpan:2,
                            color: '#909497',
                            border: [false, false, false, false],
                            text: 'SELLO'
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                          colSpan:3,
                            border: [false, false, false, false],
                            text: ''
                        },
                        
                    ],
                    [
                        {
                            colSpan:2,
                            border: [true,false,true,false],
                            text:''
                        },
                        {   
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            colSpan:2,
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:4,
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:11,
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {   
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, true],
                            text:''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                       {
                          colSpan:4,
                            
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                          colSpan:2,
                            color: '#909497',
                            border: [false, false, false, false],
                            text: 'SISTEMA'
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                          colSpan:3,
                            border: [false, false, false, false],
                            text: ''
                        },
                    ],
                    [
                        {
                            colSpan:2,
                            border: [true,false,true,false],
                            text:''
                        },
                        {   
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            colSpan:2,
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:4,
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:11,
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, true],
                            text:''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                          colSpan:4,
                            
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                          colSpan:2,
                            color: '#909497',
                            border: [false, false, false, false],
                            text: 'EDUCATIVO'
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                          colSpan:3,
                            border: [false, false, false, false],
                            text: ''
                        },
                        
                    ],
                    [
                        {
                            colSpan:2,
                            border: [true,false,true,false],
                            text:''
                        },
                        {   
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            colSpan:2,
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:4,
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            colSpan:11,
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {   
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {   
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            
                            border: [true, false, true, true],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, true],
                            text:''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                          colSpan:4,
                            
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                          colSpan:2,
                            color: '#909497',
                            border: [false, false, false, false],
                            text: 'NACIONAL'
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                          colSpan:3,
                            border: [false, false, false, false],
                            text: ''
                        },
                        
                    ],
                     [ 
                      {
                        colSpan:19,
                        alignment:'center',
                        border:[false,true,false,true],
                        text:''
                      },
                      {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                         {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                         {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [false, false, false, false],
                            text: ''
                        },
                      {
                          colSpan:4,
                            
                            border: [false, false, false, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                          colSpan:2,
                            color: '#909497',
                            border: [false, false, false, false],
                            text: '156'
                        },
                        {
                            border: [true, false, true, false],
                            text: ''
                        },
                        {
                          colSpan:3,
                            border: [false, false, false, false],
                            text: ''
                        },
                    ],
                    
                     [
                        {
                            colSpan:19,
                            fillColor: '#909497',
                            border:[true,true,true,true],
                            text:'OBSERVACIONES Y/O RECOMENDACIONES GENERALES'
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:'19'
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                    ],
                    [
                        {
                            colSpan:19,
                            alignment:'center',
                            fontSize:4.5,
                            border:[true,true,true,false],
                            text:'Si es necesario, el(la), maestro(a) registrara las situaciones que interfieren o pueden favorecer el desempeño del (de la) alumno(a) (acoso escolar,\n comportamiento, valores, interacciones, higiene personal, acompañamiento de la familia en proceso educativo, etc.'
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        
                    ],
                    [
                    {
                        colSpan:19,
                        border:[true,false,true,false],
                        text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:'19'
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },

                    ],
                    [
                    {
                        colSpan:19,
                        border:[true,false,true,false],
                        text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:'19'
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:'',

                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },

                    ],
                    [
                    {
                        colSpan:19,
                        border:[true,false,true,true],
                        text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        {
                            
                            border:[false,false,false,false],
                            text:''
                        },
                        
                       
                        {
                        colSpan:3,
                        fontSize:7,
                        border:[false,false,false,false],

                        text:'FOLIO:'
                      },
                      {
                        
                        border:[false,false,false,false],
                        text:''
                      },
                      {
                        
                        border:[false,false,false,false],
                        text:''
                      },
                      {
                        colSpan:5,
                        fontSize:7,
                        border:[false,false,false,false],
                        alignment:'left',
                        //text:datos.folio
                        text:[{text:datos.folio}]
                      },
                      {
                        
                        border:[false,false,false,false],
                        text:''
                      },
                      {
                        
                        border:[false,false,false,false],
                        text:''
                      },
                      {
                        
                        border:[false,false,false,false],
                        text:''
                      },
                      {
                        
                        border:[false,false,false,false],
                        text:''
                      },
                      {
                        
                        border:[false,false,false,false],
                        text:''
                      },

                    ],
                   
                    [
                    {
                        colSpan:28,
                        border:[false,false,false,false],
                        text:''
                    }
                    ],
                    [
                    {
                        colSpan:28,
                        fillColor: '#909497',
                        border:[true,true,true,true],
                        text:'EVALUACIÓN DE LA COMPRENSIÓN LECTORA'
                    }
                    ],
                    [
                    {
                        colSpan:28,
                        alignment:'left',
                        border:[true,true,true,true],
                        text:'El(la) maestro(a) registrará en el momento correspondiente los avances de la Comprensión Lectora, rellenando el círculo que describa la situación del (de la) alumno(a). El único objeto de estos aspectos es brindar mayor información sobre este elemento de aprendizaje indispensable para el desempeño académico de los propios educandos. Estos aspectos no deberán condicionar por sí mismos la promoción de grado.'
                    }
                    ],
                    [
                    {
                        colSpan:10,
                        rowSpan:2,
                        alignment:'left',
                        fillColor: '#909497',
                        border:[true,true,true,true],
                        text:'Los siguientes aspectos se relacionan con el desarrollo de la comprensión al leer y escribir, permitiendo informar\n si el(la) alumno(a):'
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },




                    {
                        colSpan:4,
                        fillColor: '#909497',
                        border:[true,true,true,true],
                        text:'Siempre'
                    },
                     {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                        colSpan:5,
                        fillColor: '#909497',
                        border:[true,true,true,true],
                        text:'Casi Siempre'
                    },
                     {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                        colSpan:5,
                        fillColor: '#909497',
                        border:[true,true,true,true],
                        text:'En Ocasiones'
                    },
                     {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                        colSpan:4,
                        fillColor: '#909497',
                        border:[true,true,true,true],
                        text:'Requiere apoyo adicional'
                    },
                     {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    ],
                    [
                    {
                        colSpan:10,
                        fillColor: '#909497',
                        border:[true,true,true,true],
                        text:'Los siguientes aspectos se relacionan con el desarrollo de la comprensión al leer y escribir, permitiendo informar\n si el(la) alumno(a):'
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            fillColor:'#eeeeee',
                            fontSize:4,
                            border:[true,true,true,true],
                            text:'Ago'
                    },
                    {
                            fillColor:'#eeeeee',
                            fontSize:4,
                            border:[true,true,true,true],
                            text:'Nov'
                    },
                    {
                            fillColor:'#eeeeee',
                            fontSize:4,
                            border:[true,true,true,true],
                            text:'Mar'
                    },
                    {
                            fillColor:'#eeeeee',
                            fontSize:4,
                            border:[true,true,true,true],
                            text:'Jun'
                    },
                    {
                            fillColor:'#eeeeee',
                            fontSize:4,
                            border:[true,true,true,true],
                            text:'Ago'
                    },
                    {   
                            colSpan:2,
                            fillColor:'#eeeeee',
                            fontSize:4,
                            border:[true,true,true,true],
                            text:'Nov'
                    },
                    {
                            fillColor:'#eeeeee',
                            fontSize:4,
                            border:[true,true,true,true],
                            text:'Nov'
                    },
                    {
                            fillColor:'#eeeeee',
                            fontSize:4,
                            border:[true,true,true,true],
                            text:'Mar'
                    },
                    {
                            fillColor:'#eeeeee',
                            fontSize:4,
                            border:[true,true,true,true],
                            text:'Jun'
                    },
                    {
                            fillColor:'#eeeeee',
                            fontSize:4,
                            border:[true,true,true,true],
                            text:'Ago'
                    },
                    {
                            fillColor:'#eeeeee',
                            fontSize:4,
                            border:[true,true,true,true],
                            text:'Nov'
                    },
                    {       
                            colSpan:2,
                            fillColor:'#eeeeee',
                            fontSize:4,
                            border:[true,true,true,true],
                            text:'Mar'
                    },
                    {
                            fillColor:'#eeeeee',
                            fontSize:4,
                            border:[true,true,true,true],
                            text:'Mar'
                    },
                    {
                            fillColor:'#eeeeee',
                            fontSize:4,
                            border:[true,true,true,true],
                            text:'Jun'
                    },
                     {
                            fillColor:'#eeeeee',
                            fontSize:4,
                            border:[true,true,true,true],
                            text:'Ago'
                    },
                    {
                            fillColor:'#eeeeee',
                            fontSize:4,
                            border:[true,true,true,true],
                            text:'Nov'
                    },
                    {
                            fillColor:'#eeeeee',
                            fontSize:4,
                            border:[true,true,true,true],
                            text:'Mar'
                    },
                    {
                            fillColor:'#eeeeee',
                            fontSize:4,
                            border:[true,true,true,true],
                            text:'Jun'
                    },
                ],
                 [
                    {
                        colSpan:10,
                        alignment:'left',
                        border:[true,true,true,true],
                        text:'1.-COMENTA DE QUÉ PUEDE TRATAR UN TEXTO A PARTIR DE SU TÍTULO'
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text: comp.ag1
                            image: comp.ag1,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:comp.no1
                            image: comp.no1,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:comp.ma1
                            image: comp.ma1,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:comp.ju1
                            image: comp.ju1,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ag2,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {   
                            colSpan:2,
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.no2,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            text:''
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ma2,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ju2,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ag3,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.no3,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {       
                            colSpan:2,
                            
                            border:[true,true,true,true],
                            //text:'a'
                            image: comp.ma3,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            text:'a'
                            /*image: comp.ju3,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]*/
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ju3,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                     {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ag4,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.no4,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ma4,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ju4,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]

                    },
                ],
                [
                    {
                        colSpan:10,
                        alignment:'left',
                        border:[true,true,true,true],
                        text:'2.-LOCALIZA INFORMACIÓN ESPECÍFICA EN UN TEXTO'
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ag5,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.no5,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ma5,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ju5,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ag6,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {   
                            colSpan:2,
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.no6,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            text:''
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ma6,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ju6,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ag7,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.no7,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {       
                            colSpan:2,
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ma7,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            text:'O'
                            /*image: comp.ag8,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]*/
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ju7,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                     {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ag8,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.no8,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ma8,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ju8,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                ],
                 [
                    {
                        colSpan:10,
                        alignment:'left',
                        border:[true,true,true,true],
                        text:'3.-OPINA SOBRE EL CONTENIDO DE UN TEXTO'
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text: 'o'
                            image: comp.ag9,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:comp.no1
                            image: comp.no9,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                            
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:comp.ma1
                            image: comp.ma9,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:comp.ju1
                            image: comp.ju9,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ag10,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {   
                            colSpan:2,
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.no10,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            text:''
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ma10,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ju10,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ag11,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.no11,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {       
                            colSpan:2,
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ma11,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            text:'O'
                            /*image: comp.ag12,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]*/
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ju11,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                     {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ag12,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.no12,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ma12,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                            
                    },
                    {
                            
                            border:[true,true,true,true],
                            //text:'O'
                            image: comp.ju12,
                            width: 08,
                            height: 08, style:'tableHeader', alignment:'center', border:[true, true, true, true]
                    },
                ],
                [
                    {
                        colSpan:28,
                        border:[false,false,false,false],
                        text:''
                    }
                    ],
                    [
                    {
                        colSpan:8,
                        border:[true,true,true,false],
                        text:''
                    },
                     {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                            
                            border:[false,false,false,false],
                            text:''
                    },
                    {
                        colSpan:20,
                        border:[true,true,true,false],
                        text:''
                    },
                    ],
                   [
                    
                     {
                        
                        border:[true,false,false,false],
                        text:''
                    },
                    {
                      colSpan:6,
                      border:[false,false,false,true],
                      text:doc.docente
                    },
                    {
                        
                        border:[false,false,false,true],
                        text:''
                    },
                    {
                        
                        border:[false,false,false,true],
                        text:''
                    },
                    {
                        
                        border:[false,false,false,true],
                        text:''
                    },
                    {
                        
                        border:[false,false,false,true],
                        text:''
                    },
                    {
                        
                        border:[false,false,false,true],
                        text:''
                    },
                    {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                    {
                      colSpan:20,
                      border:[true,false,true,false],
                      text:''
                    },
                    ],
                    [
                    {
                      colSpan:8,
                      fontSize:4.5,
                      border:[true,false,true,false],
                      text:'NOMBRE Y FIRMA DEL (DE LA) MAESTRO(A)'
                    },
                     {
                        
                        border:[false,false,false,true],
                        text:''
                    },
                    {
                        
                        border:[false,false,false,true],
                        text:''
                    },
                    {
                        
                        border:[false,false,false,true],
                        text:''
                    },
                    {
                        
                        border:[false,false,false,true],
                        text:''
                    },
                    {
                        
                        border:[false,false,false,true],
                        text:''
                    },
                    {
                        
                        border:[false,false,false,true],
                        text:''
                    },
                    {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                    {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                    {
                      colSpan:12,
                      border:[false,false,false,true],
                      text: doc.director/*'NOMBRE Y FIRMA DEL(DE LA) DIRECTOR(A)'*/
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                    {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                    {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        colSpan:2,
                        border:[true,false,false,true],
                        //text:doc.anio
                        text:[{text:doc.anio}]
                    },
                    {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                    {
                        colSpan:2,
                        border:[true,false,false,true],
                        //text:doc.mes
                        text:[{text:doc.mes}]
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                    {
                        
                        border:[true,false,true,true],
                        text:doc.dia
                    },
                    {
                        
                        border:[false,false,true,false],
                        text:''
                    },

                    ],
                    [
                    
                     {
                        
                        border:[true,false,false,false],
                        text:''
                    },
                    {
                      colSpan:6,
                      border:[false,false,false,true],
                      text:'OAXACA DE JUAREZ, OAXACA'
                    },
                    {
                        
                        border:[false,false,false,true],
                        text:''
                    },
                    {
                        
                        border:[false,false,false,true],
                        text:''
                    },
                    {
                        
                        border:[false,false,false,true],
                        text:''
                    },
                    {
                        
                        border:[false,false,false,true],
                        text:''
                    },
                    {
                        
                        border:[false,false,false,true],
                        text:''
                    },
                    {
                        
                        border:[false,false,true,false],
                        text:''
                    },
                    {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                    {
                      colSpan:12,
                      fontSize:4.5,
                      border:[false,false,false,false],
                      text: 'NOMBRE Y FIRMA DEL(DE LA) DIRECTOR(A)'
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                    {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                    {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        colSpan:2,
                        fontSize:4.5,
                        border:[false,false,false,false],
                        text:'AÑO'
                    },
                    {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                    {
                        colSpan:2,
                        fontSize:4.5,
                        border:[false,false,false,false],
                        text:'MES'
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                    {
                        fontSize:4.5,
                        border:[false,false,false,false],
                        text:'DIA'
                    },
                    {
                        
                        border:[false,false,true,false],
                        text:''
                    },

                    ],
                    
                    [
                    {
                      colSpan:8,
                      fontSize:4.5,
                      border:[true,false,true,true],
                      text:'LUGAR DE EXPEDICIÓN'
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                    {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                     {
                        
                        border:[false,false,false,false],
                        text:''
                    },
                    {
                      colSpan:20,
                      border:[true,false,true,true],
                      text:''
                    },
                    ],
                    [
                    {
                      colSpan:28,
                      fontSize:5,
                      alignment:'left',
                      bold:true,
                      border:[false,false,false,false],
                      text:'ESTE FORMATO ES VÁLIDO EN LOS ESTADOS UNIDOS MEXICANOS, NO REQUIERE TRÁMITES ADICIONALES DE LEGALIZACIÓN Y NO ES VÁLIDO SI PRESENTA BORRADURAS O ENMENDADURAS.\nSE SANCIONARÁ A QUIEN CON DOLO O FINES LUCRATIVOS REPRODUZCA TOTAL O PARCIALMENTE ESTE FORMATO CONSULTAS: www.controlescolar.ieepoplaneacion.info'
                      
                    },
                     
                    ],
                    


                   
                ]
            },
            
        },




/////////////////////////////////////////////////////////////////////////////////////
        
        

////////////////////////////////////////////////////////////////////////////////////////////

    ],


    styles: {
                                                        
                             tableExample: {
                                
                                //widths: [0, 0, 0,100],
                                bold: true,
                                fontSize: 4.5,
                                color: 'black',
                                alignment: 'center'
                            },
                            tableHeader: {
                                bold: true,
                                fontSize: 4.5,
                                color: 'black',
                                alignment: 'center'
                            },
                            encabezado: { 
                                bold: true,
                                fontSize: 4.5,
                                color: 'black',
                                
                            }
                        }
    
}

pdfMake.createPdf(dd).open();

}



            


    }
})();