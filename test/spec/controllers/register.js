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

describe('Controller: RegisterCtrl', function () {

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
        console.log('LoginServiceMock ok %s', password);
        deferred.resolve();
      } else {
        console.log('LoginServiceMock failed %s', password);
        deferred.reject();
      }
      return deferred.promise;
    }
  };

  var RegistrationServiceMock = {
    register: function (params) {
      var deferred = q.defer();
      if (params.email === 'ok') {
        console.log('RegistrationServiceMock ok ');
        deferred.resolve(authenicationResponse);
      } else {
        console.log('RegistrationServiceMock failed email[%s]', params.email);        
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
    spyOn(RegistrationServiceMock, 'register').and.callThrough();
    spyOn(LoginServiceMock, 'login').and.callThrough();

    scope.registration = {
      email: 'ok',
      password:  'ok'
    };
    scope.register();
    scope.$digest();
    scope.$digest();

    expect(RegistrationServiceMock.register).toHaveBeenCalled();
    expect(LoginServiceMock.login).toHaveBeenCalled();
  });

  it('should handle registration failure gracefully when registration fails', function () {
    spyOn(RegistrationServiceMock, 'register').and.callThrough();
    spyOn(LoginServiceMock, 'login').and.callThrough();

    scope.registration = {
      email: 'nok',
      password:  'nok'
    };
    scope.register();
    scope.$digest();

    expect(RegistrationServiceMock.register).toHaveBeenCalled();
    expect(LoginServiceMock.login).not.toHaveBeenCalled();
  });

  it('should handle registration failure gracefully when login fails', function () {
    spyOn(RegistrationServiceMock, 'register').and.callThrough();
    spyOn(LoginServiceMock, 'login').and.callThrough();

    scope.registration = {
      email: 'ok',
      password:  'nok'
    };
    scope.register();
    scope.$digest();

    expect(RegistrationServiceMock.register).toHaveBeenCalled();
    expect(LoginServiceMock.login).toHaveBeenCalled();
  });

});
