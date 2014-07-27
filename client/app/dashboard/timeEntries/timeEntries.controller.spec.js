'use strict';

describe('Controller: TimeentriesCtrl', function () {

  // load the controller's module
  beforeEach(module('worktajmApp'));

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
});
