expenseTracker.controller("CategoriesController", function($scope, $ionicPlatform,  $ionicPopup, $cordovaSQLite,$stateParams) {
    $scope.categories = [];
    $ionicPlatform.ready(function() {
        var query = "SELECT id,category_Id, category_name FROM tblCategories";
        $cordovaSQLite.execute(db, query, []).then(function(res) {
            if(res.rows.length > 0) {
                for(var i = 0; i < res.rows.length; i++) {
                    $scope.categories.push({id: res.rows.item(i).id, category_id:res.rows.item(i).category_id,category_name: res.rows.item(i).category_name});
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
          var cat_id;
            if(result !== undefined) {
                 var query= "select * from  tblCategories ORDER BY category_Id DESC LIMIT 1";
                 $cordovaSQLite.execute(db, query, []).then(function(res) {
                     if(res.rows.length <= 0) {
                          cat_id =  0;
                        }  else {
                          cat_id=  ++res.rows[0].category_id;
                       }
                        var queryInsert = "INSERT INTO tblCategories (category_Id, category_name) VALUES (?,?)";
                        $cordovaSQLite.execute(db, queryInsert, [cat_id,result]).then(function(res) {
                            $scope.categories.push({id: res.insertId, category_id: cat_id, category_name: result});
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
