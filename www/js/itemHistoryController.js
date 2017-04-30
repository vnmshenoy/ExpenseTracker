expenseTracker.controller("ItemHistoryController",
function($scope, $ionicPlatform, $ionicLoading, $location, $ionicHistory,
   $cordovaSQLite,$stateParams,$ionicSideMenuDelegate) {
  $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
      });
      $ionicPlatform.ready(function() {
       $scope.itemDetails = [];
        var query = "SELECT  SUM(category_item_price) as cost, strftime('%m', category_item_date) as month,"+
        " strftime('%Y', category_item_date) as year, category_item_name as catName FROM tblCategoryItems"+
        " where category_item_name LIKE ?"+
        " GROUP BY month,year";
        var chartLabels=[];
        var chartData=[];
          $cordovaSQLite.execute(db, query,['%'+$stateParams.itemName+'%']).then(function(res) {
             var resultRows=[];
              if(res!=null && res!=undefined){
                var item=res.rows['item'];
                 if(  item!=null){
                   for(var i=0;i<res.rows['length'];i++){
                  //   resultRows.push(res.rows['item'](i));
                  var currItem =item(i);
                  $scope.itemDetails.push({id: currItem.id, name:currItem.catName ,cost: currItem.cost,
                  month: currItem.month,year:currItem.year});
                 chartLabels.push(currItem.month+currItem.year);
                 chartData.push(currItem.cost);

                   }
               }
              }
              // if(resultRows.length > 0) {
              //   for(var i=0;i<resultRows.length;i++){
              //      $scope.itemDetails.push({id: resultRows.id, name:resultRows.catName ,cost: resultRows.cost,
              //      month: resultRows.month,year:resultRows.year});
              //      chartLabels.push(resultRows.month+resultRows.year);
              //      chartData.push(resultRows.cost);
              //   }
              // }
          }, function (err) {
              console.error(err);
          });

    //$scope.labels = ['2006Jan', '2007Jan', '2008Feb','2000Jan', '2001Jan','2002Feb','2003Feb','2004Feb','2005Feb','2009Feb','2010Feb','2011Feb','2012Feb','2013Feb','2014Feb','2015Feb','2016Feb','2017Feb','2018Feb','2019Feb','2020Feb','2021Feb','2022Feb','2023Feb'];
   //$scope.data= ['700','980','1220','1280','1100','1212','900','980','1220','1320','1200','1212','700','980','1220','1280','1100','1212','900','980','1220','1320','1200','1212'];
   $scope.labels =chartLabels;
   $scope.data=chartData;
        });
      });
