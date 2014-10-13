'use strict';

angular.module('worktajmApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
  
    $scope.unauthenticatedMenu = [
      {'title': 'Home', 'link': '/'}
    ];

    $scope.authenticatedMenu = [
      {'title': 'Home', 'link': '/dashboard'},
      {'title': 'Reports', 'link': '/reports'}
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.toggleNavbar = function() {
      console.log('toggleNavbar');
      $scope.isCollapsed = !$scope.isCollapsed;
    };
    
  });