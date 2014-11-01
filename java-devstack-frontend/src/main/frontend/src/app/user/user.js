(function (angular) {
  'use strict';

  angular.module('javaDemo.user', [
    'javaDemo.user.detail'
  ])
    .config(['$routeProvider',
      function ($routeProvider) {
        $routeProvider

          .when('/user', {
            templateUrl: 'user/detail/detail.html',
            controller: 'User.Detail',
            controllerAs: "ctrl"
          });

      }]);

})(window.angular);