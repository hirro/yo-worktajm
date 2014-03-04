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

  var timeEntries = [
    // T-0 (today, thisWeek, thisMonth), two projects with 3, 1 entries
    { id:   1, startTime: new XDate(2014,  1, 10,  0,  0,  0), endTime: new XDate(2014,  1, 10, 0,  30,  0), project: project0 },
    { id:   2, startTime: new XDate(2014,  1, 10, 12,  0,  0), endTime: new XDate(2014,  1, 10, 12, 30,  0), project: projectA1 },
    { id:   3, startTime: new XDate(2014,  1, 10, 23, 59,  0), endTime: new XDate(2014,  1, 10, 23, 59,  0), project: projectA2 },
    { id:   4, startTime: new XDate(2014,  1, 10, 12, 12,  0), endTime: new XDate(2014,  1, 10, 13, 12,  0), project: projectB },
    { id:   5, startTime: new XDate(2014,  1, 10, 14, 34,  0), endTime: new XDate(2014,  1, 10, 15, 34,  0), project: projectB },

    // T-1 (yesterday, lastWeek, thisMonth) one project with 2 entries
    { id:   6, startTime: new XDate(2014,  1,  9,  0,  0,  0), endTime: new XDate(2014,  1,  9,  1,  0,  0), project: projectA1 },
    { id:   7, startTime: new XDate(2014,  1,  9,  0,  0,  0), endTime: new XDate(2014,  1,  9,  1,  0,  0), project: projectA1 },

    // T-2..9 (lastWeek, thisMonth) , one project, one entry
    { id:   8, startTime: new XDate(2014,  1,  8,  0,  0,  0), endTime: new XDate(2014,  1,  8,  1,  0,  0), project: projectA1 },
    { id:   9, startTime: new XDate(2014,  1,  7,  0,  0,  0), endTime: new XDate(2014,  1,  7,  1,  0,  0), project: projectA2 },
    { id:  10, startTime: new XDate(2014,  1,  6,  0,  0,  0), endTime: new XDate(2014,  1,  6,  1,  0,  0), project: projectB },
    { id:  11, startTime: new XDate(2014,  1,  5,  0,  0,  0), endTime: new XDate(2014,  1,  5,  1,  0,  0), project: projectB },
    { id:  12, startTime: new XDate(2014,  1,  4,  0,  0,  0), endTime: new XDate(2014,  1,  4,  1,  0,  0), project: projectB },
    { id:  13, startTime: new XDate(2014,  1,  3,  0,  0,  0), endTime: new XDate(2014,  1,  3,  1,  0,  0), project: projectB },
    // T-14..15 (thisMonth) , one project, one entry
    { id:  14, startTime: new XDate(2014,  1,  2,  0,  0,  0), endTime: new XDate(2014,  1,  2,  1,  0,  0), project: projectB },
    { id:  15, startTime: new XDate(2014,  1,  1,  0,  0,  0), endTime: new XDate(2014,  1,  1,  1,  0,  0), project: projectB },

    // T-16.. (lastMonth) , one project, one entry
    { id:  16, startTime: new XDate(2014,  0, 30,  0,  0,  0), endTime: new XDate(2014,  0, 30,  1,  0,  0), project: projectB },
    { id:  17, startTime: new XDate(2014,  0, 29,  0,  0,  0), endTime: new XDate(2014,  0, 29,  1,  0,  0), project: projectB },
    { id:  18, startTime: new XDate(2014,  0, 28,  0,  0,  0), endTime: new XDate(2014,  0, 28,  1,  0,  0), project: projectB },
    { id:  19, startTime: new XDate(2014,  0, 27,  0,  0,  0), endTime: new XDate(2014,  0, 27,  1,  0,  0), project: projectB },
  ];
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
    spyOn(CustomerServiceMock, 'list').andCallThrough();
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

  it('should group the time entries by project and calculate the sub and total sum', function () {
    var expected = {
      projects: [
        { name:   'Project 0', duration:    1800 },
        { name: 'Project A.1', duration:   12600 },
        { name: 'Project A.2', duration:    3600 },
        { name:   'Project B', duration:   43200 }
      ],
      total: 61200
    };
    var result = scope.groupedByProject(timeEntries);
    expect(result).toEqual(expected);
  });

  it('should generate invoice data for the given input', function () {
    var result = scope.generateInvoice(timeEntries);
    var expected = {
      projects: [
        { name:   'Project 0', duration:    1800 },
        { name: 'Project A.1', duration:   12600 },
        { name: 'Project A.2', duration:    3600 },
        { name:   'Project B', duration:   43200 }
      ],
      totalHours : 17,
      rate : 670,
      totalExclVat : 11390,
      vatPercentage : 0.25,
      additionalVat : 2847.5,
      totalIncVat : 14237.5
    };
    expect(result).toEqual(expected);
  });

});
