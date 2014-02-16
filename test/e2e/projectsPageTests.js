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

/* globals element, it, by, $ */

'use strict';

var Utilities = require('./utilities.js');

var projectUtil = {
  addProject: function (project) {
    // Press the add project button
    element(by.css('[ng-click="createProject()"]')).click();

    // Fill in the form and submit
    var companyNameInput = element(by.model('project.name'));
    companyNameInput.clear();
    companyNameInput.sendKeys(project.name);

    // Press create project
    element(by.css('[ng-click="ok()"')).click();
  },


  deleteProject: function (project, index) {
    console.log('Deleting project');
    return this.getProjects().then(function (arr) {

      var projectElement = arr[index];
      console.log('There are %d projects', arr.length);

      // Verify project name
      expect(projectElement.findElement(by.model('project.name')).getText()).toContain(project.name);

      // Get the delete button and press it
      var deleteButton = projectElement.findElement(by.css('[ng-click="removeProject(project)"]'));
      deleteButton.click();

      // Get the confirm button and press it
      var confirmButton = element(by.css('[ng-click="ok()"]'));
      confirmButton.click();

    }, function (reason) {
      console.log('Failed to get list %s', reason);
    });
  },

  getProjects: function () {
    return element.all(by.repeater('project in projects'));
  },

  getProjectsCount: function () {
    return this.getProjects().then(function (arr) {
      console.log('Project count : %d', arr.length);
      return arr.length;
    }, function () {
      console.log('Project count failed');
      return -1;
    });
  }

};

describe('should add a project and then delete it', function() {

  beforeEach(function () {
    var username = Utilities.generateUsername();
    var password = Utilities.generateUniqueId();
    Utilities.register(username, password);
    Utilities.login(username, password);
  });

  afterEach(function () {
    Utilities.logout();
  });

  it('should add a project and then remove it', function() {
    Utilities.gotoProjects();
    expect(projectUtil.getProjectsCount()).toBe(0);

    // Add new entry
    var project = {
      name: 'Project A'
    };
    projectUtil.addProject(project);
    expect(projectUtil.getProjectsCount()).toBe(1);

    // Delete it
    projectUtil.deleteProject(project, 0).then(function () {
      expect(projectUtil.getProjectsCount()).toBe(0);
    });
  });
});
