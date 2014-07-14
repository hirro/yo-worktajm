'use strict';

angular.module('worktajmApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('reports', {
        url: '/reports',
        templateUrl: 'app/reports/reports.html',
        controller: 'ReportsCtrl'
      });
  });