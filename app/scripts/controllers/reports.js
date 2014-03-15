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

/*globals  _, XDate */

'use strict';

angular.module('yoWorktajmApp')
  .controller('ReportsCtrl', function ($scope, $filter, CustomerService, TimerService) {

    // Constants
    $scope.timeChoices = [
      { id: 'today',      name: 'Today' },
      { id: 'yesterday',  name: 'Yesterday' },
      { id: 'thisWeek',   name: 'This week' },
      { id: 'lastWeek',   name: 'Last week' },
      { id: 'thisMonth',  name: 'This month' },
      { id: 'lastMonth',  name: 'Last month' }
    ];
    $scope.reportTypes = [
      { id: 'timesheet',  name: 'Timesheet' },
      { id: 'pivot',      name: 'Pivot' },
      { id: 'invoice',    name: 'Invoice' }
    ];
    $scope.allCustomers ={
      id: 0, 
      name: 'All'
    };    

    // Variables
    $scope.customers = [];
    $scope.projects = {};
    $scope.timeEntries = {};
    $scope.selection = {
      timePeriod: $scope.timeChoices[0].id,
      reportType: $scope.reportTypes[0].id,
      customer: 0
    };
    $scope.selectedCustomers = $scope.allCustomers.id;
    $scope.selectedProjects = {};
    $scope.invoice = {};
    $scope.company = {
      address: {
        name: 'Företaget AB',
        line1: 'Smågatan 1',
        line2: '',
        zip: '123 45',
        city: 'Småstaden',
        country: 'SE'
      },
      invoiceDetails: {
        organizationalNumber: '123456-7890',
        vatNumber: 'SE-123456-7890',
        email: 'accounting@example.com',
        ban: '123-1233.1231.123-3',
        phone: '555-1232'
      }
    };

    // Load the available projects
    $scope.loadProjects = function () {
      $scope.selection.projects = [];
      $scope.projects = _.each(TimerService.getProjects(), function (e) {
        e.enabled = true;
        $scope.selection.projects.push(_.pick(e, 'id', 'name', 'enabled', 'customerId'));
      });
    };

    // Load the available customers
    $scope.loadCustomers = function () {
      CustomerService.list().then(function (result) {
        console.log('ReportsCtrl - Loaded customers from service');
        console.log(result);
        var all = [{ id: 0, name: 'All'}];
        var customers = _.union(all, result);
        $scope.customers = _.each(customers, function (e) {
          e.enabled = true;
        });
      });
    };

    // Load the time entries
    $scope.loadTimeEntries = function () {
      return TimerService.getTimeEntries().then(function (result) {
        $scope.timeEntries = result;
      });
    };

    $scope.changedTimePeriod = function (id, referenceDay) {
      console.log('Time period changed');
      // Filter by date
      if (_.isUndefined(referenceDay)) {
        referenceDay = new XDate();
      }
      var startOfToday = referenceDay.clone().setHours(0).setMinutes(0).setSeconds(0).setMilliseconds(0);
      var endOfToday = referenceDay.clone().setHours(23).setMinutes(59).setSeconds(59).setMilliseconds(999);
      var from, to;
      switch (id) {
        case 'today':
          from = startOfToday;
          to = endOfToday;
          break;
        case 'yesterday':
          to = startOfToday.addDays(-1);
          from = endOfToday.addDays(-1);
          break;
        case 'thisWeek':
          from = new XDate();
          from.setUTCWeek(referenceDay.getWeek(), referenceDay.getFullYear());
          to = new XDate(from).addWeeks(1).addMilliseconds(-1);
          break;
        case 'lastWeek':
          from = new XDate();
          from.setUTCWeek(referenceDay.getWeek()-1, referenceDay.getFullYear());
          to = new XDate(from).addWeeks(1).addMilliseconds(-1);
          break;
        case 'thisMonth':
          from = startOfToday.clone().setDate(1);
          to = from.clone().addMonths(1).addMilliseconds(-1);
          break;
        case 'lastMonth':
          from = startOfToday.clone().setDate(1).addMonths(-1);
          to = from.clone().addMonths(1).addMilliseconds(-1);
          break;
      }      
      $scope.selection.to = to;
      $scope.selection.from = from;
      console.log('changeTimePeriod: from[%s], to[%s]', from.toISOString(), to.toISOString());
      $scope.onChange();
    };

    $scope.onChangedCustomer = function () {
      CustomerService.get($scope.selection.customer).then(function (customer) {
        console.log(customer);
        $scope.customer = customer;
      });
      $scope.onChange();
    };

    $scope.onChangeReportType = function () {
      console.log('onChangeReportType %s', $scope.selection.reportType);
      if ($scope.selection.reportType === 'invoice') {
        if ($scope.customers[0].id === 0) {
          $scope.customers.splice(0, 1);
          if (($scope.selection.customer === 0) && ($scope.customers.length)) {
            $scope.selection.customer = $scope.customers[0].id;
          }
        }
      } else {
        if ($scope.customers[0].id !== 0) {
          var all = { id: 0, name: 'All', enabled: false };
          $scope.customers.splice(0, 0, all);
        }
      }
      $scope.onChange();
    };

    $scope.onChange = function () {
      $scope.filteredTimeEntries = $filter('timeEntryFilter')($scope.timeEntries, $scope.selection);
      $scope.invoice = $filter('invoiceFilter')($scope.filteredTimeEntries);
    };

    $scope.loadProjects();
    $scope.loadCustomers();
    $scope.loadTimeEntries().then(function () {
      console.log('*****************');
      $scope.changedTimePeriod($scope.selection.timePeriod);
      console.log('*****************');
      $scope.onChangedCustomer();
      console.log('*****************');
    });
  });
