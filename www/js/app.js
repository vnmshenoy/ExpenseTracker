// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var expenseTracker = angular.module('starter', ['ngStorage', 'ionic', 'ngCordova', 'chart.js']);
var db = null;
expenseTracker.config(function ($stateProvider, $urlRouterProvider) {
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
        .state('bills', {
            url: '/bills',
            templateUrl: 'templates/bills.html',
            controller: 'BillsController'
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

        //??
        .state('viewImages', {
            url: '/viewImages/:id',
            templateUrl: 'templates/viewImages.html',
            controller: 'ViewImagesController'
        })


        .state('overview', {
            url: '/overview',
            templateUrl: 'templates/overview.html',
            controller: 'OverviewController'
        })
    
          .state('aboutus', {
            url: '/aboutus',
            templateUrl: 'templates/aboutUs.html',
            controller: 'AboutUsController'
        });
    $urlRouterProvider.otherwise('/config');
});

expenseTracker.run(function ($ionicPlatform, $cordovaSQLite, $location, $ionicLoading) {
    $ionicPlatform.ready(function () {
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }


    });
});
