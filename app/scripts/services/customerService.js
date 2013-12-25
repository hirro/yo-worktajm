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

'use strict';

angular.module('yoWorktajmApp')
  .service('CustomerService', function CustomerService(Restangular, $rootScope, $q) {
    var svc = {
      restangularCustomers: Restangular.all('customer')
    };

    svc.update = function (customer) {
      console.log('CustomerService::update %d', customer.id);
      var deferred = $q.defer();
      Restangular.one('customer', customer.id).put().then(function (existingCustomer) {
          existingCustomer.put().then(function () {
          deferred.resolve(existingCustomer);
        }, function (reason) {
          deferred.reject(reason);
        });
      }, function (reason) {
        deferred.reject(reason);
      });
      return deferred.promise;
    };

    svc.create = function (customer) {
      console.log('CustomerService::create');
      var deferred = $q.defer();
      svc.restangularCustomers.post(customer).then(function (newCustomer) {
        console.log('Created customer successfully at backend. New id is: %s', newCustomer.id);
        deferred.resolve(newCustomer);
      }, function (reason) {
        deferred.reject(reason);
      });
      return deferred.promise;
    };
    
    svc.save = function (customer) {
      if (customer.id) {
        return svc.update(customer);
      } else {
        return svc.create(customer);
      }
    };

    svc.get = function (id) {
      console.log('CustomerService::get');
      var deferred = $q.defer();
       Restangular.one('customer', id).get().then(function (existingCustomer) {
        console.log('Retrieved customer successfully from backend. Id is: %s', existingCustomer.id);
        deferred.resolve(existingCustomer);
      }, function (reason) {
        deferred.reject(reason);
      });
      return deferred.promise;
    };

    return svc;

  });
