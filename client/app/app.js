'use strict';

angular.module('worktajmApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.bootstrap',
  'btford.socket-io',
  'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        console.log('AAA 1');
        if ($cookieStore.get('token')) {
          console.log('AAA 2');
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        console.log('AAA 3');
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      console.debug('$stateChangeStart, logged in [%s]', Auth.isLoggedIn());
      console.debug(event);
      console.debug(next);

      if (next.authenticate && !Auth.isLoggedIn()) {
        console.log('Redirecting to login');
        $location.path('/login');
      }

      if ((next.name == 'main') && Auth.isLoggedIn()) {
        console.log('ZZZZZZZZ');
        $location.path('/dashboard');
      }
    });
  });