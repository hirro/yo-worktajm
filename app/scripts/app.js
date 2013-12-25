/* globals toastr */
'use strict';

angular.module('yoWorktajmApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  // 'ui.date',
  // 'ui.calendar',
  'restangular',
  'ui.bootstrap.datetimepicker'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/reports', {
        templateUrl: 'views/reports.html',
        controller: 'ReportsCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'ReportsCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      });
    }
  )
  .config(function (RestangularProvider) {
    RestangularProvider.setBaseUrl('http://worktajm.arnellconsulting.dyndns.org:8080/api/api');
  });

// Configure toastr
toastr.options = {
  'closeButton': false,
  'debug': false,
  'positionClass': 'toast-bottom-right',
  'onclick': null,
  'showDuration': '300',
  'hideDuration': '1000',
  'timeOut': '5000',
  'extendedTimeOut': '1000',
  'showEasing': 'swing',
  'hideEasing': 'linear',
  'showMethod': 'fadeIn',
  'hideMethod': 'fadeOut'
};


