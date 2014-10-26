(function(angular) {
  'use strict';

  var module = angular.module('flickerDemo.feed.detail.directives', []);

  module.directive('tagLinks', function() {
    return {
      restrict: 'E',
      scope: {
        tagsString: '=tags'
      },
      templateUrl: 'feed/detail/directives/tagList.html',
      link: function(scope, element, attrs) {
        scope.tags = scope.tagsString.split(" ");
      }
    };
  });

})(window.angular);