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

describe('Filter: groupByProjectsFilter', function () {

  // load the filter's module
  beforeEach(module('yoWorktajmApp'));

  // Constants
  var project0  = { id: 1, name: 'Project 0',                   enabled: true };
  var projectA1 = { id: 2, name: 'Project A.1',  customerId: 1, enabled: true };
  var projectA2 = { id: 3, name: 'Project A.2',  customerId: 1, enabled: true };
  var projectB  = { id: 4, name: 'Project B',    customerId: 2, enabled: true };

  var timeEntries = [
    { id:   1, startTime: new XDate(2014,  1, 10,  0,  0,  0), endTime: new XDate(2014,  1, 10, 0,  30,  0), project: project0 },
    { id:   2, startTime: new XDate(2014,  1, 10, 12,  0,  0), endTime: new XDate(2014,  1, 10, 12, 30,  0), project: projectA1 },
    { id:   3, startTime: new XDate(2014,  1, 10, 23, 59,  0), endTime: new XDate(2014,  1, 10, 23, 59,  0), project: projectA2 },
    { id:   4, startTime: new XDate(2014,  1, 10, 12, 12,  0), endTime: new XDate(2014,  1, 10, 13, 12,  0), project: projectB },
    { id:   5, startTime: new XDate(2014,  1, 10, 14, 34,  0), endTime: new XDate(2014,  1, 10, 15, 34,  0), project: projectB }
  ];

  // initialize a new instance of the filter before each test
  var groupByProjectsFilter;
  beforeEach(inject(function ($filter) {
    groupByProjectsFilter = $filter('groupByProjectsFilter');
  }));

  iit('should return time entries grouped by projecs with updated duration', function () {
    expect(groupByProjectsFilter(timeEntries)).toEqual([
      { name: project0.name,  duration: 3600 },
      { name: projectA1.name, duration: 3600 },
      { name: projectA2.name, duration: 3600 },
      { name: projectB.name,  duration: 7200 },
    ]);
  });

});
