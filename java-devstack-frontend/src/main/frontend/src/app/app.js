(function (angular) {
  'use strict';

  angular
    .module('javaDemo', [
      'ngRoute',
      'administration.orders'
    ])
    .config(['$routeProvider',
      function ($routeProvider) {
        $routeProvider.otherwise({
          redirectTo: '/user'
        });
      }]);
})(window.angular);