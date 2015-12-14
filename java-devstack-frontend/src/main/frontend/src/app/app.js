(function (angular) {
  'use strict';

  angular
    .module('administration', [
      'ngRoute',
      'administration.orders',
      'administration.templates'
    ])

      .constant('REST_URI', 'api')

      .config(['$routeProvider',
      function ($routeProvider) {
        $routeProvider.otherwise({
          redirectTo: '/orders'
        });
      }]);
})(window.angular);