(function (angular) {
  'use strict';

  var module = angular.module('javaDemo.user.detail', []);

  module.controller('User.Detail', ["$http", function ($http) {

    $http.get("api/user").then(
      function (response) {
        this.user = response.data;
      }.bind(this)
    );

  }]);

})(window.angular);
(function (angular) {
  'use strict';

  angular.module('common.filters.default', [])
    .filter('default', function () {
      return function (value, defaultValue) {
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
angular.module('angularUtils.filters.ordinalDate', [])

    .filter('ordinalDate', ["$filter", function($filter) {

      var getOrdinalSuffix = function(number) {
        var suffixes = ["'th'", "'st'", "'nd'", "'rd'"];
        var relevantDigits = (number < 30) ? number % 20 : number % 30;
        return (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
      };

      /**
       * Look through the format string for any possible match for 'd'.
       * It needs to ignore 'dd' and also occurrences of the letter d inside
       * string such as "d 'day of' MM'.
       * @param format
       */
      var getIndecesOfDayCharacter = function(format) {
        var dayRegex = /(?:'(?:[^']|'')*')|(?:d+)/g;
        var matchingIndices = [];
        var finishedLooking = false;

        while (!finishedLooking) {
          var matches = dayRegex.exec(format);
          if (matches) {
            dayRegex.lastIndex = matches.index + matches[0].length;
            if (matches[0] === 'd') {
              matchingIndices.push(matches.index + 1);
            }
          } else {
            finishedLooking = true;
          }
        }

        return matchingIndices;
      };

      /**
       * Insert a string at a given index of another string
       * @param inputString
       * @param index
       * @param stringToInsert
       * @returns {string}
       */
      var insertAtIndex = function(inputString, index, stringToInsert) {
        var partBeforeIndex = inputString.substring(0, index);
        var partAfterIndex = inputString.substring(index, inputString.length);
        return partBeforeIndex + stringToInsert + partAfterIndex;
      };

      return function(timestamp, format) {
        var date = new Date(timestamp);
        var dayOfMonth = date.getDate();
        var suffix = getOrdinalSuffix(dayOfMonth);

        var matchingIndices = getIndecesOfDayCharacter(format);

        // now we to insert the suffix at the index(-ces) that we found
        for (var i = matchingIndices.length; i > 0; i--) {
          format = insertAtIndex(format, matchingIndices[i - 1], suffix);
        }
        return $filter('date')(date, format);
      };
    }]);
(function (angular) {
  'use strict';

  angular.module('javaDemo.user', [
    'javaDemo.user.detail'
  ])
    .config(['$routeProvider',
      function ($routeProvider) {
        $routeProvider

          .when('/user', {
            templateUrl: 'user/detail/detail.html',
            controller: 'User.Detail',
            controllerAs: "ctrl"
          });

      }]);

})(window.angular);
(function (angular) {
  'use strict';

  angular
    .module('javaDemo', [
      'ngRoute',
      'javaDemo.user'
    ])
    .config(['$routeProvider',
      function ($routeProvider) {
        $routeProvider.otherwise({
          redirectTo: '/user'
        });
      }]);
})(window.angular);
angular.module("javaDemo").run(["$templateCache", function($templateCache) {$templateCache.put("user/detail/detail.html","<h1>User detail</h1>\n\n<div class=\"panel\">Hello {{ctrl.user.name}}</div>\n\n<pre>\n{{ctrl.user | json}}\n</pre>");}]);