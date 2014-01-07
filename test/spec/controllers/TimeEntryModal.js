'use strict';

describe('Controller: TimeEntryModalCtrl', function () {

  // load the controller's module
  beforeEach(module('yoWorktajmApp'));

  var TimeEntryModalCtrl, scope;
  var timeEntry = {
    id: 2,
    startTime: 1385715694000,
    endTime: 1385716500000
  };
  var $modalInstance = {
    close: function () {

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
    TimeEntryModalCtrl = $controller('TimeEntryModalCtrl', {
      $scope: $scope,
      $modalInstance: $modalInstance,
      timeEntry: timeEntry
    });
    TimeEntryModalCtrl.$inject = ['$scope',  '$route', 'TimerService'];
  }));

  it('should handle ok', function () {
    $scope.timeEntry = timeEntry;
    $scope.ok();

    // Verification of actions
    // expect($scope.endTime).toBe('123');    
    // expect($scope.startTime).toBe('123');    
  });

});
