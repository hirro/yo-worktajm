'use strict';

describe('Filter: timeEntryFilter', function () {

  // load the filter's module
  beforeEach(module('yoWorktajmApp'));

  // initialize a new instance of the filter before each test
  var timeEntryFilter;
  beforeEach(inject(function ($filter) {
    timeEntryFilter = $filter('timeEntryFilter');
  }));

  xit('should return the input prefixed with "timeEntryFilter filter:"', function () {
    var text = 'angularjs';
    expect(timeEntryFilter(text)).toBe('timeEntryFilter filter: ' + text);
  });

});
