(function (angular) {
  'use strict';

  angular.module('administration.orders', [
    'administration.orders.list',
    'administration.orders.detail',
    'administration.orders.service'
  ])
    .config(function ($routeProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'orders/list/list.html',
          controller: 'ListCtrl'
        }).
        when('/detail/:id', {
          templateUrl: 'orders/detail/detail.html',
          controller: 'DetailCtrl',
          resolve: {
            detail: function (Orders, $route) {
              return Orders.get({id: $route.current.params.id}).$promise.then(function (data) {
                return data;
              });
            }
          }
        });
    });
})(window.angular);