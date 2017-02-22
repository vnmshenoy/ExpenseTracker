expenseTracker.controller("OverviewController", function($scope,
  $ionicPlatform,  $ionicPopup, $cordovaSQLite,$stateParams,$ionicSideMenuDelegate,$document,dateTime) {
    $scope.categories = [];
    //this line below sees if the left menu is open or not.Ideally, when you click// on any
    //of the links like "Overview" on the left menu,it should close left menu and rt pane should take whole
    //space. In order to do this, we need to handle it on our own
    console.log(angular.element($document[0].body).hasClass('menu-open'));

    $ionicPlatform.ready(function() {
      //$ionicSideMenuDelegate.toggleLeft();

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

  $scope.showTopTenAcrossCat = function() {
  $scope.data = {};
    $ionicPopup.show({
        title: 'Enter date range',
        templateUrl: "templates/topTenAcrossCats.html",
        scope: $scope,
        buttons: [
           { text: 'Cancel', onTap: function(e) { return true; } },
           {
             text: '<b>Search</b>',
             type: 'button-positive',
             onTap: function(e) {
              return $scope.data.fromDate;
             }
           }
         ]
    }).then(function(result) {
      var cat_item_id;
      console.log("name"+$scope.data.fromDate+">>"+$scope.data.toDate);

      //if(result !== undefined)
      {
          var fromDate=dateTime.parseDate($scope.data.fromDate);
         var toDate=dateTime.parseDate($scope.data.toDate);

    //  var query="SELECT t.category_item_id, tc.category_id,t.category_item_name,t.category_item_price,t.category_item_date  FROM tblCategories tc join tblCategoryItems t  on tc.category_id = t.category_id where  (select count(*) from tblCategoryItems t2 where t2.category_item_price >= t.category_item_price and t2.category_id = t.category_id ) <=2 and t.category_item_date BETWEEN  '2016-01-01'  AND '2016-06-05' " ;
    var query="SELECT t.category_item_id, tc.category_id,t.category_item_name,t.category_item_price,t.category_item_date  FROM tblCategories tc join tblCategoryItems t  on tc.category_id = t.category_id where  (select count(*) from tblCategoryItems t2 where t2.category_item_price >= t.category_item_price and t2.category_id = t.category_id and t2.category_item_date BETWEEN ' "+fromDate+ " ' AND '"+ toDate +"') <=2" ;


              $cordovaSQLite.execute(db, query, []).then(function(res) {
              console.log("result is"+res);
          });
        }
    });
}
});
