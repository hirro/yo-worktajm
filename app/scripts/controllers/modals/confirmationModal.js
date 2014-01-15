'use strict';

angular.module('yoWorktajmApp')
  .controller('ConfirmationModalCtrl', function ($scope, $modalInstance, modalParams) {
    $scope.title = modalParams.title;
    $scope.text = modalParams.text;
    $scope.ok = function () {
      $modalInstance.close();
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
