expenseTracker.controller("ViewImagesController", function($scope,
    $ionicPlatform, $cordovaSQLite, $stateParams,$window,$location,$ionicPopup) {
      $ionicPlatform.ready(function() {
        var name = '';
        $scope.im =[];      
        var  localStorageId = "img"+$stateParams.id;
        var imgs = $window.localStorage.getItem("img"+$stateParams.id);
        $scope.localStorageId =localStorageId;
        $scope.id =$stateParams.id;;
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
    
    $scope.deleteImg = function(i,im){   
        var current = i;
        var indxToRmv=-1;
        var imArr=im;
           $ionicPopup.confirm({
                title: 'Are you sure you want to delete?'
            })
            .then(function(result) {
               if(result !== undefined) {            
                   for(var j=0;j<imArr.length;j++){
                          if(imArr[j] === current){
                            indxToRmv=j;
                          }
                   }
                   if(indxToRmv >=0){//if any img selected to delete
                        imArr.splice(indxToRmv,1);                       
                        window.localStorage.setItem($scope.localStorageId,imArr);//updated local storage with imArr(delted current //img)
                        $location.path("/viewImages/"+$scope.id);
                   }
                } else {
                   //  alert("in else");
                }
           });   
    }
  });
