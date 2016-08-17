'use strict';
app.controller('agentCtrl', ['$scope', '$state', 'ApiService', '$cordovaSms', '$cordovaToast', '$ionicFilterBar', '$cordovaNetwork', 'ENV', 'SqlService',
    function ($scope, $state, ApiService, $cordovaSms, $cordovaToast, $ionicFilterBar, $cordovaNetwork, ENV, SqlService) {
        var filterBarInstance = null;

        var dataResults = new Array();
        var hmjmjm1 = new HashMap();

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
                    return value.JobNo.indexOf(filterText) > -1;
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

        var getObjjmjm1 = function (Objjmjm1) {
            var jobs = {
                JobNo: Objjmjm1.JobNo,
                ETA: checkAgentDatetime(Objjmjm1.ETA),
                Pcs: Objjmjm1.Pcs,
                ConsigneeName: Objjmjm1.ConsigneeName,
                ActualArrivalDate: checkAgentDatetime(Objjmjm1.ActualArrivalDate),
                DeliveryDate: checkAgentDatetime(Objjmjm1.DeliveryDate),
            };
            return jobs;
        };

        var showjmjm1 = function () {
            if (!ENV.fromWeb) {
                if (is.not.equal($cordovaNetwork.getNetwork(), 'wifi')) {
                    ENV.wifi = false;
                } else {
                    ENV.wifi = true;
                }
            }
            if (ENV.wifi === true) {
                var strSqlFilter = "DeliveryAgentCode='" + sessionStorage.getItem("sessionAgentID") + "'"; // not record
                SqlService.Select('Jmjm1', '*', strSqlFilter).then(function (results) {
                    if (results.rows.length > 0) {
                        for (var i = 0; i < results.rows.length; i++) {
                            var jmjm1 = results.rows.item(i);
                            hmjmjm1.set(jmjm1.JobNo, jmjm1.JobNo);

                        }
                        var objUri = ApiService.Uri(true, '/api/tms/jmjm1');
                        objUri.addSearch('DeliveryAgentCode', sessionStorage.getItem("sessionAgentID"));
                        ApiService.Get(objUri, true).then(function success(result) {
                            var results = result.data.results;
                            if (is.not.empty(results)) {
                                for (var i = 0; i < results.length; i++) {
                                    var objjmjm1 = results[i];
                                    var jobs = getObjjmjm1(objjmjm1);
                                    dataResults = dataResults.concat(jobs);
                                    $scope.jobs = dataResults;
                                    if (!hmjmjm1.has(objjmjm1.JobNo)) {
                                        SqlService.Insert('jmjm1', objjmjm1).then(function (res) {});
                                    }
                                }
                            }
                        });
                    } else {
                        var objUri = ApiService.Uri(true, '/api/tms/jmjm1');
                        objUri.addSearch('DeliveryAgentCode', sessionStorage.getItem("sessionAgentID"));
                        ApiService.Get(objUri, true).then(function success(result) {
                            var results = result.data.results;
                            if (is.not.empty(results)) {
                                for (var i = 0; i < results.length; i++) {
                                    var objjmjm1 = results[i];
                                    var jobs = getObjjmjm1(results[i]);
                                    dataResults = dataResults.concat(jobs);
                                    $scope.jobs = dataResults;
                                    SqlService.Insert('jmjm1', objjmjm1).then(function (res) {});
                                }
                            }
                        });
                    }

                });
            } else {
                var strSqlFilter = " DeliveryAgentCode='" + sessionStorage.getItem("sessionAgentID") + "'"; // not record
                SqlService.Select('jmjm1', '*', strSqlFilter).then(function (results) {
                    if (results.rows.length > 0) {
                        for (var i = 0; i < results.rows.length; i++) {
                            var objjmjm1 = getObjjmjm1(results.rows.item(i));
                            dataResults = dataResults.concat(objjmjm1);
                        }
                        $scope.jobs = dataResults;
                    }
                });
            }
        };

        showjmjm1();

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
