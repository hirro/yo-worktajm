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

/* globals element, it, by */

'use strict';

var Utilities = require('./utilities.js');
var Constants = require('./constants.js');
var _ = require('lodash');
var util = require('util');
// var _ = require('../../app/bower_components/lodash/lodash.js');
var protractor = require('protractor');

describe('project operations', function() {
  var username, password;
  var projectA = Constants.createProject();
  var projectB = Constants.createProject();

  var addProject = function (project) {

    console.log('Adding project');

    // Get length before
    var startLength;
    element.all(by.repeater('project in projects')).then(function (arr) {
      startLength = arr.length;
    });

    // Press create project
    element(by.id('createProject')).click();

    var projectNameInput = element(by.id('projectModalName'));
    projectNameInput.clear();
    projectNameInput.sendKeys(project.name);

    var projectRateInput = element(by.id('projectModalRate'));
    projectRateInput.clear();
    projectRateInput.sendKeys(project.rate);

    var projectDescriptionInput = element(by.id('projectModalDescription'));
    projectDescriptionInput.clear();
    projectDescriptionInput.sendKeys(project.description);

    // Press create project
    element(by.id('projectModalOk')).click();
  };

  var getProjects = function () {
    return element.all(by.repeater('project in projects'));
  };

  var getProjectCount = function () {
    return getProjects().then(function (arr) {
      return arr.length;
    }, function () {
      return -1;
    });
  };

  var getTimeEntries = function () {
    return element.all(by.repeater('timeEntry in filteredTimeEntries = (timeEntries | dateFilter:selectedDate)'));
  };

  var getTimeEntryCount = function () {
    return getTimeEntries().then(function (arr) {
      return arr.length;
    }, function () {
      this.fail('Expected a positive result');
    });
  };

  var deleteProject = function (project) {

    console.log('Deleting project');

    // Perform delete operation on last elements
    element.all(by.repeater('project in projects')).then(function(arr) {
      var lastElement = arr[arr.length-1];
      console.log('There are %d projects', arr.length);

      // Verify project name
      var projectText = lastElement.findElement(by.model('project.name')).getAttribute('value');
      expect(projectText).toContain(project.name);

      // Verify rate
      var rateText = lastElement.findElement(by.model('project.rate')).getAttribute('value');
      expect(rateText).toContain(project.rate);

      // Expand the project before pressing any buttons
      var expandButton = lastElement.findElement(by.css('[ng-click="project.isOpen = !project.isOpen"]'));
      expandButton.click();
      browser.sleep(1000); // Allow browser to open project detail

      // Get hold of delete button and press it
      var deleteButton = lastElement.findElement(by.css('[ng-click="deleteProject(project)"]'));
      deleteButton.click();

      // Now confirm the deletion
      var confirmButton = element(by.css('[ng-click="ok()"]'));
      confirmButton.click();
      browser.sleep(1000); // Allow browser to reload project list
    });
  };

  var toggleProject = function (projectName, start) {
    console.log('toggleProject [%s] [%d]', projectName, start);
    // Perform delete operation on last elements
    getProjects().then(function(arr) {
      _.each(arr, function(e) {
        e.findElement(by.binding('project.name')).getText().then(function (name) {
          if (name === projectName) {
            console.log('Found matching project [%s]', name);

            if (start) {
              e.findElement(by.css('[ng-click="startTimer(project)"]')).then(function (button) {
                console.log('Clicking on start timer');
                button.click();
              });
            } else {
              e.findElement(by.css('[ng-click="stopTimer(project)"]')).then(function (button) {
                console.log('Clicking on stop timer');
                button.click();
              });
            }
          }
        }, function() {
          this.fail('sdf');
        });
      });
    });
  };

  var deleteLastTimeEntry = function () {
    console.log('deleteing last time entry');
    getTimeEntries().then(function (arr) {
      var element = arr[0];
      element.findElement(by.css('[ng-click="removeTimeEntry(timeEntry)"]')).then(function (button) {
        console.log('Pressing remove time entry');
        button.click();
      //   // There is no verification at the moment        
      // }, function () {
      //   this.fail('Failed to find delete button');
      });
    });
  };

  var startProject = function (projectName) {
    toggleProject(projectName, true);
  };
  
  var stopProject = function (projectName) {
    toggleProject(projectName, false);
  };

  beforeEach(function () {
    username = Utilities.generateUsername();
    password = 'password';
    Utilities.register(username, password);
  });

  it('should add and delete a project', function() {
    var projectA = Constants.createProject();
  
    // Add the projects
    expect(getProjectCount()).toBe(0);
    addProject(projectA);
    expect(getProjectCount()).toBe(1);

    // Delete projects
    deleteProject(projectA);
    expect(getProjectCount()).toBe(0);
  });

  it('should add two projects, then start and stop timers in a different sequences.', function() {
    // Add the projects
    expect(getProjectCount()).toBe(0);
    addProject(projectB);
    expect(getProjectCount()).toBe(1);
    addProject(projectA);
    expect(getProjectCount()).toBe(2);

    // Start A - Stop A - Delete Time Entries
    expect(getTimeEntryCount()).toBe(0);
    startProject(projectA.name);
    expect(getTimeEntryCount()).toBe(1);
    stopProject(projectA.name);
    expect(getTimeEntryCount()).toBe(1);
    deleteLastTimeEntry();
    expect(getTimeEntryCount()).toBe(0);
  });

  it('should add two projects, then start and stop timers in a different sequences.', function() {
    // Add the projects
    expect(getProjectCount()).toBe(0);
    addProject(projectB);
    expect(getProjectCount()).toBe(1);
    addProject(projectA);
    expect(getProjectCount()).toBe(2);
  
    // Start A - Start B - Stop B - Delete Time Entries
    startProject(projectA.name);
    expect(getTimeEntryCount()).toBe(1);
    startProject(projectB.name);
    expect(getTimeEntryCount()).toBe(2);
    stopProject(projectB.name);
    expect(getTimeEntryCount()).toBe(2);
    deleteLastTimeEntry();
    deleteLastTimeEntry();
  });

  it('should add one project, start a timer, logout, login and finally verify that the timer is still active', function() {
  });

});
