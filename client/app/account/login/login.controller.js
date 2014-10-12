'use strict';

angular.module('worktajmApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window, $state) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        console.log('Calling Auth.login');
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          console.log('login - Logged in, redirect to home');
          $state.go('main.authenticated');
        })
        .catch( function(err) {
          console.log('login - error');
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      console.log('loginOauth - provider [%s]', provider);
      $window.location.href = '/auth/' + provider;
    };
  });
