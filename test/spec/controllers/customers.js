'use strict';

ddescribe('Controller: CustomersCtrl', function () {

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
  beforeEach(module(function(_$modalProvider_){
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
    console.log('xxxxxxxxxxxxxx');
    var data;
    $.get('customers.js', function (data) {
      console.log('-----------------> data: %s', data);
    });
    console.log('xxxxx: %s', data);
    $httpBackend.whenGET('confirmationModal.html').respond('<div>Modal2</div>');
    $scope.$digest();
    $scope.removeCustomer(CUSTOMER_A);
    $scope.$digest();
    $httpBackend.flush();
    // expect($document).toHaveModalOpenWithContent('Modal1', 'div');
    // expect($document).toHaveModalsOpen(0);
    //$scope.deleteConfirmationModal.ok();
  });

  it('should edit a customer', function () {
    $httpBackend.whenGET('customerModal.html').respond();
    $scope.$digest();
    $scope.editCustomer(CUSTOMER_A);
    $scope.$digest();
    $httpBackend.flush();
  });

});
