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
    templateUrl: "views/auth/auth-login.html",
    controller:"LoginCtrl"
  })

  .state('auth.signup', {
    url: "/signup",
    templateUrl: "views/auth/auth-signup.html"
  })


  
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'views/app/tabs.html'
  })

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'views/app/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  });

  
  $urlRouterProvider.otherwise('/auth/login');

});
