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

/* globals expect, it, afterEach, beforeEach, spyOn, describe, inject */

'use strict';

ddescribe('Service: RegistrationService', function () {

  // load the service's module
  beforeEach(module('yoWorktajmApp'));

  // API
  var httpBackend;
  var service;
  var scope;

  // Test constants

  // Inject the person service
  beforeEach(inject(function (RegistrationService, $httpBackend, $rootScope) {
    service = RegistrationService;
    httpBackend = $httpBackend;
    scope = $rootScope;
  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('find tests', function () {
    it('should successfully find the provider user', function () {
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/registration/isEmailAvailable?email=user').respond('false');
      service.isEmailAvailable('user').then(function (result) {
        expect(result).toBe(false);
      });
      httpBackend.flush();
    });
    it('should not find the provider user', function () {
      var httpOperationFailed = false;
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/registration/isEmailAvailable?email=user').respond('true');
      service.isEmailAvailable('user').then(function (result) {
        expect(result).toBe(true);
      }, function () {
        httpOperationFailed = true;
      });
      httpBackend.flush();
      expect(httpOperationFailed).toBe(false);
    });
    it('should not be able to contact server', function () {
      var httpOperationFailed = false;
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/registration/isEmailAvailable?email=user').respond(401);
      service.isEmailAvailable('user').then(function (result) {
        expect(result).toBe(true);
      }, function () {
        httpOperationFailed = true;
      });
      httpBackend.flush();
      expect(httpOperationFailed).toBe(true);
    });
  });

  describe('registration tests', function () {
    it('should register successfully', function () {
      httpBackend.whenPUT('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/registration?email=a&password=b').respond('true');

      service.register({
        email: 'a',
        password: 'b'
      });
      httpBackend.flush();

    });
  });
  
});
