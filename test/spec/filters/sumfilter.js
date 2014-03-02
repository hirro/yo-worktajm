/*
  @licstart The following is the entire license notice for the 
            JavaScript code in this page.
  @source https://github.com/hirro/yo-worktajm

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

/*globals XDate */

'use strict';

describe('Filter: sumFilter', function () {

  // load the filter's module
  beforeEach(module('yoWorktajmApp'));

  // Constants
  var timeEntries = [
    { id:   1, startTime: new XDate(2014,  1, 10,  0,  0,  0), endTime: new XDate(2014,  1, 10, 0,  30,  0)},
    { id:   2, startTime: new XDate(2014,  1, 10, 12,  0,  0), endTime: new XDate(2014,  1, 10, 12, 30,  0)},
    { id:   3, startTime: new XDate(2014,  1, 10, 23, 59,  0), endTime: new XDate(2014,  1, 10, 23, 59,  0)},
    { id:   4, duration: 3600},
  ];

  // initialize a new instance of the filter before each test
  var sumFilter;
  beforeEach(inject(function ($filter) {
    sumFilter = $filter('sumFilter');
  }));

  it('should return the sum of the array', function () {
    expect(sumFilter(timeEntries)).toBe(7200);
  });

});
