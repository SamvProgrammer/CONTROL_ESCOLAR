(function(){
    'use strict';
    angular
        .module("primariaAngular")
        .factory('validaciones', dataservice);
        function dataservice($http,$q, serviciohistorial, $state){
            var service = {
            solonombres:solonombres,
            solonumeros:solonumeros,
            curpvalida:curpvalida,
            rfcvalido:rfcvalido,  
            emailvalido:emailvalido,
            validarfechs:validarfechs,
            letrasgrupo:letrasgrupo,
            solodirecciones:solodirecciones,
            solocalificaciones:solocalificaciones,
            solohoras:solohoras,
            fechanac:fechanac,
            soloinasistencia:soloinasistencia,
            codigopostalvalida:codigopostalvalida,
            foliovalido:foliovalido,
            insertHistorialUsuario: insertHistorialUsuario,

            };
            return service;
/////////////////para grupos/////////////////
            function letrasgrupo($event){
                 var patron = /[a-z]/;
                 if (tecla==8) return true;

                 var tecla  = String.fromCharCode($event.keyCode);
                    console.log(tecla);
                 return patron.test(tecla);
             
            }

///////////////////para nombres,apellidos//////////
            function solonombres($event){
                 var patron = /[A-Za-záéíóúñÁÉÍÓÚ\s]/;
                 if (tecla==8) return true;

                 var tecla  = String.fromCharCode($event.keyCode);
                    console.log(tecla);
                 return patron.test(tecla);
             
            }

///////////////////para direcciones///////////////////
            function solodirecciones($event){
                 var patron = /[A-Za-záéíóúñÁÉÍÓÚ|0-9\s\.\,\°\#\/]/;
                 if (tecla==8) return true;

                 var tecla  = String.fromCharCode($event.keyCode);
                
                 return patron.test(tecla);
             
            }
            function solonumeros($event){

                 var patron = /[0-9]/;
                 if (tecla==8) return true;

                 var tecla  = String.fromCharCode($event.keyCode);
                  return patron.test(tecla);
                
            }
            function soloinasistencia($event){

                 var patron = /[0-5]/;
                 if (tecla==8) return true;

                 var tecla  = String.fromCharCode($event.keyCode);
                  return patron.test(tecla);
                
            }

            function solohoras($event){

                 var patron = /[1-9]/;
                 if (tecla==8) return true;

                 var tecla  = String.fromCharCode($event.keyCode);
                  return patron.test(tecla);
                
            }

//////////para calificaiones/////////////////////
            function solocalificaciones(valor){
                  console.log(valor);
                 //var patron =/^[5-9]{1}$/;
                 //var patron = /^[5-9]| [5-9][.][0-9]{1} |10$/;
                 var patron = /^[5-9]+([.][0-9]+)?$/;

                  return patron.exec(valor);
                  //return valor;
                
                
            }
            function fechanac(cad){
                 var patron = /^(?:3[01]|[12][0-9]|0?[1-9])([\/.])(0?[1-9]|1[0-2])\1\d{4}$/;
                 
                 return cad.match(patron);
             
            }
            
            /*function validarGrado(numero){

                 var patron = /[1-6]/;
                 

                 //var tecla  = String.fromCharCode(numero);
                  return numero.match(patron);
                
            }*/

            function curpvalida(cadena){
            
                var patron=/^([a-z|A-Z]{1})([aeiou|AEIOU]{1})([a-z|A-Z]{2})([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([hm|HM]{1})(as|AS|bc|BC|bs|BS|cc|CC|cs|CS|ch|CH|cl|CL|cm|CM|df|DF|dg|DG|gt|GT|gr|GR|hg|HG|jc|JC|mc|MC|mn|MN|ms|MS|nt|NT|nl|NL|oc|OC|pl|PL|qt|QT|qr|QR|sp|SP|sl|SL|sr|SR|tc|TC|ts|TS|tl|TL|vz|VZ|yn|YN|zs|ZS|ne|NE)([b|B-df|DF-hj|HJ-np|NP-tv|TV-z|Z]{3})([0-9a-zA-Z]{1})([0-9]{1})$/;
                 //console.log(cadena);
                 //var tecla  = String.fromCharCode($event.keyCode);
                  return cadena.match(patron);
                  //console.log(patron.test(tecla));
            }

            function rfcvalido(cadena){
                //var patron=/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
                var patron = /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$/
                return cadena.match(patron);
            }

            function emailvalido(cadena){
                var patron=/^[a-z|A-Z|0-9\.\-\_]+@+[a-z|A-Z|aeiou|AEIOU]+.+[a-z|A-Z]$/;
                return cadena.match(patron);

            }
            function validarfechs(fecha1, fecha2){
              if(fecha1<fecha2){
                  return true;
              }

            }
            function codigopostalvalida($event){

                 var patron = /^[0]+[0-9]$/;
                 if (tecla==8) return true;

                 var tecla  = String.fromCharCode($event.keyCode);
                  return patron.test(tecla);
                
            }

            function foliovalido(cadena){
                var patron=/^[A-Z0-9]$/;
                return cadena.match(patron);
            }




            function insertHistorialUsuario(accion, curp_usuario, rol_usuario, curp_objetivo, rol_objetivo, objAnterior, objNuevo, direccion, objDireccion) {
            switch (accion) {
                case 'ACTUALIZO':
                    console.log("ENTRO ACTUALIZO");
                    var arreCambiados = [];
                    if (JSON.stringify(objNuevo) !== JSON.stringify(objAnterior)) {
                        angular.forEach(objAnterior, function(value_objA, key_objA) {
                            angular.forEach(objNuevo, function(value_objN, key_objN) {
                                if (key_objA === key_objN && value_objA !== value_objN) {
                                    var objCambiados = {};
                                    objCambiados.campo = key_objA;
                                    objCambiados.valor_anterior = value_objA;
                                    objCambiados.valor_nuevo = value_objN;
                                    arreCambiados.push(objCambiados);
                                }
                            });
                        });
                       
                        angular.forEach(arreCambiados, function(value, key) {
                            serviciohistorial.getIDSyTIPOconCURPS(curp_usuario, rol_usuario, curp_objetivo, rol_objetivo).then(function(dato_a) {
                                serviciohistorial.insertHistorialUsuario(dato_a[0].id_usuario, dato_a[0].tipo_usuario, accion, dato_a[0].id_objetivo, dato_a[0].tipo_objetivo, value.campo, value.valor_anterior, value.valor_nuevo).then(function(data) {}).catch(function(err) {
                                    console.log("error al agregar registro al historial");
                                });
                            }).catch(function(err) {
                                console.log("error al obtener los datos del usuario y objetivo");
                            });

                        });
                    }
                    break;
                case 'REGISTRO':
                    console.log("ENTRO REGISTRO");
                    serviciohistorial.getIDSyTIPOconCURPS(curp_usuario, rol_usuario, curp_objetivo, rol_objetivo).then(function(dato_a) {
                        serviciohistorial.insertHistorialUsuario(dato_a[0].id_usuario, dato_a[0].tipo_usuario, accion, dato_a[0].id_objetivo, dato_a[0].tipo_objetivo, null, null, null).then(function(data) {
                            $state.go(direccion, objDireccion, {
                                reload: true
                            });
                        }).catch(function(err) {
                            console.log("error al agregar registro al historial");
                        });
                    }).catch(function(err) {
                        console.log("error al obtener los datos del usuario y objetivo");
                    });
                    break;
                case 'HABILITO':
                    console.log("ENTRO HABILITO");
                    serviciohistorial.getIDSyTIPOconCURPS(curp_usuario, rol_usuario, curp_objetivo, rol_objetivo).then(function(dato_a) {
                        serviciohistorial.insertHistorialUsuario(dato_a[0].id_usuario, dato_a[0].tipo_usuario, accion, dato_a[0].id_objetivo, dato_a[0].tipo_objetivo, null, null, null).then(function(data) {
                            //console.log(data);
                        }).catch(function(err) {
                            console.log("error al agregar registro al historial");
                        });
                    }).catch(function(err) {
                        console.log("error al obtener los datos del usuario y objetivo");
                    });
                    break;
                case 'INHABILITO':
                    console.log("ENTRO INHABILITO");
                    serviciohistorial.getIDSyTIPOconCURPS(curp_usuario, rol_usuario, curp_objetivo, rol_objetivo).then(function(dato_a) {
                        serviciohistorial.insertHistorialUsuario(dato_a[0].id_usuario, dato_a[0].tipo_usuario, accion, dato_a[0].id_objetivo, dato_a[0].tipo_objetivo, null, null, null).then(function(data) {
                            //console.log(data);
                        }).catch(function(err) {
                            console.log("error al agregar registro al historial");
                        });
                    }).catch(function(err) {
                        console.log("error al obtener los datos del usuario y objetivo");
                    });
                    break;
            }
        }



        }
    })();