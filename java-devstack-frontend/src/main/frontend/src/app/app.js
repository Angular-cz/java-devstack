(function (angular) {
  'use strict';

  angular
    .module('javaDemo', [
      'ngRoute',
      'administration.orders'
    ])

      .constant('REST_URI', 'api')

      .config(['$routeProvider',
      function ($routeProvider) {
        $routeProvider.otherwise({
          redirectTo: '/orders'
        });
      }]);
})(window.angular);