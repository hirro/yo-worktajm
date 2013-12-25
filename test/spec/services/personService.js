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

/* globals expect, it, afterEach, beforeEach, spyOn, describe, inject */

'use strict';

describe('Service: PersonService', function () {

  // load the service's module
  beforeEach(module('yoWorktajmApp'));

  // API
  var httpBackend;
  var service;
  var scope;

  // Test constants
  var projects = [
    { id: 301, name: 'Project A', rate: null }];
  var timeEntries = [
    { id: 201, startTime: 0, endTime: 2, project: projects[0] }];
  var persons = [
    { id: 1, username: 'User A', activeTimeEntry: null },
    { id: 2, username: 'User B' },
    { id: 3, username: 'User C', activeTimeEntry: timeEntries[0] }];
  var authenicationResponse = {
    token:  'jim@arnellconsulting.com:1385447985128:632a4ef7344da65b43ca694090da2813',
    roles:  {
      ROLE_USER:  true
    },
    personId:   1
  };

  // Inject the person service
  beforeEach(inject(function (PersonService, $httpBackend, $rootScope) {
    service = PersonService;
    httpBackend = $httpBackend;
    scope = $rootScope;

    // Assume we are logged in as user id 1
    service.personId = 1;
  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('getPerson', function () {

    it('should get the currenly logged in person', function () {

      // Test setup
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/person/1').respond(persons[0]);
      spyOn(service, 'getPerson').andCallThrough();

      // Test
      var personA = null;
      service.getPerson().then(function (result) {
        personA = result;
      });

      // Make the requests go though
      scope.$digest();
      httpBackend.flush();

      expect(service.getPerson).toHaveBeenCalled();
      expect(personA).toBeDefined();
      expect(personA.id).toBe(1);
      expect(personA.username).toBeDefined();
      expect(personA.username).toBe('User A');

      // Get person one more time and make sure it is not reloaded from backend
      var personB;
      httpBackend.resetExpectations();
      service.getPerson().then(function (result) {
        personB = result;
      });
      scope.$digest();
      expect(service.getPerson).toHaveBeenCalled();
      expect(personB).toBeDefined();
      expect(personB.id).toBe(1);
      expect(personB.username).toBeDefined();
      expect(personB.username).toBe('User A');

    });

    it('should fail gracefully when token has expired or is invalid', function () {
        // Test setup
        httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/person/1').respond(403);
        spyOn(service, 'getPerson').andCallThrough();

        // Test
        var person = null;
        service.getPerson().then(function (result) {
          person = result;
        }, function () {
          person = null;
        });

        // Make the requests go though
        scope.$digest();
        httpBackend.flush();

        expect(service.getPerson).toHaveBeenCalled();
        expect(person).toBe(null);
    });
  });

  describe('getActiveProjectId', function () {

    it('should return the -1 when no project is active', function () {

      // Test setup
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/person/1').respond(persons[0]);
      var person = null;
      service.getPerson().then(function (result) {
        person = result;
      }, function () {
      });

      // Make the requests go though
      scope.$digest();
      httpBackend.flush();

      // Test
      var projectId = service.getActiveProjectId();

      expect(projectId).toBe(-1);
    });

    it('should return the project id when no user is logged in', function () {
      // Test setup
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/person/1').respond(persons[2]);
      var person = null;
      service.getPerson().then(function (result) {
        person = result;
      }, function () {
      });

      // Make the requests go though
      scope.$digest();
      httpBackend.flush();

      var projectId = service.getActiveProjectId();
      expect(projectId).toBe(301);
    });
  });
  
  describe('person is loaded', function () {
    beforeEach(function () {

      // Test setup
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/person/1').respond(persons[0]);
      spyOn(service, 'getPerson').andCallThrough();

      // Test
      var personA = null;
      service.getPerson().then(function (result) {
        personA = result;
      });

      // Make the requiest go through
      scope.$digest();
      httpBackend.flush();

      expect(service.getPerson).toHaveBeenCalled();
      expect(personA).toBeDefined();
      expect(personA.id).toBe(1);
      expect(personA.username).toBeDefined();
      expect(personA.username).toBe('User A');

    });

    it('should set the active time entry', function () {
      var failed = false;
      var activated = false;
      httpBackend.whenPUT('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/person/1').respond(timeEntries[0]);
      service.setActiveTimeEntry(timeEntries[0]).then(function () {
        activated = true;
      }, function () {
        failed = true;
      });

      // Make the requiest go through
      scope.$digest();
      httpBackend.flush();
      expect(service.getActiveTimeEntry()).toBe(timeEntries[0]);
      expect(activated).toBe(true);
      expect(failed).toBe(false);
    });

    it('setActiveTimeEntry should handle backend error gracefully', function () {
      var failed = false;
      var activated = false;
      httpBackend.whenPUT('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/person/1').respond(401);
      service.setActiveTimeEntry(timeEntries[0]).then(function () {
        activated = true;
      }, function () {
        failed = true;
      });

      // Make the requiest go through
      scope.$digest();
      httpBackend.flush();
      expect(service.getActiveTimeEntry()).toBe(timeEntries[0]);
      expect(activated).toBe(false);
      expect(failed).toBe(true);
    });
  });
  
  describe('login tests', function () {
    it('should login successfully', function () {
      var person = null;
      var suceeded = false;
      var failed = false;

      service.login('UserA', 'PasswordA').then(function (result) {
        person = result;
        suceeded = true;
      }, function () {
        failed = true;
      });
      expect(person).toBeNull();

      // Make the requiest go through
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/authenticate?password=PasswordA&username=UserA').respond(authenicationResponse);
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/person/1').respond(persons[0]);
      scope.$digest();
      httpBackend.flush();
      
      // Validations
      expect(person).not.toBeNull();
      expect(suceeded).toBe(true);
      expect(failed).toBe(false);
    });

    it('should fail login on authentication failure', function () {
      var person = null;
      var suceeded = false;
      var failed = false;
      service.login('UserA', 'PasswordA').then(function (result) {
        person = result;
        suceeded = true;
      }, function () {
        failed = true;
      });
      expect(person).toBeNull();

      // Make the requiest go through
      // XXX I dont like host and path hard coded...
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/authenticate?password=PasswordA&username=UserA').respond(401);
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/person/1').respond(persons[0]);
      scope.$digest();
      httpBackend.flush();
      
      // Validations
      expect(person).toBeNull();
      expect(suceeded).toBe(false);
      expect(failed).toBe(true);
    });


    it('should fail gracefully in the unlikely event that authentication suceeded but it failed to get the person', function () {
      var person = null;
      var suceeded = false;
      var failed = false;
      service.login('UserA', 'PasswordA').then(function (result) {
        person = result;
        suceeded = true;
      }, function () {
        failed = true;
      });
      expect(person).toBeNull();

      // Make the requiest go through
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/authenticate?password=PasswordA&username=UserA').respond(authenicationResponse);
      httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/api/api/person/1').respond(401);
      scope.$digest();
      httpBackend.flush();    
      
      // Validations
      expect(person).toBeNull();
      expect(suceeded).toBe(false);
      expect(failed).toBe(true);
    });

  });
  
});
