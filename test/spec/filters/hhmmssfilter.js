'use strict';

describe('Filter: hhmmssFilter', function () {

  // load the filter's module
  beforeEach(module('yoWorktajmApp'));

  // initialize a new instance of the filter before each test
  var hhmmssFilter;
  beforeEach(inject(function ($filter) {
    hhmmssFilter = $filter('hhmmssFilter');
  }));

  it('should return the input formatted in duration format', function () {
    var time = 10 + 20*60 + 30*3600;
    expect(hhmmssFilter(time)).toBe('30h 20m 10s');
  });

});
