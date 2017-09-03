expenseTracker.controller("ItemHistoryController",
  function ($scope, $ionicPlatform, $ionicLoading, $location, $ionicHistory,
    $cordovaSQLite, $stateParams, $ionicSideMenuDelegate) {
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    $ionicPlatform.ready(function () {
      $scope.itemDetails = [];
      var query = "SELECT  SUM(category_item_price) as cost, strftime('%m', category_item_date) as month," +
        " strftime('%Y', category_item_date) as year, category_item_name as catName FROM tblCategoryItems" +
        " where category_item_name LIKE ?" +
        " GROUP BY month,year";
      var chartLabels = [];
      var chartData = [];
      $cordovaSQLite.execute(db, query, ['%' + $stateParams.itemName + '%']).then(function (res) {
        var resultRows = [];
        if (res != null && res != undefined) {
          var item = res.rows['item'];
          if (item != null) {
            for (var i = 0; i < res.rows['length']; i++) {
              var currItem = item(i);
              $scope.itemDetails.push({
                id: currItem.id, name: currItem.catName, cost: currItem.cost,
                month: currItem.month, year: currItem.year
              });
              chartLabels.push(currItem.month + currItem.year);
              chartData.push(currItem.cost);

            }
          }
        }

      }, function (err) {
        console.error(err);
      });

      $scope.labels = chartLabels;
      $scope.data = chartData;
    });
  });
