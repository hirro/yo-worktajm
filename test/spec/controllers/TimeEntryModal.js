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

  it('should handle ', function () {

    scope.$broadcast('onEditTimeEntry', timeEntry);

    // // Start date in GMT time
    // // Time is supposed to be 2013-11-29 09:01 GMT
    // expect(scope.timeEntryForm.startDate.getYear()).toBe(113);
    // expect(scope.timeEntryForm.startDate.getMonth()).toBe(10);
    // expect(scope.timeEntryForm.startDate.getDate()).toBe(29);
    // expect(scope.timeEntryForm.startDate.getHours()).toBe(10);
    // expect(scope.timeEntryForm.startDate.getMinutes()).toBe(1);

    // // End date in GMT time
    // // Time is supposed to be 2013-11-29 09:15 GMT
    // expect(scope.timeEntryForm.endDate.getYear()).toBe(113);
    // expect(scope.timeEntryForm.endDate.getMonth()).toBe(10);
    // expect(scope.timeEntryForm.endDate.getDate()).toBe(29);
    // expect(scope.timeEntryForm.endDate.getHours()).toBe(10);
    // expect(scope.timeEntryForm.endDate.getMinutes()).toBe(15);

    // // Project names should be returned?
    // expect(scope.timeEntryForm.projects.length).toBe(3);
    // expect(scope.timeEntryForm.projects[0]).toBe('Project A');
    // expect(scope.timeEntryForm.projects[1]).toBe('Project B');
    // expect(scope.timeEntryForm.projects[2]).toBe('Project C');

    // // Form show be visible
    // expect(scope.showTimeEntryForm).toBe(true);    
  });

});
