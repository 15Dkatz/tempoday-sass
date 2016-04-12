myApp = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase'])
   .constant('FIREBASE_URL', 'https://tempoday.firebaseio.com/');


myApp.run(function($ionicPlatform) {
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




myApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
    // controller: 'ApplicationController'
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsController'
      }
    }
  })

  .state('tab.game', {
      url: '/game',
      views: {
        'tab-game': {
          templateUrl: 'templates/tab-game.html',
          controller: 'GameController'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountController'
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'AccountController'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegistrationController'
  })

  $urlRouterProvider.otherwise('/tab/game');

});

// show error message if incorrect combination of password and username


// Todo:

// change to black-and-orange, giants color-way theme for more intensity

// <!-- fill background of progressBar in tab-workout.html with grey or a picture -->

// add latency for offline capability to maintain exercises for user when they lose connection
// <!-- CREATE CUSTOM LIST --> in build.html
// 
        // <!-- open sidenav bar -->

        // <!-- CREATE CUSTOM Category -->