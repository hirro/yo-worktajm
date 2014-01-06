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

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TimeEntryModalCtrl = $controller('TimeEntryModalCtrl', {
      $scope: scope
    });
  }));

  xit('should handle ', function () {
    scope.$broadcast('onEditTimeEntry', timeEntry);
    scope.ModalInstanceCtrl.cancel();
  });

});
