angular.module('ticketCloudApp', ['ionic', 
                                  'ticketCloudApp.controllers', 
                                  'ticketCloudApp.services',
                                  'ticketCloudApp.directives',
                                  'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

 
  $stateProvider


  .state('auth', {
    url: "/auth",
    templateUrl: "views/auth/auth.html",
    abstract: true
  })

  .state('auth.login', {
    url: "/login",
    cache: false,
    templateUrl: "views/auth/auth-login.html",
    controller:"LoginCtrl"
  })

  .state('auth.signup', {
    url: "/signup",
    cache: false,
    templateUrl: "views/auth/auth-signup.html",
     controller:"SignupCtrl"
  })


  .state('auth.reset', {
    url: "/reset",
    cache: false,
    templateUrl: "views/auth/auth-reset.html",
     controller:"ResetCtrl"
  })


  
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'views/app/tabs.html',
    controller:"TabCtrl"
  })

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'views/app/tab-home.html'
      }
    }
  })

  .state('tab.ticket', {
    url: '/ticket',
    views: {
      'tab-ticket': {
        templateUrl: 'views/app/tab-ticket.html'
      }
    }
  })
  .state('tab.perfil', {
    url: '/perfil',
    views: {
      'tab-perfil': {
        templateUrl: 'views/app/tab-perfil.html'
      }
    }
  });

  
  $urlRouterProvider.otherwise('/auth/login');

});
