(function (angular) {
  'use strict';

  angular
    .module('javaDemo', [
      'ngRoute',
      'javaDemo.user'
    ])
    .config(['$routeProvider',
      function ($routeProvider) {
        $routeProvider.otherwise({
          redirectTo: '/user'
        });
      }]);
})(window.angular);