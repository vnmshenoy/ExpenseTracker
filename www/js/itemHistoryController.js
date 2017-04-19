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

    $scope.labels = ['2006Jan', '2007Jan', '2008Feb','2000Jan', '2001Jan','2002Feb','2003Feb','2004Feb','2005Feb','2009Feb','2010Feb','2011Feb','2012Feb','2013Feb','2014Feb','2015Feb','2016Feb','2017Feb','2018Feb','2019Feb','2020Feb','2021Feb','2022Feb','2023Feb'];
   $scope.data= ['700','980','1220','1280','1100','1212','900','980','1220','1320','1200','1212','700','980','1220','1280','1100','1212','900','980','1220','1320','1200','1212'];
        });
      });
