'use strict';

describe('Directive: registerSubmit', function () {

  // load the directive's module
  beforeEach(module('yoWorktajmApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<form register-submit="hej()">this is the registerSubmit directive</form>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the registerSubmit directive');
  }));
});
