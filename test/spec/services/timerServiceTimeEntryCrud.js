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


/*globals expect, afterEach, beforeEach, spyOn, describe, it, inject, _ */

'use strict';

describe('Service: TimerService - CRUD operations for TimeEntry', function () {

  // load the module
  beforeEach(module('yoWorktajmApp'));

  // API
  var httpBackend;
  var timerService, personService;
  var scope;

  // Test constants
  var projects = [
    { id: 301, name: 'Project A' },
    { id: 302, name: 'Project B' }];
  var timeEntries = [
    { id: 201, startTime: 0, endTime: 1381337488*1000, project: projects[0] },
    { id: 202, startTime: 0, endTime: 2 }];
  var persons = [
    { id: 1, username: 'User A', activeTimeEntry: null },
    { id: 2, username: 'User B' },
    { id: 3, username: 'User C', activeTimeEntry: timeEntries[0] }];

  // Inject the required services
  beforeEach(inject(function (TimerService, PersonService, $httpBackend, $rootScope) {
    timerService = TimerService;
    personService = PersonService;    
    httpBackend = $httpBackend;
    scope = $rootScope;
  }));  

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should return the time entry with the provided id', function() {
    httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/timeEntry').respond(timeEntries);      
    timerService.getTimeEntries().then(function () {
      console.log('Promise fulfilled, got time entry');
    });
    // Make the requests go though
    scope.$digest();
    httpBackend.flush();
    // The test
    var timeEntry = timerService.findTimeEntryById(201);
    expect(timeEntry).toBeDefined();
    expect(timeEntry.id).toBe(201);
  });

  it('should remove the provided time entry', function () {
    httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/timeEntry').respond(timeEntries);      
    timerService.getTimeEntries().then(function () {
      console.log('Promise fulfilled, got time entry');
    });
    // Make the requests go though
    scope.$digest();
    httpBackend.flush();
    // Verify the entry exists
    var timeEntry = timerService.findTimeEntryById(201);
    expect(timeEntry).toBeDefined();
    expect(timeEntry.id).toBe(201);
    // Remove time entry
    timerService.removeTimeEntry(timeEntry);
    // Make the requests go though
    httpBackend.whenDELETE('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/timeEntry/201').respond();
    scope.$digest();
    httpBackend.flush();
    // Verify its gone
    timeEntry = timerService.findTimeEntryById(201);
    expect(timeEntry).not.toBeDefined();
  });

  it('should update the time entry with a valid id', function() {
    // Must load time entries      
    httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/timeEntry').respond(timeEntries);
    timerService.getTimeEntries().then(function () {
      console.log('Got time entries from service');
    });
    scope.$digest();
    httpBackend.flush();

    // Perform the update
    var updatedTimeEntry = null;
    var timeEntry = timeEntries[0];
    var updatedTimeEntry = timeEntry;
    var receivedTimeEntry = null;
    updatedTimeEntry.project = projects[1];
    httpBackend.whenPUT('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/timeEntry/202').respond(updatedTimeEntry);
    timerService.updateTimeEntry(updatedTimeEntry).then(function (result) {
      receivedTimeEntry = result;
    });
    scope.$digest();
    httpBackend.flush();
    expect(receivedTimeEntry).toBeDefined();
    expect(receivedTimeEntry).toBe(updatedTimeEntry);
  });

  it('should handle an update for an id which does not exist', function () {
    // Must load time entries      
    httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/timeEntry').respond([]);
    timerService.getTimeEntries().then(function () {
      console.log('Got time entries from service');
    });
    scope.$digest();
    httpBackend.flush();

    // Perform the update
    var failed = false;
    timerService.updateTimeEntry(timeEntries[0]).then(function () {
      console.error('Should not get a success from this');
    },
    function (reason) {
      console.log('Expected failure');
      failed = true;
    });
    scope.$digest();
    expect(failed).toBe(true);
  });   


  it('should handle an update with a HTTP error', function () {
    // Must load time entries      
    httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/timeEntry').respond(timeEntries);
    timerService.getTimeEntries().then(function () {
      console.log('Got time entries from service');
    });
    scope.$digest();
    httpBackend.flush();

    // Perform the update
    var updatedTimeEntry = null;
    var timeEntry = timeEntries[0];
    var receivedTimeEntry = null;
    var failed = false;
    httpBackend.whenPUT('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/timeEntry/202').respond(401);
    timerService.updateTimeEntry(timeEntry).then(function (result) {
      receivedTimeEntry = result;
    }, function () {
      failed = true;
    });
    scope.$digest();
    httpBackend.flush();
    expect(failed).toBe(true);
 });   

  it('should handle an update that returns HTTP error', function () {
    // Must load time entries      
    httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/timeEntry').respond(301);
    timerService.getTimeEntries().then(function () {
      console.log('Got time entries from service');
    });
    scope.$digest();
    httpBackend.flush();

    // Perform the update
    var failed = false;
    timerService.updateTimeEntry(timeEntries[0]).then(function () {
      console.error('Should not get a success from this');
    },
    function () {
      failed = true;
    });
    scope.$digest();
    expect(failed).toBe(true);
  });    
});
