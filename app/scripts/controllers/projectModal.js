'use strict';

angular.module('yoWorktajmApp').controller('ProjectModalCtrl', function ($scope, $modalInstance, modalParams) {
    $scope.title = modalParams.title;
    $scope.text = modalParams.text;
    $scope.project = {
      name: 'sfsf'
    };
    $scope.ok = function () {
      $modalInstance.close($scope.project);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
