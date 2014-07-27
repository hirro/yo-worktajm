'use strict';

angular.module('worktajmApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('reports', {
        url: '/reports',
        views: {
        	'': {
        		templateUrl: 'app/reports/reports.html'
        	},
          'projects@reports': {
            template: '<h1>My Contacts</h1>'
          },
          'timeEntries@reports': {
            template: '<h1>My Contacts</h1>'
          },
          'status@reports': {
            template: '<h1>My Contacts</h1>'
          }
        }
      });
  });