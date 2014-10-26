(function(angular) {
  'use strict';

  var module = angular.module('common.directives.windowResize', []);

  /**
   * directive provide method getSize and window resize notifications
   */
  module.directive('windowResize', function($window) {
    return {
      restrict: 'A',
      link: function(scope, element) {

        scope.getSize = function() {
          return {
            width: element[0].offsetWidth,
            height: element[0].offsetHeight
          };
        };

        angular.element($window).on('resize', function() {
          scope.$broadcast('window::resize', scope.getSize());
        });

      },
      controller: function($scope) {
        this.getSize = function() {
          return $scope.getSize();

        };
      }
    };
  });

})(window.angular);