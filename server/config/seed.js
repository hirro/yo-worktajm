/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Customer = require('../api/customer/customer.model');
var Project = require('../api/project/project.model');
var TimeEntry = require('../api/timeentry/timeentry.model');
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var createTimeEntriesForSeptember = function (user, project) {
  TimeEntry.create(
    { endTime: "2014-09-29T15:35:06Z", startTime: "2014-09-29T12:41:41Z", createdBy: user, projectId: project },
    { endTime: "2014-09-29T11:57:50Z", startTime: "2014-09-29T09:26:36Z", createdBy: user, projectId: project },
    { endTime: "2014-09-29T09:26:00Z", startTime: "2014-09-29T09:00:00Z", createdBy: user, projectId: project },
    { endTime: "2014-09-26T15:02:16Z", startTime: "2014-09-26T12:34:28Z", createdBy: user, projectId: project },
    { endTime: "2014-09-26T11:30:00Z", startTime: "2014-09-26T09:13:46Z", createdBy: user, projectId: project },
    { endTime: "2014-09-25T17:15:02Z", startTime: "2014-09-25T12:05:56Z", createdBy: user, projectId: project },
    { endTime: "2014-09-25T11:16:00Z", startTime: "2014-09-25T09:40:59Z", createdBy: user, projectId: project },
    { endTime: "2014-09-24T17:11:28Z", startTime: "2014-09-24T11:45:00Z", createdBy: user, projectId: project },
    { endTime: "2014-09-24T11:08:50Z", startTime: "2014-09-24T08:40:55Z", createdBy: user, projectId: project },
    { endTime: "2014-09-23T16:01:03Z", startTime: "2014-09-23T12:28:45Z", createdBy: user, projectId: project },
    { endTime: "2014-09-23T11:20:27Z", startTime: "2014-09-23T09:06:13Z", createdBy: user, projectId: project },
    { endTime: "2014-09-22T16:31:18Z", startTime: "2014-09-22T16:09:09Z", createdBy: user, projectId: project },
    { endTime: "2014-09-22T15:52:36Z", startTime: "2014-09-22T12:44:47Z", createdBy: user, projectId: project },
    { endTime: "2014-09-22T12:09:39Z", startTime: "2014-09-22T09:33:04Z", createdBy: user, projectId: project },
    { endTime: "2014-09-19T17:13:00Z", startTime: "2014-09-19T12:10:02Z", createdBy: user, projectId: project },
    { endTime: "2014-09-19T11:34:00Z", startTime: "2014-09-19T09:35:39Z", createdBy: user, projectId: project },
    { endTime: "2014-09-18T17:25:34Z", startTime: "2014-09-18T13:22:05Z", createdBy: user, projectId: project },
    { endTime: "2014-09-18T12:15:00Z", startTime: "2014-09-18T09:45:33Z", createdBy: user, projectId: project },
    { endTime: "2014-09-17T15:28:29Z", startTime: "2014-09-17T12:25:48Z", createdBy: user, projectId: project },
    { endTime: "2014-09-17T11:36:01Z", startTime: "2014-09-17T10:18:49Z", createdBy: user, projectId: project },
    { endTime: "2014-09-17T09:30:45Z", startTime: "2014-09-17T08:40:43Z", createdBy: user, projectId: project },
    { endTime: "2014-09-17T08:10:40Z", startTime: "2014-09-17T07:19:41Z", createdBy: user, projectId: project },
    { endTime: "2014-09-16T15:50:29Z", startTime: "2014-09-16T12:01:50Z", createdBy: user, projectId: project },
    { endTime: "2014-09-16T11:13:29Z", startTime: "2014-09-16T09:23:18Z", createdBy: user, projectId: project },
    { endTime: "2014-09-10T15:47:00Z", startTime: "2014-09-10T11:49:37Z", createdBy: user, projectId: project },
    { endTime: "2014-09-10T11:20:36Z", startTime: "2014-09-10T09:26:43Z", createdBy: user, projectId: project },
    { endTime: "2014-09-10T07:37:23Z", startTime: "2014-09-10T07:10:52Z", createdBy: user, projectId: project },
    { endTime: "2014-09-09T19:01:02Z", startTime: "2014-09-09T14:07:56Z", createdBy: user, projectId: project },
    { endTime: "2014-09-09T12:28:51Z", startTime: "2014-09-09T08:40:45Z", createdBy: user, projectId: project },
    { endTime: "2014-09-08T18:15:00Z", startTime: "2014-09-08T17:35:45Z", createdBy: user, projectId: project },
    { endTime: "2014-09-08T17:15:00Z", startTime: "2014-09-08T12:49:43Z", createdBy: user, projectId: project },
    { endTime: "2014-09-08T11:50:00Z", startTime: "2014-09-08T09:43:02Z", createdBy: user, projectId: project },
    { endTime: "2014-09-08T09:33:59Z", startTime: "2014-09-08T08:49:28Z", createdBy: user, projectId: project },
    { endTime: "2014-09-08T08:49:27Z", startTime: "2014-09-08T08:49:00Z", createdBy: user, projectId: project },
    { endTime: "2014-09-08T07:55:20Z", startTime: "2014-09-08T07:16:01Z", createdBy: user, projectId: project },
    { endTime: "2014-09-08T06:59:15Z", startTime: "2014-09-08T06:46:16Z", createdBy: user, projectId: project },
    { endTime: "2014-09-05T17:06:13Z", startTime: "2014-09-05T14:30:30Z", createdBy: user, projectId: project },
    { endTime: "2014-09-05T14:05:02Z", startTime: "2014-09-05T13:01:48Z", createdBy: user, projectId: project },
    { endTime: "2014-09-05T11:56:53Z", startTime: "2014-09-05T09:33:25Z", createdBy: user, projectId: project },
    { endTime: "2014-09-04T17:05:08Z", startTime: "2014-09-04T13:00:46Z", createdBy: user, projectId: project },
    { endTime: "2014-09-04T11:50:14Z", startTime: "2014-09-04T09:20:20Z", createdBy: user, projectId: project },
    { endTime: "2014-09-04T08:48:28Z", startTime: "2014-09-04T08:38:28Z", createdBy: user, projectId: project },
    { endTime: "2014-09-03T16:30:00Z", startTime: "2014-09-03T16:06:27Z", createdBy: user, projectId: project },
    { endTime: "2014-09-03T15:39:44Z", startTime: "2014-09-03T12:33:34Z", createdBy: user, projectId: project },
    { endTime: "2014-09-03T11:53:41Z", startTime: "2014-09-03T07:23:38Z", createdBy: user, projectId: project },
    { endTime: "2014-09-02T17:00:00Z", startTime: "2014-09-02T16:09:30Z", createdBy: user, projectId: project },
    { endTime: "2014-09-02T15:46:36Z", startTime: "2014-09-02T13:03:41Z", createdBy: user, projectId: project },
    { endTime: "2014-09-02T11:50:09Z", startTime: "2014-09-02T09:20:59Z", createdBy: user, projectId: project },
    { endTime: "2014-09-01T13:50:58Z", startTime: "2014-09-01T12:41:08Z", createdBy: user, projectId: project },
    { endTime: "2014-09-01T11:50:00Z", startTime: "2014-09-01T09:09:27Z", createdBy: user, projectId: project },
    function (e) {
      console.log('Created time entries for september', e);
    }
  );
};

var createTimeEntriesForOctober = function (user, project) {
  console.log('Creating time entries');

  TimeEntry.create(
    { endTime: "2014-10-31T18:00:00Z", startTime: "2014-10-31T15:50:17Z", projectId: project, createdBy: user },
    { endTime: "2014-10-31T14:30:00Z", startTime: "2014-10-31T13:47:23Z", projectId: project, createdBy: user },
    { endTime: "2014-10-31T12:59:28Z", startTime: "2014-10-31T11:56:11Z", projectId: project, createdBy: user },
    { endTime: "2014-10-30T15:50:53Z", startTime: "2014-10-30T12:25:51Z", projectId: project, createdBy: user },
    { endTime: "2014-10-30T11:37:45Z", startTime: "2014-10-30T09:25:32Z", projectId: project, createdBy: user },
    { endTime: "2014-10-29T16:53:58Z", startTime: "2014-10-29T11:44:56Z", projectId: project, createdBy: user },
    { endTime: "2014-10-29T11:25:53Z", startTime: "2014-10-29T08:30:08Z", projectId: project, createdBy: user },
    { endTime: "2014-10-28T15:45:33Z", startTime: "2014-10-28T13:07:09Z", projectId: project, createdBy: user },
    { endTime: "2014-10-28T12:31:43Z", startTime: "2014-10-28T11:22:44Z", projectId: project, createdBy: user },
    { endTime: "2014-10-27T17:00:00Z", startTime: "2014-10-27T12:54:04Z", projectId: project, createdBy: user },
    { endTime: "2014-10-27T12:52:04Z", startTime: "2014-10-27T12:50:07Z", projectId: project, createdBy: user },
    { endTime: "2014-10-27T12:18:41Z", startTime: "2014-10-27T09:42:03Z", projectId: project, createdBy: user },
    { endTime: "2014-10-24T15:08:37Z", startTime: "2014-10-24T14:02:44Z", projectId: project, createdBy: user },
    { endTime: "2014-10-24T13:24:05Z", startTime: "2014-10-24T11:12:52Z", projectId: project, createdBy: user },
    { endTime: "2014-10-24T11:01:35Z", startTime: "2014-10-24T07:55:49Z", projectId: project, createdBy: user },
    { endTime: "2014-10-23T16:41:58Z", startTime: "2014-10-23T11:55:58Z", projectId: project, createdBy: user },
    { endTime: "2014-10-23T11:45:11Z", startTime: "2014-10-23T09:38:06Z", projectId: project, createdBy: user },
    { endTime: "2014-10-23T09:38:05Z", startTime: "2014-10-23T09:30:56Z", projectId: project, createdBy: user },
    { endTime: "2014-10-23T09:15:11Z", startTime: "2014-10-23T08:10:31Z", projectId: project, createdBy: user },
    { endTime: "2014-10-22T16:13:31Z", startTime: "2014-10-22T12:46:08Z", projectId: project, createdBy: user },
    { endTime: "2014-10-22T11:52:01Z", startTime: "2014-10-22T09:36:08Z", projectId: project, createdBy: user },
    { endTime: "2014-10-21T15:48:45Z", startTime: "2014-10-21T13:06:55Z", projectId: project, createdBy: user },
    { endTime: "2014-10-21T12:03:32Z", startTime: "2014-10-21T09:25:36Z", projectId: project, createdBy: user },
    { endTime: "2014-10-20T15:51:09Z", startTime: "2014-10-20T13:03:26Z", projectId: project, createdBy: user },
    { endTime: "2014-10-20T12:35:24Z", startTime: "2014-10-20T09:31:13Z", projectId: project, createdBy: user },
    { endTime: "2014-10-20T09:28:24Z", startTime: "2014-10-20T09:28:12Z", projectId: project, createdBy: user },
    { endTime: "2014-10-16T17:43:11Z", startTime: "2014-10-16T14:10:51Z", projectId: project, createdBy: user },
    { endTime: "2014-10-16T13:31:19Z", startTime: "2014-10-16T09:47:05Z", projectId: project, createdBy: user },
    { endTime: "2014-10-15T15:47:26Z", startTime: "2014-10-15T12:34:35Z", projectId: project, createdBy: user },
    { endTime: "2014-10-15T11:18:11Z", startTime: "2014-10-15T09:17:09Z", projectId: project, createdBy: user },
    { endTime: "2014-10-15T08:50:00Z", startTime: "2014-10-15T08:28:00Z", projectId: project, createdBy: user },
    { endTime: "2014-10-15T07:34:23Z", startTime: "2014-10-15T06:34:09Z", projectId: project, createdBy: user },
    { endTime: "2014-10-14T13:55:41Z", startTime: "2014-10-14T13:06:53Z", projectId: project, createdBy: user },
    { endTime: "2014-10-14T13:06:51Z", startTime: "2014-10-14T12:30:00Z", projectId: project, createdBy: user },
    { endTime: "2014-10-14T11:41:21Z", startTime: "2014-10-14T09:56:32Z", projectId: project, createdBy: user },
    { endTime: "2014-10-13T17:21:28Z", startTime: "2014-10-13T09:31:25Z", projectId: project, createdBy: user },
    { endTime: "2014-10-10T17:40:06Z", startTime: "2014-10-10T12:20:09Z", projectId: project, createdBy: user },
    { endTime: "2014-10-10T11:28:40Z", startTime: "2014-10-10T09:34:41Z", projectId: project, createdBy: user },
    { endTime: "2014-10-10T09:25:42Z", startTime: "2014-10-10T09:10:35Z", projectId: project, createdBy: user },
    { endTime: "2014-10-09T15:34:02Z", startTime: "2014-10-09T13:18:21Z", projectId: project, createdBy: user },
    { endTime: "2014-10-09T12:50:00Z", startTime: "2014-10-09T10:00:00Z", projectId: project, createdBy: user },
    { endTime: "2014-10-08T15:20:18Z", startTime: "2014-10-08T12:56:24Z", projectId: project, createdBy: user },
    { endTime: "2014-10-08T11:47:06Z", startTime: "2014-10-08T09:20:12Z", projectId: project, createdBy: user },
    { endTime: "2014-10-07T15:19:25Z", startTime: "2014-10-07T12:21:19Z", projectId: project, createdBy: user },
    { endTime: "2014-10-07T11:52:26Z", startTime: "2014-10-07T08:09:51Z", projectId: project, createdBy: user },
    { endTime: "2014-10-06T17:00:00Z", startTime: "2014-10-06T16:24:28Z", projectId: project, createdBy: user },
    { endTime: "2014-10-06T15:56:18Z", startTime: "2014-10-06T12:30:23Z", projectId: project, createdBy: user },
    { endTime: "2014-10-06T12:00:00Z", startTime: "2014-10-06T09:33:53Z", projectId: project, createdBy: user },
    { endTime: "2014-10-02T15:10:00Z", startTime: "2014-10-02T12:29:58Z", projectId: project, createdBy: user },
    { endTime: "2014-10-02T11:45:00Z", startTime: "2014-10-02T09:26:50Z", projectId: project, createdBy: user },
    { endTime: "2014-10-02T09:11:11Z", startTime: "2014-10-02T08:45:38Z", projectId: project, createdBy: user },
    { endTime: "2014-10-02T08:24:47Z", startTime: "2014-10-02T07:14:44Z", projectId: project, createdBy: user },
    { endTime: "2014-10-01T15:44:32Z", startTime: "2014-10-01T10:08:50Z", projectId: project, createdBy: user },
    function (e) {
      console.log('Created time entries for october', e);
    }
  );
};

var createTimeEntriesForNovember = function (user, project) {
  console.log('Creating time entries');

  TimeEntry.create(
    { endTime: "2014-11-29T14:00:00Z", startTime: "2014-11-29T10:00:00Z", createdBy: user, projectId: project },
    { endTime: "2014-11-28T18:10:05Z", startTime: "2014-11-28T13:37:30Z", createdBy: user, projectId: project },
    { endTime: "2014-11-28T12:42:02Z", startTime: "2014-11-28T08:23:01Z", createdBy: user, projectId: project },
    { endTime: "2014-11-26T17:27:15Z", startTime: "2014-11-26T13:02:34Z", createdBy: user, projectId: project },
    { endTime: "2014-11-26T11:59:24Z", startTime: "2014-11-26T09:24:13Z", createdBy: user, projectId: project },
    { endTime: "2014-11-25T16:34:25Z", startTime: "2014-11-25T13:00:26Z", createdBy: user, projectId: project },
    { endTime: "2014-11-25T11:31:54Z", startTime: "2014-11-25T09:35:53Z", createdBy: user, projectId: project },
    { endTime: "2014-11-24T16:33:00Z", startTime: "2014-11-24T13:28:42Z", createdBy: user, projectId: project },
    { endTime: "2014-11-24T12:31:34Z", startTime: "2014-11-24T08:59:29Z", createdBy: user, projectId: project },
    { endTime: "2014-11-21T15:42:23Z", startTime: "2014-11-21T12:25:45Z", createdBy: user, projectId: project },
    { endTime: "2014-11-21T11:24:10Z", startTime: "2014-11-21T08:52:14Z", createdBy: user, projectId: project },
    { endTime: "2014-11-20T17:07:33Z", startTime: "2014-11-20T11:57:24Z", createdBy: user, projectId: project },
    { endTime: "2014-11-19T17:51:18Z", startTime: "2014-11-19T17:41:25Z", createdBy: user, projectId: project },
    { endTime: "2014-11-19T17:20:37Z", startTime: "2014-11-19T13:03:18Z", createdBy: user, projectId: project },
    { endTime: "2014-11-19T12:25:50Z", startTime: "2014-11-19T09:25:43Z", createdBy: user, projectId: project },
    { endTime: "2014-11-18T15:51:18Z", startTime: "2014-11-18T12:19:18Z", createdBy: user, projectId: project },
    { endTime: "2014-11-18T11:36:15Z", startTime: "2014-11-18T10:16:38Z", createdBy: user, projectId: project },
    { endTime: "2014-11-17T15:37:46Z", startTime: "2014-11-17T12:51:42Z", createdBy: user, projectId: project },
    { endTime: "2014-11-17T12:13:07Z", startTime: "2014-11-17T09:08:02Z", createdBy: user, projectId: project },
    { endTime: "2014-11-14T17:23:37Z", startTime: "2014-11-14T12:58:43Z", createdBy: user, projectId: project },
    { endTime: "2014-11-14T12:22:39Z", startTime: "2014-11-14T09:14:41Z", createdBy: user, projectId: project },
    { endTime: "2014-11-13T16:23:10Z", startTime: "2014-11-13T13:51:16Z", createdBy: user, projectId: project },
    { endTime: "2014-11-13T13:22:32Z", startTime: "2014-11-13T12:36:40Z", createdBy: user, projectId: project },
    { endTime: "2014-11-12T17:20:46Z", startTime: "2014-11-12T13:14:29Z", createdBy: user, projectId: project },
    { endTime: "2014-11-12T11:58:52Z", startTime: "2014-11-12T10:06:56Z", createdBy: user, projectId: project },
    { endTime: "2014-11-11T17:55:57Z", startTime: "2014-11-11T17:35:54Z", createdBy: user, projectId: project },
    { endTime: "2014-11-11T17:10:14Z", startTime: "2014-11-11T13:02:57Z", createdBy: user, projectId: project },
    { endTime: "2014-11-11T12:01:01Z", startTime: "2014-11-11T08:59:48Z", createdBy: user, projectId: project },
    { endTime: "2014-11-10T15:47:59Z", startTime: "2014-11-10T12:13:08Z", createdBy: user, projectId: project },
    { endTime: "2014-11-10T11:31:27Z", startTime: "2014-11-10T11:01:40Z", createdBy: user, projectId: project },
    { endTime: "2014-11-10T10:54:35Z", startTime: "2014-11-10T09:43:26Z", createdBy: user, projectId: project },
    { endTime: "2014-11-07T16:55:56Z", startTime: "2014-11-07T12:36:20Z", createdBy: user, projectId: project },
    { endTime: "2014-11-07T11:55:06Z", startTime: "2014-11-07T09:55:35Z", createdBy: user, projectId: project },
    { endTime: "2014-11-06T15:44:28Z", startTime: "2014-11-06T12:27:25Z", createdBy: user, projectId: project },
    { endTime: "2014-11-06T11:53:23Z", startTime: "2014-11-06T09:46:17Z", createdBy: user, projectId: project },
    { endTime: "2014-11-05T16:53:27Z", startTime: "2014-11-05T12:44:18Z", createdBy: user, projectId: project },
    { endTime: "2014-11-05T12:08:57Z", startTime: "2014-11-05T09:13:16Z", createdBy: user, projectId: project },
    { endTime: "2014-11-04T15:51:22Z", startTime: "2014-11-04T11:46:45Z", createdBy: user, projectId: project },
    { endTime: "2014-11-04T11:27:47Z", startTime: "2014-11-04T08:10:21Z", createdBy: user, projectId: project },
    { endTime: "2014-11-01T12:00:14Z", startTime: "2014-11-01T10:36:39Z", createdBy: user, projectId: project },
    function (e) {
      console.log('Created time entries for November', e);
    }
  );
};

var createTimeEntriesForDecember = function (user, project) {
  console.log('Creating time entries for December');

  TimeEntry.create(
    function (e) {
      console.log('Created time entries for November', e);
    }
  );
};

var createProjectForUser = function (error, users) {
  if (error) {
    console.log('Failed to create projects', error)
  } else{
    var user = users[0];
    console.log('createProjectForUser: ', user._id);

    var projectA = {
      name: 'Project A',
      createdBy: user
    };
    var projectB = {
      name: 'Project B',
      createdBy: user
    };

    Project.create(projectA, projectB, function(e) {
      console.log('Created projects, now creating time entries', e);

      Project.find({name: 'Project A'}).find(function(error, project) {
        createTimeEntriesForSeptember(user, project[0]);
        createTimeEntriesForNovember(user, project[0]);
      });
      Project.find({name: 'Project B'}).find(function(error, project) {
        createTimeEntriesForOctober(user, project[0]);
      });
    });    
  }
};

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('Finished populating users');

      User.find({ email: 'admin@admin.com' }).find(createProjectForUser);
    }
  );
});

Customer.find({}).remove(function() {
});

Project.find({}).remove(function() {
});

TimeEntry.find({}).remove(function() {
});

