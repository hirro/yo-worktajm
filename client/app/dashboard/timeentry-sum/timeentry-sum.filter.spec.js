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
    var timeEntryList = [
      {
        startTime: moment(1318874398800),
        endTime:   moment(1318874408800)
      },
      {
        startTime: moment(1318874398800),
        endTime:   moment(1318874408800)
      }
    ];
    expect(timeentrySum(timeEntryList)).toBe('0.01');
  });

});
