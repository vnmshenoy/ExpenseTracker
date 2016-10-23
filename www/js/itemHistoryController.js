expenseTracker.controller("ItemHistoryController",
function($scope, $ionicPlatform, $ionicLoading, $location, $ionicHistory, $cordovaSQLite,
$stateParams) {
  $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
      });
      $ionicPlatform.ready(function() {
       $scope.itemDetails = [];
        var query = "SELECT  SUM(category_item_price) as cost, strftime('%m', category_item_date) as month"+
        " FROM tblCategoryItems"+
        " where upper(category_item_name) like '%ONION%'"+
        " GROUP BY strftime('%m', category_item_date)";

          $cordovaSQLite.execute(db, query).then(function(res) {
              if(res.rows.length > 0) {
                $scope.itemDetails.push({id: res.rows.item(i).id, cost: res.rows[0].cost,
                  month: res.rows[0].month});

              }
          }, function (err) {
              console.error(err);
          });









        });
      });
