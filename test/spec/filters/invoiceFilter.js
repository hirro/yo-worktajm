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

describe('Filter: invoiceFilter', function () {

  // load the filter's module
  beforeEach(module('yoWorktajmApp'));

  // Constants
  var project0  = { id: 1, name: 'Project 0',                   enabled: true, rate:  750 };
  var projectA1 = { id: 2, name: 'Project A.1',  customerId: 1, enabled: true, rate:  850 };
  var projectA2 = { id: 3, name: 'Project A.2',  customerId: 1, enabled: true, rate:  950 };
  var projectB  = { id: 4, name: 'Project B',    customerId: 2, enabled: true, rate: 1050 };

  var timeEntries = [
    // Project 0
    // Duration: 30*60 = 1800
    { id:   1, startTime: new XDate(2014,  1, 10,  0,  0,  0), endTime: new XDate(2014,  1, 10, 0,  30,  0), project: project0 },
    //
    // Project A1
    // Duration: 30*60 = 1800
    { id:   2, startTime: new XDate(2014,  1, 10, 12,  0,  0), endTime: new XDate(2014,  1, 10, 12, 30,  0), project: projectA1 },
    //
    // Project A2
    // Duration: 0
    { id:   3, startTime: new XDate(2014,  1, 10, 23, 59,  0), endTime: new XDate(2014,  1, 10, 23, 59,  0), project: projectA2 },
    //
    // Project B
    // Duration: 2h = 7200
    { id:   4, startTime: new XDate(2014,  1, 10, 12, 12,  0), endTime: new XDate(2014,  1, 10, 13, 12,  0), project: projectB },
    { id:   5, startTime: new XDate(2014,  1, 10, 14, 34,  0), endTime: new XDate(2014,  1, 10, 15, 34,  0), project: projectB }
  ];

  // initialize a new instance of the filter before each test
  var invoiceFilter;
  beforeEach(inject(function ($filter) {
    invoiceFilter = $filter('invoiceFilter');
  }));

  it('should return time entries grouped by projecs with updated duration', function () {
    expect(invoiceFilter(timeEntries)).toEqual({
      projects: [
        { name: project0.name,  duration: 1800, rate:  750, subTotal:  375 },
        { name: projectA1.name, duration: 1800, rate:  850, subTotal:  425 },
        { name: projectA2.name, duration:    0, rate:  950, subTotal:    0 },
        { name: projectB.name,  duration: 7200, rate: 1050, subTotal: 2100 }
      ],
      totalTimeInSeconds : 10800,
      totalAmountExclVat : 2900,
      vatPercentage : 0.25,
      additionalVat : 725,
      totalIncVat : 3625
    });
  });

});
