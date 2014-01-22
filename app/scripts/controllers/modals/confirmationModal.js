'use strict';

angular.module('yoWorktajmApp')
  .controller('ConfirmationModalCtrl', function ($scope, $modalInstance, modalParams) {
    $scope.titleText = modalParams.titleText;
    $scope.messageText = modalParams.messageText;
    $scope.okText = modalParams.okText;
    $scope.cancelText = modalParams.cancelText;
    $scope.ok = function () {
      $modalInstance.close();
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
