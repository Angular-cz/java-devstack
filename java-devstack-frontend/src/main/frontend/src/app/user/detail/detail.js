(function (angular) {
  'use strict';

  var module = angular.module('javaDemo.user.detail', []);

  module.controller('User.Detail', function ($http) {

    $http.get("api/user").then(
      function (response) {
        this.user = response.data;
      }.bind(this)
    );
  });

})(window.angular);