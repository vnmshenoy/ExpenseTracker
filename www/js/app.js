// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var expenseTracker = angular.module('starter', ['ionic', 'ngCordova']);
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
            controller: 'ListsController'
        })
        // .state('items', {
        //     url: "/items/:listId",
        //     templateUrl: "templates/items.html",
        //     controller: "ItemsController"
        // })
        .state('itemHistory', {
            url: "/itemHistory/:itemId",
            templateUrl: "templates/itemHistory.html",
            controller: "ItemsController"
        });
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


expenseTracker.controller("ListsController", function($scope, $ionicPlatform, $ionicPopup, $cordovaSQLite, $stateParams) {

    $scope.count=1;

    $scope.doRefresh = function() {
      $scope.lists = [];
      var i;
      console.log("Refreshed"+$scope.count);
      $scope.count++
      i=2*$scope.count;
      var query = "SELECT category_id,category_item_id, category_item_name,category_item_price,category_item_date  FROM tblCategoryItems"+
      " where category_id = ? LIMIT "+i;
      $cordovaSQLite.execute(db, query, [$stateParams.categoryId]).then(function(res) {
          if(res.rows.length > 0) {
              for(var i = 0; i < res.rows.length; i++) {
                  $scope.lists.push({id: res.rows.item(i).id, category_id: res.rows.item(i).category_id, category_item_id: res.rows.item(i).category_item_id,category_item_name: res.rows.item(i).category_item_name,
                  category_item_price:res.rows.item(i).category_item_price});
              }
          }
          $scope.$broadcast('scroll.refreshComplete');
      }, function (err) {
          console.error(err);
      });
 };
    $ionicPlatform.ready(function() {
     $scope.lists=[];
      var query = "SELECT  category_id, category_item_id,category_item_name,category_item_price,category_item_date  FROM tblCategoryItems"+
      " where category_id = ? LIMIT "+2;
        $cordovaSQLite.execute(db, query, [$stateParams.categoryId]).then(function(res) {
            if(res.rows.length > 0) {
                for(var i = 0; i < res.rows.length; i++) {
                    $scope.lists.push({id: res.rows.item(i).id, category_id: res.rows.item(i).category_id,category_item_id: res.rows.item(i).category_item_id,category_item_name: res.rows.item(i).category_item_name,
                    category_item_price:res.rows.item(i).category_item_price});
                }
            }
        }, function (err) {
            console.error(err);
        });
    });

    $scope.insert = function() {
      $scope.data = {};
        $ionicPopup.show({
            title: 'Enter a new TODO list',
            templateUrl: "templates/ItemDetails.html",
            scope: $scope,
            buttons: [
               { text: 'Cancel', onTap: function(e) { return true; } },
               {
                 text: '<b>Save</b>',
                 type: 'button-positive',
                 onTap: function(e) {
                   return $scope.data.CategoryItemName;
                 }
               },
             ]
        })
        .then(function(result) {
              var cat_item_id;
              console.log("name"+$scope.data.CategoryItemName+">>"+$scope.data.CategoryItemPrice);
              if(result !== undefined){
                 var query= "select * from  tblCategoryItems ORDER BY category_item_id DESC LIMIT 1";
                 $cordovaSQLite.execute(db, query, []).then(function(res) {
                  if(res.rows.length<=0 && res.rows.category_item_id === undefined) {
                         cat_item_id =  0;
                       } else {
                         console.log(cat_item_id);
                         cat_item_id= ++res.rows[0].category_item_id;
                       }

                      //console.log("tr"+ $scope.data.CategoryItemName);
                     var query = "INSERT INTO tblCategoryItems (category_id, category_item_id,category_item_name,category_item_price,category_item_date) VALUES (?,?,?,?,?)";
                     $cordovaSQLite.execute(db, query, [$stateParams.categoryId, cat_item_id,$scope.data.CategoryItemName,$scope.data.CategoryItemPrice,$scope.data.CategoryItemDate]).then(function(res) {
                        $scope.lists.push({id: res.insertId, category_id: $stateParams.categoryId, category_item_id:cat_item_id,category_item_name: $scope.data.CategoryItemName,category_item_price:$scope.data.CategoryItemPrice,category_item_unit:$scope.data.CategoryItemUnit});
                     }, function (err) {
                             console.error(err);
                      });

                      });
                     } else {
                         console.log("Action not completed");
                     }
  });
}
  //https://codepen.io/VeldMuijz/pen/GJqZqV
  //http://www.chartjs.org/docs/

$scope.showHistory = function() {
console.log("hist");
}
});

expenseTracker.controller("ItemsController", function($scope, $ionicPlatform, $ionicPopup, $cordovaSQLite, $stateParams) {

    $scope.items = [];
});
