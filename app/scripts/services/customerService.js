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

/*globals  _ */

'use strict';

angular.module('yoWorktajmApp')
  .service('CustomerService', function CustomerService(Restangular, $rootScope, $location, $q) {
    var svc = {
      restangularCustomers: Restangular.all('customer'),
      customers: {
        loaded: false,
        list: []
      }
    };

    // Updates a customer
    // Returns a proimise to the updated customer.
    svc.update = function (updatedCustomer) {
      console.log('CustomerService::update - customer id [%d]', updatedCustomer.id);

      // Find the customer in the cache
      return svc.get(updatedCustomer.id)
        .then(function (customer) {
          console.log('CustomerService::update - Updating information in cached entry');
          return _.extend(customer, updatedCustomer);
        })
        .then(function (customer) {
          console.log('CustomerService::update - Updating backend');
          return customer.put();
        })
        .then(function (customer) {
          console.log('CustomerService::update - Customer updated in backend');
          $rootScope.$broadcast('onCustomerUpdated', customer);
          return customer;
        });
    };

    // Creates a customer.
    // Returns a promise to the created customer.
    svc.create = function (customer) {
      var deferred = $q.defer();
      svc.restangularCustomers.post(customer).then(function (newCustomer) {
        svc.customers.list.push(newCustomer);
        deferred.resolve(newCustomer);
        $rootScope.$broadcast('onCustomerCreated', newCustomer);
      }, function (reason) {
        deferred.reject(reason);
      });
      return deferred.promise;
    };
    
    // Saves the customer
    // Returns a promise to the updated customer.
    svc.save = function (customer) {
      if (customer.id) {
        return svc.update(customer);
      } else {
        return svc.create(customer);
      }
    };

    // Returns a promise to customer with the provided id.
    svc.get = function (id) {
      var deferred = $q.defer();
      svc.list().then(function (customers) {
        var item = _.find(customers, function (iter) {
          return iter.id === id;
        });
        if (item) {
          deferred.resolve(item);
        } else {
          console.warn('Failed to find cached entry');
          deferred.reject('Failed to find the provided id [%d]to delete', id);
        }
      }, function (reason) {
        console.log('Failed to get customer');
        deferred.reject(reason);
      });
      return deferred.promise;
    };

    // Returns a promise to a list of all customers.
    svc.list = function () {
      var deferred = $q.defer();
      if (svc.customers.loaded) {
        deferred.resolve(svc.customers.list);
      } else {
        svc.restangularCustomers.getList().then(function (existingCustomers) {
          svc.customers.list = existingCustomers;
          svc.customers.loaded = true;
          deferred.resolve(svc.customers.list);
        }, function (reason) {
          console.error('Failed to retrieve customer list from backend');
          deferred.reject(reason);
          if (reason.status === 401) {
            $location.path( '/login' );
          }
        });        
      }
      return deferred.promise;
    };

    // Deletes the customer with the provided id.
    // Returns a promise to the delete operation.
    svc.delete = function (id) {
      var removeCustomer = function (customer) {
        return customer.remove()
          .then(function () {
            $rootScope.$broadcast('onCustomerDeleted', customer);
            var index = _.indexOf(svc.customers.list, customer);
            svc.customers.list.splice(index, 1);
          }
        )
      };

      return svc.get(id)
        .then(removeCustomer);
    };

    // Find the customer with the provided name.
    // Returns a promise to a customer.
    svc.findCustomerByName = function(name) {
      return svc.list()
      .then(function (customers) {
        return _.find(customers, function(c) {
          return c.name === name;
        });
      });
    };

    // Find or create customer with name
    svc.findOrCreateCustomerByName = function (name) {
      if (name) {
        return svc.findCustomerByName(name)
        .then(function (customer) {
          if (customer) {
            return customer;
          } 
          else {
            return svc.create({ name: name })
            .then(function (customer) {
              console.info('Created new customer');
              return customer;
            });
          }
        });        
      } else {
        var deferred = $q.defer();
        deferred.reject('Name not specifed');
        return deferred.promise;
      }
    };

    return svc;

  });
