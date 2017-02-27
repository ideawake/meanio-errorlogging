import StackTrace from 'stacktrace-js';
import Promise from 'promise-polyfill';

(function() {
    'use strict';
    function exceptionHandler($injector, $log, $window, $meanConfig) {
      return function($delegate) {
        return function (exception, cause) {
          if (!$window.Promise) {
            $window.Promise = Promise;
          }
          // Lazy load angular deps to avoid circular dependency
          var $http = $injector.get('$http');
          // var $rootScope = $injector.get('$rootScope');
          // $rootScope.errors = $rootScope.errors || [];
          // $rootScope.errors.push(exception.toString());
          var hasPromise = ('Promise' in $window);

          if (process.env.NODE_ENV === 'production' && hasPromise) {
            try {
              var errorMessage = exception.toString();
              StackTrace.fromError(exception).then(function(stackframes) {
                var stringifiedStack = stackframes.map(function(sf) {
                  return sf.toString();
                }).join(' \n');

                var errorObj = {
                  errorUrl: $window.location.href,
                  errorMessage: errorMessage,
                  stackTrace: stringifiedStack,
                  cause: ( cause || '' )
                };

                $http.post('/api/errorlogging', errorObj).then(function(response) {
                    $log.debug('error logging completed', response.data);
                }, function(err) {
                    $log.warn('Ironically there was an error saving the last clientside error message to the db', err);
                });
              // $rootScope.$emit('error', errorObj);
              });
            } catch ( loggingError ) {
              // for Developers - log the log-failure.
              $log.warn( 'Error logging failed' );
              $log.log( loggingError );
            }
          } // end if

          // Pass through to original handler
          $delegate(exception, cause);
        };
      };
    }

    angular
        .module('mean.errorlogging')
        .factory('exceptionHandlerFactory', exceptionHandler);

    exceptionHandler.$inject = ['$injector', '$log', '$window'];

})();
