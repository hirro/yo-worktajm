'use strict';

describe('Controller: ConfirmationModalCtrl', function () {

  // load the controller's module
  beforeEach(module('yoWorktajmApp'));

  var ConfirmationModalCtrl, scope;
  var modalParams = {
    title: "Title",
    project: {}
  };
  var $modalInstance = {
    close: function () {
    },
    dismiss: function () {      
    }
  };

  var TimerServiceMock = {
    getProjects: function () {
    }
  };

  // Initialize the controller and a mock scope
  var $scope, $q, $modalInstance;
  beforeEach(inject(function ($controller, $rootScope, _$q_) {
    $scope = $rootScope.$new();
    $q = _$q_;
    ConfirmationModalCtrl = $controller('ConfirmationModalCtrl', {
      $scope: $scope,
      $modalInstance: $modalInstance,
      modalParams: modalParams
    });
    ConfirmationModalCtrl.$inject = ['$scope',  '$route', 'TimerService'];
  }));

  it('should handle ok', function () {
    $scope.modalParams = modalParams;
    $scope.ok();

    // Validations
  });

  it('should handle cancel', function () {
    $scope.modalParams = modalParams;
    $scope.cancel();
  });

});
