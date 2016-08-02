'use strict';
app.controller('agentCtrl', ['$scope', '$state', 'ApiService', '$cordovaSms', '$cordovaToast', '$ionicFilterBar',
    function ($scope, $state, ApiService, $cordovaSms, $cordovaToast, $ionicFilterBar) {
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

        $scope.goAgentDetail = function () {
            $state.go('agentDetail', {}, {
                reload: true
            });
        };
    }
]);
app.controller('agentDetailCtrl', ['$scope', '$state', 'ApiService', '$cordovaSms', '$cordovaToast',
    function ($scope, $state, ApiService, $cordovaSms, $cordovaToast) {
        $scope.returnMain = function () {
            $state.go('agentjobListing', {}, {
                reload: true
            });
        };
    }
]);
