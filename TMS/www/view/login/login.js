'use strict';
app.controller('LoginCtrl', ['ENV', '$scope', '$http', '$state', '$stateParams', '$ionicPopup', '$timeout', '$cordovaToast', '$cordovaFile', '$cordovaAppVersion', 'ApiService', 'SqlService', '$ionicPlatform', '$cordovaSQLite', '$rootScope', 'PopupService',
    function (ENV, $scope, $http, $state, $stateParams, $ionicPopup, $timeout, $cordovaToast, $cordovaFile, $cordovaAppVersion, ApiService, SqlService, $ionicPlatform, $cordovaSQLite, $rootScope, PopupService) {

        $scope.logininfo = {
            strdriverID: '',
            strAgentID: '',
            strPassWord: '',
            strRole: '',
            CurRole: '1',
            NewRole: '1'
        };

        $scope.roles = [{
            text: 'Driver',
            value: '1'
        }, {
            text: 'Agent',
            value: '2'
        }];

        $scope.funcChangeRole = function () {
            var myPopup = $ionicPopup.show({
                template: '<ion-radio ng-repeat="role in roles" ng-value="role.value" ng-model="logininfo.NewRole">{{ role.text }}</ion-radio>',
                title: 'Select Login Role',
                scope: $scope,
                buttons: [{
                    text: 'Cancel',
                    onTap: function (e) {
                        $scope.logininfo.NewRole = $scope.logininfo.CurRole;
                    }
                }, {
                    text: 'Save',
                    type: 'button-positive',
                    onTap: function (e) {
                        for (var r in $scope.roles) {
                            if ($scope.logininfo.NewRole === $scope.roles[r].value) {
                                $scope.logininfo.CurRole = $scope.logininfo.NewRole;
                                $scope.logininfo.strRole = $scope.roles[r].text;
                            }
                        }
                    }
                }]
            });
        };

        $scope.funcRoleJuage = function (roleType) {
            if (roleType === 1) {
                if ($scope.logininfo.strRole === 'Driver') {
                    return true;
                } else {
                    return false;
                }
            } else if (roleType === 2) {
                if ($scope.logininfo.strRole === 'Agent') {
                    return true;
                } else {
                    return false;
                }
            }
        };

        $scope.funcLogin = function (blnDemo) {
            if (blnDemo) {
                ENV.mock = true;
            } else {
                ENV.mock = false;
            }
            $state.go('index.main', {}, {
                reload: true
            });
        };

        if (window.cordova) {} else {
            $scope.logininfo.strRole = 'Driver';
        }

        $('#iPhoneNumber').on('keydown', function (e) {
            if (e.which === 9 || e.which === 13) {
                $scope.funcLogin();
            }
        });

        // var alertPopup = null;
        // $scope.logininfo = {
        //     strDriverId: ''
        // };
        // $scope.funcLogin = function (blnDemo) {
        //     if (blnDemo) {
        //         ENV.mock = true;
        //     } else {
        //         ENV.mock = false;
        //     }
        //     if (window.cordova && window.cordova.plugins.Keyboard) {
        //         cordova.plugins.Keyboard.close();
        //     }
        //     if (ENV.mock) {
        //         sessionStorage.clear();
        //         sessionStorage.setItem('strDriverId', $scope.logininfo.strDriverId);
        //         $state.go('index.main', {}, {
        //             reload: true
        //         });
        //     } else {
        //         if ($scope.logininfo.strDriverId === '') {
        //             PopupService.Alert(null, 'Please Enter Driver ID.');
        //         } else {
        //           var objUri = ApiService.Uri(true, '/api/tms/login/check');
        //           objUri.addSearch('DriverCode', $scope.logininfo.strDriverId);
        //             ApiService.Get(objUri, true).then(function success(result) {
        //                 var results = result.data.results;
        //                 if (is.not.empty(results)) {
        //                     sessionStorage.clear();
        //                     sessionStorage.setItem('strDriverId', $scope.logininfo.strDriverId);
        //                     sessionStorage.setItem('strDriverCode', $scope.logininfo.strDriverId);
        //                     sessionStorage.setItem('strDriverName', results[0].DriverName);
        //                     sessionStorage.setItem('strVehicleNo', results[0].VehicleNo);
        //                     var objUser = {
        //                         DriverId: $scope.logininfo.strDriverId,
        //                         DriverCode:  $scope.logininfo.strDriverId,
        //                         DriverName: results[0].DriverName,
        //                         VehicleNo:results[0].VehicleNo
        //                     };
        //                     SqlService.Insert('Users', objUser).then(function (res) {});
        //                     $state.go('index.main', {}, {
        //                         reload: true
        //                     });
        //                     $rootScope.$broadcast('login');
        //                 } else {
        //                     PopupService.Alert(null, 'Invalid Driver ID.', '');
        //                 }
        //             });
        //         }
        //     }
        // };

        // $ionicPlatform.ready(function () {
        //     // var strSql = 'SELECT * FROM Users';
        //     SqlService.Select('Users', '*').then(function (res) {
        //             if (res.rows.length > 0 && is.not.undefined(res.rows.item(0).DriverId)) {
        //                 var value = res.rows.item(0).DriverId;
        //                 $rootScope.$broadcast('login');
        //                 sessionStorage.clear();
        //                 sessionStorage.setItem('strDriverId', value);
        //                 $state.go('index.main', {}, {
        //                     reload: true
        //                 });
        //             }
        //         },
        //         function (error) {}
        //     );
        // });
    }
]);
