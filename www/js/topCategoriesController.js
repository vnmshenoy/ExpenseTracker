expenseTracker.controller("TopCategoriesController", function($scope,
   $ionicPlatform,  $ionicPopup, $cordovaSQLite,$stateParams,
   $ionicSideMenuDelegate) {
    $scope.topCategories = [];
    $ionicPlatform.ready(function() {
      var query = "SELECT ca.category_id,ca.category_name,ci.category_item_id,"+
      " SUM(ci.category_item_price) as cost from tblCategories ca INNER JOIN tblCategoryItems ci"+
 " WHERE ca.id=ci.category_id GROUP BY ca.id";
        $cordovaSQLite.execute(db, query, []).then(function(res) {
            if(res.rows.length > 0) {
              console.log(res);
                    for(var i = 0; i < res.rows.length; i++) {
              $scope.topCategories.push({id: res.rows.item(i).id, category_id:res.rows.item(i).category_id,category_name: res.rows.item(i).category_name,totalcost: res.rows.item(i).cost});
}
            }
        }, function (err) {
            console.error(err);
        });
    });

    $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  }

});
