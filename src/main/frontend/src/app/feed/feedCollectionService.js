(function(angular) {
  'use strict';

  var module = angular.module('flickerDemo.feed');
  /**
   * Feed resource provide http comunication with flickr API
   */
  module.factory('publicFeedResource', function($http) {

    return {
      load: function(tags) {
        tags = tags || '';
        var url = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK';
        if (tags.length > 0) {
          url += '&tagmode=all&tags=' + encodeURIComponent(tags);
        }

        return $http.jsonp(url);
      }
    };
  });

  /**
   * Feed collection
   */
  module.service('publicFeedCollection', function($q, $location, publicFeedResource) {
    this.data = [];
    this.tags = '';
    /**
     * 
     * @param {string} coma separed tags
     * @returns {promise}
     */
    this.loadByTags = function(tags) {
      if (this.data.length > 0 && this.tags === tags) {
        return $q.when(this.data);
      }

      this.tags = tags;
      return this.loadPhotos_();
    };

    /**
     * @private
     * @returns {promise}
     */
    this.loadPhotos_ = function() {
      return publicFeedResource
          .load(this.tags)
          .then(this.processResponse_.bind(this));
    };

    /**
     * @private
     * @returns {Array}
     */
    this.processResponse_ = function(response) {
      var index = 0;
      this.data = response.data.items.map(function(item) {
        item.id = index++;
        return item;
      });
      return this.data;
    };

    /**
     * @param {number} id
     * @returns {Object|promise}
     */
    this.getPhoto = function(id) {
      if (id > 20) {
        id = 1; //reset to begin if detail of more loaded picture is refreshed
      }

      if (this.data.length > 0) {
        return this.filterItem_(this.data, id);
      }

      return this.loadPhotos_()
          .then(function(data) {
            return this.filterItem_(data, id);
          }.bind(this));
    };

    /**
     * @private
     * @param {Array} data
     * @param {int} id
     */
    this.filterItem_ = function(data, id) {
      return data.filter(function(item) {
        return item.id === id;
      })[0];
    };
  });

})(window.angular);

