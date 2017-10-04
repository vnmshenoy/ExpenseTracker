expenseTracker.controller("CategoriesController", function ($scope,
    $ionicPlatform, $ionicPopup, $ionicLoading, $cordovaSQLite, $stateParams,
    $ionicSideMenuDelegate, $document, $window, $location, $timeout) {
    $scope.categories = [];
    var days = $scope.noOfDays;
    $ionicPlatform.ready(function () {
        $window.localStorage.setItem("count", 0);
        if (db == null) {
            db = $cordovaSQLite.openDB({
                name: 'populated2.db',
                location: 'default'
            });
        }
        $scope.infoMessage = false;
        $scope.noCatRecords = true; //flag is used to track categories. If no categories, then hasRecords is false.
        var query = "SELECT id,category_Id, category_name FROM tblCategories";
        $cordovaSQLite.execute(db, query, []).then(function (res) {
            if (res.rows.length > 0) {
                $scope.noCatRecords = false;
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.categories.push({
                        id: res.rows.item(i).id,
                        category_id: res.rows.item(i).category_id,
                        category_name: res.rows.item(i).category_name
                    });
                }

            }

        }, function (err) {
            console.error(err);
        });
    });

    $scope.validateDaysNow = function (ds) {
        $scope.isDaysInValid = false;
        $scope.isDaysInValid = isInvalidVal(ds);
        $scope.showErrorInDaysEntered = $scope.isDaysInValid;
    }
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
                            $scope.categories.push({
                                id: res.insertId,
                                category_id: cat_id,
                                category_name: result
                            });
                            $scope.noCatRecords = false;
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
    $scope.editRecord = function (id, name) {

        $scope.data = {};
        $scope.data.CategoryName = name;
        $scope.data.category_id = id;
        $ionicPopup.show({
                title: 'Edit The record',
                templateUrl: "templates/categoryItemUpdate.html",
                scope: $scope,
                buttons: [
                    {
                        text: 'Cancel',
                        onTap: function (e) {
                            return true;
                        }
                    },
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function (e) {

                        }
                    }
                ]

            })
            .then(function (result) { //http://stackoverflow.com/questions/5233050/how-to-refresh-a-page-with-jquery-by-passing-a-parameter-to-url 

                $ionicLoading.show({
                    template: 'Loading your records.Please wait....',
                    showBackdrop: false
                });
                var cat_id;
                var dd = $scope.data;
                var query = "Update tblCategories SET category_name = ? where category_Id =?";
                $cordovaSQLite.execute(db, query, [dd.CategoryName, dd.category_id]).then(function (res) {
                    $window.location.reload();
                }, function (err) {
                    console.error(err);
                });

            });
    }
    $scope.showInfo = function () {
        $scope.infoMessage = true;
        $timeout(function () {
            $scope.infoMessage = false;
        }, 6500);
    }

    function isInvalidVal(val) {
        if (!val) {
            return false;
        }
        try {
            var regex = /^[\d.]+$/;
            if (!regex.test(val)) //if val  is number then it will be true
            {
                return true; //means "val" is invalid.
            } else {
                return false; //means val is valid
            }
        } catch (e) {
            return true;
        }
    }

});