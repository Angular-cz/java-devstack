(function (angular) {
  'use strict';

  /* Services */

  var services = angular.module('administration.orders.service', ['ngResource']);

  services.factory('Orders', function ($resource) {
    return $resource('api/user/:id', {id: '@id'});
  });

})(window.angular);

