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
    $scope.timeChoices = [
      { id: 'today',      name: 'Today' },
      { id: 'yesterday',  name: 'Yesterday' },
      { id: 'thisWeek',   name: 'This week' },
      { id: 'lastWeek',   name: 'Last week' },
      { id: 'thisMonth',  name: 'This month' },
      { id: 'lastMonth',  name: 'Last month' }
    ];
    $scope.customers = [];
    $scope.projects = _.each(TimerService.getProjects(), function (e) {
      e.enabled = true;
    });
    $scope.selectedTime = {};
    $scope.selectedCustomer = {};
    $scope.selectedProjects = {};

    // Load the available customers
    CustomerService.list().then(function (result) {
      console.log('ReportsCtrl - Loaded customers from service');
      var all = [{ id: 0, name: 'All'}];
      $scope.customers = _.union(all, result);
    });

    $scope.generateReport = function () {
      console.log('Generating report over interval [%s]', $scope.selectedDate);
      console.log('Generating report for customer [%s]', $scope.selectedCustomer);
    };

    $scope.changedCustomer = function () {
      console.log('Changed customer - updating filter?');
    };

    $scope.enabledProjects = function () {
      return _.pluck(_.where($scope.projects, { enabled: true }), 'name');
    };
  });
