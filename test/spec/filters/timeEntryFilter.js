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

/*globals _, XDate */

'use strict';

describe('Filter: timeEntryFilter', function () {

  // load the filter's module
  beforeEach(module('yoWorktajmApp'));

  // Constants
  var referenceDay = new XDate(2014, 1, 10, 13, 23, 13);
  var project0  = { id: 1, name: 'Project 0',                   enabled: true };
  var projectA1 = { id: 2, name: 'Project A.1',  customerId: 1, enabled: true };
  var projectA2 = { id: 3, name: 'Project A.2',  customerId: 1, enabled: true };
  var projectB  = { id: 4, name: 'Project B',    customerId: 2, enabled: true };

  var timeEntries = [
    // T-0 (today, thisWeek, thisMonth), two projects with 3, 1 entries
    { id:   1, startTime: new XDate(2014,  1, 10,  0,  0,  0), endTime: new XDate(2014,  1, 10, 0,  30,  0), project: project0 },
    { id:   2, startTime: new XDate(2014,  1, 10, 12,  0,  0), endTime: new XDate(2014,  1, 10, 12, 30,  0), project: projectA1 },
    { id:   3, startTime: new XDate(2014,  1, 10, 23, 59,  0), endTime: new XDate(2014,  1, 10, 23, 59,  0), project: projectA2 },
    { id:   4, startTime: new XDate(2014,  1, 10, 12, 12,  0), endTime: new XDate(2014,  1, 10, 13, 12,  0), project: projectB },
    { id:   5, startTime: new XDate(2014,  1, 10, 14, 34,  0), endTime: new XDate(2014,  1, 10, 15, 34,  0), project: projectB },

    // T-1 (yesterday, lastWeek, thisMonth) one project with 2 entries
    { id:   6, startTime: new XDate(2014,  1,  9,  0,  0,  0), endTime: new XDate(2014,  1,  9,  1,  0,  0), project: projectA1 },
    { id:   7, startTime: new XDate(2014,  1,  9,  0,  0,  0), endTime: new XDate(2014,  1,  9,  1,  0,  0), project: projectA1 },

    // T-2..9 (lastWeek, thisMonth) , one project, one entry
    { id:   8, startTime: new XDate(2014,  1,  8,  0,  0,  0), endTime: new XDate(2014,  1,  8,  1,  0,  0), project: projectA1 },
    { id:   9, startTime: new XDate(2014,  1,  7,  0,  0,  0), endTime: new XDate(2014,  1,  7,  1,  0,  0), project: projectA2 },
    { id:  10, startTime: new XDate(2014,  1,  6,  0,  0,  0), endTime: new XDate(2014,  1,  6,  1,  0,  0), project: projectB },
    { id:  11, startTime: new XDate(2014,  1,  5,  0,  0,  0), endTime: new XDate(2014,  1,  5,  1,  0,  0), project: projectB },
    { id:  12, startTime: new XDate(2014,  1,  4,  0,  0,  0), endTime: new XDate(2014,  1,  4,  1,  0,  0), project: projectB },
    { id:  13, startTime: new XDate(2014,  1,  3,  0,  0,  0), endTime: new XDate(2014,  1,  3,  1,  0,  0), project: projectB },
    // T-14..15 (thisMonth) , one project, one entry
    { id:  14, startTime: new XDate(2014,  1,  2,  0,  0,  0), endTime: new XDate(2014,  1,  2,  1,  0,  0), project: projectB },
    { id:  15, startTime: new XDate(2014,  1,  1,  0,  0,  0), endTime: new XDate(2014,  1,  1,  1,  0,  0), project: projectB },

    // T-16.. (lastMonth) , one project, one entry
    { id:  16, startTime: new XDate(2014,  0, 30,  0,  0,  0), endTime: new XDate(2014,  0, 30,  1,  0,  0), project: projectB },
    { id:  17, startTime: new XDate(2014,  0, 29,  0,  0,  0), endTime: new XDate(2014,  0, 29,  1,  0,  0), project: projectB },
    { id:  18, startTime: new XDate(2014,  0, 28,  0,  0,  0), endTime: new XDate(2014,  0, 28,  1,  0,  0), project: projectB },
    { id:  19, startTime: new XDate(2014,  0, 27,  0,  0,  0), endTime: new XDate(2014,  0, 27,  1,  0,  0), project: projectB },
  ];

  // initialize a new instance of the filter before each test
  var timeEntryFilter;
  beforeEach(inject(function ($filter) {
    timeEntryFilter = $filter('timeEntryFilter');
  }));

  it('should return entries for specified period and all customers', function () {
    var selection = {
      from:       new XDate(2014,  1, 10,  0,  0,  0),
      to:         new XDate(2014,  1, 11,  0,  0,  0),
      reportType: 'timesheet',
      customer: 0,
      projects: [
        project0,
        projectA1,
        projectA2,
        projectB
      ]
    };
    var filtered = timeEntryFilter(timeEntries, selection);
    expect(_.pluck(filtered, 'id')).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return entries for specified period and customers 1', function () {
    var selection = {
      from:       new XDate(2014,  1, 10,  0,  0,  0),
      to:         new XDate(2014,  1, 11,  0,  0,  0),
      reportType: 'timesheet',
      customer: 1,
      projects: [
        project0,
        projectA1,
        projectA2,
        projectB
      ]
    };
    var filtered = timeEntryFilter(timeEntries, selection, referenceDay);
    expect(_.pluck(filtered, 'id')).toEqual([2, 3]);
  });

  it('should return entries for specified period and customers 1', function () {
    var selection = {
      from:       new XDate(2014,  1, 10,  0,  0,  0),
      to:         new XDate(2014,  1, 11,  0,  0,  0),
      reportType: 'timesheet',
      customer: 0, 
      projects: [
        projectA1,
        projectA2,
      ]
    };
    var filtered = timeEntryFilter(timeEntries, selection, referenceDay);
    expect(_.pluck(filtered, 'id')).toEqual([2, 3]);
  });

});
