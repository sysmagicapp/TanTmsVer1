'use strict';
app.controller( 'MainCtrl', [ '$scope', '$state', '$ionicPopup','PopupService',
    function ( $scope, $state, $ionicPopup,PopupService ) {
            var strDriverName = sessionStorage.getItem( 'strDriverName' );
        if ( is.not.empty( strDriverName ) ) {
            $scope.strName = strDriverName;
        } else {
            $scope.strName = 'Driver';
        }
        $scope.func_Dashboard = function () {
            PopupService.Info(null ,'Stay Tuned' );
        };
        $scope.func_AJ = function () {
            PopupService.Info( null,'Stay Tuned' );
        };
        $scope.func_JL = function () {
            $state.go( 'index.jobListingList', {}, {} );
        };
        $scope.func_DC = function () {
          PopupService.Info( null,'Stay Tuned' );
          // $state.go( 'agentjobListing', {}, {} );
        };
        $scope.func_Reports = function () {
              $state.go( 'dailycompleted', {}, {} );
        };
        $scope.func_Setting = function () {
            PopupService.Info( null,'Stay Tuned' );
        };
    } ] );
