angular.module("javaDemo").run(["$templateCache", function($templateCache) {$templateCache.put("user/detail/detail.html","<h1>User detail</h1>\n\n<div class=\"panel\">Hello {{ctrl.user.name}}</div>\n\n<pre>\n{{ctrl.user | json}}\n</pre>");}]);