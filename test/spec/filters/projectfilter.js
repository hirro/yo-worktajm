'use strict';

describe('Filter: projectFilter', function () {

  // load the filter's module
  beforeEach(module('yoWorktajmApp'));

  // initialize a new instance of the filter before each test
  var projectFilter;
  beforeEach(inject(function ($filter) {
    projectFilter = $filter('projectFilter');
  }));

  it('should return the input prefixed with "projectFilter filter:"', function () {
    var text = 'angularjs';
    expect(projectFilter(text)).toBe('projectFilter filter: ' + text);
  });

});
