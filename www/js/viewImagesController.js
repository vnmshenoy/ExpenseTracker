
  expenseTracker.controller("ViewImagesController", function($scope,
    $ionicPlatform, $cordovaSQLite, $stateParams,$window,$location) {
      $ionicPlatform.ready(function() {
        var name = '';
        $scope.im =[];
        console.log('id is'+$stateParams.id);
        var imgs = $window.localStorage.getItem("img"+$stateParams.id);
      //  $scope.im=imgs;
        if((imgs != undefined) && (imgs != null) )
          {
            var a = imgs.split('~,');
            for(var i =0;i<a.length;i++)
                {
                  //  name = imgs[i].substr(imgs[i].lastIndexOf('/') + 1);
                //  var trueOrigin = cordova.file.dataDirectory + name;
                    $scope.im.push(a[i]);

                 }
                 console.log("im"+$scope.im);
      // $location.path("/viewImages");
          }
    });

    $scope.getImage = function(i){
      console.log(i);
      var name = i.substr(i.lastIndexOf('/') + 1);
       var trueOrigin = cordova.file.dataDirectory + name;
       return trueOrigin;
    }
  });
