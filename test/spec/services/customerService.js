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


/*globals expect, afterEach, beforeEach, spyOn, describe, it, inject, _ */

'use strict';

describe('Service: CustomerService', function () {

  // load the service's module
  beforeEach(module('yoWorktajmApp'));

  // instantiate service
  var httpBackend;
  var customerService;
  var personService;
  var scope;

  // Test constants
  var customers = [
    { id: 301, name: 'Project A' },
    { id: 302, name: 'Project B' }
  ];

  beforeEach(inject(function (PersonService, CustomerService, $httpBackend, $rootScope) {
    customerService = CustomerService;
    personService = PersonService;
    httpBackend = $httpBackend;
    scope = $rootScope;

    // Assume we are logged in as user id 1
    PersonService.personId = 1;
  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('create tests', function () {
    it('should create a new customer', function () {
      // Setup
      httpBackend.whenPOST('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/customer').respond(_.clone(customers[0]));
      spyOn(customerService, 'updateCustomer').andCallThrough();
      spyOn(scope, '$broadcast').andCallThrough();

      // Test
      var result;
      customerService.updateCustomer(customers[0]).then(function (r) {
        result = r;
      }, function () {
      });
      scope.$digest();
      httpBackend.flush();
      
      // Validation
      expect(customerService.updateCustomer).toHaveBeenCalledWith(customers[0]);
      expect(result.id).toBe(1);
    });

    it('should try to create a new customer but get an error from backend', function () {
      // Setup
      httpBackend.whenPOST('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/customer').respond(401);
      spyOn(customerService, 'getCustomer').andCallThrough();
      spyOn(scope, '$broadcast').andCallThrough();

      // Test
      var failMessage;
      customerService.updateCustomer(customers[0]).then(function () {
      }, function (msg) {
        failMessage = msg;
      });
      scope.$digest();
      httpBackend.flush();
      
      // Validation
      expect(customerService.getCustomer).toHaveBeenCalledWith(customers[0]);
      expect(failMessage).toBe('error');
    });
  });

});
