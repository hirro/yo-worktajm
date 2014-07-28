'use strict';

angular.module('worktajmApp')
  .controller('ProjectsCtrl', function ($scope, Timer) {
    $scope.message = 'Hello';

    $scope.projects = [];
    Timer.getMyProjects().then(function (result) {
      $scope.projects = result;
    });

    $scope.createProject = function () {
      console.log('createProject');
    };

  });
