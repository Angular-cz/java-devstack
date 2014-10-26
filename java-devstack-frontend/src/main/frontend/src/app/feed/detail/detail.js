(function(angular) {
  'use strict';

  var module = angular.module('flickerDemo.feed.detail', [
    'flickerDemo.feed.detail.directives'
  ]);

  module.controller('Feed.Detail', function(photo) {
    this.photo = photo;
  });

})(window.angular);