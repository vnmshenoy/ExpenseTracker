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
            var resultRows=[];
              if(res!=null && res!=undefined){
                  resultRows = res.rows;
              }
              if(resultRows.length > 0) {
                for(var i=0;i<resultRows.length;i++){
                  $scope.itemDetails.push({id: resultRows.item(i).id, name:$stateParams.itemName ,cost: resultRows[i].cost,
                    month: resultRows[i].month});

                }
              }
          }, function (err) {
              console.error(err);
          });
        });
      });
