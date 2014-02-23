'use strict';

describe('Filter: groupByProjectsFilter', function () {

  // load the filter's module
  beforeEach(module('yoWorktajmApp'));

  // Constants
  var referenceDay = new XDate(2014, 1, 10, 13, 23, 13);
  var project0  = { id: 1, name: 'Project 0',                   enabled: true };
  var projectA1 = { id: 2, name: 'Project A.1',  customerId: 1, enabled: true };
  var projectA2 = { id: 3, name: 'Project A.2',  customerId: 1, enabled: true };
  var projectB  = { id: 4, name: 'Project B',    customerId: 2, enabled: true };

  var timeEntries = [
    { id:   1, duration: 3600, project: project0 },
    { id:   2, duration: 3600, project: projectA1 },
    { id:   3, duration: 3600, project: projectA2 },
    { id:   4, duration: 3600, project: projectB },
    { id:   5, duration: 3600, project: projectB },
  ];

  // initialize a new instance of the filter before each test
  var groupByProjectsFilter;
  beforeEach(inject(function ($filter) {
    groupByProjectsFilter = $filter('groupByProjectsFilter');
  }));

  it('should return time entries grouped by projecs with updated duration', function () {
    expect(groupByProjectsFilter(timeEntries)).toEqual([
      { name: project0.name,  duration: 3600 },
      { name: projectA1.name, duration: 3600 },
      { name: projectA2.name, duration: 3600 },
      { name: projectB.name,  duration: 7200 },
    ]);
  });

});
