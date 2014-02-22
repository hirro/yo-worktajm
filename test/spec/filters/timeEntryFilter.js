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

ddescribe('Filter: timeEntryFilter', function () {

  // load the filter's module
  beforeEach(module('yoWorktajmApp'));

  // Constants
  var referenceDay = new XDate(2014, 1, 10, 13, 23, 13);
  var timeEntries = [
    // T-0 (today, thisWeek, thisMonth), two projects with 3, 1 entries
    { id:   1, startTime: new XDate(2014,  1, 10,  0,  0,  0), projectId: 1 },
    { id:   2, startTime: new XDate(2014,  1, 10, 12,  0,  0), projectId: 1 },
    { id:   3, startTime: new XDate(2014,  1, 10, 23, 59,  0), projectId: 1 },
    { id:   4, startTime: new XDate(2014,  1, 10, 12, 12,  0), projectId: 2 },
    { id:   5, startTime: new XDate(2014,  1, 10, 14, 34,  0), projectId: 2 },

    // T-1 (yesterday, lastWeek, thisMonth) one project with 2 entries
    { id:   6, startTime: new XDate(2014,  1,  9,  0,  0,  0), projectId: 1 },
    { id:   7, startTime: new XDate(2014,  1,  9,  0,  0,  0), projectId: 1 },

    // T-2..9 (lastWeek, thisMonth) , one project, one entry
    { id:   8, startTime: new XDate(2014,  1,  8,  0,  0,  0), projectId: 1 },
    { id:   9, startTime: new XDate(2014,  1,  7,  0,  0,  0), projectId: 1 },
    { id:  10, startTime: new XDate(2014,  1,  6,  0,  0,  0), projectId: 2 },
    { id:  11, startTime: new XDate(2014,  1,  5,  0,  0,  0), projectId: 2 },
    { id:  12, startTime: new XDate(2014,  1,  4,  0,  0,  0), projectId: 2 },
    { id:  13, startTime: new XDate(2014,  1,  3,  0,  0,  0), projectId: 2 },
    // T-14..15 (thisMonth) , one project, one entry
    { id:  14, startTime: new XDate(2014,  1,  2,  0,  0,  0), projectId: 2 },
    { id:  15, startTime: new XDate(2014,  1,  1,  0,  0,  0), projectId: 2 },

    // T-16.. (lastMonth) , one project, one entry
    { id:  16, startTime: new XDate(2014,  0, 30,  0,  0,  0), projectId: 2 },
    { id:  17, startTime: new XDate(2014,  0, 29,  0,  0,  0), projectId: 2 },
    { id:  18, startTime: new XDate(2014,  0, 28,  0,  0,  0), projectId: 2 },
    { id:  19, startTime: new XDate(2014,  0, 27,  0,  0,  0), projectId: 2 },
  ];

  // initialize a new instance of the filter before each test
  var timeEntryFilter;
  beforeEach(inject(function ($filter) {
    timeEntryFilter = $filter('timeEntryFilter');
  }));

  it('should return all time entries today for all customers', function () {
    var selection = {
      timePeriod: 'today',
      reportType: 'timesheet',
      customer: 1
    };
    var filtered = timeEntryFilter(timeEntries, selection, referenceDay);
    expect(_.pluck(filtered, 'id')).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return all time entries yesterday for all customers', function () {
    var selection = {
      timePeriod: 'yesterday',
      reportType: 'timesheet',
      customer: 1
    };
    var filtered = timeEntryFilter(timeEntries, selection, referenceDay);
    expect(_.pluck(filtered, 'id')).toEqual([6, 7]);
  });

  it('should return all time entries this week for all customers', function () {
    var selection = {
      timePeriod: 'thisWeek',
      reportType: 'timesheet',
      customer: 1
    };
    var filtered = timeEntryFilter(timeEntries, selection, referenceDay);
    expect(_.pluck(filtered, 'id')).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return all time entries last week for all customers', function () {
    var selection = {
      timePeriod: 'lastWeek',
      reportType: 'timesheet',
      customer: 1
    };
    var filtered = timeEntryFilter(timeEntries, selection, referenceDay);
    expect(_.pluck(filtered, 'id')).toEqual([6, 7, 8, 9, 10, 11, 12, 13]);
  });

  it('should return all time entries this month for all customers', function () {
    var selection = {
      timePeriod: 'thisMonth',
      reportType: 'timesheet',
      customer: 1
    };
    var filtered = timeEntryFilter(timeEntries, selection, referenceDay);
    expect(_.pluck(filtered, 'id')).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  });

  it('should return all time entries last month for all customers', function () {
    var selection = {
      timePeriod: 'lastMonth',
      reportType: 'timesheet',
      customer: 1
    };
    var filtered = timeEntryFilter(timeEntries, selection, referenceDay);
    expect(_.pluck(filtered, 'id')).toEqual([16, 17, 18, 19]);
  });

});
