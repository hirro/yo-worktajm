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

/*globals _ */

'use strict';

describe('Filter: projectFilter', function () {

  // load the filter's module
  beforeEach(module('yoWorktajmApp'));

  // Constants
  var customers = [
    {
      id: 1,
      name: 'Customer A'
    },
    {
      id: 2,
      name: 'Customer B'
    }
  ];
  var projects = [
    { id:  1, name: 'Project A1', customerId: 1 },
    { id:  2, name: 'Project A2', customerId: 1 },
    { id:  3, name: 'Project B1', customerId: 2 }
  ];

  // initialize a new instance of the filter before each test
  var projectFilter;
  beforeEach(inject(function ($filter) {
    projectFilter = $filter('projectFilter');
  }));

  it('should return all projects if currently selected project is 0', function () {
    var selection = {
      customer: 0
    };
    var filteredProjects = projectFilter(projects, selection);
    console.log('Filtered projects:', filteredProjects);
    expect(filteredProjects).toBe(projects);
  });

  it('should return the project list filtered by customer A', function () {
    var selection = {
      customer: customers[0].id
    };
    var filteredProjects = _.pluck(projectFilter(projects, selection), 'id');
    console.log('Filtered projects:', filteredProjects);
    expect(filteredProjects).toEqual([1, 2]);
  });

});
