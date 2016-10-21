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
              tx.executeSql("DROP TABLE IF EXISTS tblCategoryItems");
                  tx.executeSql("CREATE TABLE IF NOT EXISTS tblCategories (id integer primary key,  category_id integer, category_name text)");
                  tx.executeSql("CREATE TABLE IF NOT EXISTS tblCategoryItems (id integer primary key, category_item_id integer,category_id integer, category_item_name text,category_item_price integer,category_item_date string)");
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
