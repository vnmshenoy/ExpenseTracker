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
        .state('items', {
            url: "/items/:listId",
            templateUrl: "templates/items.html",
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


expenseTracker.controller("ConfigController", function($scope, $ionicPlatform, $ionicLoading, $location, $ionicHistory, $cordovaSQLite) {
  $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
      });
      $ionicPlatform.ready(function() {
          $ionicLoading.show({ template: 'Loading...' });
          if(window.cordova) {
              window.plugins.sqlDB.copy("populated.db", function() {
                  db = $cordovaSQLite.openDB("populated.db");
                  $location.path("/categories");
                  $ionicLoading.hide();
              }, function(error) {
                  console.error("There was an error copying the database: " + error);
                  db = $cordovaSQLite.openDB("populated.db");
                  $location.path("/categories");
                  $ionicLoading.hide();
              });
          } else {
            //  db = openDatabase("websql.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
              db.transaction(function (tx) {
                  tx.executeSql("DROP TABLE IF EXISTS tblCategories");
                  tx.executeSql("CREATE TABLE IF NOT EXISTS tblCategories (id integer primary key,  category_id integer, category_name text)");
                  tx.executeSql("CREATE TABLE IF NOT EXISTS tblCategoryItems (id integer primary key, category_id integer, category_item_name text,category_item_price integer,category_item_date string)");
                //  tx.executeSql("CREATE TABLE IF NOT EXISTS tblTodoListItems (id integer primary key, todo_list_id integer, todo_list_item_name text)");
                //  tx.executeSql("INSERT INTO tblCategories (category_name) VALUES (?)", ["Shopping"]);
                //  tx.executeSql("INSERT INTO tblCategories (category_name) VALUES (?)", ["Chores"]);
                //  tx.executeSql("INSERT INTO tblCategories (category_name) VALUES (?)", ["School"]);
              });
              $location.path("/categories");
              $ionicLoading.hide();
          }
      });
});

expenseTracker.controller("CategoriesController", function($scope, $ionicPlatform,  $ionicPopup, $cordovaSQLite,$stateParams) {

    $scope.categories = [];

    $ionicPlatform.ready(function() {
        var query = "SELECT id, category_name FROM tblCategories";
        $cordovaSQLite.execute(db, query, []).then(function(res) {
            if(res.rows.length > 0) {
                for(var i = 0; i < res.rows.length; i++) {
                    $scope.categories.push({id: res.rows.item(i).id, category_name: res.rows.item(i).category_name});
                }
            }
        }, function (err) {
            console.error(err);
        });
    });

    $scope.insert = function() {
        $ionicPopup.prompt({
            title: 'Enter a Category',
            inputType: 'text'
        })
        .then(function(result) {
            if(result !== undefined) {
                var query = "INSERT INTO tblCategories (category_id, category_name) VALUES (?,?)";
                $cordovaSQLite.execute(db, query, [$stateParams.categoryId, result]).then(function(res) {
                    $scope.categories.push({id: res.insertId, category_id: $stateParams.categoryId, category_name: result});
                }, function (err) {
                    console.error(err);
                });
            } else {
                console.log("Action not completed");
            }
        });
    }

});

expenseTracker.controller("ListsController", function($scope, $ionicPlatform, $ionicPopup, $cordovaSQLite, $stateParams,ionicDatePicker) {

    $scope.lists = [];
//     var ipObj1 = {
//  callback: function (val) {  //Mandatory
//    console.log('Return value from the datepicker popup is : ' + val, new Date(val));
//  },
//  disabledDates: [            //Optional
//    new Date(2016, 2, 16),
//    new Date(2015, 3, 16),
//    new Date(2015, 4, 16),
//    new Date(2015, 5, 16),
//    new Date('Wednesday, August 12, 2015'),
//    new Date("08-16-2016"),
//    new Date(1439676000000)
//  ],
//  from: new Date(2012, 1, 1), //Optional
//  to: new Date(2016, 10, 30), //Optional
//  inputDate: new Date(),      //Optional
//  mondayFirst: true,          //Optional
//  disableWeekdays: [0],       //Optional
//  closeOnSelect: false,       //Optional
//  templateType: 'popup'       //Optional
// };

    $ionicPlatform.ready(function() {
        var query = "SELECT id, category_id, todo_list_name FROM tblCategoryItems where category_id = ?";
        $cordovaSQLite.execute(db, query, [$stateParams.categoryId]).then(function(res) {
            if(res.rows.length > 0) {
                for(var i = 0; i < res.rows.length; i++) {
                    $scope.lists.push({id: res.rows.item(i).id, category_id: res.rows.item(i).category_id, todo_list_name: res.rows.item(i).todo_list_name});
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

                   return $scope.data.listItemName;
                 }
               },
             ]
        })
        .then(function(result) {
           console.log("name"+$scope.data.listItemName);
            if(result !== undefined) {
        console.log("tr"+ $scope.data.listItemName);
                var query = "INSERT INTO tblCategoryItems (category_id, category_item_name,category_item_price,category_item_date) VALUES (?,?,?,?)";
                $cordovaSQLite.execute(db, query, [$stateParams.categoryId, result]).then(function(res) {
                    $scope.lists.push({id: res.insertId, category_id: $stateParams.categoryId, todo_list_name: result});
                }, function (err) {
                    console.error(err);
                });
            } else {
                console.log("Action not completed");
            }
        });
    }


    // $scope.openDatePicker = function(){
    //   ionicDatePicker.openDatePicker(ipObj1);
    // };

    $scope.delete = function(item) {
    //var outerquery = "DELETE FROM tblTodoListItems where todo_list_id = ?";
    //var innerquery = "DELETE FROM tblTodoLists where id = ?";
    $cordovaSQLite.execute(db, outerquery, [item.id]).then(function(res) {
        $cordovaSQLite.execute(db, innerquery, [item.id]).then(function(res) {
            $scope.lists.splice($scope.lists.indexOf(item), 1);
        });
    }, function (err) {
        console.error(err);
    });
}

});

expenseTracker.controller("ItemsController", function($scope, $ionicPlatform, $ionicPopup, $cordovaSQLite, $stateParams) {

    $scope.items = [];

    $ionicPlatform.ready(function() {
      //  var query = "SELECT id, todo_list_id, todo_list_item_name FROM tblTodoListItems where todo_list_id = ?";
        $cordovaSQLite.execute(db, query, [$stateParams.listId]).then(function(res) {
            if(res.rows.length > 0) {
                for(var i = 0; i < res.rows.length; i++) {
                    $scope.items.push({id: res.rows.item(i).id, todo_list_id: res.rows.item(i).todo_list_id, todo_list_item_name: res.rows.item(i).todo_list_item_name});
                }
            }
        }, function (err) {
            console.error(err);
        });
    });

    $scope.insert = function() {
        $ionicPopup.prompt({
            title: 'Enter a new TODO list',
            inputType: 'text'
        })
        .then(function(result) {
            if(result !== undefined) {
            //    var query = "INSERT INTO tblTodoListItems (todo_list_id, todo_list_item_name) VALUES (?,?)";
                $cordovaSQLite.execute(db, query, [$stateParams.listId, result]).then(function(res) {
                    $scope.items.push({id: res.insertId, todo_list_id: $stateParams.listId, todo_list_item_name: result});
                }, function (err) {
                    console.error(err);
                });
            } else {
                console.log("Action not completed");
            }
        });
    }

    $scope.delete = function(item) {
    var query = "DELETE FROM tblTodoListItems where id = ?";
    $cordovaSQLite.execute(db, query, [item.id]).then(function(res) {
        $scope.items.splice($scope.items.indexOf(item), 1);
    }, function (err) {
        console.error(err);
    });
}

});
