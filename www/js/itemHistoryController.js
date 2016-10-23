expenseTracker.controller("ItemHistoryController",
function($scope, $ionicPlatform, $ionicLoading, $location, $ionicHistory, $cordovaSQLite,
$stateParams) {
  $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
      });
      $ionicPlatform.ready(function() {
        var query = "SELECT  * FROM tblCategoryItems"+
        " where upper(category_item_name) like '%ONION%'";
          $cordovaSQLite.execute(db, query).then(function(res) {
              if(res.rows.length > 0) {
                  console.log(res);
              }
          }, function (err) {
              console.error(err);
          });









        });
      });
