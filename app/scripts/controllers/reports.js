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
    $scope.projects = TimerService.getProjects();
    $scope.selectedTime = {};
    $scope.selectedCustomer = {};
    $scope.selectedProjects = [];

    // Load the available customers
    CustomerService.list().then(function (result) {
      console.log('ReportsCtrl - Loaded customers from service');
      $scope.customers = result;
    });

    $scope.generateReport = function () {
      console.log('Generating report over interval [%s]', $scope.selectedDate);
      console.log('Generating report for customer [%s]', $scope.selectedCustomer);
    };

    $scope.changedCustomer = function () {
      console.log('Changed customer - updating filter?');
    };
  });
