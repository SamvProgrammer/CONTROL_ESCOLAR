(function() {
    angular
        .module("primariaAngular")
        .config(function ($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $provide, toastrConfig) {
           
        $authProvider.loginUrl = 'http://localhost/Control/Laravel/public/api/autenticar';   
    $stateProvider
      .state('app', {
        abstract: true,
        views: {
          nav: {
            templateUrl: 'vista/nav.html',
            controller: 'AuthController as user'
            
          },
          main: {
            templateUrl: 'main.html'
          }
        }
      })

      .state('app.iniciarSesion', {
          url: '/sesion',
          views: {
            article: {
              templateUrl: 'vista/iniciarSesion.html',
              controller: 'AuthController as user'
            }
          }
        })
      .state('app.restorePassword', {
          url: '/restore_password',
          views: {
            article: {
              templateUrl: 'vista/correo/restorePassword.html',
              controller: 'mail as email'
            }
          }
        })
      .state('app.changePassword', {
          url: '/change_password',
          views: {
            article: {
              templateUrl: 'vista/correo/changePassword.html',
              controller: 'mail as email'
            }
          }
        })
        


      .state('app.persona', {
        url: '/home',
        views: {
            article: {
            templateUrl: 'vista/home.html',
           controller: 'AuthController as user'
          }
        }
      })

      ////////////ALUMNO/////////////////////
        .state('app.alumno', {
        url: '/home',
        abstract: true,
        data: {
          permissions: {
            only: ['ALUMNO'],
            redirectTo: function() {
              return {
                state: 'app.persona',
                options: {
                  reload: true
                }
              };
            }
          }
        }
      })
      .state('app.alumno.verCalificaciones',{
        url: '/calificaciones', 
        views: {
          'article@app': {
            templateUrl: 'vista/alumnos/verCalif.html',
            controller: 'MiCalificacionCtrl as calif'
          }
        }
      })
      

      .state('app.alumno.Horario',{
        url: '/horario', 
        views: {
          'article@app': {
            templateUrl: 'vista/alumnos/horario.html',
            controller: 'MiHorarioCtrl as hc'
          }
        }
      })
     
     

////////////////////////////////DOCENTES///////////////////
      
        .state('app.docente', {
        url: '/home',
        abstract: true,
        data: {
          permissions: {
            only: ['DOCENTE'],
            redirectTo: function() {
              return {
                state: 'app.persona',
                options: {
                  reload: true
                }
              };
            }
          }
        }
      })
        .state('app.docente.mostrarAlumno', {
        url: '/mostrarAlumno',
        views: {
          'article@app': {
            templateUrl: 'vista/alumnos/mostrar.html',
            controller: 'AlumnoCtrl as pc'
          }
        }
      })
      .state('app.docente.agregarAlumno',{
        url: '/agregar', 
        views: {
          'article@app': {
            templateUrl: 'vista/alumnos/agregar.html',
            controller: 'AlumnoCtrl as pc'
          }
        }
      })

      

      .state('app.docente.eliminarAlumno',{
        url: '/eliminar', 
        views: {
          'article@app': {
            templateUrl: 'vista/alumnos/eliminar.html',
            controller: 'AlumnoCtrl as pc'
          }
        }
      })
      .state('app.docente.evaluar',{
        url: '/evaluar', 
        views: {
          'article@app': {
            templateUrl: 'vista/alumnos/evaluar.html',
            controller: 'CalificacionCtrl as ctrl'
          }
        }
      })
      .state('app.docente.lista',{
        url: '/docente/lista', 
        views: {
          'article@app': {
            templateUrl: 'vista/alumnos/mostrar.html',
            controller: 'AlumnoCtrl as pc'
          }
        }
      })

      .state('app.docente.generarEstadistica',{
        url: '/estadistica_inicial', 
        views: {
          'article@app': {
            templateUrl: 'vista/generarEstadistica.html',
            controller: 'AlumnoCtrl as ac'
          }
        }
      })
      .state('app.docente.generarEstadisticaFinal',{
        url: '/estadistica_final', 
        views: {
          'article@app': {
            templateUrl: 'vista/generarEstadisticaF.html',
            controller: 'AlumnoCtrl as ac'
          }
        }
      })

      .state('app.docente.generaHorario',{
        url: '/generar_horario', 
        views: {
          'article@app': {
            templateUrl: 'vista/generaHorario.html',
            controller: 'HorarioCtrl as hc'
          }
        }
      })
     
      .state('app.docente.Horario',{
        url: '/horariodocente', 
        views: {
          'article@app': {
            templateUrl: 'vista/docentes/horario.html',
            controller: 'HorarioCtrl as hc'
          }
        }
      })

      .state('app.docente.boleta',{
        url: '/boleta_docente', 
        views: {
          'article@app': {
            templateUrl: 'vista/alumnos/boleta.html',
            controller: 'BoletaCtrl as bol'
          }
        }
      })

      .state('app.docente.candidatos',{
        url: '/candidatos_a', 
        views: {
          'article@app': {
            templateUrl: 'vista/alumnos/candidatos.html',
            controller: 'CandidatosCtrl as can'
          }
        }
      })
      .state('app.docente.generalistasistencia',{
        url: '/generarlistasistencia', 
        views: {
          'article@app': {
            templateUrl: 'vista/generalistasistencia.html',
            controller: 'DocenteCtrl as pc'
          }
        }
      }) 
      .state('app.docente.nuevos',{
        url: '/lista_promovidos_nuevos', 
        views: {
          'article@app': {
            templateUrl: 'vista/alumnos/nuevos.html',
            controller: 'NuevosCtrl as nv'
          }
        }
      })
      .state('app.docente.copiaboleta1',{
        url: '/copiaboleta1', 
        views: {
          'article@app': {
            templateUrl: 'vista/alumnos/copiaboleta1.html',
            controller: 'BoletaunoCtrl as b1'
          }
        }
      })
      .state('app.docente.copiaboleta2',{
        url: '/copiaboleta2', 
        views: {
          'article@app': {
            templateUrl: 'vista/alumnos/copiaboleta2.html',
            controller: 'BoletadosCtrl as b2'
          }
        }
      })
      .state('app.docente.copiaboleta3',{
        url: '/copiaboleta3', 
        views: {
          'article@app': {
            templateUrl: 'vista/alumnos/copiaboleta3.html',
            controller: 'BoletatresCtrl as b3'
          }
        }
      })
      .state('app.docente.copiaboleta4',{
        url: '/copiaboleta4', 
        views: {
          'article@app': {
            templateUrl: 'vista/alumnos/copiaboleta4.html',
            controller: 'BoletacuatroCtrl as b4'
          }
        }
      })
      .state('app.docente.copiaboleta5',{
        url: '/copiaboleta5', 
        views: {
          'article@app': {
            templateUrl: 'vista/alumnos/copiaboleta5.html',
            controller: 'BoletacincoCtrl as b5'
          }
        }
      })
      .state('app.docente.copiaboleta6',{
        url: '/copiaboleta6', 
        views: {
          'article@app': {
            templateUrl: 'vista/alumnos/copiaboleta6.html',
            controller: 'BoletaseisCtrl as b6'
          }
        }
      })



      //////////////////////MATERIAS/////////////////////
      .state('app.materia', {
        url: '/home',
        views: {
          article: {
            templateUrl: 'vista/home.html',
            //controller: 'UsuarioCtrl as pc'
          }
        }
      })


      .state('app.materia.mostrar', {
        url: '/mostrarMateria',
        views: {
          'article@app': {
            templateUrl: 'vista/materias/mostrar.html',
            controller: 'MateriaCtrl as mc'
          }
        }
      })

      .state('app.materia.agregar',{
        url: '/agregarMateria', 
        views: {
          'article@app': {
            templateUrl: 'vista/materias/agregarMaterias.html',
            controller: 'MateriaCtrl as mc'
          }
        }
      })

      .state('app.materia.buscargrado',{
        url: '/buscarGrado', 
        views: {
          'article@app': {
            templateUrl: 'vista/materias/buscarMateriaGrado.html',
            controller: 'MateriaCtrl as mc'
          }
        }
      })
      .state('app.materia.deleteMateria',{
        url: '/deleteMateria', 
        views: {
          'article@app': {
            templateUrl: 'vista/materias/mostrar.html',
            controller: 'MateriaCtrl as mc'
          }
        }
      })
      



      ////////////////////////DIRECTOR//////////////
      .state('app.director', {
        url: '/home',
        abstract: true,
        data: {
          permissions: {
            only: ['DIRECTOR'],
            redirectTo: function() {
              return {
                state: 'app.persona',
                options: {
                  reload: true
                }
              };
            }
          }
        }
      })


      


       .state('app.director.showAlumno', {
        url: '/director/alumno',
        views: {
          'article@app': {
            templateUrl: 'vista/alumnos/mostrar.html',
            controller: 'AlumnoCtrl as pc'
          }
        }
      })
      .state('app.director.addAlumno',{
        url: '/director/alumno/agregar', 
        views: {
          'article@app': {
            templateUrl: 'vista/alumnos/agregar.html',
            controller: 'AlumnoCtrl as pc'
          }
        }
      })

      .state('app.director.mostrarDocente', {
        url: '/mostrarDocente',
        views: {
          'article@app': {
            templateUrl: 'vista/docentes/mostrar.html',
            controller: 'DocenteCtrl as pc'
          }
        }
      })
      .state('app.director.mostrarDocentesRegistrados', {
        url: '/mostrarDocentesRegistrados',
        views: {
          'article@app': {
            templateUrl: 'vista/docentes/mostrarDocentesRegistrados.html',
            controller: 'DocenteCtrl as pc'
          }
        }
      })

      .state('app.director.agregarDocente', {
        url: '/agregarDocente',
        views: {
          'article@app': {
            templateUrl: 'vista/docentes/agregar.html',
            controller: 'DocenteCtrl as pc'
          }
        }
      })

      
      .state('app.director.eliminarDocente',{
        url: '/eliminarDocente', 
        views: {
          'article@app': {
            templateUrl: 'vista/docentes/eliminar.html',
            controller: 'DocenteCtrl as pc'
          }
        }
      })

          .state('app.director.agregarCurso',{
        url: '/agregarCurso', 
        views: {
          'article@app': {
            templateUrl: 'vista/cursos/agregarCurso.html',
            controller: 'CursoCtrl as cc'
          }
        }
      })
          .state('app.director.mostrarCurso',{
        url: '/mostrarCurso', 
        views: {
          'article@app': {
            templateUrl: 'vista/cursos/mostrarCurso.html',
            controller: 'CursoCtrl as cc'
          }
        }
      })
       
          .state('app.director.agregarGrupo',{
        url: '/agregarGrupo', 
        views: {
          'article@app': {
            templateUrl: 'vista/grupos/agregarGrupo.html',
            controller: 'GrupoCtrl as gc'
          }
        }
      })

      .state('app.director.mostrarGrupo',{
        url: '/mostrarGrupo', 
        views: {
          'article@app': {
            templateUrl: 'vista/grupos/mostrarGrupo.html',
            controller: 'GrupoCtrl as gc'
          }
        }
      })          

      
      .state('app.director.cambiosGrupo',{
        url: '/anuncios', 
        views: {
          'article@app': {
            templateUrl: 'vista/grupos/cambios.html',
            controller: 'AlumnoCtrl as pc'
          }
        }
      })

      .state('app.director.fechasEvaluacion',{
        url: '/fechas_evaluacion', 
        views: {
          'article@app': {
            templateUrl: 'vista/fechasEvaluacion.html',
            controller: 'CalificacionCtrl as fe'
          }
        }
      })

      .state('app.director.cambioCurso',{
        url: '/pasar_año', 
        views: {
          'article@app': {
            templateUrl: 'vista/cambioCurso.html',
            controller: 'CambioCursoCtrl as pa'
          }
        }
      })

      .state('app.director.generarAviso',{
        url: '/genera_aviso', 
        views: {
          'article@app': {
            templateUrl: 'vista/avisos.html',
            controller: 'ApiCtrl as api'
          }
        }
      })

      .state('app.director.asignarGrupo',{
        url: '/asigna_grupo', 
        views: {
          'article@app': {
            templateUrl: 'vista/grupos/asignar.html',
            controller: 'AsignaGpoCtrl as gpo'
          }
        }
      })

      .state('app.director.verBajasAlumnos',{
        url: '/bajas_alumnos', 
        views: {
          'article@app': {
            templateUrl: 'vista/alumnos/bajas.html',
            controller: 'bajasCtrl as bja'
          }
        }
      })

      .state('app.director.verBajasDocentes',{
        url: '/bajas_docentes', 
        views: {
          'article@app': {
            templateUrl: 'vista/docentes/bajas.html',
            controller: 'bajasCtrl as bja'
          }
        }
      })
      .state('app.director.finalizarCurso',{
        url: '/finalizar_curso', 
        views: {
          'article@app': {
            templateUrl: 'vista/cursos/finalizar.html',
            controller: 'CursoCtrl as cc'
          }
        }
      })
      .state('app.director.egresados',{
        url: '/lista_egresados', 
        views: {
          'article@app': {
            templateUrl: 'vista/alumnos/egresados.html',
            controller: 'EgresadosCtrl as egre'
          }
        }
      })
      .state('app.director.egresadospdf',{
        url: '/lista_egresadospdf', 
        views: {
          'article@app': {
            templateUrl: 'vista/alumnos/listaegresados.html',
            controller: 'EgresadosCtrl as egre'
          }
        }
      })
      .state('app.director.estadistica',{
        url: '/ver_estadisticas', 
        views: {
          'article@app': {
            templateUrl: 'vista/estadisticas.html',
            controller: 'EstadisticaCtrl as es'
          }
        }
      })
      .state('app.director.estadisticaFinal',{
        url: '/ver_estadisticasFinal', 
        views: {
          'article@app': {
            templateUrl: 'vista/estadisticasF.html',
            controller: 'EstadisticaCtrl as es'
          }
        }
      })
      .state('app.director.registrarEvaluacion',{
        url: '/registrar_calificaciones', 
        views: {
          'article@app': {
            templateUrl: 'vista/registrarEvaluacion.html',
            controller: 'registroEvalCtrl as re'
          }
        }
      })

      .state('app.director.cambiarAlumno',{
        url: '/cambio_alumno_grupo', 
        views: {
          'article@app': {
            templateUrl: 'vista/cambioCurso.html',
            controller: 'CambioCursoCtrl as cam'
          }
        }
      })
      .state('app.director.estadisticaCiclo',{
        url: '/estadisticas_por_ciclo', 
        views: {
          'article@app': {
            templateUrl: 'vista/estadisticaCiclo.html',
            controller: 'EstadisticaCicloCtrl as es'
          }
        }
      })
      





      ///////////ADMINISTRADOR//////////////
      .state('app.administrador', {
        url: '/home',
        abstract: true,
        data: {
          permissions: {
            only: ['ADMINISTRADOR'],
            redirectTo: function() {
              return {
                state: 'app.persona',
                options: {
                  reload: true
                }
              };
            }
          }
        }
      })


      .state('app.administrador.generarRespaldo',{
        url: '/respaldo', 
        views: {
          'article@app': {
            templateUrl: 'vista/generaRespaldo.html',
            controller: 'DocenteCtrl as dc'
          }
        }
      })
      .state('app.administrador.restaurarRespaldo',{
        url: '/restaurar_respaldo', 
        views: {
          'article@app': {
            templateUrl: 'vista/restaurarRespaldo.html',
            controller: 'DocenteCtrl as dc'
          }
        }
      }) 
      .state('app.administrador.historialMovimientos',{
        url: '/historialMovimientos', 
        views: {
          'article@app': {
            templateUrl: 'vista/historialMovimientos.html',
            controller: 'HistorialCtrl as hs'
          }
        }
      })

      .state('app.administrador.cambiarDirector',{
        url: '/cambio_director', 
        views: {
          'article@app': {
            templateUrl: 'vista/admin/cambioDirector.html',
            controller: 'AsignaDirecCtrl as cam'
          }
        }
      })
      .state('app.administrador.cambiarLogo',{
        url: '/cambiologo', 
        views: {
          'article@app': {
            templateUrl: 'vista/admin/cargaimagenes.html',
            controller: 'AsignaDirecCtrl as cam'
          }
        }
      })

      ///////////EDFISICA//////////////
      .state('app.edfisica', {
        url: '/home',
        abstract: true,
        data: {
          permissions: {
            only: ['EDFISICA'],
            redirectTo: function() {
              return {
                state: 'app.persona',
                options: {
                  reload: true
                }
              };
            }
          }
        }
      })
      .state('app.edfisica.calificar',{
        url: '/calificar_alumnos', 
        views: {
          'article@app': {
            templateUrl: 'vista/calificarEdFisica.html',
            controller: 'EdFisicaCtrl as edf'
          }
        }
      })
      .state('app.edfisica.horario',{
        url: '/ver_horario_edFisica', 
        views: {
          'article@app': {
            templateUrl: 'vista/horarioEdFisica.html',
            controller: 'EdFisicaCtrl as edf'
          }
        }
      })

      



 








       
    $urlRouterProvider.otherwise(function ($injector) {
      var $state = $injector.get('$state');
      $state.go('app.persona');

    });

    angular.extend(toastrConfig, {
    autoDismiss: true,
    containerId: 'toast-container',
    maxOpened: 1,    
    newestOnTop: false,
    positionClass: 'toast-top-center',
    preventDuplicates: false,
    preventOpenDuplicates: true,
    timeOut: 850,
    target: 'body'
  })
  })
 
.run(function(PermRoleStore, $rootScope, $state) {

      PermRoleStore
        .defineRole('DIRECTOR', ['appConf', function(appConf) {
          return appConf.isDirector;
        }])
      PermRoleStore
        .defineRole('DOCENTE', ['appConf', function(appConf) {
          return appConf.isTeacher;
        }])
      PermRoleStore
        .defineRole('ALUMNO', ['appConf', function(appConf) {
          return appConf.isStudent;
        }])
        PermRoleStore
        .defineRole('ADMINISTRADOR', ['appConf', function(appConf) {
          return appConf.isAdmin;
        }])
        PermRoleStore
        .defineRole('EDFISICA', ['appConf', function(appConf) {
          return appConf.isEdFisica;
        }])
    })
.value('appConf', {
      // authenticated : false,
      isAuthorized: false,
      isAdmin: false,
      isDirector: false,
      isTeacher: false,
      isStudent: false,
      isEdFisica: false,
      isCollapsed: true
    })








})();