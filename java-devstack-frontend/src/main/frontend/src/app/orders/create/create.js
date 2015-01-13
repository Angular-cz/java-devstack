(function(angular) {
  'use strict';

  /* Controllers */

  angular.module('administration.orders.create', [])
      .controller('OrderCreateController', function($location, Orders) {
        this.order = new Orders();

        this.save = function(order) {
          order.$save(function() {
            $location.path("/detail/" + order.id);
          });
        };
      });
})(window.angular);