'use strict';

describe('Service: CustomerService', function () {

  // load the service's module
  beforeEach(module('yoWorktajmApp'));

  // instantiate service
  var httpBackend;
  var CustomerService;
  var PersonService;
  var scope;

  // Test constants
  var customers = [
    { id: 301, name: 'Project A' },
    { id: 302, name: 'Project B' }
  ];  

  beforeEach(inject(function (_PersonService_, _CustomerService_, $httpBackend, $rootScope) {
    CustomerService = _CustomerService_;
    PersonService = _PersonService_;    
    httpBackend = $httpBackend;
    scope = $rootScope;

    // Assume we are logged in as user id 1
    PersonService.personId = 1;    
  }));


  describe('create tests', function () {
    it('should create a new customer', function () {
      // Setup
      httpBackend.whenDELETE('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/customer').respond(_.clone(customers[0]));
      spyOn(CustomerService, 'getCustomer').andCallThrough();
      spyOn(scope, '$broadcast').andCallThrough();

      // Test
      var result = CustomerService.getCustomer(1);
      scope.$digest();
      httpBackend.flush();
      
      // Validation
      expect(CustomerService.getCustomers).toHaveBeenCalledWith(1);
      expect(result.id).toBe(1);
    });

    it('should try to create a new customer but get an error from backend', function () {
      // Setup
      httpBackend.whenDELETE('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/customer').respond(401);
      spyOn(CustomerService, 'getCustomes').andCallThrough();
      spyOn(scope, '$broadcast').andCallThrough();

      // Test
      var result = CustomerService.getCustomer(1);
      scope.$digest();
      httpBackend.flush();
      
      // Validation
      expect(CustomerService.getCustomers).toHaveBeenCalledWith(1);
      expect(result.id).toBe(1);
    });
  });

  xdescribe('list tests', function () {
    it('should get a list of customers', function () {
      // Setup
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/customer').respond(_.clone(customers));
      spyOn(CustomerService, 'getCustomers').andCallThrough();
      spyOn(scope, '$broadcast').andCallThrough();

      // Test
      var result = CustomerService.getCustomers();
      scope.$digest();
      httpBackend.flush();
      
      // Validation
      expect(CustomerService.getCustomers).toHaveBeenCalled();
      expect(result).toBeDefined();
      expect(result).not.toBeNull();
      expect(result.length).toBe(1);

    });

    it('should try to get a list of customers but get an error from backend', function () {
      // Setup
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/customer').respond(401);
      spyOn(CustomerService, 'getCustomers').andCallThrough();
      spyOn(scope, '$broadcast').andCallThrough();

      // Test
      var result = CustomerService.getCustomers();
      scope.$digest();
      httpBackend.flush();
      
      // Validation
      expect(CustomerService.getCustomers).toHaveBeenCalled();
      expect(result).toBeNull();
    });

  });

  xdescribe('get tests', function () {
    it('should get a customer with specified id', function () {
      // Setup
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/customer/1').respond(_.clone(customers[0]));
      spyOn(CustomerService, 'getCustomer').andCallThrough();
      spyOn(scope, '$broadcast').andCallThrough();

      // Test
      var result = CustomerService.getCustomer(1);
      scope.$digest();
      httpBackend.flush();
      
      // Validation
      expect(CustomerService.getCustomer).toHaveBeenCalledWith(1);
      expect(result).toBeDefined();
      expect(result.customerName).toBe(customers[0].customerName);
    });

    it('should try to get a customer with a specific id but get an error from backend', function () {
      // Setup
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/customer').respond(401);
      spyOn(CustomerService, 'getCustomers').andCallThrough();
      spyOn(scope, '$broadcast').andCallThrough();

      // Test
      var result = CustomerService.getCustomers();
      scope.$digest();
      httpBackend.flush();
      
      // Validation
      expect(CustomerService.getCustomer).toHaveBeenCalledWith(1);
      expect(result).toBeNull();
    });

  });

  xdescribe('update tests', function () {
    it('should create a new customer', function () {
    });

    it('should try to create a new customer but get an error from backend', function () {
    });
  });

  describe('detete tests', function () {
    it('should create a new customer', function () {
    });

    it('should try to create a new customer but get an error from backend', function () {
    });
  });

});
