var appFactory = angular.module('TMS.factories', [
    'TMS.services'
]);

appFactory.factory('ACCEPTJOB_ORM', function () {
    var ACCEPTJOB_ORM = {
        LIST: {
            Csbk1s: {},
            _setCsbk: function (value) {
                this.Csbk1s = value;
            }
        }
    };
    ACCEPTJOB_ORM.init = function () {
        this.LIST.Csbk1s = {};
    };
    return ACCEPTJOB_ORM;
});

appFactory.factory('TABLE_DB', function () {
    var TABLE_DB = {
        Todr1_Rcbp1: {
            DriverCode: 'TEXT',
            BusinessPartyCode: 'TEXT',
            PassWord: 'TEXT',
        },
    };
    return TABLE_DB;
});
