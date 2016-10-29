// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var expenseTracker = angular.module('starter', ['ionic', 'ngCordova','chart.js']);
var db=null;
expenseTracker.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('config', {
            url: '/config',
            templateUrl: 'templates/config.html',
            controller: 'ConfigController'
        })
        .state('categories', {
            url: '/categories',
            templateUrl: 'templates/categories.html',
            controller: 'CategoriesController'
        })
        .state('lists', {
            url: '/lists/:categoryId',
            templateUrl: 'templates/lists.html',
            controller: 'ListController'
        })
        .state('itemHistory', {
            url: '/itemHistory/:itemName',
            templateUrl: 'templates/itemHistory.html',
            controller: 'ItemHistoryController'
        })

        .state('overview', {
          url: '/overview',
          templateUrl: 'templates/overview.html',
          controller: 'ItemHistoryController'
      });;
    $urlRouterProvider.otherwise('/config');
});

expenseTracker.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    db = openDatabase("websql.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
