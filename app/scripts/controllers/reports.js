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
  .controller('ReportsCtrl', function ($scope, CustomerService, TimerService) {

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
      { id: 'pivot',      name: 'Pivot' }
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
       TimerService.getTimeEntries().then(function (result) {
        $scope.timeEntries = result;
       });
    };

    $scope.loadProjects();
    $scope.loadCustomers();
    $scope.loadTimeEntries();
  });
