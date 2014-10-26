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
(function(angular) {
  'use strict';

  var module = angular.module('common.directives.dynamicTruncate', ['truncate']);

  module.directive('dynamicTruncate', ["$filter", function($filter) {
    return {
      restrict: 'E',
      require: '^windowResize',
      replace: true,
      scope: {
        text: '='
      },
      template: '<div>{{truncatedText}}</div>',
      compile: function() {
        var characterFilter = $filter('characters');

        return function(scope, element, args, sizeController) {
          scope.data = {};

          var truncateBySize = function(args) {
            var limit;
            if (args.width < 480) {
              limit = Math.floor(args.width / 35);
              scope.truncatedText = characterFilter(scope.text, limit, true);
            }

            if (args.width >= 480 && args.width < 768) {
              limit = Math.floor(args.width / 30);
              scope.truncatedText = characterFilter(scope.text, limit, true);
            }

            if (args.width >= 768) {
              limit = Math.floor(args.width / 20);
              scope.truncatedText = characterFilter(scope.text, limit, true);
            }

          };

          scope.$on('window::resize', function(event, size) {
            truncateBySize(size);
            scope.$apply();
          });

          truncateBySize(sizeController.getSize());

        };
      }
    };
  }]);

})(window.angular);
(function(angular) {
  'use strict';

  var module = angular.module('common.directives.windowResize', []);

  /**
   * directive provide method getSize and window resize notifications
   */
  module.directive('windowResize', ["$window", function($window) {
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
      controller: ["$scope", function($scope) {
        this.getSize = function() {
          return $scope.getSize();

        };
      }]
    };
  }]);

})(window.angular);
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
(function(angular) {
  'use strict';

  var module = angular.module('flickerDemo.feed.detail', [
    'flickerDemo.feed.detail.directives'
  ]);

  module.controller('Feed.Detail', ["photo", function(photo) {
    this.photo = photo;
  }]);

})(window.angular);
(function(angular) {
  'use strict';

  var module = angular.module('flickerDemo.feed.list', [
    'common.directives.dynamicTruncate'
  ]);

  module.controller('Feed.List', ["$route", "publicFeedCollection", "tagsData", function($route, publicFeedCollection, tagsData) {

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
  }]);

})(window.angular);
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
(function(angular) {
  'use strict';

  angular
      .module('flickerDemo', [
        'ngRoute',
        'truncate',
        'common.filters.default',
        'common.directives.publishedDate',
        'common.directives.windowResize',
        'flickerDemo.feed'
      ])
      .config(['$routeProvider',
        function($routeProvider) {
          $routeProvider.otherwise({
            redirectTo: '/feed'
          });
        }]);
})(window.angular);
(function(angular) {
  'use strict';

  var module = angular.module('flickerDemo.feed');
  /**
   * Feed resource provide http comunication with flickr API
   */
  module.factory('publicFeedResource', ["$http", function($http) {

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
  }]);

  /**
   * Feed collection
   */
  module.service('publicFeedCollection', ["$q", "$location", "publicFeedResource", function($q, $location, publicFeedResource) {
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
  }]);

})(window.angular);


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


angular.module("flickerDemo").run(["$templateCache", function($templateCache) {$templateCache.put("feed/detail/detail.html","<section class=\"container-fluid detail\">\n  <div class=\"row\">\n    <div class=\"col-sm-3 col-sm-push-9\"><a class=\"btn btn-default btn-back\" href=\"#feed\">&larr; Back</a></div>\n    <div class=\"col-sm-9 col-sm-pull-3\"><h1><a ng-href=\"{{detail.photo.link}}\">{{detail.photo.title|default:\'[untitled]\'}}</a></h1></div>\n  </div>\n\n  <div class=\"row info\">\n    <div class=\"col-sm-12\">\n      <a ng-href=\"https://www.flickr.com/people/{{detail.photo.author_id}}/\">Photo author</a> | \n      <span published-date=\"detail.photo.published\"></span>  \n    </div>\n  </div>\n\n  <div class=\"row body\">\n    <div class=\"col-xs-5 col-sm-3 col-lg-2\"><img width=\"100%\" ng-src=\"{{detail.photo.media.m}}\" /></div>\n    <div class=\"col-xs-7 col-sm-9 col-lg-10\">\n      <p>{{detail.photo.title}}</p>\n      Tags: <tag-links tags=\"detail.photo.tags\"></tag-links>\n      <br>\n    </div>\n  </div>\n</section>\n\n\n");
$templateCache.put("feed/list/list.html","<section class=\"container-fluid list\" window-resize >\n  <div class=\"row\">\n    <div class=\"col-sm-4\">\n      <h1>Flickr Public Feed</h1>\n    </div>\n    <div class=\"col-sm-4\">\n      <form class=\"form-inline tagsForm\" role=\"form\" ng-submit=\"list.showByTags()\">\n        <div class=\"tagsForm\">\n          <label for=\"tags\">Tags</label>\n          <input type=\"text\" id=\"tags\" class=\"form-control\" ng-model=\"list.tags\" ng-/>\n          <button class=\"btn btn-default\" ng-click=\"\">Reload</button>   \n        </div>\n      </form>\n    </div>\n  </div>\n  <hr />\n  <div class=\" row filter\">\n    <div class=\"col-xs-4 col-sm-3 col-lg-2 col-lg-offset-1 col-sm-offset-2 col-xs-offset-3\">\n      <input type=\"text\" placeholder=\"title\" class=\"form-control\" ng-model=\"list.search.title\"/>\n    </div>\n  </div>\n  <hr/>\n  <div class=\"row list-item\" ng-repeat=\"photo in list.collection| filter: list.search track by photo.id\">\n\n    <div class=\"image-box col-xs-3 col-sm-2 col-lg-1\">\n      <a ng-href=\"#feed/{{photo.id}}\">\n        <img ng-src=\"{{photo.media.m}}\" />\n      </a>\n    </div>\n\n    <div class=\"col-xs-9 col-sm-10 col-lg-11\">\n      <h2>\n        <a class=\"link-to-detail\" ng-href=\"#feed/{{photo.id}}\">\n          <dynamic-truncate text=\"photo.title|default:\'[untitled]\'\"></dynamic-truncate>\n        </a>\n      </h2>\n\n      <div class=\"row\">\n        <div class=\"col-sm-12\">\n          <span class=\"date\" published-date=\"photo.published\"></span>\n        </div>\n        <div class=\"col-sm-12\">\n          <a class=\"author\" ng-href=\"https://www.flickr.com/people/{{photo.author_id}}/\">Photo author</a>\n          <a class=\"flickr-link\" ng-href=\"{{photo.link}}\">View on Flickr</a>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"row list-item\" ng-if=\"list.collection.length == 0\">\n    No data\n  </div>\n</section>");
$templateCache.put("feed/detail/directives/tagList.html","<span class=\"tag\" ng-repeat=\"tag in tags\">\n  <a ng-href=\"#feed/?tags={{tag}}\">{{tag}}</a>\n</span>");}]);