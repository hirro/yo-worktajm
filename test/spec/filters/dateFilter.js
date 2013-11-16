/*
  @licstart The following is the entire license notice for the 
            JavaScript code in this page.
  @source TBD

  Copyright (C) 2013 Jim Arnell.

  The JavaScript code in this page is free software: you can
  redistribute it and/or modify it under the terms of the GNU
  General Public License (GNU GPL) as published by the Free Software
  Foundation, either version 3 of the License, or (at your option)
  any later version.  The code is distributed WITHOUT ANY WARRANTY;
  without even the implied warranty of MERCHANTABILITY or FITNESS
  FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

  As additional permission under GNU GPL version 3 section 7, you
  may distribute non-source (e.g., minimized or compacted) forms of
  that code without the copy of the GNU GPL normally required by
  section 4, provided you include this license notice and a URL
  through which recipients can access the Corresponding Source.

  @licend The above is the entire license notice
          for the JavaScript code in this page.  
*/

/*globals describe, beforeEach, inject, it, expect */
'use strict';

describe('Filter: dateFilter', function () {

  // Test constants
  var timeEntries = [
    { startTime: new Date('1/1/1970') },
    { startTime: new Date('1/1/1970') },
    { startTime: new Date('1/1/1971') },
    { startTime: new Date('1/1/1972') },
    { startTime: new Date('1/1/1972') },
    { startTime: new Date('1/1/1972') }
  ];

  // load the filter's module
  beforeEach(module('tpsApp'));

  // initialize a new instance of the filter before each test
  var dateFilter;
  beforeEach(inject(function ($filter) {
    dateFilter = $filter('dateFilter');
  }));

  it('should return the filtered dates for ../1970', function () {
    var filterEvaluation1 = dateFilter(timeEntries, new Date('1/1/1970'));
    expect(filterEvaluation1.length).toBe(2);
  });

  it('should return the filtered dates for ../1971', function () {
    var filterEvaluation1 = dateFilter(timeEntries, new Date('1/1/1971'));
    expect(filterEvaluation1.length).toBe(1);
  });

  it('should return the filtered dates for ../1972', function () {
    var filterEvaluation1 = dateFilter(timeEntries, new Date('1/1/1972'));
    expect(filterEvaluation1.length).toBe(3);
  });

  it('should return the filtered dates for ../1973', function () {
    var filterEvaluation1 = dateFilter(timeEntries, new Date('1/1/1973'));
    expect(filterEvaluation1.length).toBe(0);
  });
});
