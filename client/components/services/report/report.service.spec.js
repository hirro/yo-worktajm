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
    // Week 40
    { startTime: '2014-09-29T12:41:41.000Z', endTime: '2014-09-29T15:35:06.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-29T09:26:36.000Z', endTime: '2014-09-29T11:57:50.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-29T09:00:00.000Z', endTime: '2014-09-29T09:26:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-26T12:34:28.000Z', endTime: '2014-09-26T15:02:16.000Z', createdBy: user, projectId: projectA._id },
    // Week 39
    { startTime: '2014-09-26T09:13:46.000Z', endTime: '2014-09-26T11:30:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-25T12:05:56.000Z', endTime: '2014-09-25T17:15:02.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-25T09:40:59.000Z', endTime: '2014-09-25T11:16:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-24T11:45:00.000Z', endTime: '2014-09-24T17:11:28.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-24T08:40:55.000Z', endTime: '2014-09-24T11:08:50.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-23T12:28:45.000Z', endTime: '2014-09-23T16:01:03.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-23T09:06:13.000Z', endTime: '2014-09-23T11:20:27.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-22T16:09:09.000Z', endTime: '2014-09-22T16:31:18.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-22T12:44:47.000Z', endTime: '2014-09-22T15:52:36.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-22T09:33:04.000Z', endTime: '2014-09-22T12:09:39.000Z', createdBy: user, projectId: projectA._id },
    // Week 38
    { startTime: '2014-09-19T12:10:02.000Z', endTime: '2014-09-19T17:13:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-19T09:35:39.000Z', endTime: '2014-09-19T11:34:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-18T13:22:05.000Z', endTime: '2014-09-18T17:25:34.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-18T09:45:33.000Z', endTime: '2014-09-18T12:15:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-17T12:25:48.000Z', endTime: '2014-09-17T15:28:29.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-17T10:18:49.000Z', endTime: '2014-09-17T11:36:01.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-17T08:40:43.000Z', endTime: '2014-09-17T09:30:45.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-17T07:19:41.000Z', endTime: '2014-09-17T08:10:40.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-16T12:01:50.000Z', endTime: '2014-09-16T15:50:29.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-16T09:23:18.000Z', endTime: '2014-09-16T11:13:29.000Z', createdBy: user, projectId: projectB._id },
    // Week 37
    { startTime: '2014-09-10T11:49:37.000Z', endTime: '2014-09-10T15:47:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-10T09:26:43.000Z', endTime: '2014-09-10T11:20:36.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-10T07:10:52.000Z', endTime: '2014-09-10T07:37:23.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-09T14:07:56.000Z', endTime: '2014-09-09T19:01:02.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-09T08:40:45.000Z', endTime: '2014-09-09T12:28:51.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-08T17:35:45.000Z', endTime: '2014-09-08T18:15:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-08T12:49:43.000Z', endTime: '2014-09-08T17:15:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-08T09:43:02.000Z', endTime: '2014-09-08T11:50:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-08T08:49:28.000Z', endTime: '2014-09-08T09:33:59.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-08T08:49:00.000Z', endTime: '2014-09-08T08:49:27.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-08T07:16:01.000Z', endTime: '2014-09-08T07:55:20.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-08T06:46:16.000Z', endTime: '2014-09-08T06:59:15.000Z', createdBy: user, projectId: projectB._id },
    // Week 36
    { startTime: '2014-09-05T14:30:30.000Z', endTime: '2014-09-05T17:06:13.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-05T13:01:48.000Z', endTime: '2014-09-05T14:05:02.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-05T09:33:25.000Z', endTime: '2014-09-05T11:56:53.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-04T13:00:46.000Z', endTime: '2014-09-04T17:05:08.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-04T09:20:20.000Z', endTime: '2014-09-04T11:50:14.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-04T08:38:28.000Z', endTime: '2014-09-04T08:48:28.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-03T16:06:27.000Z', endTime: '2014-09-03T16:30:00.000Z', createdBy: user, projectId: projectB._id },
    { startTime: '2014-09-03T12:33:34.000Z', endTime: '2014-09-03T15:39:44.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-03T07:23:38.000Z', endTime: '2014-09-03T11:53:41.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-02T16:09:30.000Z', endTime: '2014-09-02T17:00:00.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-02T13:03:41.000Z', endTime: '2014-09-02T15:46:36.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-02T09:20:59.000Z', endTime: '2014-09-02T11:50:09.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-01T12:41:08.000Z', endTime: '2014-09-01T13:50:58.000Z', createdBy: user, projectId: projectA._id },
    { startTime: '2014-09-01T09:09:27.000Z', endTime: '2014-09-01T11:50:00.000Z', createdBy: user, projectId: projectA._id }
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

  iit('should build a report by weeks', function () {
    expect(Report.getPivot(timeEntries, 'week', '2014-09-01', '2014-09-30', null)).toBe({
      timeUnits: [ '36', '37', '38', '39', '40'],
      project: [ projectA._id, projectB._id ],
      report: [
        [ 0, 0 ],
        [ 0, 0 ],
        [ 0, 0 ],
        [ 0, 0 ],
        [ 0, 0 ]
      ]
    });
  });

  it('should build a report by months', function () {
    expect(Report.getPivot('week', timeEntries, null)).toBe({
      timeUnits: [ 'January', 'February', 'Match'],
      report: [
        { name: 'Project A', time: [ 40.34, 32.32, 15.3 ] },
        { name: 'Project B', time: [ 40.34, 32.32, 15.3 ] },
        { name: 'Project C', time: [ 40.34, 32.32, 15.3 ] }
      ]
    });
  });

});
