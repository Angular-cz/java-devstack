(function(angular) {
  'use strict';

  var module = angular.module('flickerDemo.feed.list', [
    'common.directives.dynamicTruncate'
  ]);

  module.controller('Feed.List', function($route, publicFeedCollection, tagsData) {

    this.collection = null;
    this.tags = tagsData.data.tags;

    this.showByTags = function() {
      $route.updateParams({tags: this.tags});
    };

    this.onCollectionLoad = function(data) {
      this.collection = data;
    };

    publicFeedCollection
        .loadByTags(this.tags)
        .then(this.onCollectionLoad.bind(this));
  });

})(window.angular);