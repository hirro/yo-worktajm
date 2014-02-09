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

'use strict';

describe('Controller: CustomersCtrl', function () {

  // load the controller's module
  beforeEach(module('yoWorktajmApp'));

  // Test constants
  var CUSTOMERS, CUSTOMER_A, CUSTOMER_B;
  var $rootScope, $scope, $q, $document, CustomerServiceMock, CustomersCtrl;
  var $modal, $modalProvider, $httpBackend;
  
  // Initialize the controller and a mock scope
  beforeEach(module('ui.bootstrap.modal'));
  beforeEach(module('template/modal/backdrop.html'));
  beforeEach(module('template/modal/window.html'));
  beforeEach(module(function(_$modalProvider_) {
    $modalProvider = _$modalProvider_;
  }));

  beforeEach(function() {
    CUSTOMER_A = {
      id: 1,
      name: 'Company A'
    };
    CUSTOMER_B = {
      id: 2,
      name: 'Company B'
    };
    CUSTOMERS = [
      CUSTOMER_A,
      CUSTOMER_B
    ];

    CustomerServiceMock = {
      list: function () {
        var deferred = $q.defer();
        deferred.resolve(CUSTOMERS);
        return deferred.promise;
      },
      findCustomerByName: function (name) {
        var deferred = q.defer();
        if (name === CUSTOMER_A.name) {
          console.log('Found customer in mock');
          deferred.resolve(CUSTOMER_A);
        } else {
          console.log('Customer NOT found in mock');
          deferred.resolve();
        }
        return deferred.promise;
      },
      delete: function (id) {
        var deferred = $q.defer();
        deferred.resolve();
        return deferred.promise;
      },
      update: function (customer) {
        var deferred = $q.defer();
        deferred.resolve(customer);
        return deferred.promise;
      },
      create: function (customer) {
        var deferred = $q.defer();
        deferred.resolve(customer);
        return deferred.promise;
      }
    };
  });

  beforeEach(inject(function ($controller, _$rootScope_, _$q_, _$document_, _$modal_, _$httpBackend_) {
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();
    $document = _$document_;
    $q = _$q_;
    $modal = _$modal_;
    $httpBackend = _$httpBackend_;
    CustomersCtrl = $controller('CustomersCtrl', {
      $scope: $scope,
      CustomerService: CustomerServiceMock
    });
    CustomersCtrl.$inject = ['$scope',  '$route', 'CustomerService'];
  }));

  beforeEach(inject(function ($rootScope) {
    this.addMatchers({

      toBeResolvedWith: function(value) {
        var resolved;
        this.message = function() {
          return "Expected '" + angular.mock.dump(this.actual) + "' to be resolved with '" + value + "'.";
        };
        this.actual.then(function(result){
          resolved = result;
        });
        $rootScope.$digest();

        return resolved === value;
      },

      toBeRejectedWith: function(value) {
        var rejected;
        this.message = function() {
          return "Expected '" + angular.mock.dump(this.actual) + "' to be rejected with '" + value + "'.";
        };
        this.actual.then(angular.noop, function(reason){
          rejected = reason;
        });
        $rootScope.$digest();

        return rejected === value;
      },

      toHaveModalOpenWithContent: function(content, selector) {

        var contentToCompare, modalDomEls = this.actual.find('body > div.modal > div.modal-dialog > div.modal-content');

        this.message = function() {
          return "Expected '" + angular.mock.dump(modalDomEls) + "' to be open with '" + content + "'.";
        };

        contentToCompare = selector ? modalDomEls.find(selector) : modalDomEls;
        return modalDomEls.css('display') === 'block' &&  contentToCompare.html() == content;
      },

      toHaveModalsOpen: function(noOfModals) {

        var modalDomEls = this.actual.find('body > div.modal');
        return modalDomEls.length === noOfModals;
      },

      toHaveBackdrop: function() {

        var backdropDomEls = this.actual.find('body > div.modal-backdrop');
        this.message = function() {
          return "Expected '" + angular.mock.dump(backdropDomEls) + "' to be a backdrop element'.";
        };

        return backdropDomEls.length === 1;
      }
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  function open(modalOptions) {
    var modal = $modal.open(modalOptions);
    $rootScope.$digest();
    return modal;
  }

  function close(modal, result) {
    modal.close(result);
    $rootScope.$digest();
  }

  function dismiss(modal, reason) {
    modal.dismiss(reason);
    $rootScope.$digest();
  }

  it('should initialize controller with customers after digest', function () {
    expect($scope.customers.length).toBe(0);
    $scope.$digest();
    expect($scope.customers).not.toBeUndefined();
    expect($scope.customers.length).toBe(2);
  });

  it('should remove a customer', function () {
    $httpBackend.whenGET('confirmationModal.html').respond('<div>Modal2</div>');
    $scope.$digest();
    $scope.openRemoveCustomerModal(CUSTOMER_A);
    $scope.$digest();
    $httpBackend.flush();
    // expect($document).toHaveModalOpenWithContent('Modal1', 'div');
    // expect($document).toHaveModalsOpen(0);
    //$scope.deleteConfirmationModal.ok();
  });

  it('should edit a customer', function () {
    $httpBackend.whenGET('customerModal.html').respond();
    $scope.$digest();
    $scope.openEditCustomerModal(CUSTOMER_A);
    $scope.$digest();
    $httpBackend.flush();
  });

  describe('modal openers, quite useless except for coverage XXX', function () {
    it('should open the customer modal dialog', function () {
      $httpBackend.whenGET('customerModal.html').respond();
      $scope.openCustomerModal(CUSTOMER_A, 'TITLE', 'MESSAGE', 'OK', 'CANCEL');
      $scope.$digest();
      $httpBackend.flush();
    });
    it('should open the create customer modal dialog', function () {
      $httpBackend.whenGET('customerModal.html').respond();
      $scope.openCreateCustomerModal();
      $scope.$digest();
      $httpBackend.flush();
    });
  });

  it('should clear all time entries when receiving onLoggedOut event', function () {
    $scope.timeEntries = [ 1, 2 ,3 ];

    expect($scope.timeEntries).not.toBeNull();
    $scope.$broadcast('onLoggedOut');
    expect($scope.timeEntries).toBeNull();
  });

  it('should call delete on onRemoveCustomerModalOk', function () {
    spyOn(CustomerServiceMock, 'delete').andCallThrough();
    $scope.onRemoveCustomerModalOk(CUSTOMER_A);
    expect(CustomerServiceMock.delete).toHaveBeenCalledWith(CUSTOMER_A.id);
  });

  it('should call update on onOpenCustomerModalOk when customer id is defined', function () {
    spyOn(CustomerServiceMock, 'update').andCallThrough();
    spyOn(CustomerServiceMock, 'create').andCallThrough();
    $scope.onOpenCustomerModalOk({id: 1});
    expect(CustomerServiceMock.update).toHaveBeenCalled();
    expect(CustomerServiceMock.create).not.toHaveBeenCalled();
  });

  it('should call update on onOpenCustomerModalOk when customer id is NOT defined', function () {
    spyOn(CustomerServiceMock, 'update').andCallThrough();
    spyOn(CustomerServiceMock, 'create').andCallThrough();
    $scope.onOpenCustomerModalOk({});
    expect(CustomerServiceMock.update).not.toHaveBeenCalled();
    expect(CustomerServiceMock.create).toHaveBeenCalled();
  });

});
