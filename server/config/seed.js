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
var _ = require('lodash');
var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;


var createTimeEntries = function (file, user, project) {
  console.log('Creating time entries');
  var json = require(file);
  _.each(json, function (element) {
    var extension = {
        createdBy: user,
        projectId: project
    };
    _.extend(element, extension);
  });

  TimeEntry.create(json, function (e) {
    console.log('Created time entries for November', e);
  });
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
        createTimeEntries('./seed/september.json', user, project[0]);
        createTimeEntries('./seed/november.json', user, project[0]);
      });
      Project.find({name: 'Project B'}).find(function(error, project) {
        createTimeEntries('./seed/october.json', user, project[0]);
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

