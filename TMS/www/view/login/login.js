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
    }
]);
