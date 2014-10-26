(function(angular) {
  'use strict';

  var module = angular.module('flickerDemo.feed');


  /**
   * Feed collection
   */
  module.service('dataMemory', function() {
    this.data = {
      tags: ''
    };

  });

})(window.angular);

