(function(angular) {
  'use strict';

  angular.module('administration.orders.service', ['ngResource'])

      .factory('Orders', function(REST_URI, $resource) {
        return $resource(REST_URI + '/orders/:id', {"id": "@id"});
      });

})(window.angular);

