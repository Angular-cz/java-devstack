(function(angular) {
  'use strict';

  angular
      .module('flickerDemo', [
        'ngRoute',
        'truncate',
        'common.filters.default',
        'common.directives.publishedDate',
        'common.directives.windowResize',
        'flickerDemo.feed'
      ])
      .config(['$routeProvider',
        function($routeProvider) {
          $routeProvider.otherwise({
            redirectTo: '/feed'
          });
        }]);
})(window.angular);