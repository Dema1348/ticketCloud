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
  'underscore',
  'angularMoment',
  'ionic-native-transitions',
  'monospaced.elastic'
])

.run(function($ionicPlatform,authFactory,$rootScope,authFactory, $state,$ionicLoading,amMoment) {
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

  amMoment.changeLocale('es');






  });

   
})


.config(function($stateProvider, $urlRouterProvider,$ionicNativeTransitionsProvider) {

   $ionicNativeTransitionsProvider.setDefaultBackTransition({
        type: 'flip',
        direction: 'right'
    });

  $stateProvider


  .state('start', {
    url: "/start",
    cache:false,
     nativeTransitions: {
        "type": "flip",
        "direction": "left"
    },
    templateUrl: "views/auth/start.html",
    controller: 'StartCtrl'
  })

  .state('crear-cuenta', {
    url: "/crear-cuenta",
    cache:false,
     nativeTransitions: {
        "type": "flip",
        "direction": "left"
    },
    templateUrl: "views/auth/crear-cuenta.html",
    controller: 'CrearCuentaCtrl'
  })

  .state('login', {
    url: "/login",
    cache:false,
     nativeTransitions: {
        "type": "flip",
        "direction": "left"
    },
    templateUrl: "views/auth/login.html",
    controller: 'LoginCtrl'
  })


  // APP HOME
  
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'views/app/tabs.html',
    controller:'TabCtrl'
  })

  .state('tab.ticket', {
    url: '/ticket',
    cache: false,
    nativeTransitions: null,
    authRequired: true,
    views: {
      'tab-ticket': {
        templateUrl: 'views/app/tab-ticket.html',
        controller:'TicketCtrl'
      }
    }
  })

  .state('tab.estado', {
    url: '/estado',
    cache: false,
    nativeTransitions: null,
    authRequired: true,
    views: {
      'tab-estado': {
        templateUrl: 'views/app/tab-estado.html',
        controller:'EstadoCtrl'
      }
    }
  })
  .state('tab.perfil', {
    url: '/perfil',
    nativeTransitions: null,
    authRequired: true,
    cache: false,
    views: {
      'tab-perfil': {
        templateUrl: 'views/app/tab-perfil.html',
        controller: 'PerfilCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/start');
})

;
