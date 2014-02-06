/*
  @licstart The following is the entire license notice for the 
      JavaScript code in this page.
  @source https://github.com/hirro/yo-worktajm

  Copyright (C) 2013 Jim Arnell.

  The JavaScript code in this page is free software: you can
  redistribute it and/or modify it under the terms of the GNU
  General Public License (GNU GPL) as published by the Free Software
  Foundation, either version 3 of the License, or (at your option)
  any later version.  The code is distributed WITHOUT ANY WARRANTY;
  without even the implied warranty of MERCHANTABILITY or FITNESS
  FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

  As additional permission under GNU GPL version 3 section 7, you
  may distribute non-source (e.g., minimized or compacted) forms of
  that code without the copy of the GNU GPL normally required by
  section 4, provided you include this license notice and a URL
  through which recipients can access the Corresponding Source.

  @licend The above is the entire license notice
      for the JavaScript code in this page.  
*/

/* globals angular, toastr */
'use strict';

angular.module('yoWorktajmApp')
  .controller('LoginCtrl', function ($scope, $rootScope, Restangular, $location, PersonService) {

  var devMode = true;
  if (devMode) {
    $scope.username = 'demo@worktajm.com';
    $scope.password = 'password';
  }

  $scope.login = function () {
    console.log('login(username [%s], password [%s])', $scope.username, $scope.password);
    PersonService.login($scope.username, $scope.password).then(function (user) {
      console.log('LoginCtrl::login - Successfully authenticated, user: %s', $scope.username);
      $location.path( '/dashboard' );
      toastr.success('Successfully logged in as ' + $scope.username);
    }, function (reason) {
      toastr.error('Authentication failed');
      console.error(reason);
      $rootScope.principal = null;
      $location.path( '/login' );
    });
  };

  $scope.logout = function () {
    PersonService.logout();
    $scope.user = null;
  };

  $scope.isActive = function (viewLocation) {
    var active = (viewLocation === $location.path());
    return active;
  };  

  $scope.showUserProfile = function () {
    console.log('LoginCtrl::showUserProfile');
  };

  //
  // @start Event handlers
  //
  $scope.$on('onLoggedOut', function () {
    console.info('EVENT: LoginCtrl::onLoggedOut()');
    $location.path( '/login' );
  });

});