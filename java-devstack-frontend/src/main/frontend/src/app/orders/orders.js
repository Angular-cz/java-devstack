(function(angular) {
  'use strict';

  angular.module('administration.orders', [
    'administration.orders.list',
    'administration.orders.detail',
    'administration.orders.create',
    'administration.orders.service',
    'administration.orders.filter.statuses'
  ])
      .config(function($routeProvider) {
        $routeProvider
            .when('/orders', {
              templateUrl: 'orders/list/list.html',
              controller: 'OrderListController',
              controllerAs: 'list'
            })
            .when('/detail/:id', {
              templateUrl: 'orders/detail/detail.html',
              controller: 'OrderDetailController',
              controllerAs: 'detail',
              resolve: {
                orderData: function(Orders, $route) {
                  var id = $route.current.params.id;

                  return Orders.get({'id': id}).$promise;
                }
              }
            })
            .when('/create', {
              templateUrl: 'orders/create/create.html',
              controller: 'OrderCreateController',
              controllerAs: 'create'
            })
            .otherwise('/orders');
      });
})(window.angular);