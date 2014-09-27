'use strict';

describe('Directive: animatedHeader', function () {

  // load the directive's module and view
  beforeEach(module('worktajmApp'));
  beforeEach(module('app/animated-header/animated-header.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<animated-header></animated-header>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the animatedHeader directive');
  }));
});