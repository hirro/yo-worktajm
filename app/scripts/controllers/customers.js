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

/*globals _ */

'use strict';

angular.module('yoWorktajmApp')
  .controller('CustomersCtrl', function ($scope, $modal, CustomerService) {
    $scope.customers = [];
    CustomerService.list().then(function (result) {
      $scope.customers = result;
    });

    $scope.onRemoveCustomerModalOk = function (customer) {
      return CustomerService.delete(customer.id);
    };

    $scope.openRemoveCustomerModal = function (customer) {
      console.log('CustomerController:openRemoveCustomerModal for customer [%d]', customer.id);
      var modalParams = {
        titleText: 'Remove customer',
        messageText: 'Do you want to remove customer?',
        okText: 'Remove',
        cancelText: 'Cancel',
        subject: customer
      };
      var modalInstance = $modal.open({
        templateUrl: 'confirmationModal.html',
        controller: 'ConfirmationModalCtrl',
        resolve: {
          modalParams: function () {
            return modalParams;
          }
        }
      });
      modalInstance.result.then($scope.onRemoveCustomerModalOk);
    };

    $scope.onOpenCustomerModalOk = function (customer) {
      if (customer.id) {
        CustomerService.update(customer);
      } else {
        CustomerService.create(customer);          
      }
    };

    $scope.openCustomerModal = function (customer, titleText, messageText, okText, cancelText) {
      console.log('CustomersCtrl::openCustomerModal, customerName: %s', customer.name);
      var modalParams = {
        customer: customer,
        titleText: titleText,
        messageText: messageText,
        okText: okText,
        cancelText: cancelText,
        subject: customer
      };
      var modalInstance = $modal.open({
        templateUrl: 'customerModal.html',
        controller: 'CustomerModalCtrl',
        resolve: {
          modalParams: function () {
            return modalParams;
          }
        }
      });
      modalInstance.result.then($scope.onOpenCustomerModalOk);
    };

    $scope.openEditCustomerModal = function (customer) {
      console.log('CustomersCtrl::openEditCustomerModal, customerName: %s', customer.name);
      $scope.openCustomerModal(customer, 'Update Customer', '', 'Update', 'Cancel');
    };

    $scope.openCreateCustomerModal = function () {
      var customer = {};
      $scope.openCustomerModal(customer, 'Create Customer', '', 'Create', 'Cancel');
    };

    //
    // Service events
    //
    $scope.$on('onLoggedOut', function () {
      console.info('EVENT: CustomersCtrl::onLoggedOut()');
      $scope.timeEntries = null;
    });    

  });
