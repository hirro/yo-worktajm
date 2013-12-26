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

describe('Service: TimerService', function () {

  // load the module
  beforeEach(module('yoWorktajmApp'));

  // API
  var httpBackend;
  var timerService, personService;
  var scope;

  // Test constants
  var projects;
  var timeEntries;
  var persons;

  // Inject the required services
  beforeEach(inject(function (TimerService, PersonService, $httpBackend, $rootScope) {
    timerService = TimerService;
    personService = PersonService;
    httpBackend = $httpBackend;
    scope = $rootScope;

    // Assume we are logged in as user id 1
    personService.personId = 1;

    // Test constants
    projects = [
      { id: 301, name: 'Project A' },
      { id: 302, name: 'Project B' }
    ];
    timeEntries = [
      { id: 201, startTime: 0, endTime: 1381337488*1000, project: projects[0] },
      { id: 202, startTime: 0, endTime: 2 }
    ];
    persons = [
      { id: 1, username: 'User A', activeTimeEntry: null },
      { id: 2, username: 'User B' },
      { id: 3, username: 'User C', activeTimeEntry: timeEntries[0] }
    ];

  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('getTimeEntries', function () {

    it('should set the current time', function () {
      var dateString = '1998-10-08';
      timerService.setSelectedDate(dateString);
      expect(timerService.getSelectedDate()).toBe(dateString);
    });
  });

  describe('Persons, projects and time entries loaded', function () {
    beforeEach(function () {
      // Prereq 1 = Person must be loaded
      var person = null;
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/person/1').respond(persons[0]);
      personService.getPerson().then(function (result) {
        person = result;
      });
      scope.$digest();
      httpBackend.flush();
      expect(person.username).toBe('User A');

      // Prereq 2 = Projects must be loaded
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/project').respond(_.clone(projects));
      spyOn(scope, '$broadcast').andCallThrough();
      timerService.reloadProject();
      scope.$digest();
      httpBackend.flush();

       // Prereq 3 = TimeEntries must be loaded
      var timeEntries = null;
      timerService.getTimeEntries().then(function (result) {
        timeEntries = result;
      });
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/timeEntry').respond([
        { id: '1', startTime: '0', endTime: '1' }
      ]);
      scope.$digest();
      httpBackend.flush();
      expect(timeEntries.length).toBe(1);
    });

    it('should start and stop the timer successfully', function () {
      // Start the timer
      var person = personService.getPerson();
      var timerStartedSuccessfully = false;
      var error;
      var result;
      timerService.startTimer(projects[0]).then(function (r) {
        result = r;
        timerStartedSuccessfully = true;
      }, function (m) {
        error = m;
        timerStartedSuccessfully = false;
      });

      // Create time entry
      httpBackend.whenPOST('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/timeEntry').respond(timeEntries[0]);
      // Person is updated with active time entry
      httpBackend.whenPUT('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/person/1').respond(person[0]);
      scope.$digest();
      httpBackend.flush();

      // Verify that the proper event were signaled
      expect(scope.$broadcast).toHaveBeenCalledWith('onTimeEntryUpdated', result);
      expect(timerStartedSuccessfully).toBe(true);

      // Stop the timer
      var timerStoppedSuccessfully = false;
      timerService.stopTimer().then(function () {
        timerStoppedSuccessfully = true;
      }, function (reason) {
        console.error(reason);
        timerStoppedSuccessfully = false;
      });

      // Verify it is stopped
      httpBackend.whenPUT('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/timeEntry/201').respond(timeEntries[0]);
      scope.$digest();
      httpBackend.flush();
      expect(timerStoppedSuccessfully).toBe(true);
    });

    it('should not stop the timer when there are no active projects', function () {
      timerService.stopTimer(projects[0], persons[0]);
    });

    it('should handle null value for person gracefully', function () {
      timerService.stopTimer(projects[0], null);
    });

    it('should handle null value for project gracefully', function () {
      timerService.stopTimer(null, persons[0]);
    });

  });
});
