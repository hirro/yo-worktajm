'use strict';

describe('Controller: CustomersCtrl', function () {

  // load the controller's module
  beforeEach(module('yoWorktajmApp'));

  var CustomersCtrl, scope, customers, customerA, customerB, CustomerServiceMock;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {

    customerA = {
      id: 1,
      name: 'Company A'
    };
    customerB = {
      id: 2,
      name: 'Company B'
    };
    customers = [
      customerA,
      customerB
    ];
    CustomerServiceMock = {

      list: function () {
        return customers;
      },
      findCustomerByName: function (name) {
        var deferred = q.defer();
        if (name === customerA.name) {
          console.log('Found customer in mock');
          deferred.resolve(customerA);
        } else {
          console.log('Customer NOT found in mock');
          deferred.resolve();
        }
        return deferred.promise;
      }
    };
    scope = $rootScope.$new();
    CustomersCtrl = $controller('CustomersCtrl', {
      $scope: scope
    });
  }));

  it('should load the available customers', function () {
    scope.initialize();
    expect(scope.customers[1].name, toBe(customerA.name));
  });

});
