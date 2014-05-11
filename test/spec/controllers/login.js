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

/*jshint camelcase: false */

/*globals describe, beforeEach, inject, expect, it, spyOn, _ */


'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('yoWorktajmApp'));

  var LoginCtrl, $scope, $q, $httpBackend, $location;

  // Initialize the LoginServiceMock
  var activeProjectId = -1;
  var usernameA = 'usernameA';
  var passwordA = 'passwordA';
  var usernameB = 'usernameB';
  var passwordB = 'passwordB';

  var person = { id: 123, username: usernameA};
  var LoginServiceMock = {
    getActiveProjectId: function () {
      return activeProjectId;
    },
    getPerson: function () {
      return person;
    },
    login: function (username, password) {
      var deferred = $q.defer();
      console.log('XXXXXXXXXX %s');
      if (username === usernameA) {
        deferred.resolve(person);
      } else {
        deferred.reject();
      }
      return deferred.promise;
    },
    logout: function () {
      $scope.$broadcast('onLoggedOut');
    },
    clear: function () {}
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, _$q_, _$location_) {
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $q = _$q_;
    $location = _$location_;
    LoginCtrl = $controller('LoginCtrl', {
      $scope: $scope,
      LoginService: LoginServiceMock,
      PersonService: LoginServiceMock
    });
    LoginCtrl.$inject = ['$scope',  '$route', 'LoginService'];
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should login successfully', function () {
    // Setup
    spyOn(LoginServiceMock, 'login').and.callThrough();

    // Test
    $scope.username = usernameA;
    $scope.password = passwordA;
    $scope.login();

    // Make the requests go though
    //$scope.$digest();

    // Verify
    expect(LoginServiceMock.login).toHaveBeenCalledWith(usernameA, passwordA);
  });

  it('should fail login', function () {
    // Setup
    $httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/authenticate').respond(401);
    spyOn(LoginServiceMock, 'login').and.callThrough();

    // Test
    $scope.login(usernameA, passwordA);

    // Make the requests go though
    $scope.$digest();

    // Verify
    expect(LoginServiceMock.login).toHaveBeenCalled();
    expect($scope.principal).toBeFalsy();
  });

  it('should logout', function () {
    spyOn(LoginServiceMock, 'logout').and.callThrough();
    spyOn(LoginServiceMock, 'clear').and.callThrough();
    $scope.logout();
    $scope.$digest();
    expect(LoginServiceMock.logout).toHaveBeenCalled();
    expect(LoginServiceMock.clear).toHaveBeenCalled();
  });

  it('should check if current location is active', function () {
    spyOn($location, 'path').and.returnValue('/a');
    expect($scope.isActive('/')).toBe(false);
    expect($scope.isActive('/a')).toBe(true);
  });

});
