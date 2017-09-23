expenseTracker.controller("ConfigController",
    function ($scope, $ionicPlatform, $ionicLoading, $location, $ionicHistory,
        $cordovaSQLite, $ionicSideMenuDelegate, $localStorage, $window) {
        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        $ionicPlatform.ready(function () {
            $ionicLoading.show({ template: 'Loading...' });
            $window.localStorage.setItem("count", 0);
            db = $cordovaSQLite.openDB({ name: 'populated2.db', location: 'default' });
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS tblCategories (id integer primary key,category_id integer, category_name text);CREATE INDEX tblCategories_idx ON tblCategories (category_id);");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS tblCategoryItems (id integer primary key, category_item_id integer,category_id integer, category_item_name text,category_item_price integer,category_item_unit integer, category_item_date date);CREATE INDEX tblCategoryItems_idx ON tblCategoryItems (category_item_id);");
            

            $location.path("/categories");
            $ionicLoading.hide();
        });
    });
