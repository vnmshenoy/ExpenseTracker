expenseTracker.controller("ItemHistoryController",
function($scope, $ionicPlatform, $ionicLoading, $location, $ionicHistory, $cordovaSQLite,
$stateParams) {
  $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
      });
      $ionicPlatform.ready(function() {
       $scope.itemDetails = [];
  //      $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  // $scope.series = ['Series A', 'Series B'];
  //
  // $scope.data = [
  //   [65, 59, 80, 81, 56, 55, 40],
  //   [28, 48, 40, 19, 86, 27, 90]
  // ];

// $scope.labels = ['2006', '2007', '2008'];
//$scope.data=['7','98','122'];
        var query = "SELECT  SUM(category_item_price) as cost, strftime('%m', category_item_date) as month,"+
        " strftime('%Y', category_item_date) as year FROM tblCategoryItems"+
        " where upper(category_item_name) like '%APPLE%'"+
        " GROUP BY month,year";
        var chartLabels=[];
        var chartData=[];
          $cordovaSQLite.execute(db, query).then(function(res) {
            var resultRows=[];

              if(res!=null && res!=undefined){
                  resultRows = res.rows;
              }
              if(resultRows.length > 0) {
                for(var i=0;i<resultRows.length;i++){
                  $scope.itemDetails.push({id: resultRows.item(i).id, name:$stateParams.itemName ,cost: resultRows[i].cost,
                    month: resultRows.item(i).month,year:resultRows.item(i).year});
                   chartLabels.push(resultRows.item(i).month+resultRows.item(i).year);
                   chartData.push(resultRows.item(i).cost);
                }
              }
          }, function (err) {
              console.error(err);
          });
        $scope.labels =chartLabels;
        $scope.data =chartData;

    //   $scope.labels = ['2006Jan', '2007Jan', '2008Feb','2006Jan', '2007Jan', '2008Feb','2006Jan', '2007Jan', '2008Feb','2006Jan', '2007Jan', '2008Feb'];
    //  $scope.data= ['700','980','1220','1280','1100','1212','900','980','1220','1320','1200','1212'];
        });
      });
