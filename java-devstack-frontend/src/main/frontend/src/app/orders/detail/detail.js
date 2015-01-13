(function(angular) {
  'use strict';

  /* Controllers */

  angular.module('administration.orders.detail', [])
      .controller('OrderDetailController', function(orderData) {
        this.order = orderData;
      });

})(window.angular);