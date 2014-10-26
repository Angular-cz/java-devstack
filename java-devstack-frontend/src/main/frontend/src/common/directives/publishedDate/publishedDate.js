(function(angular) {
  'use strict';

  var module = angular.module('common.directives.publishedDate', ['angularUtils.filters.ordinalDate']);

  module.directive('publishedDate', function() {
    return {
      restrict: 'A',
      scope: {
        date: '=publishedDate'
      },
      template: 'Published: <span>{{date | ordinalDate: "d MMM yyyy"}}</span> at <span>{{date | date: "H:mm"}}</span>'

    };
  });

})(window.angular);