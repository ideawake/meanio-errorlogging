(function() {
    'use strict';

    /* jshint -W098 */

    function ErrorloggingController($scope, Global, Errorlogging, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'errorlogging'
        };

        $scope.checkCircle = function() {
            Errorlogging.checkCircle($stateParams.circle).then(function(response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };
    }

    angular
        .module('mean.errorlogging')
        .controller('ErrorloggingController', ErrorloggingController);

    ErrorloggingController.$inject = ['$scope', 'Global', 'Errorlogging', '$stateParams'];

})();
