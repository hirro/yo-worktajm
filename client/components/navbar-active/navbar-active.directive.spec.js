'use strict';

describe('Directive: navbarActive', function () {

  // load the directive's module
  beforeEach(module('worktajmApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<navbar-active></navbar-active>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the navbarActive directive');
  }));
});