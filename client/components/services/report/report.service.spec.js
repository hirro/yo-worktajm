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
      startDate: moment('2014-09-01'),
      endDate: moment('2014-09-30')
    };
    expect(Report.getDateVector(params)).toEqual(
      ['36', '37', '38', '39', '40']
    );
  });

  it('should get all months between the provided dates', function () {
    var params = {
      timeUnit: 'M',
      startDate: moment('2014-01-04'),
      endDate: moment('2014-09-30'),
      monthFormat: 'YYYY-MM-DD'
    };
    expect(Report.getDateVector(params)).toEqual(
      ['2014-01-01', '2014-02-01', '2014-03-01', '2014-04-01', '2014-05-01', '2014-06-01', '2014-07-01', '2014-08-01', '2014-09-01']
    );
  });

  it('should build a report by weeks', function () {
    expect(Report.getPivot(timeEntries, 'week', '2014-09-01', '2014-09-30', null)).toEqual({
      timeUnits: [ '36', '37', '38', '39', '40' ],
      projects: [ projectA._id, projectB._id ],
      report: [
        [ (7*8).toFixed(1), (7*8).toFixed(1) ],
        [ (5*8).toFixed(1), (6*8).toFixed(1) ],
        [ (3*8).toFixed(1), (7*8).toFixed(1) ],
        [ (8*8).toFixed(1), (3*8).toFixed(1) ],
        [ (1*8).toFixed(1), (2*8).toFixed(1) ]
      ]
    });
  });

  xit('should build a report by months', function () {
    expect(Report.getPivot(timeEntries, 'month', '2014-09-01', '2014-12-14', null)).toEqual({
      timeUnits: [ '2014-09-01', '2014-10-01', '2014-11-01', '2014-12-01' ],
      projects: [ projectA._id, projectB._id ],
      report: [
        [ (24*8).toFixed(1), (25*8).toFixed(1) ],
        [ ( 0*8).toFixed(1), ( 0*8).toFixed(1) ],
        [ ( 0*8).toFixed(1), ( 0*8).toFixed(1) ],
        [ ( 0*8).toFixed(1), ( 0*8).toFixed(1) ]
      ]
    });
  });

});
