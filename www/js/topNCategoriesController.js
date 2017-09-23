expenseTracker.controller("TopNCategoriesController", function($scope,
   $ionicPlatform,  $ionicPopup, $cordovaSQLite,$stateParams,
   $ionicSideMenuDelegate,$location) {
    $scope.topNCategories = []; 
    $ionicPlatform.ready(function() {  
      $scope.noTopRecords=true;//flag is used to track top categories
      var query = "SELECT t.category_item_name,tc.category_id,t.category_item_price,t.category_item_date FROM tblCategories tc join tblCategoryItems t  on tc.category_id = t.category_id where  (	select count(*) from tblCategoryItems t2 where t2.category_item_price >= t.category_item_price and t2.category_item_date between ? and ? and t2.category_id = t.category_id) <=5 and t.category_item_date between ? and ?";
          $cordovaSQLite.execute(db, query, [$stateParams.fromDate,$stateParams.toDate,$stateParams.fromDate,$stateParams.toDate]).then(function(res) {
           if(res.rows.length > 0) {
               $scope.noTopRecords=false;
                 for(var i = 0; i < res.rows.length; i++) {
                 $scope.topNCategories.push({category_name: res.rows.item(i).category_item_name,
                                             category_price: res.rows.item(i).category_item_price,
                                             category_date:res.rows.item(i).category_item_date});
               }
          }

         });
    });

});
