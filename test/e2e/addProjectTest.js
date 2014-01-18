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

function addProject(project) {

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

  // Get length after
  element.all(by.repeater('project in projects')).then(function (arr) {
    expect(arr.length).toBe(startLength + 1);
  });
}

function deleteProject(project) {
  // Get length before
  var startLength;
  element.all(by.repeater('project in projects')).then(function (arr) {
    startLength = arr.length;
  });

  // Perform delete operation on last elements
  element.all(by.repeater('project in projects')).then(function(arr) {
    var lastElement = arr[arr.length-1];

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
    browser.sleep(1000); // It may take some time before the list is reloaded
  });

  // The project size should now be -1
  element.all(by.repeater('project in projects')).then(function (arr) {
    expect(arr.length).toBe(startLength-1);
  });

}

describe('should add a project and then delete it', function() {
  it('should login successfully', function() {
    Utilities.login();

    var project = {
      name: 'Project ' + Utilities.generateUniqueId(),
      description: 'Description',
      rate: 22
    };
    addProject(project);
    deleteProject(project);
  });


});
