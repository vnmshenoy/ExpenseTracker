expenseTracker.controller("CategoriesController", function ($scope,
    $ionicPlatform, $ionicPopup, $cordovaSQLite, $stateParams,
    $ionicSideMenuDelegate, $document, $window, $location) {
    $scope.categories = [];
    $ionicPlatform.ready(function () {
        $window.localStorage.setItem("count", 0);       
        $scope.noCatRecords=true;//flag is used to track categories. If no categories, then hasRecords is false.
        var query = "SELECT id,category_Id, category_name FROM tblCategories";
        $cordovaSQLite.execute(db, query, []).then(function (res) {
            if (res.rows.length > 0) {   $scope.noCatRecords=false;
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.categories.push({ id: res.rows.item(i).id, category_id: res.rows.item(i).category_id, category_name: res.rows.item(i).category_name });
                }
             
            }
            
        }, function (err) {
            console.error(err);
        });


    });

   /* $scope.toggleLeft = function () {
       
        $ionicSideMenuDelegate.toggleLeft();
    }*/
    $scope.navTitle = '<img class="title-image" src="../img/ionic.png" />';
    $scope.insert = function () {
        $ionicPopup.prompt({
            title: 'Enter a Category',
            inputType: 'text'
        })
            .then(function (result) {
                var cat_id;
                if (result !== undefined) {
                    var query = "select id,category_Id, category_name from  tblCategories ORDER BY category_Id DESC LIMIT 1";
                    $cordovaSQLite.execute(db, query).then(function (res) {
                        var l = res.rows['item'];
                        if (res.rows.length <= 0) {
                            cat_id = 1;
                        } else {
                            cat_id = ++l(0).category_id;
                            //cat_id=  ++res.rows[0].category_id;
                        }
                        var queryInsert = "INSERT INTO tblCategories (category_Id, category_name) VALUES (?,?)";
                        $cordovaSQLite.execute(db, queryInsert, [cat_id, result]).then(function (res) {
                            $scope.categories.push({ id: res.insertId, category_id: cat_id, category_name: result });
                            $scope.noCatRecords=false;
                        }, function (err) {
                            console.error(err);
                        });

                    }, function (err) {
                        console.error(err);
                    });

                } else {
                    console.log("Action not completed");
                }
            });
    }

});
