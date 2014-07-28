'use strict';

angular.module('worktajmApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        views: {
          '': {
            templateUrl: 'app/dashboard/dashboard.html'
          },
          'projects@dashboard': {
            templateUrl: 'app/dashboard/projects/projects.html',
            controller: 'ProjectsCtrl'
          },
          'timeEntries@dashboard': {
            templateUrl: 'app/dashboard/timeEntries/timeEntries.html'
          },
          'status@dashboard': {
            templateUrl: 'app/dashboard/status/status.html'
          }
        },
        controller: 'DashboardCtrl'
      });
  });