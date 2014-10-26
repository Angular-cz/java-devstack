(function(angular) {
  'use strict';

  angular.module('common.filters.default', [])
      .filter('default', function() {
        return function(value, defaultValue) {
          if (angular.isUndefined(value) ||
              value === null ||
              (angular.isString(value) && value.trim().length === 0)
              ) {
            return defaultValue;
          }

          return value;
        };
      });

})(window.angular);