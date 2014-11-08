(function(angular) {
  'use strict';

  /* Controllers */

  angular.module('administration.orders.detail', [])
    .controller('DetailCtrl',
      function($scope, $routeParams, detail) {
        $scope.order = detail;
      });

})(window.angular);