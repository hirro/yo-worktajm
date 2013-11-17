/*
  @licstart The following is the entire license notice for the 
            JavaScript code in this page.
  @source TBD

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
  beforeEach(module('tpsApp'));

  var RegisterCtrl, scope, q, httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q, $httpBackend) {
    scope = $rootScope;
    q = $q;
    httpBackend = $httpBackend;
    RegisterCtrl = $controller('RegisterCtrl', {
      $scope: scope
    });
    RegisterCtrl.$inject = ['$scope',  '$route'];
  }));

  it('should register successfully', function () {
    var success = false;
    var failure = false;
    scope.email = 'email';
    scope.password = 'password';
    httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/registration?email=email&password=password').respond(201);
    scope.register().then(function () {
      success = true;
    }, function () {
      failure = true;
    });
    scope.$digest();
    httpBackend.flush();

    expect(success).toBe(true);
    expect(failure).toBe(false);
  });

  it('should handle registration failure gracefully', function () {
    var success = false;
    var failure = false;
    scope.email = 'email';
    scope.password = 'password';
    httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/registration?email=email&password=password').respond(401);
    scope.register().then(function () {
      success = true;
    }, function () {
      failure = true;
    });
    scope.$digest();
    httpBackend.flush();
    expect(success).toBe(false);
    expect(failure).toBe(true);
  });

});
