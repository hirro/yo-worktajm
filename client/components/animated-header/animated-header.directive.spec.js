'use strict';

describe('Directive: animatedHeader', function () {

  // load the directive's module
  beforeEach(module('worktajmApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should compile successfully', inject(function ($compile) {
    element = angular.element('<section animated-header></section>');
    element = $compile(element)(scope);
  }));
});