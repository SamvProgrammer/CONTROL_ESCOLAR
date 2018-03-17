(function() {
    angular.module("primariaAngular")
    .controller("EstadisticaCtrl", EstadisticaController);

     

    function EstadisticaController($scope, Flash,toastr, serviciogrupo, servicioalugrupo, servicioalumno,serviciocurso) {
        var vm = this;
      
        var local = JSON.parse(localStorage.getItem('perfil'));
        vm.init=init;
        vm.grupo_seleccionado="";
        vm.cargarAlumnos = cargarAlumnos;
        vm.llenaPDFestadistica = llenaPDFestadistica;
        vm.llenaPDFestadistica2=llenaPDFestadistica2;
        vm.getCursoActual=getCursoActual;


        init();

         function init(){
            grupos();     
            getCursoActual();    
        }

        function grupos(){
            serviciogrupo.getGrupo().then(function (data) {
                vm.datos_grupo=data;
                console.log(vm.datos_grupo);
            });
        }

        function cargarAlumnos(){
            contarRegistros();
            contarRegistroInicial();
            contarHombres();
            contarMujeres();
            obtenerEdadAlumnos();
            bajas();
            serviciogrupo.cabeceraEstadistica(vm.grupo_seleccionado).then(function(data) {
                vm.datos_cabera=data;
            })
            servicioalugrupo.obtenerAlumnosDelGrupo(vm.grupo_seleccionado).then(function(data) {
                         vm.datos_alumnos = data;
                        console.log(vm.datos_alumnos);
                    });
        }

        function contarRegistros() {
            servicioalugrupo.contarRegistros(vm.grupo_seleccionado).then(function(data) {
                vm.contadorRegistro = data;
                console.log("alumnos que pertenecen al mismo gurpo que el docentre");
                console.log(vm.contadorRegistro);
            })
        }
        function contarRegistroInicial(){
            servicioalugrupo.contarRegistrosInicial(vm.grupo_seleccionado).then(function(data) {
                vm.contadorRegistroI = data;
                console.log("alumnos que pertenecen al mismo gurpo que el docentre");
                console.log(vm.contadorRegistroI);
            })
        }

        function contarHombres() {

            servicioalugrupo.contarHombres(vm.grupo_seleccionado).then(function(data) {

                vm.hombres = data;
                console.log("total hombres");
                console.log(vm.hombres);
            })
        }

        function bajas(){
            servicioalumno.getBajaGrupo(vm.grupo_seleccionado).then(function(data) {
                vm.baja=data[0];
                console.log(vm.baja);
            });
        }

        function contarMujeres() {

            servicioalugrupo.contarMujeres(vm.grupo_seleccionado).then(function(data) {

                vm.mujeres = data;
                console.log("total mujeres");
                console.log(vm.mujeres);
            })
        }



        function obtenerEdadAlumnos() {

            servicioalugrupo.obtenerEdadAlumnos(vm.grupo_seleccionado, "H").then(function(data) {
                
              
                vm.gral = data;
                console.log(vm.gral);
            })
           
            ///////////////////////////////////MUJERES//////////////////////////////////////////////////////
             servicioalugrupo.obtenerEdadAlumnos(vm.grupo_seleccionado, "M").then(function(data) {

                vm.gralM = data;
                console.log("total gralM");
                console.log(vm.gralM);
            })
           

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


        function llenaPDFestadistica() {
            var anioI= new Date(vm.datos_cabera[0].anioInicio);
            var anioF= new Date(vm.datos_cabera[0].anioFin);


            var f = new Date();
            var dias=['ENERO', 'FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE', 'DICIEMBRE'];

            var cabecera = {
                grado: vm.datos_cabera[0].grado,
                grupo: vm.datos_cabera[0].nombre,

                ciclo: anioI.getFullYear().toString() + "-" + anioF.getFullYear().toString(),
                docente: vm.datos_cabera[0].nombre_completo


            };
            var totalAlumnos = {
                total: vm.contadorRegistroI[0].numero,
                hombres: vm.hombres[0].total,
                mujeres: vm.mujeres[0].total,
                cinco: vm.gral[0][0].total,
                seis:  vm.gral[1][0].total,
                siete: vm.gral[2][0].total,
                ocho: vm.gral[3][0].total,
                nueve:vm.gral[4][0].total,
                diez: vm.gral[5][0].total,
                once: vm.gral[6][0].total,
                doce: vm.gral[7][0].total,
                trece: vm.gral[8][0].total,
                catorce:vm.gral[9][0].total,
                quince: vm.gral[10][0].total,
                
                cincoM:  vm.gralM[0][0].total,
                seisM:  vm.gralM[1][0].total,
                sieteM:  vm.gralM[2][0].total,
                ochoM:  vm.gralM[3][0].total,
                nueveM:  vm.gralM[4][0].total,
                diezM:  vm.gralM[5][0].total,
                onceM:  vm.gralM[6][0].total,
                doceM:  vm.gralM[7][0].total,
                treceM:  vm.gralM[8][0].total,
                catorceM:  vm.gralM[9][0].total,
                quinceM:  vm.gralM[10][0].total,

                totalHombre: vm.gral[0][0].total+ vm.gral[1][0].total+vm.gral[2][0].total+vm.gral[3][0].total+vm.gral[4][0].total+vm.gral[5][0].total+vm.gral[6][0].total+vm.gral[7][0].total+vm.gral[8][0].total+vm.gral[9][0].total+vm.gral[10][0].total,
                totalMujer: vm.gralM[0][0].total+ vm.gralM[1][0].total+vm.gralM[2][0].total+vm.gralM[3][0].total+vm.gralM[4][0].total+vm.gralM[5][0].total+vm.gralM[6][0].total+vm.gralM[7][0].total+vm.gralM[8][0].total+vm.gralM[9][0].total+vm.gralM[10][0].total,
                subtotalCinco: vm.gral[0][0].total+ vm.gralM[0][0].total,
                subtotalSeis: vm.gral[1][0].total+ vm.gralM[1][0].total,
                subtotalSiete: vm.gral[2][0].total+ vm.gralM[2][0].total,
                subtotalOcho: vm.gral[3][0].total+ vm.gralM[3][0].total,
                subtotalNueve: vm.gral[4][0].total+ vm.gralM[4][0].total,
                subtotalDiez: vm.gral[5][0].total+ vm.gralM[5][0].total,
                subtotalOnce: vm.gral[6][0].total+ vm.gralM[6][0].total,
                subtotalDoce: vm.gral[7][0].total+ vm.gralM[7][0].total,
                subtotalTrece: vm.gral[8][0].total+ vm.gralM[8][0].total,
                subtotalCatorce: vm.gral[9][0].total+ vm.gralM[9][0].total,
                subtotalQuince: vm.gral[10][0].total+ vm.gralM[10][0].total
                
                
            }
            console.log(totalAlumnos);

            var aluHAproCinco=0;
            var aluHAproSeis=0;
            var aluHAproSiete=0;
            var aluHAproOcho=0;
            var aluHAproNueve=0;
            var aluHAproDiez=0;
            var aluHAproOnce=0;
            var aluHAproDoce=0;
            var aluHAproTrece=0;
            var aluHAproCatorce=0;
            var aluHAproQuince=0;

            var aluHRepCinco=0;
            var aluHRepSeis=0;
            var aluHRepSiete=0;
            var aluHRepOcho=0;
            var aluHRepNueve=0;
            var aluHRepDiez=0;
            var aluHRepOnce=0;
            var aluHRepDoce=0;
            var aluHRepTrece=0;
            var aluHRepCatorce=0;
            var aluHRepQuince=0;

            var aluMAproCinco=0;
            var aluMAproSeis=0;
            var aluMAproSiete=0;
            var aluMAproOcho=0;
            var aluMAproNueve=0;
            var aluMAproDiez=0;
            var aluMAproOnce=0;
            var aluMAproDoce=0;
            var aluMAproTrece=0;
            var aluMAproCatorce=0;
            var aluMAproQuince=0;

            var aluMRepCinco=0;
            var aluMRepSeis=0;
            var aluMRepSiete=0;
            var aluMRepOcho=0;
            var aluMRepNueve=0;
            var aluMRepDiez=0;
            var aluMRepOnce=0;
            var aluMRepDoce=0;
            var aluMRepTrece=0;
            var aluMRepCatorce=0;
            var aluMRepQuince=0;

            for(var i=0; i< vm.datos_alumnos.length; i++){
                if(vm.datos_alumnos[i].edad === 5){
                    if(vm.datos_alumnos[i].sexo === "H"){
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluHAproCinco++;
                        }else{
                            aluHRepCinco++;
                        }
                    }else{
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluMAproCinco++;
                        }else{
                            aluMRepCinco++;
                        }
                    }
                }

                if(vm.datos_alumnos[i].edad === 6){
                    if(vm.datos_alumnos[i].sexo === "H"){
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluHAproSeis++;
                        }else{
                            aluHRepSeis++;
                        }
                    }else{
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluMAproSeis++;
                        }else{
                            aluMRepSeis++;
                        }
                    }
                }

                if(vm.datos_alumnos[i].edad === 7){
                    if(vm.datos_alumnos[i].sexo === "H"){
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluHAproSiete++;
                        }else{
                            aluHRepSiete++;
                        }
                    }else{
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluMAproSiete++;
                        }else{
                            aluMRepSiete++;
                        }
                    }
                }

                if(vm.datos_alumnos[i].edad === 8){
                    if(vm.datos_alumnos[i].sexo === "H"){
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluHAproOcho++;
                        }else{
                            aluHRepOcho++;
                        }
                    }else{
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluMAproOcho++;
                        }else{
                            aluMRepOcho++;
                        }
                    }
                }

                if(vm.datos_alumnos[i].edad === 9){
                    if(vm.datos_alumnos[i].sexo === "H"){
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluHAproNueve++;
                        }else{
                            aluHRepNueve++;
                        }
                    }else{
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluMAproNueve++;
                        }else{
                            aluMRepNueve++;
                        }
                    }
                }

                if(vm.datos_alumnos[i].edad === 10){
                    if(vm.datos_alumnos[i].sexo === "H"){
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluHAproDiez++;
                        }else{
                            aluHRepDiez++;
                        }
                    }else{
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluMAproDiez++;
                        }else{
                            aluMRepDiez++;
                        }
                    }
                }

                if(vm.datos_alumnos[i].edad === 11){
                    if(vm.datos_alumnos[i].sexo === "H"){
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluHAproOnce++;
                        }else{
                            aluHRepOnce++;
                        }
                    }else{
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluMAproOnce++;
                        }else{
                            aluMRepOnce++;
                        }
                    }
                }

                if(vm.datos_alumnos[i].edad === 12){
                    if(vm.datos_alumnos[i].sexo === "H"){
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluHAproDoce++;
                        }else{
                            aluHRepDoce++;
                        }
                    }else{
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluMAproDoce++;
                        }else{
                            aluMRepDoce++;
                        }
                    }
                }

                if(vm.datos_alumnos[i].edad === 13){
                    if(vm.datos_alumnos[i].sexo === "H"){
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluHAproTrece++;
                        }else{
                            aluHRepTrece++;
                        }
                    }else{
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluMAproTrece++;
                        }else{
                            aluMRepTrece++;
                        }
                    }
                }

                if(vm.datos_alumnos[i].edad === 14){
                    if(vm.datos_alumnos[i].sexo === "H"){
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluHAproCatorce++;
                        }else{
                            aluHRepCatorce++;
                        }
                    }else{
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluMAproCatorce++;
                        }else{
                            aluMRepCatorce++;
                        }
                    }
                }

                if(vm.datos_alumnos[i].edad === 15){
                    if(vm.datos_alumnos[i].sexo === "H"){
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluHAproQuince++;
                        }else{
                            aluHRepQuince++;
                        }
                    }else{
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluMAproQuince++;
                        }else{
                            aluMRepQuince++;
                        }
                    }
                }



            }//for
            console.log(aluHAproSeis);
            
            var datos={
                homApCinco: aluHAproCinco,
                homApSeis: aluHAproSeis,
                homApSiete: aluHAproSiete,
                homApOcho: aluHAproOcho,
                homApNueve: aluHAproNueve,
                homApDiez: aluHAproDiez,
                homApOnce: aluHAproOnce,
                homApDoce: aluHAproDoce,
                homApTrece: aluHAproTrece,
                homApCatorce: aluHAproCatorce,
                homApQuince: aluHAproQuince,
                homApTotal: aluHAproCinco+aluHAproSeis+aluHAproSiete+aluHAproOcho+aluHAproNueve+aluHAproDiez+aluHAproOnce+aluHAproDoce+aluHAproTrece+aluHAproCatorce+aluHAproQuince,

                homReCinco: aluHRepCinco,
                homReSeis: aluHRepSeis,
                homReSiete: aluHRepSiete,
                homReOcho: aluHRepOcho,
                homReNueve: aluHRepNueve,
                homReDiez: aluHRepDiez,
                homReOnce: aluHRepOnce,
                homReDoce: aluHRepDoce,
                homReTrece: aluHRepTrece,
                homReCatorce: aluHRepCatorce,
                homReQuince: aluHRepQuince,
                homReTotal: aluHRepCinco+aluHRepSeis+aluHRepSiete+aluHRepOcho+aluHRepNueve+aluHRepDiez+aluHRepOnce+aluHRepDoce+aluHRepTrece+aluHRepCatorce+aluHRepQuince,

                mujApCinco: aluMAproCinco,
                mujApSeis: aluMAproSeis,
                mujApSiete: aluMAproSiete,
                mujApOcho: aluMAproOcho,
                mujApNueve: aluMAproNueve,
                mujApDiez: aluMAproDiez,
                mujApOnce: aluMAproOnce,
                mujApDoce: aluMAproDoce,
                mujApTrece: aluMAproTrece,
                mujApCatorce: aluMAproCatorce,
                mujApQuince: aluMAproQuince,
                mujApTotal: aluMAproCinco+aluMAproSeis+aluMAproSiete+aluMAproOcho+aluMAproNueve+aluMAproDiez+aluMAproOnce+aluMAproDoce+aluMAproTrece+aluMAproCatorce+aluMAproQuince,


                mujReCinco: aluMRepCinco,
                mujReSeis: aluMRepSeis,
                mujReSiete: aluMRepSiete,
                mujReOcho: aluMRepOcho,
                mujReNueve: aluMRepNueve,
                mujReDiez: aluMRepDiez,
                mujReOnce: aluMRepOnce,
                mujReDoce: aluMRepDoce,
                mujReTrece: aluMRepTrece,
                mujReCatorce: aluMRepCatorce,
                mujReQuince: aluMRepQuince,
                mujReTotal: aluMRepCinco+aluMRepSeis+aluMRepSiete+aluMRepOcho+aluMRepNueve+aluMRepDiez+aluMRepOnce+aluMRepDoce+aluMRepTrece+aluMRepCatorce+aluMRepQuince,

                subtotalApCinco: aluHAproCinco+aluMAproCinco,
                subtotalApSeis: aluHAproSeis+aluMAproSeis,
                subtotalApSiete: aluHAproSiete+aluMAproSiete,
                subtotalApOcho: aluHAproOcho+aluMAproOcho,
                subtotalApNueve: aluHAproNueve+aluMAproNueve,
                subtotalApDiez: aluHAproDiez+aluMAproDiez,
                subtotalApOnce: aluHAproOnce+aluMAproOnce,
                subtotalApDoce: aluHAproDoce+aluMAproDoce,
                subtotalApTrece: aluHAproTrece+aluMAproTrece,
                subtotalApCatorce: aluHAproCatorce+aluMAproCatorce,
                subtotalApQuince: aluHAproQuince+aluMAproQuince,

                subtotalReCinco: aluHRepCinco+aluMRepCinco,
                subtotalReSeis: aluHRepSeis+aluMRepSeis,
                subtotalReSiete: aluHRepSiete+aluMRepSiete,
                subtotalReOcho: aluHRepOcho+aluMRepOcho,
                subtotalReNueve: aluHRepNueve+aluMRepNueve,
                subtotalReDiez: aluHRepDiez+aluMRepDiez,
                subtotalReOnce: aluHRepOnce+aluMRepOnce,
                subtotalReDoce: aluHRepDoce+aluMRepDoce,
                subtotalReTrece: aluHRepTrece+aluMRepTrece,
                subtotalReCatorce: aluHRepCatorce+aluMRepCatorce,
                subtotalReQuince: aluHRepQuince+aluMRepQuince,

                subtotalTotalAp: aluHAproCinco+aluMAproCinco+aluHAproSeis+aluMAproSeis+aluHAproSiete+aluMAproSiete+ aluHAproOcho+aluMAproOcho+aluHAproNueve+aluMAproNueve+aluHAproDiez+aluMAproDiez+aluHAproOnce+aluMAproOnce+aluHAproDoce+aluMAproDoce+aluHAproTrece+aluMAproTrece+aluHAproCatorce+aluMAproCatorce+aluHAproQuince+aluMAproQuince,
                subtotalTotalRe: aluHRepCinco+aluMRepCinco+aluHRepSeis+aluMRepSeis+aluHRepSiete+aluMRepSiete+aluHRepOcho+aluMRepOcho+aluHRepNueve+aluMRepNueve+aluHRepDiez+aluMRepDiez+aluHRepOnce+aluMRepOnce+aluHRepDoce+aluMRepDoce+aluHRepTrece+aluMRepTrece+aluHRepCatorce+aluMRepCatorce+aluHRepQuince+aluMRepQuince
            };

            
            pdf1(cabecera, totalAlumnos,f,dias, datos);
            
        }


        function pdf1(cabe, totalAlum,f,dias, datos) {


            var headers_titulo = [{
                    col_1: {
                        image: 'data:image/png;base64,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',
                        width: 160,
                        height: 75,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_2: {
                        text: ['\nESCUELA PRIMARIA ROSARIO CASTELLANOS\nCLAVE:20DPR3331V\n', {
                            text: cabe.grado,
                            bold: true,
                            fontSize: 12
                        }, '° GRADO GRUPO: ', {
                            text: cabe.grupo,
                            bold: true,
                            fontSize: 12
                        }, '\nCICLO ESCOLAR: ', {
                            text: cabe.ciclo,
                            bold: true,
                            fontSize: 12
                        }, '\n ESTADÍSTICA GRUPAL INICIAL'],
                        fontSize: 12,
                        style: 'tableHeader',
                        border: [false, false, false, false],
                        alignment: 'center'
                    },



                    col_3: {
                        image: 'data:image/png;base64,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',
                        width: 100,
                        height: 75,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },

                },


                {
                    col_1: {
                        text: '',
                        style: 'tableHeader',
                        border: [false, false, false, false],
                        alignment: 'center'
                    },
                    col_2: {
                        text: '',
                        style: 'tableHeader',
                        border: [false, false, false, false],
                        alignment: 'center'
                    },
                    col_3: {
                        text: '',
                        style: 'tableHeader',
                        border: [false, false, false, false],
                        alignment: 'center'
                    },

                }, {
                    col_1: {
                        text: '',
                        style: 'tableHeader',
                        border: [false, false, false, false],
                        alignment: 'center'
                    },
                    col_2: {
                        text: '',
                        style: 'tableHeader',
                        border: [false, false, false, false],
                        alignment: 'center'
                    },
                    col_3: {
                        text: '',
                        style: 'tableHeader',
                        border: [false, false, false, false],
                        alignment: 'center'
                    },

                }, {
                    col_1: {
                        text: '',
                        style: 'tableHeader',
                        border: [false, false, false, false],
                        alignment: 'center'
                    },
                    col_2: {
                        text: '',
                        style: 'tableHeader',
                        border: [false, false, false, false],
                        alignment: 'center'
                    },
                    col_3: {
                        text: '',
                        style: 'tableHeader',
                        border: [false, false, false, false],
                        alignment: 'center'
                    },

                }

            ];


            var headers = [

                {
                    col_0: {
                        text: '',
                        fontSize: 8,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_1: {
                        text: 'DATOS',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_2: {
                        text: '5\n AÑOS',
                        fontSize: 8,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_3: {
                        text: '6\n AÑOS',
                        fontSize: 8,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_4: {
                        text: '7\n AÑOS',
                        fontSize: 8,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_5: {
                        text: '8\n AÑOS',
                        fontSize: 8,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_6: {
                        text: '9\n AÑOS',
                        fontSize: 8,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_7: {
                        text: '10\n AÑOS',
                        fontSize: 8,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_8: {
                        text: '11\n AÑOS',
                        fontSize: 8,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_9: {
                        text: '12\n AÑOS',
                        fontSize: 8,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_10: {
                        text: '13\n AÑOS',
                        fontSize: 8,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_11: {
                        text: '14\n AÑOS',
                        fontSize: 8,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_12: {
                        text: '15\n AÑOS',
                        fontSize: 8,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_13: {
                        text: 'TOTAL',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },

                },

                {
                    col_0: {
                        text: 'HOMBRES',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_1: {
                        text: 'NUEVO INGRESO',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_2: {
                        text: datos.homApCinco,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_3: {
                        text: datos.homApSeis,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_4: {
                        text: datos.homApSiete,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_5: {
                        text: datos.homApOcho,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_6: {
                        text: datos.homApNueve,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_7: {
                        text: datos.homApDiez,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_8: {
                        text: datos.homApOnce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_9: {
                        text: datos.homApDoce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_10: {
                        text: datos.homApTrece,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_11: {
                        text: datos.homApCatorce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_12: {
                        text: datos.homApQuince,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_13: {
                        text: datos.homApTotal,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_1: {
                        text: 'REPETIDORES',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_2: {
                        text: datos.homReCinco,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_3: {
                        text: datos.homReSeis,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_4: {
                        text: datos.homReSiete,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_5: {
                        text: datos.homReOcho,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_6: {
                        text: datos.homReNueve,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_7: {
                        text: datos.homReDiez,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_8: {
                        text: datos.homReOnce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_9: {
                        text: datos.homReDoce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_10: {
                        text: datos.homReTrece,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_11: {
                        text: datos.homReCatorce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_12: {
                        text: datos.homReQuince,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_13: {
                        text: datos.homReTotal,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_1: {
                        text: 'TOTAL',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    /*col_2:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_3:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_4:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_5:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_6:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_7:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_8:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_9:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_10:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_11:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_12:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},*/
                    col_2: {
                        text: [{
                            text: totalAlum.cinco,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_3: {
                        text: [{
                            text: totalAlum.seis,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_4: {
                        text: [{
                            text: totalAlum.siete,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_5: {
                        text: [{
                            text: totalAlum.ocho,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_6: {
                        text: [{
                            text: totalAlum.nueve,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_7: {
                        text: [{
                            text: totalAlum.diez,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_8: {
                        text: [{
                            text: totalAlum.once,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_9: {
                        text: [{
                            text: totalAlum.doce,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_10: {
                        text: [{
                            text: totalAlum.trece,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_11: {
                        text: [{
                            text: totalAlum.catorce,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_12: {
                        text: [{
                            text: totalAlum.quince,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_13: {
                        text: [{
                            text: totalAlum.totalHombre,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: 'MUJERES',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_1: {
                        text: 'NUEVO INGRESO',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_2: {
                        text: datos.mujApCinco,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_3: {
                        text: datos.mujApSeis,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_4: {
                        text: datos.mujApSiete,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_5: {
                        text: datos.mujApOcho,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_6: {
                        text: datos.mujApNueve,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_7: {
                        text: datos.mujApDiez,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_8: {
                        text: datos.mujApOnce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_9: {
                        text: datos.mujApDoce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_10: {
                        text: datos.mujApTrece,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_11: {
                        text: datos.mujApCatorce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_12: {
                        text: datos.mujApQuince,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_13: {
                        text: datos.mujApTotal,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_1: {
                        text: 'REPETIDORES',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_2: {
                        text: datos.mujReCinco,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_3: {
                        text: datos.mujReSeis,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_4: {
                        text: datos.mujReSiete,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_5: {
                        text: datos.mujReOcho,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_6: {
                        text: datos.mujReNueve,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_7: {
                        text: datos.mujReDiez,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_8: {
                        text: datos.mujReOnce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_9: {
                        text: datos.mujReDoce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_10: {
                        text: datos.mujReTrece,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_11: {
                        text: datos.mujReCatorce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_12: {
                        text: datos.mujReQuince,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_13: {
                        text: datos.mujReTotal,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_1: {
                        text: 'TOTAL',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    /*col_2:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_3:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_4:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_5:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_6:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_7:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_8:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_9:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_10:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_11:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_12:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},*/
                    col_2: {
                        text: [{
                            text: totalAlum.cincoM,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_3: {
                        text: [{
                            text: totalAlum.seisM,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_4: {
                        text: [{
                            text: totalAlum.sieteM,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_5: {
                        text: [{
                            text: totalAlum.ochoM,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_6: {
                        text: [{
                            text: totalAlum.nueveM,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_7: {
                        text: [{
                            text: totalAlum.diezM,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_8: {
                        text: [{
                            text: totalAlum.onceM,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_9: {
                        text: [{
                            text: totalAlum.doceM,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_10: {
                        text: [{
                            text: totalAlum.treceM,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_11: {
                        text: [{
                            text: totalAlum.catorceM,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_12: {
                        text: [{
                            text: totalAlum.quinceM,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_13: {
                        text: [{
                            text: totalAlum.totalMujer,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    //col_13:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: 'SUBTOTAL',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_1: {
                        text: 'NUEVO INGRESO',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_2: {
                        text: datos.subtotalApCinco,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_3: {
                        text: datos.subtotalApSeis,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_4: {
                        text: datos.subtotalApSiete,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_5: {
                        text: datos.subtotalApOcho,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_6: {
                        text: datos.subtotalApNueve,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_7: {
                        text: datos.subtotalApDiez,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_8: {
                        text: datos.subtotalApOnce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_9: {
                        text: datos.subtotalApDoce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_10: {
                        text: datos.subtotalApTrece,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_11: {
                        text: datos.subtotalApCatorce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_12: {
                        text: datos.subtotalApQuince,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_13: {
                        text: datos.subtotalTotalAp,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    //col_13:{ text:[{text: totalAlum.hombres, bold:true, fontSize:11,alignment:'center'}]},
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_1: {
                        text: 'REPETIDORES',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_2: {
                        text: datos.subtotalReCinco,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_3: {
                        text: datos.subtotalReSeis,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_4: {
                        text: datos.subtotalReSiete,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_5: {
                        text: datos.subtotalReOcho,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_6: {
                        text: datos.subtotalReNueve,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_7: {
                        text: datos.subtotalReDiez,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_8: {
                        text: datos.subtotalReOnce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_9: {
                        text: datos.subtotalReDoce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_10: {
                        text: datos.subtotalReTrece,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_11: {
                        text: datos.subtotalReCatorce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_12: {
                        text: datos.subtotalReQuince,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_13: {
                        text:datos.subtotalTotalRe ,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_1: {
                        text: 'TOTAL',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_2: {
                        text: totalAlum.subtotalCinco,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_3: {
                        text: totalAlum.subtotalSeis,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_4: {
                        text: totalAlum.subtotalSiete,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_5: {
                        text: totalAlum.subtotalOcho,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_6: {
                        text: totalAlum.subtotalNueve,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_7: {
                        text: totalAlum.subtotalDiez,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_8: {
                        text: totalAlum.subtotalOnce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_9: {
                        text: totalAlum.subtotalDoce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_10: {
                        text: totalAlum.subtotalTrece,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_11: {
                        text: totalAlum.subtotalCatorce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_12: {
                        text: totalAlum.subtotalQuince,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    //col_13:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_13: {
                        text: [{
                            text: totalAlum.total,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        colSpan: 11,
                        text: 'FRACC.EL ROSARIO SAN SEBASTIAN TUTLA, OAXACA, A '+ f.getDate().toString() +' DE '+ dias[f.getMonth()]+' DEL '+f.getFullYear().toString(),
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },

                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },

                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },

                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },

                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },

                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        colSpan: 3,
                        text: 'ATENTAMENTE',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        colSpan: 2,
                        text: 'Vo.Bo.',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        colSpan: 3,
                        text: 'EL(LA) MAESTRO(A) DEL GRUPO',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        colSpan: 4,
                        text: 'DIRECTORA DE LA ESCUELA',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },

                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },

                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },

                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },

                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        colSpan: 3,
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, true, false, false]
                    },
                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        colSpan: 4,
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, true, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        colSpan: 3,
                        text: ['PROF.(A) ', {
                            text: cabe.docente,
                            bold: true,
                            fontSize: 12
                        }],
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        colSpan: 4,
                        text: 'L.E.B.NORMA MARTINEZ GALICIA',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                },



            ];



            var body = [];
            var body2 = [];


            angular.forEach(headers_titulo, function(header, key) {
                var row2 = new Array();
                row2.push(header.col_1);
                row2.push(header.col_2);
                row2.push(header.col_3);


                body2.push(row2);
            });


            angular.forEach(headers, function(header, key) {
                var row = new Array();
                row.push(header.col_0);
                row.push(header.col_1);
                row.push(header.col_2);
                row.push(header.col_3);
                row.push(header.col_4);
                row.push(header.col_5);
                row.push(header.col_6);
                row.push(header.col_7);
                row.push(header.col_8);
                row.push(header.col_9);
                row.push(header.col_10);
                row.push(header.col_11);
                row.push(header.col_12);
                row.push(header.col_13);

                body.push(row);
            });



            console.log(body);

            var docDefinition = {
                pageMargins: [40, 150, 40, 55],
                pageSize: 'LETTER',
                pageOrientation: 'landscape',
                header: function() {
                    return {
                        //margin: 40,
                        margin: [30, 30, 0, 0],
                        //alignment: 'center',
                        //style: 'tableExample',

                        table: {

                            widths: [160, 450, 70],
                            headerRows: 1,
                            // keepWithHeaderRows: 1,
                            body: body2

                        },

                    }

                },

                footer: function(currentPage, pageCount) {

                    return {
                        text: '-5-\n D.R.©',
                        alignment: 'right',
                        margin: [20, 0, 30, 0]
                    };
                },

                content: [{

                        style: 'tableExample',

                        table: {

                            widths: [90, 90, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
                            headerRows: 1,
                            // keepWithHeaderRows: 1,
                            body: body
                        }
                    },

                ],

                styles: {
                    header: {
                        fontSize: 12,
                        bold: true
                    },
                    subheader: {
                        fontSize: 15,
                        bold: true
                    },
                    quote: {
                        italics: true
                    },
                    small: {
                        fontSize: 8
                    },
                    sta: {
                        fontSize: 11,
                        bold: false,
                        alignment: 'justify'
                    },
                    tableExample: {

                        //widths: [0, 0, 0,100],
                        bold: true,
                        fontSize: 11,
                        color: 'black'
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 8,
                        color: 'black'
                    }
                }
            }

            pdfMake.createPdf(docDefinition).open();



        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        function llenaPDFestadistica2() {
            var anioI= new Date(vm.datos_cabera[0].anioInicio);
            var anioF= new Date(vm.datos_cabera[0].anioFin);


            var f = new Date();
            var dias=['ENERO', 'FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE', 'DICIEMBRE'];

            var cabecera = {
                grado: vm.datos_cabera[0].grado,
                grupo: vm.datos_cabera[0].nombre,

                ciclo: anioI.getFullYear().toString() + "-" + anioF.getFullYear().toString(),
                docente: vm.datos_cabera[0].nombre_completo


            };

            var ci= vm.gral[0][0].total;
            var se= vm.gral[1][0].total;
            var si= vm.gral[2][0].total;
            var oc= vm.gral[3][0].total;
            var nu= vm.gral[4][0].total;
            var di= vm.gral[5][0].total;
            var on= vm.gral[6][0].total;
            var dc= vm.gral[7][0].total;
            var tr= vm.gral[8][0].total;
            var ca= vm.gral[9][0].total;
            var qi= vm.gral[10][0].total;

            if(vm.baja.sexo === "H"){
                if( vm.baja.edad === 5){
                     ci+=vm.baja.baja;
                }
                if( vm.baja.edad === 6){
                     se+=vm.baja.baja;
                }
                if( vm.baja.edad === 7){
                     si+=vm.baja.baja;
                }
                if( vm.baja.edad === 8){
                     oc+=vm.baja.baja;
                }
                if( vm.baja.edad === 9){
                     nu+=vm.baja.baja;
                }
                if( vm.baja.edad === 10){
                     di+=vm.baja.baja;
                }
                if( vm.baja.edad === 11){
                     on+=vm.baja.baja;
                }
                if( vm.baja.edad === 12){
                     dc+=vm.baja.baja;
                }
                if( vm.baja.edad === 13){
                     tr+=vm.baja.baja;
                }
                if( vm.baja.edad === 14){
                     ca+=vm.baja.baja;
                }
                if( vm.baja.edad === 15){
                     qi+=vm.baja.baja;
                }
            } 
            var ciM= vm.gralM[0][0].total;
            var seM= vm.gralM[1][0].total;
            var siM= vm.gralM[2][0].total;
            var ocM= vm.gralM[3][0].total;
            var nuM= vm.gralM[4][0].total;
            var diM= vm.gralM[5][0].total;
            var onM= vm.gralM[6][0].total;
            var dcM= vm.gralM[7][0].total;
            var trM= vm.gralM[8][0].total;
            var caM= vm.gralM[9][0].total;
            var qiM= vm.gralM[10][0].total;

            if(vm.baja.sexo === "M"){
                if( vm.baja.edad === 5){
                     ciM+=vm.baja.baja;
                }
                if( vm.baja.edad === 6){
                     seM+=vm.baja.baja;
                }
                if( vm.baja.edad === 7){
                     siM+=vm.baja.baja;
                }
                if( vm.baja.edad === 8){
                     ocM+=vm.baja.baja;
                }
                if( vm.baja.edad === 9){
                     nuM+=vm.baja.baja;
                }
                if( vm.baja.edad === 10){
                     diM+=vm.baja.baja;
                }
                if( vm.baja.edad === 11){
                     onM+=vm.baja.baja;
                }
                if( vm.baja.edad === 12){
                     dcM+=vm.baja.baja;
                }
                if( vm.baja.edad === 13){
                     trM+=vm.baja.baja;
                }
                if( vm.baja.edad === 14){
                     caM+=vm.baja.baja;
                }
                if( vm.baja.edad === 15){
                     qiM+=vm.baja.baja;
                }
            }

            var totalAlumnos = {
                total: vm.contadorRegistro[0].numero,
                hombres: vm.hombres[0].total,
                mujeres: vm.mujeres[0].total,
                cinco: ci,
                seis:  se,
                siete: si,
                ocho: oc,
                nueve: nu,
                diez: di,
                once: on,
                doce: dc,
                trece: tr,
                catorce: ca,
                quince: qi,
                
                cincoM:  ciM,
                seisM:  seM,
                sieteM:  siM,
                ochoM:  ocM,
                nueveM:  nuM,
                diezM:  diM,
                onceM:  onM,
                doceM:  dcM,
                treceM:  trM,
                catorceM:  caM,
                quinceM:  qiM,

                totalHombre: ci+se+si+oc+nu+di+on+dc+tr+ca+qi,
                totalMujer: ciM+seM+siM+ocM+nuM+diM+onM+dcM+trM+caM+qiM,
                subtotalCinco: ci+ciM,
                subtotalSeis: se+seM,
                subtotalSiete: si+siM,
                subtotalOcho: oc+ocM,
                subtotalNueve: nu+nuM,
                subtotalDiez: di+diM,
                subtotalOnce: on+onM,
                subtotalDoce: dc+dcM,
                subtotalTrece: tr+trM,
                subtotalCatorce: ca+caM,
                subtotalQuince: qi+qiM
                
                
            }
            console.log(totalAlumnos);

            var totalA = {
                total: vm.contadorRegistro[0].numero,
                hombres: vm.hombres[0].total,
                mujeres: vm.mujeres[0].total,
                cinco: vm.gral[0][0].total,
                seis:  vm.gral[1][0].total,
                siete: vm.gral[2][0].total,
                ocho: vm.gral[3][0].total,
                nueve:vm.gral[4][0].total,
                diez: vm.gral[5][0].total,
                once: vm.gral[6][0].total,
                doce: vm.gral[7][0].total,
                trece: vm.gral[8][0].total,
                catorce:vm.gral[9][0].total,
                quince: vm.gral[10][0].total,
                
                cincoM:  vm.gralM[0][0].total,
                seisM:  vm.gralM[1][0].total,
                sieteM:  vm.gralM[2][0].total,
                ochoM:  vm.gralM[3][0].total,
                nueveM:  vm.gralM[4][0].total,
                diezM:  vm.gralM[5][0].total,
                onceM:  vm.gralM[6][0].total,
                doceM:  vm.gralM[7][0].total,
                treceM:  vm.gralM[8][0].total,
                catorceM:  vm.gralM[9][0].total,
                quinceM:  vm.gralM[10][0].total,

                totalHombre: vm.gral[0][0].total+ vm.gral[1][0].total+vm.gral[2][0].total+vm.gral[3][0].total+vm.gral[4][0].total+vm.gral[5][0].total+vm.gral[6][0].total+vm.gral[7][0].total+vm.gral[8][0].total+vm.gral[9][0].total+vm.gral[10][0].total,
                totalMujer: vm.gralM[0][0].total+ vm.gralM[1][0].total+vm.gralM[2][0].total+vm.gralM[3][0].total+vm.gralM[4][0].total+vm.gralM[5][0].total+vm.gralM[6][0].total+vm.gralM[7][0].total+vm.gralM[8][0].total+vm.gralM[9][0].total+vm.gralM[10][0].total,
                subtotalCinco: vm.gral[0][0].total+ vm.gralM[0][0].total,
                subtotalSeis: vm.gral[1][0].total+ vm.gralM[1][0].total,
                subtotalSiete: vm.gral[2][0].total+ vm.gralM[2][0].total,
                subtotalOcho: vm.gral[3][0].total+ vm.gralM[3][0].total,
                subtotalNueve: vm.gral[4][0].total+ vm.gralM[4][0].total,
                subtotalDiez: vm.gral[5][0].total+ vm.gralM[5][0].total,
                subtotalOnce: vm.gral[6][0].total+ vm.gralM[6][0].total,
                subtotalDoce: vm.gral[7][0].total+ vm.gralM[7][0].total,
                subtotalTrece: vm.gral[8][0].total+ vm.gralM[8][0].total,
                subtotalCatorce: vm.gral[9][0].total+ vm.gralM[9][0].total,
                subtotalQuince: vm.gral[10][0].total+ vm.gralM[10][0].total,
                subtotalTotal: vm.gral[0][0].total+ vm.gral[1][0].total+vm.gral[2][0].total+vm.gral[3][0].total+vm.gral[4][0].total+vm.gral[5][0].total+vm.gral[6][0].total+vm.gral[7][0].total+vm.gral[8][0].total+vm.gral[9][0].total+vm.gral[10][0].total+vm.gralM[0][0].total+ vm.gralM[1][0].total+vm.gralM[2][0].total+vm.gralM[3][0].total+vm.gralM[4][0].total+vm.gralM[5][0].total+vm.gralM[6][0].total+vm.gralM[7][0].total+vm.gralM[8][0].total+vm.gralM[9][0].total+vm.gralM[10][0].total,
                
                
            };

            var aluHAproCinco=0;
            var aluHAproSeis=0;
            var aluHAproSiete=0;
            var aluHAproOcho=0;
            var aluHAproNueve=0;
            var aluHAproDiez=0;
            var aluHAproOnce=0;
            var aluHAproDoce=0;
            var aluHAproTrece=0;
            var aluHAproCatorce=0;
            var aluHAproQuince=0;

            var aluHRepCinco=0;
            var aluHRepSeis=0;
            var aluHRepSiete=0;
            var aluHRepOcho=0;
            var aluHRepNueve=0;
            var aluHRepDiez=0;
            var aluHRepOnce=0;
            var aluHRepDoce=0;
            var aluHRepTrece=0;
            var aluHRepCatorce=0;
            var aluHRepQuince=0;

            var aluMAproCinco=0;
            var aluMAproSeis=0;
            var aluMAproSiete=0;
            var aluMAproOcho=0;
            var aluMAproNueve=0;
            var aluMAproDiez=0;
            var aluMAproOnce=0;
            var aluMAproDoce=0;
            var aluMAproTrece=0;
            var aluMAproCatorce=0;
            var aluMAproQuince=0;

            var aluMRepCinco=0;
            var aluMRepSeis=0;
            var aluMRepSiete=0;
            var aluMRepOcho=0;
            var aluMRepNueve=0;
            var aluMRepDiez=0;
            var aluMRepOnce=0;
            var aluMRepDoce=0;
            var aluMRepTrece=0;
            var aluMRepCatorce=0;
            var aluMRepQuince=0;

            for(var i=0; i< vm.datos_alumnos.length; i++){
                if(vm.datos_alumnos[i].edad === 5){
                    if(vm.datos_alumnos[i].sexo === "H"){
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluHAproCinco++;
                        }else{
                            aluHRepCinco++;
                        }
                    }else{
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluMAproCinco++;
                        }else{
                            aluMRepCinco++;
                        }
                    }
                }

                if(vm.datos_alumnos[i].edad === 6){
                    if(vm.datos_alumnos[i].sexo === "H"){
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluHAproSeis++;
                        }else{
                            aluHRepSeis++;
                        }
                    }else{
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluMAproSeis++;
                        }else{
                            aluMRepSeis++;
                        }
                    }
                }

                if(vm.datos_alumnos[i].edad === 7){
                    if(vm.datos_alumnos[i].sexo === "H"){
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluHAproSiete++;
                        }else{
                            aluHRepSiete++;
                        }
                    }else{
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluMAproSiete++;
                        }else{
                            aluMRepSiete++;
                        }
                    }
                }

                if(vm.datos_alumnos[i].edad === 8){
                    if(vm.datos_alumnos[i].sexo === "H"){
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluHAproOcho++;
                        }else{
                            aluHRepOcho++;
                        }
                    }else{
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluMAproOcho++;
                        }else{
                            aluMRepOcho++;
                        }
                    }
                }

                if(vm.datos_alumnos[i].edad === 9){
                    if(vm.datos_alumnos[i].sexo === "H"){
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluHAproNueve++;
                        }else{
                            aluHRepNueve++;
                        }
                    }else{
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluMAproNueve++;
                        }else{
                            aluMRepNueve++;
                        }
                    }
                }

                if(vm.datos_alumnos[i].edad === 10){
                    if(vm.datos_alumnos[i].sexo === "H"){
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluHAproDiez++;
                        }else{
                            aluHRepDiez++;
                        }
                    }else{
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluMAproDiez++;
                        }else{
                            aluMRepDiez++;
                        }
                    }
                }

                if(vm.datos_alumnos[i].edad === 11){
                    if(vm.datos_alumnos[i].sexo === "H"){
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluHAproOnce++;
                        }else{
                            aluHRepOnce++;
                        }
                    }else{
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluMAproOnce++;
                        }else{
                            aluMRepOnce++;
                        }
                    }
                }

                if(vm.datos_alumnos[i].edad === 12){
                    if(vm.datos_alumnos[i].sexo === "H"){
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluHAproDoce++;
                        }else{
                            aluHRepDoce++;
                        }
                    }else{
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluMAproDoce++;
                        }else{
                            aluMRepDoce++;
                        }
                    }
                }

                if(vm.datos_alumnos[i].edad === 13){
                    if(vm.datos_alumnos[i].sexo === "H"){
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluHAproTrece++;
                        }else{
                            aluHRepTrece++;
                        }
                    }else{
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluMAproTrece++;
                        }else{
                            aluMRepTrece++;
                        }
                    }
                }

                if(vm.datos_alumnos[i].edad === 14){
                    if(vm.datos_alumnos[i].sexo === "H"){
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluHAproCatorce++;
                        }else{
                            aluHRepCatorce++;
                        }
                    }else{
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluMAproCatorce++;
                        }else{
                            aluMRepCatorce++;
                        }
                    }
                }

                if(vm.datos_alumnos[i].edad === 15){
                    if(vm.datos_alumnos[i].sexo === "H"){
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluHAproQuince++;
                        }else{
                            aluHRepQuince++;
                        }
                    }else{
                        if(vm.datos_alumnos[i].promovido === 1){
                            aluMAproQuince++;
                        }else{
                            aluMRepQuince++;
                        }
                    }
                }



            }//for
            console.log(aluHAproSeis);
            
            var datos={
                homApCinco: aluHAproCinco,
                homApSeis: aluHAproSeis,
                homApSiete: aluHAproSiete,
                homApOcho: aluHAproOcho,
                homApNueve: aluHAproNueve,
                homApDiez: aluHAproDiez,
                homApOnce: aluHAproOnce,
                homApDoce: aluHAproDoce,
                homApTrece: aluHAproTrece,
                homApCatorce: aluHAproCatorce,
                homApQuince: aluHAproQuince,
                homApTotal: aluHAproCinco+aluHAproSeis+aluHAproSiete+aluHAproOcho+aluHAproNueve+aluHAproDiez+aluHAproOnce+aluHAproDoce+aluHAproTrece+aluHAproCatorce+aluHAproQuince,

                homReCinco: aluHRepCinco,
                homReSeis: aluHRepSeis,
                homReSiete: aluHRepSiete,
                homReOcho: aluHRepOcho,
                homReNueve: aluHRepNueve,
                homReDiez: aluHRepDiez,
                homReOnce: aluHRepOnce,
                homReDoce: aluHRepDoce,
                homReTrece: aluHRepTrece,
                homReCatorce: aluHRepCatorce,
                homReQuince: aluHRepQuince,
                homReTotal: aluHRepCinco+aluHRepSeis+aluHRepSiete+aluHRepOcho+aluHRepNueve+aluHRepDiez+aluHRepOnce+aluHRepDoce+aluHRepTrece+aluHRepCatorce+aluHRepQuince,

                mujApCinco: aluMAproCinco,
                mujApSeis: aluMAproSeis,
                mujApSiete: aluMAproSiete,
                mujApOcho: aluMAproOcho,
                mujApNueve: aluMAproNueve,
                mujApDiez: aluMAproDiez,
                mujApOnce: aluMAproOnce,
                mujApDoce: aluMAproDoce,
                mujApTrece: aluMAproTrece,
                mujApCatorce: aluMAproCatorce,
                mujApQuince: aluMAproQuince,
                mujApTotal: aluMAproCinco+aluMAproSeis+aluMAproSiete+aluMAproOcho+aluMAproNueve+aluMAproDiez+aluMAproOnce+aluMAproDoce+aluMAproTrece+aluMAproCatorce+aluMAproQuince,


                mujReCinco: aluMRepCinco,
                mujReSeis: aluMRepSeis,
                mujReSiete: aluMRepSiete,
                mujReOcho: aluMRepOcho,
                mujReNueve: aluMRepNueve,
                mujReDiez: aluMRepDiez,
                mujReOnce: aluMRepOnce,
                mujReDoce: aluMRepDoce,
                mujReTrece: aluMRepTrece,
                mujReCatorce: aluMRepCatorce,
                mujReQuince: aluMRepQuince,
                mujReTotal: aluMRepCinco+aluMRepSeis+aluMRepSiete+aluMRepOcho+aluMRepNueve+aluMRepDiez+aluMRepOnce+aluMRepDoce+aluMRepTrece+aluMRepCatorce+aluMRepQuince,

                subtotalApCinco: aluHAproCinco+aluMAproCinco,
                subtotalApSeis: aluHAproSeis+aluMAproSeis,
                subtotalApSiete: aluHAproSiete+aluMAproSiete,
                subtotalApOcho: aluHAproOcho+aluMAproOcho,
                subtotalApNueve: aluHAproNueve+aluMAproNueve,
                subtotalApDiez: aluHAproDiez+aluMAproDiez,
                subtotalApOnce: aluHAproOnce+aluMAproOnce,
                subtotalApDoce: aluHAproDoce+aluMAproDoce,
                subtotalApTrece: aluHAproTrece+aluMAproTrece,
                subtotalApCatorce: aluHAproCatorce+aluMAproCatorce,
                subtotalApQuince: aluHAproQuince+aluMAproQuince,

                subtotalReCinco: aluHRepCinco+aluMRepCinco,
                subtotalReSeis: aluHRepSeis+aluMRepSeis,
                subtotalReSiete: aluHRepSiete+aluMRepSiete,
                subtotalReOcho: aluHRepOcho+aluMRepOcho,
                subtotalReNueve: aluHRepNueve+aluMRepNueve,
                subtotalReDiez: aluHRepDiez+aluMRepDiez,
                subtotalReOnce: aluHRepOnce+aluMRepOnce,
                subtotalReDoce: aluHRepDoce+aluMRepDoce,
                subtotalReTrece: aluHRepTrece+aluMRepTrece,
                subtotalReCatorce: aluHRepCatorce+aluMRepCatorce,
                subtotalReQuince: aluHRepQuince+aluMRepQuince,

                subtotalTotalAp: aluHAproCinco+aluMAproCinco+aluHAproSeis+aluMAproSeis+aluHAproSiete+aluMAproSiete+ aluHAproOcho+aluMAproOcho+aluHAproNueve+aluMAproNueve+aluHAproDiez+aluMAproDiez+aluHAproOnce+aluMAproOnce+aluHAproDoce+aluMAproDoce+aluHAproTrece+aluMAproTrece+aluHAproCatorce+aluMAproCatorce+aluHAproQuince+aluMAproQuince,
                subtotalTotalRe: aluHRepCinco+aluMRepCinco+aluHRepSeis+aluMRepSeis+aluHRepSiete+aluMRepSiete+aluHRepOcho+aluMRepOcho+aluHRepNueve+aluMRepNueve+aluHRepDiez+aluMRepDiez+aluHRepOnce+aluMRepOnce+aluHRepDoce+aluMRepDoce+aluHRepTrece+aluMRepTrece+aluHRepCatorce+aluMRepCatorce+aluHRepQuince+aluMRepQuince
            };

            
            pdf(cabecera, totalAlumnos,f,dias, datos, totalA);
            
        }


        function pdf(cabe, totalAlum,f,dias, datos, totalA) {


            var headers_titulo = [{
                    col_1: {
                        image: 'data:image/png;base64,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',
                        width: 160,
                        height: 75,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_2: {
                        text: ['\nESCUELA PRIMARIA ROSARIO CASTELLANOS\nCLAVE:20DPR3331V\n', {
                            text: cabe.grado,
                            bold: true,
                            fontSize: 12
                        }, '° GRADO GRUPO: ', {
                            text: cabe.grupo,
                            bold: true,
                            fontSize: 12
                        }, '\nCICLO ESCOLAR: ', {
                            text: cabe.ciclo,
                            bold: true,
                            fontSize: 12
                        }, '\n ESTADÍSTICA GRUPAL FINAL'],
                        fontSize: 12,
                        style: 'tableHeader',
                        border: [false, false, false, false],
                        alignment: 'center'
                    },



                    col_3: {
                        image: 'data:image/png;base64,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',
                        width: 100,
                        height: 75,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },

                },


                {
                    col_1: {
                        text: '',
                        style: 'tableHeader',
                        border: [false, false, false, false],
                        alignment: 'center'
                    },
                    col_2: {
                        text: '',
                        style: 'tableHeader',
                        border: [false, false, false, false],
                        alignment: 'center'
                    },
                    col_3: {
                        text: '',
                        style: 'tableHeader',
                        border: [false, false, false, false],
                        alignment: 'center'
                    },

                }, {
                    col_1: {
                        text: '',
                        style: 'tableHeader',
                        border: [false, false, false, false],
                        alignment: 'center'
                    },
                    col_2: {
                        text: '',
                        style: 'tableHeader',
                        border: [false, false, false, false],
                        alignment: 'center'
                    },
                    col_3: {
                        text: '',
                        style: 'tableHeader',
                        border: [false, false, false, false],
                        alignment: 'center'
                    },

                }, {
                    col_1: {
                        text: '',
                        style: 'tableHeader',
                        border: [false, false, false, false],
                        alignment: 'center'
                    },
                    col_2: {
                        text: '',
                        style: 'tableHeader',
                        border: [false, false, false, false],
                        alignment: 'center'
                    },
                    col_3: {
                        text: '',
                        style: 'tableHeader',
                        border: [false, false, false, false],
                        alignment: 'center'
                    },

                }

            ];


            var headers = [

                {
                    col_0: {
                        text: '',
                        fontSize: 8,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_1: {
                        text: 'DATOS',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_2: {
                        text: '5\n AÑOS',
                        fontSize: 8,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_3: {
                        text: '6\n AÑOS',
                        fontSize: 8,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_4: {
                        text: '7\n AÑOS',
                        fontSize: 8,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_5: {
                        text: '8\n AÑOS',
                        fontSize: 8,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_6: {
                        text: '9\n AÑOS',
                        fontSize: 8,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_7: {
                        text: '10\n AÑOS',
                        fontSize: 8,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_8: {
                        text: '11\n AÑOS',
                        fontSize: 8,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_9: {
                        text: '12\n AÑOS',
                        fontSize: 8,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_10: {
                        text: '13\n AÑOS',
                        fontSize: 8,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_11: {
                        text: '14\n AÑOS',
                        fontSize: 8,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_12: {
                        text: '15\n AÑOS',
                        fontSize: 8,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_13: {
                        text: 'TOTAL',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },

                },

                {
                    col_0: {
                        text: 'HOMBRES',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_1: {
                        text: 'INSCRIPCION TOTAL',//nuevo ingreso
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_2: {
                        text: totalAlum.cinco,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_3: {
                        text: totalAlum.seis,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_4: {
                        text: totalAlum.siete,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_5: {
                        text: totalAlum.ocho,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_6: {
                        text: totalAlum.nueve,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_7: {
                        text: totalAlum.diez,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_8: {
                        text: totalAlum.once,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_9: {
                        text: totalAlum.doce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_10: {
                        text: totalAlum.trece,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_11: {
                        text: totalAlum.catorce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_12: {
                        text: totalAlum.quince,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_13: {
                        text: totalAlum.totalHombre,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_1: {
                        text: 'EXISTENCIA',//repetidores
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_2: {
                        text: totalA.cinco,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_3: {
                        text: totalA.seis,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_4: {
                        text: totalA.siete,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_5: {
                        text: totalA.ocho,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_6: {
                        text: totalA.nueve,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_7: {
                        text: totalA.diez,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_8: {
                        text: totalA.once,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_9: {
                        text: totalA.doce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_10: {
                        text: totalA.trece,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_11: {
                        text: totalA.catorce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_12: {
                        text: totalA.quince,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_13: {
                        text: totalA.totalHombre,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_1: {
                        text: 'APROBADOS',//totalH
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    /*col_2:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_3:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_4:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_5:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_6:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_7:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_8:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_9:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_10:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_11:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},
                    col_12:{ text: '', fontSize:10, style: 'tableHeader', alignment: 'center'},*/
                    col_2: {
                        text: [{
                            text: datos.homApCinco,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_3: {
                        text: [{
                            text: datos.homApSeis,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_4: {
                        text: [{
                            text: datos.homApSiete,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_5: {
                        text: [{
                            text: datos.homApOcho,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_6: {
                        text: [{
                            text: datos.homApNueve,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_7: {
                        text: [{
                            text: datos.homApDiez,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_8: {
                        text: [{
                            text: datos.homApOnce,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_9: {
                        text: [{
                            text: datos.homApDoce,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_10: {
                        text: [{
                            text: datos.homApTrece,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_11: {
                        text: [{
                            text: datos.homApCatorce,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_12: {
                        text: [{
                            text: datos.homApQuince,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_13: {
                        text: [{
                            text: datos.homApTotal,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: 'MUJERES',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_1: {
                        text: 'INSCRIPCION TOTAL',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_2: {
                        text: totalAlum.cincoM,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_3: {
                        text: totalAlum.seisM,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_4: {
                        text: totalAlum.sieteM,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_5: {
                        text: totalAlum.ochoM,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_6: {
                        text: totalAlum.nueveM,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_7: {
                        text: totalAlum.diezM,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_8: {
                        text: totalAlum.onceM,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_9: {
                        text: totalAlum.doceM,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_10: {
                        text: totalAlum.treceM,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_11: {
                        text: totalAlum.catorceM,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_12: {
                        text: totalAlum.quinceM,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_13: {
                        text: totalAlum.totalMujer,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_1: {
                        text: 'EXISTENCIA',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_2: {
                        text: totalA.cincoM,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_3: {
                        text: totalA.seisM,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_4: {
                        text: totalA.sieteM,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_5: {
                        text: totalA.ochoM,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_6: {
                        text: totalA.nueveM,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_7: {
                        text: totalA.diezM,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_8: {
                        text: totalA.onceM,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_9: {
                        text: totalA.doceM,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_10: {
                        text: totalA.treceM,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_11: {
                        text: totalA.catorceM,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_12: {
                        text: totalA.quinceM,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_13: {
                        text: totalA.totalMujer,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_1: {
                        text: 'APROBADOS',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_2: {
                        text: [{
                            text: datos.mujApCinco,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_3: {
                        text: [{
                            text: datos.mujApSeis,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_4: {
                        text: [{
                            text: datos.mujApSiete,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_5: {
                        text: [{
                            text: datos.mujApOcho,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_6: {
                        text: [{
                            text: datos.mujApNueve,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_7: {
                        text: [{
                            text: datos.mujApDiez,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_8: {
                        text: [{
                            text: datos.mujApOnce,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_9: {
                        text: [{
                            text: datos.mujApDoce,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_10: {
                        text: [{
                            text: datos.mujApTrece,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_11: {
                        text: [{
                            text: datos.mujApCatorce,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_12: {
                        text: [{
                            text: datos.mujApQuince,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_13: {
                        text: [{
                            text: datos.mujApTotal,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: 'SUBTOTAL',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_1: {
                        text: 'INSCRIPCION TOTAL',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_2: {
                        text: totalAlum.subtotalCinco,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_3: {
                        text: totalAlum.subtotalSeis,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_4: {
                        text: totalAlum.subtotalSiete,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_5: {
                        text: totalAlum.subtotalOcho,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_6: {
                        text: totalAlum.subtotalNueve,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_7: {
                        text: totalAlum.subtotalDiez,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_8: {
                        text: totalAlum.subtotalOnce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_9: {
                        text: totalAlum.subtotalDoce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_10: {
                        text: totalAlum.subtotalTrece,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_11: {
                        text: totalAlum.subtotalCatorce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_12: {
                        text: totalAlum.subtotalQuince,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_13: {
                        text: totalAlum.total,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_1: {
                        text: 'EXISTENCIA',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_2: {
                        text: totalA.subtotalCinco,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_3: {
                        text: totalA.subtotalSeis,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_4: {
                        text: totalA.subtotalSiete,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_5: {
                        text: totalA.subtotalOcho,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_6: {
                        text: totalA.subtotalNueve,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_7: {
                        text: totalA.subtotalDiez,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_8: {
                        text: totalA.subtotalOnce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_9: {
                        text: totalA.subtotalDoce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_10: {
                        text: totalA.subtotalTrece,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_11: {
                        text: totalA.subtotalCatorce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_12: {
                        text: totalA.subtotalQuince,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_13: {
                        text: totalA.subtotalTotal,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_1: {
                        text: 'APROBADOS',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_2: {
                        text: datos.subtotalApCinco,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_3: {
                        text: datos.subtotalApSeis,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_4: {
                        text: datos.subtotalApSiete,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_5: {
                        text: datos.subtotalApOcho,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_6: {
                        text: datos.subtotalApNueve,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_7: {
                        text: datos.subtotalApDiez,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_8: {
                        text: datos.subtotalApOnce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_9: {
                        text: datos.subtotalApDoce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_10: {
                        text: datos.subtotalApTrece,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_11: {
                        text: datos.subtotalApCatorce,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_12: {
                        text: datos.subtotalApQuince,
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_13: {
                        text: [{
                            text: datos.subtotalTotalAp,
                            bold: true,
                            fontSize: 11,
                            alignment: 'center'
                        }]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        colSpan: 11,
                        text: 'FRACC.EL ROSARIO SAN SEBASTIAN TUTLA, OAXACA, A '+ f.getDate().toString() +' DE '+ dias[f.getMonth()]+' DEL '+f.getFullYear().toString(),
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },

                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },

                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },

                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },

                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },

                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        colSpan: 3,
                        text: 'ATENTAMENTE',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        colSpan: 2,
                        text: 'Vo.Bo.',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        colSpan: 3,
                        text: 'EL(LA) MAESTRO(A) DEL GRUPO',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        colSpan: 4,
                        text: 'DIRECTORA DE LA ESCUELA',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },

                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },

                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },

                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },

                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        colSpan: 3,
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, true, false, false]
                    },
                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        colSpan: 4,
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, true, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                }, {
                    col_0: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_1: {
                        colSpan: 3,
                        text: ['PROF.(A) ', {
                            text: cabe.docente,
                            bold: true,
                            fontSize: 12
                        }],
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_2: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_3: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_4: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_5: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_6: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_7: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_8: {
                        colSpan: 4,
                        text: 'L.E.B.NORMA MARTINEZ GALICIA',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_9: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_10: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_11: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_12: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_13: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center',
                        border: [false, false, false, false]
                    },
                    col_14: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    col_15: {
                        text: '',
                        fontSize: 10,
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                },



            ];



            var body = [];
            var body2 = [];


            angular.forEach(headers_titulo, function(header, key) {
                var row2 = new Array();
                row2.push(header.col_1);
                row2.push(header.col_2);
                row2.push(header.col_3);


                body2.push(row2);
            });


            angular.forEach(headers, function(header, key) {
                var row = new Array();
                row.push(header.col_0);
                row.push(header.col_1);
                row.push(header.col_2);
                row.push(header.col_3);
                row.push(header.col_4);
                row.push(header.col_5);
                row.push(header.col_6);
                row.push(header.col_7);
                row.push(header.col_8);
                row.push(header.col_9);
                row.push(header.col_10);
                row.push(header.col_11);
                row.push(header.col_12);
                row.push(header.col_13);

                body.push(row);
            });



            console.log(body);

            var docDefinition = {
                pageMargins: [40, 150, 40, 55],
                pageSize: 'LETTER',
                pageOrientation: 'landscape',
                header: function() {
                    return {
                        //margin: 40,
                        margin: [30, 30, 0, 0],
                        //alignment: 'center',
                        //style: 'tableExample',

                        table: {

                            widths: [160, 450, 70],
                            headerRows: 1,
                            // keepWithHeaderRows: 1,
                            body: body2

                        },

                    }

                },

                footer: function(currentPage, pageCount) {

                    return {
                        text: '-5-\n D.R.©',
                        alignment: 'right',
                        margin: [20, 0, 30, 0]
                    };
                },

                content: [{

                        style: 'tableExample',

                        table: {

                            widths: [90, 90, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
                            headerRows: 1,
                            // keepWithHeaderRows: 1,
                            body: body
                        }
                    },

                ],

                styles: {
                    header: {
                        fontSize: 12,
                        bold: true
                    },
                    subheader: {
                        fontSize: 15,
                        bold: true
                    },
                    quote: {
                        italics: true
                    },
                    small: {
                        fontSize: 8
                    },
                    sta: {
                        fontSize: 11,
                        bold: false,
                        alignment: 'justify'
                    },
                    tableExample: {

                        //widths: [0, 0, 0,100],
                        bold: true,
                        fontSize: 11,
                        color: 'black'
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 8,
                        color: 'black'
                    }
                }
            }

            pdfMake.createPdf(docDefinition).open();



        }


        




    }

})();