expenseTracker.controller("TopCategoriesController", function($scope,
   $ionicPlatform,  $ionicPopup, $cordovaSQLite,$stateParams,
   $ionicSideMenuDelegate) {
    $scope.topCategories = [];
    $ionicPlatform.ready(function() {
      var query = "SELECT ca.category_id,ca.category_name,ci.category_item_id,"+
      " SUM(ci.category_item_price) from tblCategories ca INNER JOIN tblCategoryItems ci"+
 " WHERE ca.id=ci.category_id GROUP BY ca.id";
        $cordovaSQLite.execute(db, query, []).then(function(res) {
            if(res.rows.length > 0) {
              console.log(res);
            }
        }, function (err) {
            console.error(err);
        });
    });

    $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  }

});
