expenseTracker.controller("BillsController", function ($scope,
    $ionicPlatform, $cordovaSQLite, $location, $stateParams, $timeout, $window, $cordovaCamera, $ionicSideMenuDelegate) {
    $ionicPlatform.ready(function () {
        var query = "select * from  tblCategories";
        $scope.imageAddedMessage = false;
        $scope.billCats = [];
        $cordovaSQLite.execute(db, query).then(function (res) {
            var l = res.rows['item'];
            for (var i = 0; i < res.rows['length']; i++) {
                $scope.billCats.push({
                    id: l(i).id,
                    category_id: l(i).category_id,
                    category_name: l(i).category_name
                });
            }
        });
    });
    $scope.addImage = function (id) {
        // 2
        var options = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
        };

        // 3
        $cordovaCamera.getPicture(options).then(function (imageData) {
            // 4
            onImageSuccess(imageData);

            function onImageSuccess(fileURI) {
                createFileEntry(fileURI);
            }

            function createFileEntry(fileURI) {
                window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
            }

            // 5
            function copyFile(fileEntry) {
                var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
                var newName = makeid() + name;

                window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (fileSystem2) {
                        fileEntry.copyTo(
                            fileSystem2,
                            newName,
                            onCopySuccess,
                            fail
                        );
                    },
                    fail);
            }

            // 6
            function onCopySuccess(entry) {
                $timeout(function () {
                    var l = $window.localStorage.getItem("img" + id);
                    var imgs = [];
                    if (l != null && l != undefined) {
                        imgs.push(l + '~');
                    }
                    $scope.$apply(function () {
                        //	$scope.images.push(entry.nativeURL);
                        imgs.push(entry.nativeURL);
                    });
                    $window.localStorage.setItem("img" + id, imgs);
                    $scope.imageAddedMessage = true;
                    $timeout(function () {
                        $scope.imageAddedMessage = false;
                    }, 3000);

                    //  window.localStorage.setItem("imgUrls", JSON.stringify(imgs));
                })

            }

            function fail(error) {
                console.log("fail: " + error.code);
            }

            function makeid() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for (var i = 0; i < 5; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
            }

        }, function (err) {
            console.log(err);
        });
    };
    $scope.viewImages = function (id) {
        $location.path("/viewImages/" + id);
    }
    $scope.urlForImage = function (id) {
        var name = '';
        var imgs = $window.localStorage.getItem("img" + id);
        if ((imgs == undefined) || (imgs == null)) {
            console.log(imgs);
        } else {
            //  name = imageName.substr(imageName.lastIndexOf('/') + 1);
        }
        var trueOrigin = cordova.file.dataDirectory + name;
        $scope.images.push(trueOrigin);
        $location.path("/viewImages");
        return trueOrigin;
    }

});