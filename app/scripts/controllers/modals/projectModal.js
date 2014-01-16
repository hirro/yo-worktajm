'use strict';

angular.module('yoWorktajmApp').controller('ProjectModalCtrl', function ($scope, $modalInstance, modalParams) {
    $scope.title = modalParams.title;
    $scope.text = modalParams.text;
    $scope.project = {
      name: ''
    };
    $scope.ok = function () {
      // FIXME
      // Make sure project name is unique for the logged in person.
      // If not, set the error status on the input
      //$scope.projectForm.project.$setValidity('uniqueProjectPerUser', false);
      $modalInstance.close($scope.project);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
