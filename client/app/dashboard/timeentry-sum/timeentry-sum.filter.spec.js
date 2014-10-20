'use strict';

describe('Filter: timeentrySum', function () {

  // load the filter's module
  beforeEach(module('worktajmApp'));

  // initialize a new instance of the filter before each test
  var timeentrySum;
  beforeEach(inject(function ($filter) {
    timeentrySum = $filter('timeentrySum');
  }));

  it('should return the input prefixed with "timeentrySum filter:"', function () {
    var text = 'angularjs';
    expect(timeentrySum(text)).toBe('timeentrySum filter: ' + text);
  });

});
