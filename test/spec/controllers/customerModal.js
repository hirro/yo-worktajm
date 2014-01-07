'use strict';

describe('Controller: CustomerModalCtrl', function () {

  // load the controller's module
  beforeEach(module('yoWorktajmApp'));

  var CustomerModalCtrl, scope;
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
    CustomerModalCtrl = $controller('CustomerModalCtrl', {
      $scope: $scope,
      $modalInstance: $modalInstance,
      modalParams: modalParams
    });
    CustomerModalCtrl.$inject = ['$scope',  '$route', 'TimerService'];
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
