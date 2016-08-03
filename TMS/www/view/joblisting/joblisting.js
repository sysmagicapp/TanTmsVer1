'use strict';
app.controller('JoblistingListCtrl', ['ENV', '$scope', '$state', '$ionicLoading', '$ionicPopup', '$ionicFilterBar', '$ionicActionSheet', 'ApiService', '$ionicPlatform', '$cordovaSQLite', 'SqlService',
    function (ENV, $scope, $state, $ionicLoading, $ionicPopup, $ionicFilterBar, $ionicActionSheet, ApiService, $ionicPlatform, $cordovaSQLite, SqlService) {
        var filterBarInstance = null;

        var dataResults = new Array();
        var jobs = [{
            TrxNo: 1,
            bookingno: 2,

        }];
        dataResults = dataResults.concat(jobs);
        $scope.jobs = dataResults;

        $scope.returnMain = function () {
            $state.go('index.login', {}, {
                reload: true
            });
        };

        $scope.returnMain = function () {
            $state.go('index.main', {}, {
                reload: true
            });
        };

        $scope.showFilterBar = function () {
            filterBarInstance = $ionicFilterBar.show({
                items: $scope.jobs,
                expression: function (filterText, value, index, array) {
                    return value.bookingno.indexOf(filterText) > -1;
                },
                //filterProperties: ['bookingno'],
                update: function (filteredItems, filterText) {
                    $scope.jobs = filteredItems;
                    if (filterText) {
                        console.log(filterText);
                    }
                }
            });
        };

        $scope.refreshItems = function () {
            if (filterBarInstance) {
                filterBarInstance();
                filterBarInstance = null;
            }
            $timeout(function () {
                $scope.$broadcast('scroll.refreshComplete');
            }, 1000);
        };

        $scope.gotoDetail = function (job) {
            $state.go('jobListingDetail', {}, {
                reload: true
            });
        };
    }
]);

app.controller('JoblistingDetailCtrl', ['ENV', '$scope', '$state', '$ionicActionSheet', '$cordovaSms', '$stateParams', 'ApiService', '$cordovaSQLite', '$ionicPlatform', '$ionicPopup', '$ionicModal', '$ionicLoading', '$cordovaCamera', '$cordovaBarcodeScanner', '$cordovaImagePicker', '$cordovaFile', '$cordovaFileTransfer', '$cordovaNetwork', 'SqlService', 'PopupService',
    function (ENV, $scope, $state, $ionicActionSheet, $cordovaSms, $stateParams, ApiService, $cordovaSQLite, $ionicPlatform, $ionicPopup, $ionicModal, $ionicLoading, $cordovaCamera, $cordovaBarcodeScanner, $cordovaImagePicker, $cordovaFile, $cordovaFileTransfer, $cordovaNetwork, SqlService, PopupService) {
        var canvas = null,
            context = null;
        $scope.capture = null;
        $scope.modal_camera = null;

        var showCamera = function (type) {
            $ionicLoading.show();
            var sourceType = Camera.PictureSourceType.CAMERA;
            if (is.equal(type, 1)) {
                sourceType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
            }
            var options = {
                quality: 100,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: sourceType,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                //targetWidth: 768,
                //targetHeight: 1024,
                mediaType: Camera.MediaType.PICTURE,
                cameraDirection: Camera.Direction.BACK,
                //popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY),
                saveToPhotoAlbum: true
                    //correctOrientation:true
            };
            try {
                $cordovaCamera.getPicture(options).then(function (imageUri) {
                    var uri = '';
                    // var uri = ApiService.Uri(true, '/api/tms/upload/img');
                    //  uri.addSearch('BookingNo', $scope.Detail.csbk1.BookingNo)
                    var url = ApiService.Url(uri);
                    var filePath = imageUri,
                        trustHosts = true,
                        options = {
                            fileName: moment().format('YYYY-MM-DD-HH-mm-ss').toString() + '.jpg'
                        };
                    $cordovaFileTransfer.upload(url, filePath, options, trustHosts)
                        .then(function (result) {
                            $ionicLoading.hide();
                            PopupService.Info(null, 'Upload Successfully');
                        }, function (err) {
                            $ionicLoading.hide();
                            console.error(err);
                            PopupService.Alert(null, err.message);
                        }, function (progress) {});
                }, function (err) {
                    $ionicLoading.hide();
                });
            } catch (e) {
                $ionicLoading.hide();
                console.error(e);
            }
        };

        $scope.myChannel = {
            // the fields below are all optional
            videoHeight: 480,
            videoWidth: 320,
            video: null // Will reference the video element on success
        };
        $ionicModal.fromTemplateUrl('camera.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal_camera = modal;
        });
        $scope.$on('$destroy', function () {
            if (is.not.null($scope.modal_camera)) {
                $scope.modal_camera.remove();
            }
        });
        $scope.takePhoto = function () {
            var video = document.getElementById('videoS');
            context.drawImage(video, 0, 0, 320, 480);
            $scope.capture = canvas.toDataURL();
        };
        $scope.reCapture = function () {
            context.clearRect(0, 0, 320, 480);
            $scope.capture = null;
        };
        $scope.showGoogleMaps = function () {
            $state.go('googleMaps', {}, {});
        }
        $scope.uploadPhoto = function () {
            var jsonData = {
                'Base64': $scope.capture,
                'FileName': moment().format('YYYY-MM-DD-HH-mm-ss').toString() + '.jpg'
            };
            var objUri = '';
            PopupService.Info(null, 'Upload Successfully', '').then(function () {
                $scope.closeModal();

            });
        };

        $scope.showActionSheet = function () {
            var actionSheet = $ionicActionSheet.show({
                buttons: [{
                    text: 'Camera'
                }, {
                    text: 'From Gallery'
                }],
                //destructiveText: 'Delete',
                titleText: 'Select Picture',
                cancelText: 'Cancel',
                cancel: function () {
                    // add cancel code..
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        if (!ENV.fromWeb) {
                            showCamera(0);
                        } else {
                            $scope.modal_camera.show();
                            canvas = document.getElementById('canvas1');
                            context = canvas.getContext('2d');
                            $scope.reCapture();
                        }
                    } else if (index === 1) {
                        if (!ENV.fromWeb) {
                            showCamera(1);

                        } else {
                            $state.go('upload', {
                                // 'BookingNo': $scope.Detail.csbk1.BookingNo,
                                // 'JobNo': 1
                            }, {});
                        }
                    }
                    return true;
                }
            });
        };

        $scope.closeModal = function () {
            $scope.modal_camera.hide();
        };

        $scope.returnList = function () {
            $state.go('jobListingList', {}, {
                reload: true
            });
        };
        $scope.gotoConfirm = function () {
            $state.go('jobListingConfirm', {}, {
                reload: true
            });
        };

    }
]);

app.controller('JoblistingConfirmCtrl', ['ENV', '$scope', '$state', '$stateParams', 'ApiService', '$ionicPopup', '$ionicPlatform', '$cordovaSQLite', '$cordovaNetwork', '$ionicLoading', 'SqlService', 'PopupService',
    function (ENV, $scope, $state, $stateParams, ApiService, $ionicPopup, $ionicPlatform, $cordovaSQLite, $cordovaNetwork, $ionicLoading, SqlService, PopupService) {
        var canvas = document.getElementById('signatureCanvas'),
            signaturePad = new SignaturePad(canvas),
            strEemptyBase64 = '';
        $scope.signature = null;

        function resizeCanvas() {
            var ratio = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth - 50;
            canvas.height = screen.height / 3;
        }
        var getSignature = function () {};
        $scope.returnList = function () {
            $state.go('jobListingList', {}, {});
        };
        $scope.returnDetail = function () {
            $state.go('jobListingDetail', {}, {
                reload: true
            });
        };
        $scope.clearCanvas = function () {
            $scope.signature = null;
            signaturePad.clear();
        };
        $scope.saveCanvas = function () {
            var sigImg = signaturePad.toDataURL();
            if (is.not.equal(strEemptyBase64, sigImg)) {
                $scope.signature = sigImg;
            }
        };
        $scope.confirm = function () {
            $scope.saveCanvas();
        };
        getSignature();
        resizeCanvas();
        strEemptyBase64 = signaturePad.toDataURL();

    }
]);

app.controller('UploadCtrl', ['ENV', '$scope', '$state', '$stateParams', '$ionicPopup', 'FileUploader', 'ApiService', 'PopupService',
    function (ENV, $scope, $state, $stateParams, $ionicPopup, FileUploader, ApiService, PopupService) {
        $scope.returnDoc = function () {
            $state.go('jobListingDetail', {}, {});
        };
        var uri = '';
        var uploader = $scope.uploader = new FileUploader({
            url: ApiService.Url(uri)
        });
        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
            PopupService.Info(null, 'Upload Successfully', '').then(function (res) {
                $scope.returnDoc();
            });
        };
    }
]);
