(function() {
    'use strict';
    angular.module("primariaAngular").controller("UsuarioCtrl", UsuarioController);

    function UsuarioController($http, serviciousuario, $scope) {
        var vm = this;
        vm.getUsuarios = getUsuarios;
        vm.getUsuarioById =getUsuarioById;
        vm.agregarUsuario = agregarUsuario;
        vm.listaAlumnos = listaAlumnos;
        vm.login = login;
       
        vm.Init = Init;
        
        vm.datos_usuarios = [];
        vm.nombre = "";
        vm.usuario = {};
        vm.addUsuario={};
        vm.lista={};
        vm.password="";
        vm.mensaje="";
        vm.email="";
       
        Init();
        //getPais();
        function Init() {
            getUsuarios();
            $scope.$on('actualizame', getUsuarios);
        }



        function getUsuarios() {
            serviciousuario.getUsuario().then(function(data) {
                vm.datos_usuarios = data;
                console.log("---------");
                console.log(vm.datos_usuarios);
                console.log("---------");
            }).catch(function(err) {});
        }

        function getUsuarioById(nombre) {//id
            
            serviciousuario.getUsuarioById(nombre).then(function(data) {
                
                vm.usuario = data;
                //console.log(vm.alumno);
            }).catch(function(err) {});
        }

        function agregarUsuario(obj) {
            serviciousuario.addUsuario(obj).then(function(data) {
                vm.addUsuario = data;
                console.log(vm.addUsuario);
            })
        }

        function listaAlumnos(obj) {
            
            console.log(obj);
            
            serviciousuario.listaAlumnos(obj).then(function(data) {
                vm.lista = data;
                console.log(vm.lista);
            })
        }


        function login() {
            console.log(vm.email);
            console.log(vm.password);
           
            var credentials = {
                id: '',
                password: vm.password
            }
        }








    }
})();