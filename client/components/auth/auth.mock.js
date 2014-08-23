'use strict';

angular.module('authMock', [])
  .factory('Auth', function() {
    return {
      currentUser: {},
      login: function(u) {
        console.log('authMock - login: [%o]', JSON.stringify(this.currentUser));
        this.currentUser = u;
      },
      getCurrentUser: function () {
        console.log('authMock - getCurrentUser: [%o]', JSON.stringify(this.currentUser));
        return this.currentUser;
      }
    };
  });

