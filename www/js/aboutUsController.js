expenseTracker.controller("AboutUsController", function ($scope,
  $ionicPlatform) {

  $ionicPlatform.ready(function () {
     console.log("in aboutus");
    }, function (err) {
      console.error(err);
    });
  });

