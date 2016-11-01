expenseTracker.controller("OverviewController", function($scope, $ionicPlatform,  $ionicPopup, $cordovaSQLite,$stateParams) {
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

    $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  }

});
