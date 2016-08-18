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

        $scope.goAgentDetail = function (job) {
            $state.go('agentDetail', {
                JobNo: job.JobNo,
            }, {
                reload: true
            });
        };

        var getObjjmjm1 = function (Objjmjm1) {
            var jobs = {
                JobNo: Objjmjm1.JobNo,
                ETA: Objjmjm1.ETA,
                Pcs: Objjmjm1.Pcs,
                ConsigneeName: Objjmjm1.ConsigneeName,
                ActualArrivalDate: Objjmjm1.ActualArrivalDate,
                DeliveryDate: Objjmjm1.DeliveryDate,
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
app.controller('agentDetailCtrl', ['$scope', '$state', 'ApiService', '$cordovaSms', '$cordovaToast', '$stateParams', '$ionicPlatform', 'SqlService', 'ionicDatePicker', 'ENV', '$cordovaNetwork', 'PopupService',
    function ($scope, $state, ApiService, $cordovaSms, $cordovaToast, $stateParams, $ionicPlatform, SqlService, ionicDatePicker, ENV, $cordovaNetwork, PopupService) {
        $scope.Detail = {
            Jmjm1: {
                JobNo: $stateParams.JobNo,
            }
        };

        $ionicPlatform.ready(function () {
            var strSqlFilter = "JobNo='" + $scope.Detail.Jmjm1.JobNo + "' ";
            SqlService.Select('Jmjm1', '*', strSqlFilter).then(function (results) {
                if (results.rows.length > 0) {
                    var Objjmjm1 = results.rows.item(0);
                    var Jmjm1 = {
                        JobNo: Objjmjm1.JobNo,
                        ETA: Objjmjm1.ETA,
                        Pcs: Objjmjm1.Pcs,
                        AwbBlNo: Objjmjm1.AwbBlNo,
                        Address: Objjmjm1.Address,
                        ConsigneeName: Objjmjm1.ConsigneeName,
                        ActualArrivalDate: Objjmjm1.ActualArrivalDate,
                        DeliveryDate: Objjmjm1.DeliveryDate,
                    };
                    $scope.Detail.Jmjm1 = Jmjm1;

                }
            });
        });

        $scope.OnDatePicker = function (Type) {
            var ipObj1 = {
                callback: function (val) { //Mandatory
                    // console.log('Return value from the datepicker popup is : ' + val, new Date(val));
                    console.log(new Date());
                    if (is.equal(Type, 1)) {
                        $scope.Detail.Jmjm1.ActualArrivalDate = moment(new Date(val)).format('YYYY-MM-DD') + moment(new Date()).format(' HH:mm:ss:SSS');
                    } else {
                        $scope.Detail.Jmjm1.DeliveryDate = moment(new Date(val)).format('YYYY-MM-DD') + moment(new Date()).format(' HH:mm:ss:SSS');
                    }

                },

            };
            ionicDatePicker.openDatePicker(ipObj1);
        };

        $scope.gotoConfirm = function () {
            var UpdatedValue = 'Y';
            if (!ENV.fromWeb) {
                if (is.not.equal($cordovaNetwork.getNetwork(), 'wifi')) {
                    ENV.wifi = false;
                    UpdatedValue = 'N';
                } else {
                    ENV.wifi = true;
                }
            }
            var jmjm1Filter = "JobNo='" + $scope.Detail.Jmjm1.JobNo + "'"; // not record
            var objJmjm1 = {
                ActualArrivalDate: $scope.Detail.Jmjm1.ActualArrivalDate,
                DeliveryDate: $scope.Detail.Jmjm1.DeliveryDate,
                UpdatedFlag: UpdatedValue
            };
            SqlService.Update('Jmjm1', objJmjm1, jmjm1Filter).then(function (res) {
                if (UpdatedValue === 'Y' && is.not.undefined(res)) {
                    var arrJmjm1 = [];
                    arrJmjm1.push($scope.Detail.Jmjm1);
                    var jsonData = {
                        "confirmAllString": JSON.stringify(arrJmjm1)
                    };
                    var objUri = ApiService.Uri(true, '/api/tms/jmjm1/confirm');
                    ApiService.Post(objUri, jsonData, true).then(function success(result) {
                        PopupService.Info(null, 'Confirm Success', '').then(function (res) {
                            $scope.returnList();
                        });
                    });
                } else if (UpdatedValue === 'N') {
                    PopupService.Info(null, 'Confirm Success', '').then(function (res) {
                        $scope.returnList();
                    });
                }
            });
        };
        $scope.returnList = function () {
            $state.go('agentjobListing', {}, {
                reload: true
            });
        };
    }
]);
