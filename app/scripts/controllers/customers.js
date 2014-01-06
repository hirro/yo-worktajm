'use strict';

angular.module('yoWorktajmApp')
  .controller('CustomersCtrl', function ($scope, $modal, CustomerService) {
    $scope.customers = new Array();

    var deleteConfirmationModal = function ($scope, $modalInstance, modalParams) {
      $scope.title = modalParams.title;
      $scope.text = modalParams.text;
      $scope.ok = function () {
        $modalInstance.close();
      };
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    };

    var customerModal = function ($scope, $modalInstance, modalParams) {
      $scope.title = modalParams.title;
      $scope.text = modalParams.text;
      $scope.customer = modalParams.customer;
      $scope.ok = function () {
        $modalInstance.close($scope.customer);
      };
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    };    
    
    $scope.initialize = function() {
      console.log('Loading customers');
      CustomerService.list().then(function (result) {
        console.log('Retrived customers from CustomerService');
        $scope.customers = result;
      }, function () {
        console.error('Failed to retrieve customers from CustomerService');
      });
    };

    $scope.removeCustomer = function(customer) {
      console.log('CustomerController:removeCustomer');
      var modalParams = {
        title: 'Remove customer',
        text: 'Do you want to remove customer?'
      };
      var modalInstance = $modal.open({
        templateUrl: 'confirmationModal.html',
        controller: deleteConfirmationModal,
        resolve: {
          modalParams: function () {
            return modalParams;
          }
        }
      });
      modalInstance.result.then(function () {
        CustomerService.delete(customer.id).then(function () {
          $scope.initialize();
        });
      }, function () {
        console.info('Modal dismissed at: ' + new Date());
      });
    };


    $scope.editCustomer = function (customer) {
      console.log('CustomersCtrl::editCustomer, customerName: %s', customer.name);
      var modalParams = {
        title: 'Edit customer',
        text: 'Do you want to create a new customer?',
        customer: customer
      };
      var modalInstance = $modal.open({
        templateUrl: 'customerModal.html',
        controller: customerModal,
        resolve: {
          modalParams: function () {
            return modalParams;
          }
        }
      });
      modalInstance.result.then(function (result) {
        CustomerService.create(result);
      }, function () {
        console.info('Modal dismissed at: ' + new Date());
      });
    };    

    $scope.initialize();

  });
