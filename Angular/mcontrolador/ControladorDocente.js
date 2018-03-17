(function() {
    angular.module("primariaAngular").controller("DocenteCtrl", DocenteController);

    function DocenteController($http, serviciodocente, servicioalumno, $scope, Flash, $auth,validaciones,  toastr, servicioalugrupo, serviciogrupo, serviciohistorial, serviciocurso) {
        var vm = this;
        vm.alldocentes=alldocentes;
        vm.getDocentes = getDocentes;
        vm.getDocenteByTagName = getDocenteByTagName;
        vm.updateDocente = updateDocente;
        vm.agregarDocente = agregarDocente;
        vm.eliminarDocente = eliminarDocente;
        vm.getDocenteByGrado= getDocenteByGrado;
        vm.getDocenteByGrupo= getDocenteByGrupo;
        vm.getAlumnosByDocente=getAlumnosByDocente;
        vm.eliminarAlumno = eliminarAlumno;
        vm.getAlumnoByTagName=getAlumnoByTagName;
        vm.updateAlumno=updateAlumno;
        vm.getemailDocente=getemailDocente;
        vm.getrfcDocente=getrfcDocente;
        vm.getrfcDocenteactualizar=getrfcDocenteactualizar;
        vm.getemailDocenteactualizar=getemailDocenteactualizar;
        vm.getCursoActual=vm.getCursoActual;
        vm.valida=valida;
        //vm.getUltimosRegistrosIngresados = getUltimosRegistrosIngresados;
        vm.limpiainputs=limpiainputs;
        vm.enviaemail=enviaemail;
        vm.pdf=pdf;
        vm.previoPdf = previoPdf;
        vm.validaFechaNacimiento = validaFechaNacimiento;
        vm.obtenRFCsinHomoclave = obtenRFCsinHomoclave;
        vm.comprobarObtenInfoCodigoPostal=comprobarObtenInfoCodigoPostal;
        //vm.pdf=pdf;
        
        
        vm.Init = Init;
        //Paginacion
        vm.currentPage = 1;
        vm.pageSize = 10;
        vm.q="";
        
        var fNacimiento = {};

        vm.oculta = false;
        vm.advertencia = [];

        vm.datos_docentes = [];
        vm.todos_docentes = [];
        //vm.id;
        vm.docente = {};
        vm.docentegrupo = {};
        vm.docentegrado = {};
        vm.deleteDocente = {};
        vm.addusuario={};
        vm.upDocente={};
        vm.objDocente={};
        vm.docentenombre={};
        vm.lista={};
        vm.alumnosDeGrupo = [];
        $scope.arregloBackups = [];
        $scope.valorRespaldo;
        $scope.restaurarBaseDatos = function(){
            var url = "http://localhost/Control/Laravel/public/api/restaurarBase?ruta="+$scope.valorRespaldo;
            $http.get(url).then(function(response){
                  alert(response.data);
            });
        }

        var local = JSON.parse(localStorage.getItem('perfil'));

        vm.objAlumnoUpdate={};
        vm.registro = [];
        Init();
        //getPais();
        function Init() {
            alldocentes();
            $scope.$on('actualizame',alldocentes);
            getDocentes();
            $scope.$on('actualizame', getDocentes);
            getAlumnosByDocente();
            $scope.$on('actualizame', getAlumnosByDocente);
            getGrupoDocente();
            getCurso();
            getCursoActual();
            //getUltimosRegistrosIngresados();
            //logueado();
            $http.get("/Control/Laravel/public/api/listaBackups").then(function(response){
                $scope.arregloBackups = response.data;
                
        });
        }

        
        function alldocentes() {
            //getUltimosRegistrosIngresados();
            serviciodocente.alldocentes().then(function(data) {
                vm.todos_docentes= data;
                console.log("aqui debenria traer todos mis docentes");
            }).catch(function(err) {});
        }


        function quitaArticulos(palabra) {
        
         return palabra.replace("DEL ", "").replace("LAS ", "").replace("DE ",
                "").replace("LA ", "").replace("Y ", "").replace("A ", "");
        }
    
        function esVocal(letra) {
            if (letra == 'A' || letra == 'E' || letra == 'I' || letra == 'O'
                || letra == 'U' || letra == 'a' || letra == 'e' || letra == 'i'
                || letra == 'o' || letra == 'u'){
            return true;
            }else{
                return false;
            }
        }

        function obtenRFCsinHomoclave(fNacimiento){

            var nombre = vm.objDocente.nombres.toUpperCase();
            var apellidoPaterno = vm.objDocente.apPaterno.toUpperCase();
            var apellidoMaterno = vm.objDocente.apMaterno.toUpperCase();
    
            var rfc = "";
            apellidoPaterno = quitaArticulos(apellidoPaterno);
            apellidoMaterno = quitaArticulos(apellidoMaterno);
            
            rfc += apellidoPaterno.substr(0, 1);
            
            var l = apellidoPaterno.length;
            var c;
                
                for (i = 0; i < l; i++) {
                    c = apellidoPaterno.charAt(i);
                    if (esVocal(c)) {
                        rfc += c;
                        break;
                    }
                }
            rfc += apellidoMaterno.substr(0, 1);
            rfc += nombre.substr(0, 1);
            rfc += fNacimiento.anio;
            rfc +=  fNacimiento.mes;
            rfc += fNacimiento.dia;
            vm.objDocente.rfc = rfc;
            /*
            var formato = ['01','02','03','04','05','06','07','08','09','10','11','12']

                  vm.objDocente.rfc = vm.objDocente.apPaterno[0]+
                                      vm.objDocente.apPaterno[1]+
                                      vm.objDocente.apMaterno[0]+
                                      vm.objDocente.nombres[0]+
                                      fNacimiento.anio+
                                      fNacimiento.mes+
                                      fNacimiento.dia;
                  */

            }

        function validaFechaNacimiento(){
             var msj = validaciones.fechanac(vm.fechaNacimiento);
             
                if(msj){
                  
                    var pre = moment(vm.fechaNacimiento, "DD/MM/YYYY", true);
                   
                        if(pre.isValid()){
                            var fNacimientoFull = moment([pre.get('year'), pre.get('month'), pre.get('date')]);
                            fNacimiento.anio = moment([pre.get('year'), pre.get('month'), pre.get('date')]).format("YY");
                            fNacimiento.mes = moment([pre.get('year'), pre.get('month'), pre.get('date')]).format("MM");
                            fNacimiento.dia = moment([pre.get('year'), pre.get('month'), pre.get('date')]).format("DD");
                            
                            var actual = moment(new Date());
                            var edad =   actual.diff(fNacimientoFull, 'years');
                                if(edad < 23){

                                    swal("Ups!",'Solo se aceptan docentes mayores a 23 años', 'error'); 
                                    //vm.objDocente = {};
                                    //vm.homoclave = "";
                                    vm.fechaNacimiento = "";
                                }else{
                                    obtenRFCsinHomoclave(fNacimiento);   
                                }
                            console.log(edad);
                            
                            
                        }else{
                             swal("Ups!",'Fecha invalida!', 'error');
                             vm.fechaNacimiento = "";
                             vm.objDocente.rfc = "";
                             
                        }   
                      
                }else{
                     swal("Ups!",'Este campo solo permite este formato dd/mm/aaaa!', 'error'); 
                    vm.fechaNacimiento = "";
                    vm.objDocente.rfc = "";
                     
                }
        }
    
        function getDocentes() {
            //getUltimosRegistrosIngresados();
            serviciodocente.getDocente().then(function(data) {
                vm.datos_docentes = data;
                console.log(vm.datos_docentes);
            }).catch(function(err) {});
        }

        function getDocenteByTagName(id) {//busca por ID
            serviciodocente.getDocenteByTagName(id).then(function(data) {
                vm.upDocente = data;
                console.log(vm.upDocente);
            }).catch(function(err) {});
        }

        function getDocenteByGrado(nombre) {
            serviciodocente.getDocenteByGrado(nombre).then(function(data) {
                vm.docentegrado = data;
                console.log(vm.docentegrado);
            }).catch(function(err) {});
        }
        function getDocenteByGrupo(nombre) {
            serviciodocente.getDocenteByGrupo(nombre).then(function(data) {
                vm.docentegrupo = data;
                console.log(vm.docentegrupo);
            }).catch(function(err) {});
        }

        function updateDocente(obj) {
            serviciodocente.updateDocente(obj).then(function(data) {
                
                //vm.upDocente = data;
                console.log("Se actualizo");
                $scope.$emit('actualizame');
                //validaciones.insertHistorialUsuario('ACTUALIZO', local.curp, localS.rol_id, obj.curp,2, data[0], obj);

            })
        }

        function agregarDocente(obj) {
            
             vm.oculta = false;
             vm.advertencia = [];  
             obj.rfc = obj.rfc+vm.homoclave; 
             console.log(obj);

            serviciodocente.addDocente(obj).then(function(data) {
                //var message='Docente <strong> agregado ! </strong> correctamente';
                //var id = Flash.create('success', message, 2500, {class: 'custom-class', id: 'custom-id'}, true);
                
                var aux = data;
                swal("Exito!", "Docente agregado correctamente!", "success");
                vm.objDocente = {};
                vm.homoclave = "";
                vm.codigopostal="";
                enviaemail(aux.email);
                //getUltimosRegistrosIngresados();
                validaciones.insertHistorialUsuario('REGISTRO', local.curp, local.rol_id, obj.rfc, 2, {}, {}, {});
            }).catch(function(err){
                vm.oculta = true;
                vm.advertencia = err;
                 //var message = '<strong>Error!</strong> al agregar';
                 //var id = Flash.create('danger', message, 2500, {class: 'custom-class', id: 'custom-id'}, true);  
                 swal("Ups!", "No has llenado todos los campos", "error");  
                 
        })
           
        }

        function eliminarDocente(obj) {
            console.log(obj);
            serviciogrupo.docenteActivo(obj).then(function(data) {
                vm.activo=data;
                if(vm.activo.length > 0){
                    swal("Ups!","Este docente está asignado a un grupo, no se puede inactivar", "error");
                  

                }else{
                    swal({
                      title: "Este docente no ha sido asignado a un grupo",
                      text: "¿Estas seguro que deseas inactivarlo?",
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    })
                    .then((willDelete) => {
                    if(willDelete){
                            swal("Escribe el motivo por el que se inactivará a este docente", {
                      content: "input",
                    })
                    .then((value) => {
                      var valor=value;
                      serviciodocente.agregarmotivodebaja(valor,obj).then(function(data){
                        console.log(data);
                      });
                       serviciodocente.deleteDocente(obj).then(function(data) {
                        vm.deleteDocente = data;
                        console.log(vm.deleteDocente);
                         $scope.$emit('actualizame');
                         validaciones.insertHistorialUsuario('INHABILITO', local.curp, local.rol_id, obj.rfc, 2, {}, {});
                        swal("Bien!", "Bien Docente inactivado correctamente",{
                        icon:"success",
                        });
                    });
                    });
                    }else{

                    }
                });
                }
            });
        }

        function getAlumnosByDocente() {
           
            serviciodocente.getAlumnosByDocente(local.id).then(function(data) {
                vm.lista = data;
                console.log(vm.lista);
            })
        }

        function getemailDocente($event) {//id
            var msj=validaciones.emailvalido(vm.objDocente.email);
                console.log(vm.objDocente.email);
                if(msj){ 
                    serviciodocente.getemailDocente(vm.objDocente.email).then(function(data) {
                    vm.objDocente.email = " ";
                    swal("Ups!", "Parece que este email ya esta registrado intente con uno diferente", "error");  
                    }).catch(function(err) {});
                }else{
                    vm.objDocente.email = " ";
                    swal("Ups!", "Este email no cumple con el formato requerido: [a-z0-9]@[a-z].[a-z]", "error");  
                    
                }
        }


        function getemailDocenteactualizar($event) {//id
            var msj=validaciones.emailvalido(vm.upDocente.email);
                console.log(vm.upDocente.email);
                if(msj){ 
                    serviciodocente.getemailDocente(vm.upDocente.email).then(function(data) {
                    swal("Ups!", "Parece que este email ya esta registrado intente con uno diferente", "error");
                    }).catch(function(err) {});
                }else{
                    vm.upDocente.email = " ";
                    swal("Ups!", "Este email no cumple con el formato requerido: [a-z0-9]@[a-z].[a-z]", "error");
                }
        }


        function getrfcDocente($event) {//id
            var msj=validaciones.rfcvalido(vm.objDocente.rfc);
            console.log(vm.objDocente.rfc);
            if(msj){
                serviciodocente.getrfcDocente(vm.objDocente.rfc).then(function(data) {
                vm.objDocente.rfc = " ";
                swal("Ups!", "Parece que eL RFC ya esta registrado intente con uno diferente", "error");
            }).catch(function(err) {});

            }else{
                vm.objDocente.rfc = " ";
                swal("Ups!",'Este rfc no cumple con el formato adecuado por favor verifique [a-z][aammdd][az/09]', 'error'); 
            }
            
        }

        function getrfcDocenteactualizar($event) {//id
            var msj=validaciones.rfcvalido(vm.upDocente.rfc);
            console.log(vm.upDocente.rfc);
            if(msj){
                serviciodocente.getrfcDocente(vm.upDocente.rfc).then(function(data) {
                swal("Ups!", "Parece que eL RFC ya esta registrado intente con uno diferente", "error");
            }).catch(function(err) {});

            }else{
                vm.upDocente.rfc = " ";
                swal("Ups!",'Este rfc no cumple con el formato adecuado por favor verifique [a-z][aammdd][az/09]', 'Advertencia');  
            }
            
        }
        
        function eliminarAlumno(obj) {
            servicioalumno.deleteAlumno(obj).then(function(data) {
                vm.deleteAlumno = data;
                validaciones.insertHistorialUsuario('INHABILITO', local.curp, local.rol_id, obj.rfc, 3, {}, {});
                console.log(vm.deleteAlumno);
            })
        }


        function getAlumnoByTagName(nombre) {//id
            console.log(nombre);
            servicioalumno.getAlumnoByTagName(nombre).then(function(data) {
                console.log("entró al método")
                vm.objAlumnoUpdate = data;
                //console.log(vm.alumno);
            }).catch(function(err) {});
        }

        

        function updateAlumno(obj) {
            
            servicioalumno.updateAlumno(obj).then(function(data) {    
                console.log("Se actualizo");
                $scope.$emit('actualizame');
                console.log("algo");
            });
            
        }
        function limpiainputs(){
            vm.objDocente={};
        }

        /*function logueado(){
              vm.id = $auth.getPayload().sub;
              console.log("docente:"+vm.id);
        }*/
        function valida($event, num) {
            console.log(num);

            switch (num) {
                case 1:
                    if (!validaciones.solodirecciones($event)) {
                        $event.preventDefault();
                        swal("Ups!",'Este campo permite letras,acentos,numeros y .,°#/!', 'error');  
                        
                    }

                    break;

                case 2:
                    if (!validaciones.solonumeros($event)) {
                        $event.preventDefault();
                        swal("Ups!",'Este campo solo permite numeros!', 'error'); 
                        
                    }
                    break;
                case 3:
                    if (!validaciones.letrasgrupo($event)) {
                        $event.preventDefault();
                        swal("Ups!",'Este campo solo permite letras!', 'error'); 
                        
                    }
                    break;
                case 4:
                    if (!validaciones.solonombres($event)) {
                        $event.preventDefault();
                        swal("Ups!",'Este campo solo permite letras y espacios!', 'error'); 
                        
                    }
                    break;

            }

        }
        function getGrupoDocente() {
                serviciogrupo.getGrupoDocente(local.id_user).then(function(data) {
                    vm.datos_grupo_docente = data;
                    console.log(vm.datos_grupo_docente);
                    obtenerAlumnos();
                }).catch(function(err) {});
            }

            function obtenerAlumnos() {
           
            servicioalugrupo.obtenerAlumnosDelGrupo(vm.datos_grupo_docente[0].idGrupo).then(function(data) {
                vm.alumnosDeGrupo = data;
                console.log(vm.alumnosDeGrupo);
            })
        }


        /*function getUltimosRegistrosIngresados() {
            console.log("entro a los registros");
            serviciohistorial.getUltimosRegistrosIngresados(local.id_user, 'docente', 'REGISTRO', 48).then(function(data) {
                    console.log("registros");
                    vm.ultimosRegistrosIngresados = data;
                    console.log(vm.ultimosRegistrosIngresados);
                })
                .catch(function(err) {
                    console.log("entro al catch");
                    vm.ultimosRegistrosIngresados = [];
                    console.log(vm.ultimosRegistrosIngresados);
                });
        }*/

        function enviaemail(correo) {
            /////cambiooo
            serviciodocente.enviaemail(correo).then(function(data) {
                console.log("Send email");
                //vm.datos_docentes = data;
            }).catch(function(err) {});
        }
         function getCurso() {
            serviciocurso.getCurso().then(function(data) {
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

        

function previoPdf(){
    vm.logo = {};
    vm.logo2 = {};
    var lista = [];
    var f = new Date();
    var dias=['ENERO', 'FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE', 'DICIEMBRE'];
    var anioI= new Date(vm.datos_Curso[0].anioInicio);
    var anioF= new Date(vm.datos_Curso[0].anioFin);
    var cabecera={
        ciclo: anioI.getFullYear().toString() + "-" + anioF.getFullYear().toString()
    };
    
     servicioalugrupo.getLogo().then(function(data) {
                vm.logo = data;
                /*servicioalugrupo.getLogo2().then(function(data) {
                vm.logo2 = data;*/
                
        serviciodocente.getAlumnosByDocente(local.id_user).then(function(data) {
                lista = data;
                   pdf(lista,dias,f, cabecera);
               
            });
                //}); 
        /*serviciodocente.getAlumnosByDocente(local.id_user).then(function(data) {
                lista = data;
                   pdf(lista,dias,f, cabecera);
               
            });*/
    });     
    
}
function comprobarObtenInfoCodigoPostal(algo) {
           
                        vm.datos_codigoPostal = {};
                        servicioalumno.getInfoCodigoPostal(algo).then(function(data) {
                            vm.datos_codigoPostal = data;
                            //vm.objAlumno.colonia = vm.datos_codigoPostal.colonia;
                            console.log(vm.datos_codigoPostal);
                        });
            
        }

function pdf(arre,dias,f,cabecera){

         var headers = [
                    
                    {
                        col_1:{ text: 'No.', style: 'tableHeader', margin: [0, 2, 0, 0],  alignment: 'center'},
                        col_2:{ text: 'Nombre del alumno', style: 'tableHeader', alignment: 'center', },
                        col_3:{ text: 'L', style: 'tableHeader', alignment: 'center', },
                        col_4:{ text: 'M', style: 'tableHeader', alignment: 'center' },
                        col_5:{ text: 'M', style: 'tableHeader', alignment: 'center'},
                        col_6:{ text: 'J', style: 'tableHeader', alignment: 'center' },
                        col_7:{ text: 'V', style: 'tableHeader', alignment: 'center'},
                        col_8:{ text: 'L', style: 'tableHeader', alignment: 'center', },
                        col_9:{ text: 'M', style: 'tableHeader', alignment: 'center' },
                        col_10:{ text: 'M', style: 'tableHeader', alignment: 'center'},
                        col_11:{ text: 'J', style: 'tableHeader', alignment: 'center' },
                        col_12:{ text: 'V', style: 'tableHeader', alignment: 'center'},
                        col_13:{ text: 'L', style: 'tableHeader', alignment: 'center', },
                        col_14:{ text: 'M', style: 'tableHeader', alignment: 'center' },
                        col_15:{ text: 'M', style: 'tableHeader', alignment: 'center'},
                        col_16:{ text: 'J', style: 'tableHeader', alignment: 'center' },
                        col_17:{ text: 'V', style: 'tableHeader', alignment: 'center'},
                        col_18:{ text: 'L', style: 'tableHeader', alignment: 'center', },
                        col_19:{ text: 'M', style: 'tableHeader', alignment: 'center' },
                        col_20:{ text: 'M', style: 'tableHeader', alignment: 'center'},
                        col_21:{ text: 'J', style: 'tableHeader', alignment: 'center' },
                        col_22:{ text: 'V', style: 'tableHeader', alignment: 'center'},
                        col_23:{ text: 'L', style: 'tableHeader', alignment: 'center', },
                        col_24:{ text: 'M', style: 'tableHeader', alignment: 'center' },
                        col_25:{ text: 'M', style: 'tableHeader', alignment: 'center'},
                        col_26:{ text: 'J', style: 'tableHeader', alignment: 'center' },
                        col_27:{ text: 'V', style: 'tableHeader', alignment: 'center'},
                      
                    }
             
                ];

                var body = [];
          
        angular.forEach(headers, function(header, key) { 
                    var row =  new Array();
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
                        row.push(header.col_14);
                        row.push(header.col_15);  
                        row.push(header.col_16);
                        row.push(header.col_17);
                        row.push(header.col_18);
                        row.push(header.col_19);
                        row.push(header.col_20);
                        row.push(header.col_21);
                        row.push(header.col_22);
                        row.push(header.col_23);
                        row.push(header.col_24);  
                        row.push(header.col_25);
                        row.push(header.col_26);
                        row.push(header.col_27);
                        
                        body.push(row);         
                });
                
                angular.forEach(arre, function(data, key) { 
                    var row =  new Array();
                        row.push(key+1);
                        row.push(data.nombres+' '+data.apPaterno+' '+data.apMaterno);  
                        row.push(" ");
                        row.push(" ");
                        row.push(" ");
                        row.push(" ");
                        row.push(" ");
                        row.push(" ");
                        row.push(" ");
                        row.push(" ");
                        row.push(" ");
                        row.push(" ");
                        row.push(" ");
                        row.push(" ");
                        row.push(" ");
                        row.push(" ");
                        row.push(" ");
                        row.push(" ");
                        row.push(" ");
                        row.push(" ");
                        row.push(" ");
                        row.push(" ");
                        row.push(" ");
                        row.push(" ");
                        row.push(" ");
                        row.push(" ");
                        row.push(" ");
                        
                        body.push(row);         
                });

                
  var dd = {
                        pageMargins: [40,50,40,55],
                        pageSize: 'LETTER', 
                        //pageOrientation: 'landscape',
                        
                    
                        content: [
                             {
           columns:[
                //imagen sep
                [
                {
                  image: vm.logo.base64Izq,
                  width : 140,
                  height: 50, style: 'tableHeader',  alignment: 'left', border: [false, false, false, false] 
                }
                ],
   
                [
                {
                    text: 'SISTEMA EDUCATIVO NACIONAL',fontSize:11,alignment: 'center'                  
                },
                {   
                    width:400,
                      margin: [0, 2, 0, 0], 
                    text:'INSTITUTO ESTATAL DE EDUCACIÓN PÚBLICA DE OAXACA', fontSize:9,alignment: 'center'               
                },
                {
                    text: 'LISTA DE ASISTENCIA DEL MES DE '+dias[f.getMonth()],fontSize:11,alignment: 'center'               
                },
                {
                     margin: [0, 2, 0, 0],
                    text: 'GRADO:'+vm.datos_grupo_docente[0].grado +' GRUPO:'+vm.datos_grupo_docente[0].nombre +'        \nCICLO ESCOLAR:'+cabecera.ciclo, fontSize:9,  style: 'tableHeader', border: [false, false, false, false], alignment: 'center'
                     /*+vm.datos_grupo_docente[0].grado+*/

                },
                {
                    margin: [ -50, 0, -50, 0 ],
                    text: 'PROFESOR(A): '+local.nombre+' '+local.apPaterno+' '+local.apMaterno, fontSize:9,  style: 'tableHeader', border: [false, false, false, false], alignment: 'center'
                }
                ],
                //imagen centenario
                [{ 
                    image: vm.logo.base64Der,
                    width : 90,
                    height: 35, style: 'tableHeader',  alignment: 'right', border: [false, false, false, false]//, rowSpan:4 
                }], 

             ]  
            
            },        
                            
                            {   

                                style: 'tableExample',
                               
                                table: {
                                   
                                    widths: [20,160,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
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
                                fontSize: 8,
                                color: 'black'
                            },
                            tableHeader: {
                                bold: true,
                                fontSize: 8,
                                color: 'black'
                            }
                        }
                }

        pdfMake.createPdf(dd).open();

}


    }
})();