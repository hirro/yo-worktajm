'use strict';

angular.module('worktajmApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('landing', {
        url: '/landing',
        templateUrl: 'app/landing/landing.html',
        controller: 'DashboardCtrl'
      });
  });