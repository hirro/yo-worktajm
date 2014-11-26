'use strict';

describe('Service: Report', function () {

  // load the service's module
  beforeEach(module('worktajmApp'));

  // instantiate service
  var Report;
  beforeEach(inject(function (_Report_) {
    Report = _Report_;
  }));

  var projectA = { _id: '2234234', name: 'Project A' },
      projectB = { _id: '2234235', name: 'Project B' };

  var user = {
    _id: 5345,
    name: 'User A'
  };

  var timeEntries = [
    // Week 40 (1A, 2B)
    { startTime: '2014-09-29T09:00:00.000Z', endTime: '2014-09-29T17:00:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-29T09:00:00.000Z', endTime: '2014-09-29T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-29T09:00:00.000Z', endTime: '2014-09-29T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    // Week 39 (8A, 3B)
    { startTime: '2014-09-26T09:00:00.000Z', endTime: '2014-09-26T17:00:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-26T09:00:00.000Z', endTime: '2014-09-26T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-25T09:00:00.000Z', endTime: '2014-09-25T17:00:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-25T09:00:00.000Z', endTime: '2014-09-25T17:00:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-24T09:00:00.000Z', endTime: '2014-09-24T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-24T09:00:00.000Z', endTime: '2014-09-24T17:00:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-23T09:00:00.000Z', endTime: '2014-09-23T17:00:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-23T09:00:00.000Z', endTime: '2014-09-23T17:00:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-22T09:00:00.000Z', endTime: '2014-09-22T17:00:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-22T09:00:00.000Z', endTime: '2014-09-22T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-22T09:00:00.000Z', endTime: '2014-09-22T17:00:00.000Z', createdBy: user, projectId: projectA._id },
    // Week 38 (3A, 7B)
    { startTime: '2014-09-19T09:00:00.000Z', endTime: '2014-09-19T17:00:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-19T09:00:00.000Z', endTime: '2014-09-19T17:00:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-18T09:00:00.000Z', endTime: '2014-09-18T17:00:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-18T09:00:00.000Z', endTime: '2014-09-18T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-17T09:00:00.000Z', endTime: '2014-09-17T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-17T09:00:00.000Z', endTime: '2014-09-17T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-17T09:00:00.000Z', endTime: '2014-09-17T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-17T09:00:00.000Z', endTime: '2014-09-17T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-16T09:00:00.000Z', endTime: '2014-09-16T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-16T09:00:00.000Z', endTime: '2014-09-16T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    // Week 37 (5A, 6B)
    { startTime: '2014-09-10T09:00:00.000Z', endTime: '2014-09-10T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-10T09:00:00.000Z', endTime: '2014-09-10T17:00:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-09T09:00:00.000Z', endTime: '2014-09-09T17:00:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-09T09:00:00.000Z', endTime: '2014-09-09T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-08T09:00:00.000Z', endTime: '2014-09-08T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-08T09:00:00.000Z', endTime: '2014-09-08T17:00:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-08T09:00:00.000Z', endTime: '2014-09-08T17:00:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-08T09:00:00.000Z', endTime: '2014-09-08T17:00:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-08T09:00:00.000Z', endTime: '2014-09-08T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-08T09:00:00.000Z', endTime: '2014-09-08T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-08T09:00:00.000Z', endTime: '2014-09-08T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    // Week 36 (7A, 7B)
    { startTime: '2014-09-05T09:00:00.000Z', endTime: '2014-09-05T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-05T09:00:00.000Z', endTime: '2014-09-05T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-05T09:00:00.000Z', endTime: '2014-09-05T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-04T09:00:00.000Z', endTime: '2014-09-04T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-04T09:00:00.000Z', endTime: '2014-09-04T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-04T09:00:00.000Z', endTime: '2014-09-04T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-03T09:00:00.000Z', endTime: '2014-09-03T17:00:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-03T09:00:00.000Z', endTime: '2014-09-03T17:00:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-03T09:00:00.000Z', endTime: '2014-09-03T17:00:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-02T09:00:00.000Z', endTime: '2014-09-02T17:00:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-02T09:00:00.000Z', endTime: '2014-09-02T17:00:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-02T09:00:00.000Z', endTime: '2014-09-02T17:00:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-01T09:00:00.000Z', endTime: '2014-09-01T17:00:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-01T09:00:00.000Z', endTime: '2014-09-01T17:00:00.000Z', createdBy: user, projectId: projectA._id }
  ];

  it('should get all weeks between the provided dates', function () {
    var params = {
      timeUnit: 'w',
      startDate: '2014-09-01',
      endDate: '2014-09-30'
    };
    expect(Report.getDateVector(params)).toEqual(
      ['36', '37', '38', '39', '40']
    );
  });

  it('should get all weeks between the provided dates', function () {
    var params = {
      timeUnit: 'w',
      startDate: '2014-09-01',
      endDate: '2014-09-02'
    };
    expect(Report.getDateVector(params)).toEqual(
      ['36' ]
    );
  });

  it('should get all weeks between the provided date', function () {
    var params = {
      timeUnit: 'w',
      startDate: '2014-09-01',
      endDate: '2014-09-01'
    };
    expect(Report.getDateVector(params)).toEqual(
      ['36' ]
    );
  });

  it('should get all weeks between the provided date', function () {
    var params = {
      timeUnit: 'w',
      startDate: '2014-11-24',
      endDate: '2014-11-30'
    };
    expect(Report.getDateVector(params)).toEqual(
      ['48' ]
    );
  });

  it('should get all months between the provided dates', function () {
    var params = {
      timeUnit: 'M',
      startDate: '2014-01-04',
      endDate: '2014-09-30',
      monthFormat: 'YYYY-MM-DD'
    };
    expect(Report.getDateVector(params)).toEqual(
      ['2014-01-01', '2014-02-01', '2014-03-01', '2014-04-01', '2014-05-01', '2014-06-01', '2014-07-01', '2014-08-01', '2014-09-01']
    );
  });

  it('should build a report by weeks', function () {

    var expectedResult = {
      startDate: '2014-09-01',
      endDate: '2014-09-30',
      timeUnits: [ '36', '37', '38', '39', '40' ],
      projects: [ projectA._id, projectB._id ],
      report: {
        '36': {
          '2234234': (7*8).toFixed(1),
          '2234235': (7*8).toFixed(1)
        },
        '37': {
          '2234234': (5*8).toFixed(1),
          '2234235': (6*8).toFixed(1)
        },
        '38': {
          '2234234': (3*8).toFixed(1),
          '2234235': (7*8).toFixed(1)
        },
        '39': {
          '2234234': (8*8).toFixed(1),
          '2234235': (3*8).toFixed(1),
        },
        '40': {
          '2234234': (1*8).toFixed(1),
          '2234235': (2*8).toFixed(1)
        }
      }
    };
    var params = {
      timeEntries: timeEntries,
      timeUnit: 'week',
      startDate: '2014-09-01',
      endDate: '2014-09-30'
    };
    expect(Report.getPivot(params)).toEqual(expectedResult);
  });
});
