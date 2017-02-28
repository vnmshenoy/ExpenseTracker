expenseTracker.controller("TopNCategoriesController", function($scope,
   $ionicPlatform,  $ionicPopup, $cordovaSQLite,$stateParams,
   $ionicSideMenuDelegate,$location) {
    $scope.topNCategories = [];

    $ionicPlatform.ready(function() {

      //var query="SELECT t.category_item_id, tc.category_id,t.category_item_name,t.category_item_price,t.category_item_date  FROM tblCategories tc join tblCategoryItems t  on tc.category_id = t.category_id where  (select count(*) from tblCategoryItems t2 where t2.category_item_price >= t.category_item_price and t2.category_id = t.category_id and t2.category_item_date BETWEEN  ' "+fromDate+ " ' AND '"+ toDate +"') <=2" ;
      //var query="SELECT t.category_item_name,t.category_item_price,t.category_item_date  FROM tblCategories tc join tblCategoryItems t  on tc.category_id = t.category_id where  (select count(*) from tblCategoryItems t2 where t2.category_item_price >= t.category_item_price and t2.category_id = t.category_id and t2.category_item_date BETWEEN ?  and ? ) <=2" ;
      var query = "SELECT t.category_item_name,tc.category_id,t.category_item_price,t.category_item_date FROM tblCategories tc join tblCategoryItems t  on tc.category_id = t.category_id where  (	select count(*) from tblCategoryItems t2 	where t2.category_item_price >= t.category_item_price and t2.category_item_date between ? and ? and t2.category_id = t.category_id) <=2 and t.category_item_date between ? and ?";
          $cordovaSQLite.execute(db, query, [$stateParams.fromDate,$stateParams.toDate,$stateParams.fromDate,$stateParams.toDate]).then(function(res) {
           if(res.rows.length > 0) {
             for(var i = 0; i < res.rows.length; i++) {
             $scope.topNCategories.push({category_name: res.rows.item(i).category_item_name,category_price: res.rows.item(i).category_item_price,category_date:res.rows.item(i).category_item_date});
           }
          }

         });
    });

});
