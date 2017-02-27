(function() {
    'use strict';

    function Errorlogging($stateProvider, $provide) {
        // $stateProvider.state('errorlogging example page', {
        //     url: '/errorlogging/example',
        //     templateUrl: 'errorlogging/views/index.html'
        // }).state('errorlogging circles example', {
        //     url: '/errorlogging/example/:circle',
        //     templateUrl: 'errorlogging/views/example.html'
        // });
        $provide.decorator('$exceptionHandler', ['$delegate', 'exceptionHandlerFactory', function($delegate, exceptionHandlerFactory) {
          return exceptionHandlerFactory($delegate);
        }]);
    }

    angular
        .module('mean.errorlogging')
        .config(Errorlogging);

    Errorlogging.$inject = ['$stateProvider', '$provide'];

})();
