expenseTracker.controller("ListController",
function($scope, $ionicPlatform, $ionicLoading, $ionicPopup,
   $ionicHistory, $cordovaSQLite,$stateParams,dateTime,$ionicSideMenuDelegate,$window,dateFilter) {
    $ionicPlatform.ready(function() {
      $scope.count=1;
      $scope.doRefresh = function() {
        $scope.lists = [];
        var i;
        console.log("Refreshed"+$scope.count);
        $scope.count++
        i=2*$scope.count;
        var query = "SELECT category_id,category_item_id, category_item_name,category_item_price,category_item_unit,category_item_date  FROM tblCategoryItems"+
        " where category_id = ? LIMIT "+i;
        $cordovaSQLite.execute(db, query, [$stateParams.categoryId]).then(function(res) {
            if(res.rows.length > 0) {
                for(var i = 0; i < res.rows.length; i++) {
                    $scope.lists.push({id: res.rows.item(i).id, category_id: res.rows.item(i).category_id, category_item_id: res.rows.item(i).category_item_id,category_item_name: res.rows.item(i).category_item_name,
                    category_item_price:res.rows.item(i).category_item_price,category_item_unit:res.rows.item(i).category_item_unit,category_item_date:res.rows.item(i).category_item_date});
                }
            }
            $scope.$broadcast('scroll.refreshComplete');
        }, function (err) {
            console.error(err);
        });
   };
     $scope.lists=[];
      var query = "SELECT  category_id, category_item_id,category_item_name,category_item_price,category_item_unit,category_item_date  FROM tblCategoryItems"+
      " where category_id = ? LIMIT "+2;
        $cordovaSQLite.execute(db, query, [$stateParams.categoryId]).then(function(res) {
            if(res.rows.length > 0) {
                for(var i = 0; i < res.rows.length; i++) {
                    $scope.lists.push({id: res.rows.item(i).id, category_id: res.rows.item(i).category_id,category_item_id: res.rows.item(i).category_item_id,category_item_name: res.rows.item(i).category_item_name,
                    category_item_price:res.rows.item(i).category_item_price,category_item_unit:res.rows.item(i).category_item_unit,category_item_date:res.rows.item(i).category_item_date});
                }
            }
        }, function (err) {
            console.error(err);
        });
    });

    $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  }

    $scope.insert = function() {
      $scope.data = {};
        $ionicPopup.show({
            title: 'Enter a new TODO list',
            templateUrl: "templates/ItemDetails.html",
            scope: $scope,
            buttons: [
               { text: 'Cancel', onTap: function(e) { return true; } },
               {
                 text: '<b>Save</b>',
                 type: 'button-positive',
                 onTap: function(e) {
                   $scope.showErrorPrice=false;
                   $scope.showErrorUnit = false;
                   $scope.showErrorDate = false;
                  if(!$scope.data.CategoryItemPrice){
                  //don't allow the user to submit unless he enters price,units and date
                  e.preventDefault();
                  $scope.showErrorPrice = true;
                }

                if(!$scope.data.CategoryItemUnit){
                  e.preventDefault();
                  $scope.showErrorUnit = true;
                 }

                 if(!$scope.data.CategoryItemDate){
                   e.preventDefault();
                   $scope.showErrorDate = true;
                  }
                  return $scope.data.CategoryItemUnit;
                 }
               },
             ]
        })
        .then(function(result) {
              var cat_item_id;
              console.log("name"+$scope.data.CategoryItemName+">>"+$scope.data.CategoryItemPrice);
              if(result !== undefined){
                 var date=dateTime.parseDate($scope.data.CategoryItemDate);
                 var query= "select * from  tblCategoryItems ORDER BY category_item_id DESC LIMIT 1";
                 $cordovaSQLite.execute(db, query, []).then(function(res) {
                  if(res.rows.length<=0 && res.rows.category_item_id === undefined) {
                         cat_item_id =  0;
                       } else {
                         console.log(cat_item_id);
                         cat_item_id= ++res.rows[0].category_item_id;
                       }
                     var query = "INSERT INTO tblCategoryItems (category_id, category_item_id,category_item_name,category_item_price,category_item_unit,category_item_date) VALUES (?,?,?,?,?,?)";
                     $cordovaSQLite.execute(db, query, [$stateParams.categoryId, cat_item_id,$scope.data.CategoryItemName,$scope.data.CategoryItemPrice,$scope.data.CategoryItemUnit,date]).then(function(res) {
                        $scope.lists.push({id: res.insertId, category_id: $stateParams.categoryId, category_item_id:cat_item_id,category_item_name: $scope.data.CategoryItemName,category_item_price:parseInt($scope.data.CategoryItemPrice,10),category_item_unit:$scope.data.CategoryItemUnit,category_item_date:date});
                     }, function (err) {
                             console.error(err);
                      });

                      });
                     } else {
                         console.log("Action not completed");
                     }
  });
}

$scope.editRecord = function(name,price,unit,date,idOfItem) {

  $scope.data={};
  $scope.data.CategoryItemName=name;
  $scope.data.category_item_id=idOfItem;
  $scope.data.CategoryItemPrice=price;
  $scope.data.CategoryItemUnit=unit;
  //$scope.data.CategoryId=unit;
  //var date1 =new Date(date);
  //var date2= dateTime.parseDate(date1);
  //$scope.data.CategoryItemDate =new Date(date);
  $scope.data.CategoryItemDate =new Date(date);
  $scope.showError = false;

    $ionicPopup.show({
        title: 'Edit The record',
        templateUrl: "templates/ItemDetails.html",
        scope: $scope,
        buttons: [
           { text: 'Cancel', onTap: function(e) { return true; } },
           {
             text: '<b>Save</b>',
             type: 'button-positive',
             onTap: function(e) {
               $scope.showErrorPrice=false;
               $scope.showErrorUnit = false;
               $scope.showErrorDate = false;
            if(isInvalidVal($scope.data.CategoryItemPrice))
              {
              //don't allow the user to submit unless he enters price,units and date
              e.preventDefault();
              $scope.showErrorPrice = true;
            }

            if(isInvalidVal($scope.data.CategoryItemUnit)){
              e.preventDefault();
              $scope.showErrorUnit = true;
             }

             if(isInvalidDate($scope.data.CategoryItemDate)){
               e.preventDefault();
               $scope.showErrorDate = true;
              }
            }
           }
         ]
    })
    .then(function(result) {
          var cat_item_id;
          console.log("name"+$scope.data.CategoryItemName+">>"+$scope.data.CategoryItemPrice);
          var query = "Update tblCategoryItems SET category_item_name = ?,category_item_price=?,category_item_unit = ?,category_item_date=? where category_item_id =?";
          $cordovaSQLite.execute(db, query, [$scope.data.CategoryItemName,$scope.data.CategoryItemPrice,$scope.data.CategoryItemUnit,dateTime.parseDate($scope.data.CategoryItemDate),$scope.data.category_item_id]).then(function(res) {
          console.log("success");
        //  $location.path("/lists/"+idOfItem);
          $window.location.reload();

          }, function (err) {
                  console.error(err);
           });

});
}

function isInvalidVal(val){
    if(!val){
        return true;
      }
        try{
         var regex = /^\d+$/;
         if(!regex.test(val)) //if val  is number then it will be true
          {
           return true;//means "val" is invalid.
         }
         else{
           return false;//means val is valid
         }
      }
      catch(e){
         return true;
       }
}
function isInvalidDate(date){
    if(!date){
        return true;
      }
     var tmpDate= (date.toString().split("GMT+")) ;
      var reg = /^\b[a-zA-Z]{3} [a-zA-Z]{3} [0-9]{2} [0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2}\b$/g;
       if(!reg.test(tmpDate[0].toString().trim())){
         return true;
       }
}
// $scope.isInvalidPrice  =function (){
//      if(!$scope.data.CategoryItemPrice){
//        return true;
//      }
//      console.log(angular.isNumber($scope.data.CategoryItemPrice));
//      if(!angular.isNumber($scope.data.CategoryItemPrice)){
//        return true;
//      }
// }

$scope.showHistory = function() {
console.log("hist");
}

$scope.deleteRecord = function(id) {
  $scope.data = {};
  $scope.data.category_item_id = id;
    $ionicPopup.show({
        title: 'Delete record',
        scope: $scope,
        buttons: [
           { text: 'Cancel', onTap: function(e) { return true; } },
           {
             text: '<b>Save</b>',
             type: 'button-positive',
             onTap: function(e) {
            return true;
            }
           }
         ]
    })
    .then(function(result) {
          var cat_item_id;
          var query = "DELETE from tblCategoryItems where category_item_id =?";
          $cordovaSQLite.execute(db, query, [$scope.data.category_item_id]).then(function(res) {
          $window.location.reload();

          }, function (err) {
                  console.error(err);
           });

});
}
});
