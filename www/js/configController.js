expenseTracker.controller("ConfigController",
function($scope, $ionicPlatform, $ionicLoading, $location, $ionicHistory,
  $cordovaSQLite,$ionicSideMenuDelegate,$localStorage,$window) {
  $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
      });
      $ionicPlatform.ready(function() {
          $ionicLoading.show({ template: 'Loading...' });
          $window.localStorage.setItem("count",0);
        
          db = $cordovaSQLite.openDB({name: 'populated2.db', location: 'default'});
               $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS tblCategories (id integer primary key,  category_id integer, category_name text)");
               $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS tblCategoryItems (id integer primary key, category_item_id integer,category_id integer, category_item_name text,category_item_price integer,category_item_unit integer, category_item_date date)");
               $location.path("/categories");
               $ionicLoading.hide();
//           document.addEventListener('deviceready', function() {
//
//         //    window.plugins.sqlDB.copy("populated1.db", function() {
//
//           db = window.sqlitePlugin.openDatabase({name: 'populated.db', location: 'default'});
//          db.transaction(function(tr) {
//           //  tr.executeSql("DROP TABLE IF EXISTS tblCategories");
//         //    tr.executeSql("DROP TABLE IF EXISTS tblCategoryItems");
//     //  tr.executeSql("CREATE TABLE IF NOT EXISTS tblCategories (id integer primary key,  category_id integer, category_name text)");
//     //  tr.executeSql("CREATE TABLE IF NOT EXISTS tblCategoryItems (id integer primary key, category_item_id integer,category_id integer, category_item_name text,category_item_price integer,category_item_unit integer, category_item_date date)");
//
//     //  tr.executeSql("CREATE TABLE IF NOT EXISTS tblTodoListItems (id integer primary key, todo_list_id integer, todo_list_item_name text)");
//
//
//          $location.path("/categories");
//          $ionicLoading.hide();
//
//          });
//     //   });
//        });
//         /*  window.sqlitePlugin.echoTest(function() {
//     console.log('ECHO test OdfK');
//   });
//           */
//          /* document.addEventListener('deviceready', function() {
//    db = window.sqlitePlugin.openDatabase({name: 'populated1.db', location: 'default'});
//   db.transaction(function(tr) {
//   $location.path("/categories");
//                   $ionicLoading.hide();
//   });
// });*/
//           /*if(window.cordova) {
//               window.plugins.sqlDB.copy("populated.db", function() {
//                   db = $cordovaSQLite.openDB({name:"populated.db",location:'default'});
//                   $location.path("/categories");
//                   $ionicLoading.hide();
//               }, function(error) {
//                   console.error("There was an error copying the database: " + error);
//                   db = $cordovaSQLite.openDB({name:"populated.db",location:'default'});
// //                  db = $cordovaSQLite.openDB("populated.db");
//                   $location.path("/categories");
//                   $ionicLoading.hide();
//               });
//           } else {
//             //  db = openDatabase("websql.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
//                db.transaction(function (tx) {
//             //   tx.executeSql("DROP TABLE IF EXISTS tblCategories");
//             // tx.executeSql("DROP TABLE IF EXISTS tblCategoryItems");
//                tx.executeSql("CREATE TABLE IF NOT EXISTS tblCategories (id integer primary key,  category_id integer, category_name text)");
//                tx.executeSql("CREATE TABLE IF NOT EXISTS tblCategoryItems (id integer primary key, category_item_id integer,category_id integer, category_item_name text,category_item_price integer,category_item_unit integer, category_item_date date)");
//                tx.executeSql("CREATE TABLE IF NOT EXISTS tblTodoListItems (id integer primary key, todo_list_id integer, todo_list_item_name text)");
//             //  tx.executeSql("INSERT INTO tblCategories (category_name) VALUES (?)", ["Shopping"]);
//             //     tx.executeSql("INSERT INTO tblCategories (category_name) VALUES (?)", ["Chores"]);
//               //   tx.executeSql("INSERT INTO tblCategories (category_name) VALUES (?)", ["School"]);
//               });
//               $location.path("/categories");
//               $ionicLoading.hide();
//           }*/
       });
});
