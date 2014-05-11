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

/*globals  XDate */

'use strict';

describe('Controller: ReportsCtrl', function () {

  // load the controller's module
  beforeEach(module('yoWorktajmApp'));

  // Constants
  var project0  = { id: 1, name: 'Project 0',                   enabled: true };
  var projectA1 = { id: 2, name: 'Project A.1',  customerId: 1, enabled: true };
  var projectA2 = { id: 3, name: 'Project A.2',  customerId: 1, enabled: true };
  var projectB  = { id: 4, name: 'Project B',    customerId: 2, enabled: true };

  var customers = [
    { id:   1, name:   'A' },
    { id:   2, name:   'B' }
  ];
  var projects = [
    project0, projectA1, projectA2, projectB
  ];

  // Variables
  var ReportsCtrl, scope, q;

  // Mocks
  var CustomerServiceMock = {
    list: function () {
      var deferred = q.defer();
      deferred.resolve(customers);
      return deferred.promise;
    },
    get: function (id) {
      var deferred = q.defer();
      deferred.resolve(customers[id]);
      return deferred.promise;
    }
  };
  var TimerServiceMock = {
    getTimeEntries: function () {
      var deferred = q.defer();
      deferred.resolve(customers);
      return deferred.promise;
    },
    getProjects: function () {
      var deferred = q.defer();
      deferred.resolve(projects);
      return deferred.promise;
    }
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    q = $q;
    ReportsCtrl = $controller('ReportsCtrl', {
      $scope: scope,
      TimerService: TimerServiceMock,
      CustomerService: CustomerServiceMock
    });
  }));

  it('should initialize correctly', function () {
    spyOn(CustomerServiceMock, 'list').and.callThrough();
    scope.customers = [];
    scope.loadCustomers();
    scope.$digest();
    expect(scope.customers[0]).toEqual({ id: 0, name: 'All', enabled: true});
    scope.customers.splice(0, 1);
    expect(scope.customers).toEqual(customers);
    expect(CustomerServiceMock.list).toHaveBeenCalled();
  });

  it('should calculate correct values for today', function () {
    var date = new XDate(2013, 5, 10, 13,  30,  0, true);
    scope.changedTimePeriod('today', date);
    expect(scope.selection.from.toISOString()).toBe('2013-06-10T00:00:00Z');
    expect(scope.selection.to.toISOString()).toBe('2013-06-10T23:59:59.999Z');
  });

  it('should calculate correct values for yesterday', function () {
    var date = new XDate(2013, 5, 10, 13,  30,  0, true);
    scope.changedTimePeriod('yesterday', date);
    expect(scope.selection.from.toISOString()).toBe('2013-06-09T23:59:59.999Z');
    expect(scope.selection.to.toISOString()).toBe('2013-06-09T00:00:00Z');
  });

  it('should calculate correct values for thisWeek', function () {
    var date = new XDate(2013, 5, 10, 13,  30,  0, true);
    scope.changedTimePeriod('thisWeek', date);
    expect(scope.selection.from.toISOString()).toBe('2013-06-10T00:00:00Z');
    expect(scope.selection.to.toISOString()).toBe('2013-06-16T23:59:59.999Z');
  });

  it('should calculate correct values for lastWeek', function () {
    var date = new XDate(2013, 5, 10, 13,  30,  0, true);
    scope.changedTimePeriod('lastWeek', date);
    expect(scope.selection.from.toISOString()).toBe('2013-06-03T00:00:00Z');
    expect(scope.selection.to.toISOString()).toBe('2013-06-09T23:59:59.999Z');
  });

  it('should calculate correct values for thisMonth', function () {
    var date = new XDate(2013, 5, 10, 13,  30,  0, true);
    scope.changedTimePeriod('thisMonth', date);
    expect(scope.selection.from.toISOString()).toBe('2013-06-01T00:00:00Z');
    expect(scope.selection.to.toISOString()).toBe('2013-06-30T23:59:59.999Z');
  });

  it('should calculate correct values for lastMonth', function () {
    var date = new XDate(2013, 5, 10, 13,  30,  0, true);
    scope.changedTimePeriod('lastMonth', date);
    expect(scope.selection.from.toISOString()).toBe('2013-05-01T00:00:00Z');
    expect(scope.selection.to.toISOString()).toBe('2013-05-31T23:59:59.999Z');
  });

  describe('onChangeReportType', function () {
    beforeEach(function () {
      scope.loadProjects();
      scope.loadCustomers();
      scope.loadTimeEntries();
      scope.$digest();
    });

    it('should handle the onChangeReportType to !invoice', function () {

      // Initialization
      scope.selection.reportType = '_invoice';
      scope.onChangeReportType();
      expect(scope.customers[0]).toEqual({
        id: 0,
        name: 'All',
        enabled: true
      });

      // Set invoice type
      scope.selection.reportType = 'invoice';
      scope.onChangeReportType();
      expect(scope.customers).toEqual(customers);

      // Set pivot
      scope.selection.reportType = 'pivot';
      scope.onChangeReportType();
      expect(scope.customers[0]).toEqual({
        id: 0,
        name: 'All',
        enabled: false
      });
    });
  });

});
