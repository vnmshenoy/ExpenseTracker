expenseTracker.controller("ListController",
function($scope, $ionicPlatform, $ionicLoading, $ionicPopup,
   $ionicHistory, $cordovaSQLite,$stateParams,dateTime,$ionicSideMenuDelegate) {
    $ionicPlatform.ready(function() {
      $scope.count=1;
      $scope.doRefresh = function() {
        $scope.lists = [];
        var i;
        console.log("Refreshed"+$scope.count);
        $scope.count++
        i=2*$scope.count;
        var query = "SELECT category_id,category_item_id, category_item_name,category_item_price,category_item_date  FROM tblCategoryItems"+
        " where category_id = ? LIMIT "+i;
        $cordovaSQLite.execute(db, query, [$stateParams.categoryId]).then(function(res) {
            if(res.rows.length > 0) {
                for(var i = 0; i < res.rows.length; i++) {
                    $scope.lists.push({id: res.rows.item(i).id, category_id: res.rows.item(i).category_id, category_item_id: res.rows.item(i).category_item_id,category_item_name: res.rows.item(i).category_item_name,
                    category_item_price:res.rows.item(i).category_item_price});
                }
            }
            $scope.$broadcast('scroll.refreshComplete');
        }, function (err) {
            console.error(err);
        });
   };
     $scope.lists=[];
      var query = "SELECT  category_id, category_item_id,category_item_name,category_item_price,category_item_date  FROM tblCategoryItems"+
      " where category_id = ? LIMIT "+2;
        $cordovaSQLite.execute(db, query, [$stateParams.categoryId]).then(function(res) {
            if(res.rows.length > 0) {
                for(var i = 0; i < res.rows.length; i++) {
                    $scope.lists.push({id: res.rows.item(i).id, category_id: res.rows.item(i).category_id,category_item_id: res.rows.item(i).category_item_id,category_item_name: res.rows.item(i).category_item_name,
                    category_item_price:res.rows.item(i).category_item_price});
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
                   return $scope.data.CategoryItemName;
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
                     var query = "INSERT INTO tblCategoryItems (category_id, category_item_id,category_item_name,category_item_price,category_item_date) VALUES (?,?,?,?,?)";
                     $cordovaSQLite.execute(db, query, [$stateParams.categoryId, cat_item_id,$scope.data.CategoryItemName,$scope.data.CategoryItemPrice,date]).then(function(res) {
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
$scope.showHistory = function() {
console.log("hist");
}
});
