'use strict';

angular.module('yoWorktajmApp').controller('ProjectModalCtrl', function ($scope, $modalInstance, modalParams) {
    $scope.titleText = modalParams.titleText;
    $scope.messageText = modalParams.messageText;
    $scope.okText = modalParams.okText;
    $scope.cancelText = modalParams.cancelText;
    $scope.project = {
      name: modalParams.project.name,
      rate: modalParams.project.rate,
      description: modalParams.project.description
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
