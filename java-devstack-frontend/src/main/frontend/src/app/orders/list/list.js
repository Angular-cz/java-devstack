(function (angular) {
  'use strict';

  angular.module('administration.orders.list', [])
    .controller('ListCtrl',
    function ($scope, Orders) {

      $scope.orders = Orders.query();

      $scope.statuses = {
        NEW: 'Nová',
        CANCELLED: 'Zrušená',
        PAID: 'Zaplacená',
        SENT: 'Odeslaná'
      };

      $scope.removeOrder = function (order) {
        order.$remove(function () {
          var index = $scope.orders.indexOf(order);
          $scope.orders.splice(index, 1);
        });
      };

    });

})(window.angular);