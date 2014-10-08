'use strict';

angular.module('worktajmApp')
  .controller('LandingCtrl', function ($scope, Auth, $location, $window) {
    $scope.awesomeThings = [];
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };
    $scope.isAuthenticated = function () {
      return Auth.isLoggedIn();
    };

    // XXX Duplicated from login controller
    $scope.loginOauth = function(provider) {
      console.log('loginOauth - provider [%s]', provider);
      $window.location.href = '/auth/' + provider;
    };

  });