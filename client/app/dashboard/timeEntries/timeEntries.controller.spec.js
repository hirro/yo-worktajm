'use strict';

describe('Controller: TimeentriesCtrl', function () {

  // load the controller's module
  beforeEach(module('worktajmApp'));
  beforeEach(module('socketMock'));

  var TimeentriesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TimeentriesCtrl = $controller('TimeentriesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });

  it('should calculate time difference correctly 1', function () {
    expect(
      scope.duration({
        startTime: '2014-10-19T22:40:46.000Z',
        endTime: '2014-10-19T22:40:47.613Z'
      })
    ).toBe('0:00:01');
  });

  it('should calculate time difference correctly 2', function () {
    expect(
      scope.duration({
        startTime: '2014-10-19T22:59:40.770Z',
        endTime: '2014-10-19T23:00:47.499Z'
      })
    ).toBe('0:01:06');
  });
});
