// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var expenseTracker = angular.module('starter', ['ngStorage','ionic', 'ngCordova','chart.js']);
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

        .state('topCategories', {
            url: '/topCategories',
            templateUrl: 'templates/topCategories.html',
            controller: 'TopCategoriesController'
        })


        .state('topNCategories', {
            url: '/topNCategories/:fromDate/:toDate',
            templateUrl: 'templates/topTenAcrossCats.html',
          controller: 'TopNCategoriesController'
        })


        .state('overview', {
          url: '/overview',
          templateUrl: 'templates/overview.html',
          controller: 'OverviewController'
      });
    $urlRouterProvider.otherwise('/config');
});

expenseTracker.run(function($ionicPlatform,$cordovaSQLite, $location,$ionicLoading) {
  $ionicPlatform.ready(function() {
//    document.addEventListener('deviceready', function() {
//    db = window.sqlitePlugin.openDatabase({name: 'populated1.db', location: 'default'});
//   db.transaction(function(tr) {
//
//   $location.path("/categories");
//  $ionicLoading.hide();
//   });
// });
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    
  });
});
