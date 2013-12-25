/*
  @licstart The following is the entire license notice for the 
            JavaScript code in this page.
  @source https://github.com/hirro/yo-worktajm

  Copyright (C) 2013 Jim Arnell.

  The JavaScript code in this page is free software: you can
  redistribute it and/or modify it under the terms of the GNU
  General Public License (GNU GPL) as published by the Free Software
  Foundation, either version 3 of the License, or (at your option)
  any later version.  The code is distributed WITHOUT ANY WARRANTY;
  without even the implied warranty of MERCHANTABILITY or FITNESS
  FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

  As additional permission under GNU GPL version 3 section 7, you
  may distribute non-source (e.g., minimized or compacted) forms of
  that code without the copy of the GNU GPL normally required by
  section 4, provided you include this license notice and a URL
  through which recipients can access the Corresponding Source.

  @licend The above is the entire license notice
          for the JavaScript code in this page.  
*/

/*globals describe, beforeEach, inject, expect, it, spyOn */


'use strict';

describe('Controller: LoginCtrl', function ($q) {

  // load the controller's module
  beforeEach(module('yoWorktajmApp'));

  var LoginCtrl, scope, q, httpBackend;

  // Initialize the PersonServiceMock
  var activeProjectId = -1;
  var usernameA = 'usernameA';
  var passwordA = 'passwordA';
  var usernameB = 'usernameB';
  var passwordB = 'passwordB';

  var person = { id: 123, username: usernameA};
  var PersonServiceMock = {
    getActiveProjectId: function () {
      return activeProjectId;
    },
    getPerson: function () {
      var deferred = q.defer();
      deferred.resolve(person);
      return deferred.promise;
    },
    login: function (username, password) {
      var deferred = q.defer();
      if (username === usernameA) {
        deferred.resolve(person);
      } else {
        deferred.reject();
      }
      return deferred.promise;
    },
    logout: function () {
      scope.$broadcast('onLoggedOut');
    }
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q, $httpBackend) {
    scope = $rootScope;
    q = $q;
    httpBackend = $httpBackend;
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope,
      PersonService: PersonServiceMock
    });
    LoginCtrl.$inject = ['$scope',  '$route', 'PersonService'];
  }));

  it('should login successfully', function () {
    // Setup
    spyOn(PersonServiceMock, 'login').andCallThrough();

    // Preconditions
    expect(scope.user).toBeUndefined();

    scope.username = usernameA;
    scope.password = passwordA;
    scope.login();

    // Make the requests go though
    scope.$digest();

    // Verify
    expect(PersonServiceMock.login).toHaveBeenCalled();
    expect(scope.user.username).toBe('usernameA');
  });

  it('should fail login', function () {
    // Setup
    spyOn(PersonServiceMock, 'login').andCallThrough();

    // Preconditions
    expect(scope.user).toBeUndefined();

    scope.username = usernameB;
    scope.password = passwordB;
    scope.login();

    // Make the requests go though
    scope.$digest();

    // Verify
    expect(PersonServiceMock.login).toHaveBeenCalled();
    expect(scope.user).toBeNull();
  });

  it('should logout', function () {
    spyOn(PersonServiceMock, 'logout').andCallThrough();
    scope.logout();
    scope.$digest();
    expect(PersonServiceMock.logout).toHaveBeenCalled();
  });


});
