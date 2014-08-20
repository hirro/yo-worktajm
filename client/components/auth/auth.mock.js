'use strict';

angular.module('authMock', [])
  .factory('Auth', function() {
    return {
      currentUser: {},
      login: function(u) {
        this.currentUser = u;
      },
      getCurrentUser: function () {
        return this.currentUser;
      }
    };
  });

