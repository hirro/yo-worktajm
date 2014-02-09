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

xdescribe('Controller: RegisterCtrl', function () {

  // load the controller's module
  beforeEach(module('yoWorktajmApp'));

  var RegisterCtrl, scope, q, httpBackend;

  var authenicationResponse = {
    token:  'demo@worktajm.com:1385447985128:632a4ef7344da65b43ca694090da2813',
    roles:  {
      ROLE_USER:  true
    },
    personId:   1
  };
  var personA = { id: 1, username: 'User A', activeTimeEntry: null };

  var LoginServiceMock = {
    login: function (username, password) {
      var deferred = q.defer();
      if (password === 'ok') {
        deferred.resolve();
      } else {
        deferred.reject();
      }
      return deferred.promise;
    }
  };

  var RegistrationServiceMock = {
    register: function (params) {
      var deferred = q.defer();
      if (params.email === 'ok') {
        deferred.resolve(authenicationResponse);
      } else {
        deferred.reject();
      }
      return deferred.promise;
    }
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q, $httpBackend) {
    scope = $rootScope;
    q = $q;
    httpBackend = $httpBackend;
    RegisterCtrl = $controller('RegisterCtrl', {
      $scope: scope,
      LoginService: LoginServiceMock,
      RegistrationService: RegistrationServiceMock
    });
    RegisterCtrl.$inject = ['$scope',  '$route'];
  }));

  it('should register successfully', function () {

    // Prepare
    var success = false;
    var failure = false;
    scope.registration = {
      email: 'ok',
      password:  'ok'
    };

    // Test
    scope.register().then(function () {
      success = true;
    }, function () {
      failure = true;
    });
    scope.$digest();

    // Verify
    expect(success).toBe(true);
    expect(failure).toBe(false);
  });

  iit('should handle registration failure gracefully', function () {

    var success = false;
    var failure = false;
    scope.registration = {
      email: 'email',
      password:  'password'
    };
    scope.register().then(function () {
      success = true;
    }, function () {
      success = true;
    });
    scope.$digest();
    expect(success).toBe(false);
    expect(failure).toBe(true);
  });

});
