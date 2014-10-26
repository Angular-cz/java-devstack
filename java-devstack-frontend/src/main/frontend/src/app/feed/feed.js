(function(angular) {
  'use strict';

  angular.module('flickerDemo.feed', [
    'angularUtils.filters.ordinalDate',
    'flickerDemo.feed.list',
    'flickerDemo.feed.detail'
  ])
      .config(['$routeProvider',
        function($routeProvider) {
          $routeProvider
              .when('/feed', {
                templateUrl: 'feed/list/list.html',
                controller: 'Feed.List',
                controllerAs: 'list',
                resolve: {
                  tagsData: ['$route', 'dataMemory', function($route, dataMemory) {
                      if ($route.current.params.hasOwnProperty('tags')) {
                        dataMemory.data.tags = $route.current.params.tags;
                      }

                      return dataMemory;
                    }]
                }
              })
              .when('/feed/:photoId', {
                templateUrl: 'feed/detail/detail.html',
                controller: 'Feed.Detail',
                controllerAs: 'detail',
                resolve: {
                  photo: ['$route', 'publicFeedCollection', function($route, publicFeedCollection) {
                      return publicFeedCollection.getPhoto(parseInt($route.current.params.photoId, 10));
                    }]
                }
              });
        }]);

})(window.angular);