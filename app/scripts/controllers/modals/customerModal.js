'use strict';

angular.module('yoWorktajmApp')
  .controller('CustomerModalCtrl', function ($scope, $modalInstance, modalParams) {
    $scope.title = modalParams.title;
    $scope.text = modalParams.text;
    $scope.customer = modalParams.customer;
    $scope.ok = function () {
      $modalInstance.close($scope.customer);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
