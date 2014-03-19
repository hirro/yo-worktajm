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
  var newCustomer;
  var customerA;
  var customerB;
  var customers;

  beforeEach(inject(function (PersonService, CustomerService, $httpBackend, $rootScope) {
    customerService = CustomerService;
    personService = PersonService;
    httpBackend = $httpBackend;
    scope = $rootScope;

    // Assume we are logged in as user id 1
    PersonService.personId = 1;

    // Test constants
    newCustomer = {
      name: 'Company Name',
      billingAddress: {
        line1: 'Line 1',
        line2: 'Line 2',
        city: 'Sometown'
      },
      referencePerson: 'Reference Person'
    };
    customerA = {
      id: 1,
      name: 'Company Name A',
      billingAddress: {
        line1: 'Line 1',
        line2: 'Line 2',
        city: 'Sometown'
      },
      referencePerson: 'Reference Person'
    };
    customerB = {
      id: 2,
      name: 'Company Name B',
      billingAddress: {
        line1: 'Line 1',
        line2: 'Line 2',
        city: 'Sometown'
      },
      referencePerson: 'Reference Person'
    };
    customers = [
      customerA,
      customerB
    ];


  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('create / update tests', function () {
    it('should create a new customer', function () {
      // Setup
      httpBackend.whenPOST('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/customer').respond(_.clone(customerA));
      spyOn(customerService, 'save').andCallThrough();
      spyOn(customerService, 'create').andCallThrough();
      spyOn(customerService, 'update').andCallThrough();

      // Test
      var result;
      var failMessage;
      customerService.save(_.clone(newCustomer)).then(function (r) {
        result = r;
      }, function (msg) {
        failMessage = msg;
      });
      scope.$digest();
      httpBackend.flush();
      
      // Validation
      expect(customerService.save).toHaveBeenCalledWith(newCustomer);
      expect(customerService.create).toHaveBeenCalledWith(newCustomer);
      expect(result.id).toBe(customerA.id);
      expect(failMessage).toBeUndefined();
    });

    it('should try to create a new customer but get an error from backend', function () {
      // Setup
      httpBackend.whenPOST('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/customer').respond(401);
      spyOn(customerService, 'save').andCallThrough();
      spyOn(customerService, 'create').andCallThrough();
      spyOn(customerService, 'update').andCallThrough();

      // Test
      var result;
      var failMessage;
      customerService.save(_.clone(newCustomer)).then(function (r) {
        result = r;
      }, function (msg) {
        failMessage = msg;
      });
      scope.$digest();
      httpBackend.flush();
      
      // Validation
      expect(customerService.save).toHaveBeenCalledWith(newCustomer);
      expect(customerService.create).toHaveBeenCalledWith(newCustomer);
      expect(result).toBeUndefined();
      expect(failMessage.status).toBe(401);
    });

    it('should update a customer', function () {
      // Setup
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/customer').respond(_.clone(customers));
      httpBackend.whenPUT('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/customer/1').respond(_.clone(customerA));
      spyOn(customerService, 'save').andCallThrough();
      spyOn(customerService, 'create').andCallThrough();
      spyOn(customerService, 'update').andCallThrough();

      // Test
      var result;
      var failMessage;
      customerService.save(_.clone(customerA)).then(function (r) {
        result = r;
      }, function (msg) {
        failMessage = msg;
      });
      scope.$digest();
      httpBackend.flush();
      
      // Validation
      expect(customerService.save).toHaveBeenCalledWith(customerA);
      expect(customerService.update).toHaveBeenCalledWith(customerA);
      expect(failMessage).toBeUndefined();
      expect(result.id).toBe(customerA.id);
    });

    it('should try to update a customer but get an error from backend', function () {
      // Setup
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/customer').respond(_.clone(customers));
      httpBackend.whenPUT('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/customer/1').respond(401);
      spyOn(customerService, 'save').andCallThrough();
      spyOn(customerService, 'create').andCallThrough();
      spyOn(customerService, 'update').andCallThrough();

      // Test
      var result;
      var failMessage;
      customerService.save(_.clone(customerA)).then(function (r) {
        result = r;
      }, function (msg) {
        failMessage = msg;
      });
      scope.$digest();
      httpBackend.flush();
      
      // Validation
      expect(customerService.save).toHaveBeenCalledWith(customerA);
      expect(customerService.update).toHaveBeenCalledWith(customerA);
      expect(result).toBeUndefined();
      expect(failMessage.status).toBe(401);
    });
  });

  describe('read tests', function () {
    it('should get the customer with the provided id', function () {
      // Setup
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/customer').respond(_.clone(customers));
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/customer/1').respond(_.clone(customerA));
      spyOn(customerService, 'get').andCallThrough();

      // Test
      var result;
      var failMessage;
      customerService.get(customerA.id).then(function (r) {
        result = r;
      }, function (msg) {
        failMessage = msg;
      });
      scope.$digest();
      httpBackend.flush();
      
      // Validation
      expect(customerService.get).toHaveBeenCalledWith(1);
      expect(result.id).toBe(customerA.id);
      expect(failMessage).toBeUndefined();
    });

    it('should handle get with invalid id gracefully', function () {
      // Setup
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/customer').respond(_.clone(customers));
      spyOn(customerService, 'get').andCallThrough();

      // Test
      var result;
      var failMessage;
      customerService.get(666).then(function (r) {
        result = r;
      }, function (msg) {
        failMessage = msg;
      });
      scope.$digest();
      httpBackend.flush();
      
      // Validation
      expect(customerService.get).toHaveBeenCalledWith(666);
      expect(result).toBeUndefined();
    });
  });


  describe('list tests', function () {
    it('should successfully retrieve a list of all customers', function () {
      // Setup
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/customer').respond(_.clone(customers));
      spyOn(customerService, 'list').andCallThrough();

      // Test
      var result;
      var failMessage;
      customerService.list().then(function (r) {
        result = r;
      }, function (msg) {
        console.error('should not fail');
        failMessage = msg;
      });
      scope.$digest();
      httpBackend.flush();
      
      // Validation
      expect(customerService.list).toHaveBeenCalled();
      expect(result[0].id).toBe(customerA.id);
      expect(result[1].id).toBe(customerB.id);
      expect(failMessage).toBeUndefined();
    });

    it('should gracefully handle error from backend', function () {
      // Setup
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/customer').respond(401);
      spyOn(customerService, 'list').andCallThrough();

      // Test
      var result;
      var failMessage;
      customerService.list().then(function (r) {
        result = r;
      }, function (msg) {
        failMessage = msg;
      });
      scope.$digest();
      httpBackend.flush();
      
      // Validation
      expect(customerService.list).toHaveBeenCalled();
      expect(result).toBeUndefined();
      expect(failMessage.status).toBe(401);
    });
  });

  describe('delete tests', function () {
    it('should delete the customer with the provider id (unless it is associated with a project)', function () {
      // Setup
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/customer').respond(customers);
      spyOn(customerService, 'list').andCallThrough();
      httpBackend.whenDELETE('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/customer/1').respond(200);
      spyOn(customerService, 'delete').andCallThrough();

      // Test
      var result;
      var failMessage;
      customerService.delete(customerA.id).then(function () {
        result = 'ok';
      }, function (msg) {
        failMessage = msg;
      });
      scope.$digest();
      httpBackend.flush();
      
      // Validation
      expect(customerService.list).toHaveBeenCalled();
      expect(customerService.delete).toHaveBeenCalledWith(1);
      expect(result).toBe('ok');
      expect(failMessage).toBeUndefined();
    });

    it('should handle error from backend', function () {
      // Setup
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/customer').respond(customers);
      spyOn(customerService, 'list').andCallThrough();
      httpBackend.whenDELETE('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/customer/1').respond(401);
      spyOn(customerService, 'delete').andCallThrough();

      // Test
      var result;
      var failMessage;
      customerService.delete(customerA.id).then(function () {
        result = 'ok';
      }, function (msg) {
        failMessage = msg;
      });
      scope.$digest();
      httpBackend.flush();
      
      // Validation
      expect(customerService.list).toHaveBeenCalled();
      expect(customerService.delete).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
      expect(failMessage.status).toBe(401);
    });
  });
  
  describe('findCustomerByName', function() {
    it('should find customer with provided name', function () {
      // Setup
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/customer').respond(customers);
      spyOn(customerService, 'list').andCallThrough();
      spyOn(customerService, 'findCustomerByName').andCallThrough();

      // Test
      var customer;
      var error;
      customerService.findCustomerByName(customerA.name).then(function (result) {
        customer = result;
      }, function (e) {
        error = e;
      });
      scope.$digest();
      httpBackend.flush();

      // Verification
      expect(customerService.list).toHaveBeenCalled();
      expect(customerService.findCustomerByName).toHaveBeenCalledWith(customerA.name);
      expect(customer.id).toBe(customerA.id);
      expect(error).toBeUndefined();
    });

    it('should return undefined when user is not found', function () {
      // Setup
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/customer').respond(customers);
      spyOn(customerService, 'list').andCallThrough();
      spyOn(customerService, 'findCustomerByName').andCallThrough();

      // Test
      var name = 'Tjolahopp';
      var customer;
      customerService.findCustomerByName(name)
      .then(function (result) {
        customer = result;
      });
      scope.$digest();
      httpBackend.flush();

      // Verification
      expect(customerService.list).toHaveBeenCalled();
      expect(customerService.findCustomerByName).toHaveBeenCalledWith(name);
      expect(customer).toBeUndefined();
    });

    it('should fail to call the backend', function () {
      // Setup
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/customer').respond(301);
      spyOn(customerService, 'list').andCallThrough();
      spyOn(customerService, 'findCustomerByName').andCallThrough();

      // Test
      var customer;
      var error;
      customerService.findCustomerByName('customerA.name').then(function (result) {
        customer = result;
      }, function (e) {
        error = e;
      });
      scope.$digest();
      httpBackend.flush();

      // Verification
      expect(customerService.list).toHaveBeenCalled();
      expect(customerService.findCustomerByName).toHaveBeenCalledWith('customerA.name');
      expect(customer).toBeUndefined();
      expect(error).toBeDefined();
    });

  });

  describe('findOrCreateCustomerByName', function () {
    beforeEach(function () {
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/customer').respond(customers);
    });

    it('should find customer with provided name', function () {
      // Setup
      spyOn(customerService, 'list').andCallThrough();
      spyOn(customerService, 'findCustomerByName').andCallThrough();

      // Test
      var customer;
      var error;
      customerService.findOrCreateCustomerByName(customerA.name).then(function (result) {
        customer = result;
      }, function (e) {
        error = e;
      });
      scope.$digest();
      httpBackend.flush();

      // Verification
      expect(customerService.list).toHaveBeenCalled();
      expect(customerService.findCustomerByName).toHaveBeenCalledWith(customerA.name);
      expect(customer.id).toBe(customerA.id);
      expect(error).toBeUndefined();
    });

    it('should not find customer with provided name, a new customer will be created', function () {
      var newCustomer = {
        name: 'New customer name',
        id: 4454
      };

      // Setup
      httpBackend.whenPOST('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/customer').respond(newCustomer);
      spyOn(customerService, 'list').andCallThrough();
      spyOn(customerService, 'findCustomerByName').andCallThrough();
      spyOn(customerService, 'create').andCallThrough();

      // Test
      var customer;
      customerService.findOrCreateCustomerByName(newCustomer.name)
      .then(function (result) {
        customer = result;
      });
      scope.$digest();
      httpBackend.flush();

      // Verification
      expect(customer).toBeDefined();
      expect(customerService.list).toHaveBeenCalled();
      expect(customerService.findCustomerByName).toHaveBeenCalledWith(newCustomer.name);
      expect(customerService.create).toHaveBeenCalled();
      //expect(customer.id).toBe(newCustomerCreateed.id);
    });

    it('should handle failed connection to backend', function () {
      var customer;

      // Setup
      httpBackend.whenPOST('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/customer').respond(301);
      spyOn(customerService, 'list').andCallThrough();
      spyOn(customerService, 'findCustomerByName').andCallThrough();
      spyOn(customerService, 'create').andCallThrough();

      // Test
      customerService.findOrCreateCustomerByName('fail')
      .then(function (result) {
        customer = result;
      });
      scope.$digest();
      httpBackend.flush();

      // Verification
      expect(customer).not.toBeDefined();
      expect(customerService.list).toHaveBeenCalled();
      expect(customerService.findCustomerByName).toHaveBeenCalledWith('fail');
      //expect(customerService.create).not.toHaveBeenCalled();
    });

    it('name is not provided', function () {
      var failed;
      customerService.findOrCreateCustomerByName()
      .then(
        function () {
          failed = false;
        })
      .catch(function () {
          failed = true;
        });
      scope.$digest();
      expect(failed).toBe(true);
    });
  });

});
