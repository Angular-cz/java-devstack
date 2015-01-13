(function(angular) {
  'use strict';

  angular.module('administration.orders.list', [])
      .controller('OrderListController', function(Orders, $location, statuses) {
        var orderCtrl = this;
        this.orders = Orders.query();

        this.statuses = statuses;

        this.removeOrder = function(order) {
          order.$remove(function() {
            var index = orderCtrl.orders.indexOf(order);
            orderCtrl.orders.splice(index, 1);
          });
        };

        this.updateOrder = function(order) {
          order.$save();
        };
      });

})(window.angular);