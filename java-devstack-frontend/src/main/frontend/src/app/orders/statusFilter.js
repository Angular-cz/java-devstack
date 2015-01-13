(function(angular) {
  'use strict';

  angular.module("administration.orders.filter.statuses", [])
      .value("statuses", {
        NEW: 'Nová',
        CANCELLED: 'Zrušená',
        PAID: 'Zaplacená',
        SENT: 'Odeslaná'
      })

      .filter("statusTranslation", function(statuses) {
        return function(status) {
          return statuses[status];
        };
      });
})
(window.angular);