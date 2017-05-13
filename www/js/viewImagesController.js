expenseTracker.controller("ViewImagesController", function($scope,
    $ionicPlatform, $cordovaSQLite, $stateParams,$window,$location) {
      $ionicPlatform.ready(function() {
        var name = '';
        $scope.im =[];
        var imgs = $window.localStorage.getItem("img"+$stateParams.id);
        if((imgs != undefined) && (imgs != null) )
          {
            var a = imgs.split('~,');
            for(var i =0;i<a.length;i++)
                 {
                    $scope.im.push(a[i]);
                 }
          }
    });

    $scope.getImage = function(i){
       var name = i.substr(i.lastIndexOf('/') + 1);
       var trueOrigin = cordova.file.dataDirectory + name;
       return trueOrigin;
    }
  });
