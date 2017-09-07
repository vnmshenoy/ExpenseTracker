expenseTracker.controller("OverviewController", function ($scope,
  $ionicPlatform, $ionicPopup, $cordovaSQLite, $stateParams, $ionicSideMenuDelegate, $document, dateTime, $location) {
  $scope.categories = [];
  //this line below sees if the left menu is open or not.Ideally, when you click// on any
  //of the links like "Overview" on the left menu,it should close left menu and rt pane should take whole
  //space. In order to do this, we need to handle it on our own
  console.log(angular.element($document[0].body).hasClass('menu-open'));

  $ionicPlatform.ready(function () {
    //$ionicSideMenuDelegate.toggleLeft();
    $ionicSideMenuDelegate.toggleLeft();
    var query = "SELECT id,category_Id, category_name FROM tblCategories";
    $cordovaSQLite.execute(db, query, []).then(function (res) {
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          $scope.categories.push({ id: res.rows.item(i).id, category_id: res.rows.item(i).category_id, category_name: res.rows.item(i).category_name });
        //  $scope.toggleLeft();
        }
      }
    }, function (err) {
      console.error(err);
    });
  });

 /* $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }*/

  $scope.showTopTenAcrossCat = function () {
    $scope.data = {};
    $ionicPopup.show({
      title: 'Enter date range',
      templateUrl: "templates/topTenAcrossCatsPopUp.html",
      scope: $scope,
      buttons: [
        { text: 'Cancel', onTap: function (e) { return true; } },
        {
          text: '<b>Search</b>',
          type: 'button-positive',
          onTap: function (e) {
            return $scope.data.fromDate;
          }
        }
      ]
    }).then(function (result) {
      var cat_item_id;
      var fromDate = dateTime.parseDate($scope.data.fromDate);
      var toDate = dateTime.parseDate($scope.data.toDate);
      $location.path('/topNCategories/' + fromDate + '/' + toDate);
    });
  }
});
