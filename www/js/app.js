angular.module('underscore', [])
.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ticketCloud', [
  'ionic',
  'ticketCloud.directives',
  'ticketCloud.controllers',
  'ticketCloud.services',
  'firebase',
  'underscore'
])

.run(function($ionicPlatform,authFactory,$rootScope,authFactory, $state,$ionicActionSheet,$ionicLoading,$timeout,$ionicHistory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    //stateChange event
$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
 
  if (toState.authRequired && authFactory.getAuth().$getAuth() === null){
    $state.go("start");
    event.preventDefault(); 
  }
});

$rootScope.showLogOutMenu = function() {
    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      destructiveText: 'Cerrar sesión',
      titleText: '¿Estas seguro que quieres salir?.',
      cancelText: 'Cancelar',
      destructiveButtonClicked: function(){
              $ionicLoading.show({
                template: 'Cerrando sesion...'
            });
          //Logout en firebase
          authFactory.cerrarSesion();
          //Limpio la cache y history en ionic
          $timeout(function() {
                    $ionicHistory.clearCache();
                    $ionicHistory.clearHistory();
                    $ionicLoading.hide();
                    $state.go('start')
                }, 300);
      }
    });

  };


  });

   
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider


  .state('start', {
    url: "/start",
    cache:false,
    templateUrl: "views/auth/start.html",
    controller: 'StartCtrl'
  })

  .state('crear-cuenta', {
    url: "/crear-cuenta",
    cache:false,
    templateUrl: "views/auth/crear-cuenta.html",
    controller: 'CrearCuentaCtrl'
  })

  .state('login', {
    url: "/login",
    cache:false,
    templateUrl: "views/auth/login.html",
    controller: 'LoginCtrl'
  })


  // APP HOME
  
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'views/app/tabs.html'
  })

  .state('tab.home', {
    url: '/home',
    cache: false,
    authRequired: true,
    views: {
      'tab-home': {
        templateUrl: 'views/app/tab-home.html',
        controller:'HomeCtrl'
      }
    }
  })

  .state('tab.ticket', {
    url: '/ticket',
    cache: false,
    authRequired: true,
    views: {
      'tab-ticket': {
        templateUrl: 'views/app/tab-ticket.html'
      }
    }
  })
  .state('tab.perfil', {
    url: '/perfil',
    authRequired: true,
    cache: false,
    views: {
      'tab-perfil': {
        templateUrl: 'views/app/tab-perfil.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/start');
})

;
