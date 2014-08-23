/*globals expect, afterEach, beforeEach, spyOn, describe, it, inject, _ */

'use strict';

describe('Service: worktajm', function () {

  // load the service's module
  beforeEach(module('worktajmApp'));
  beforeEach(module('socketMock'));
  beforeEach(module('authMock'));

  // Test constants (declare in constants file)
  var userA = {
    _id: '11111111'
  };
  var projectA = {
    _id: '22222222',
    name: 'Project A',
    createdBy: userA._id
  };
  var projectB = {
    _id: '22222222',
    name: 'Project B',
    createdBy: userA._id
  };  
  var timeEntryA1 = {
    _id: '33333333',
    createdBy: userA._id,
    startTime: '2014-07-21T08:00:00.000Z'
  };
  var userAWithActiveTimeEntryA1 = {
    _id: userA._id,
    activeTimeEntryId: timeEntryA1._id,
    activeProjectId: projectA._id
  };

  // instantiate service
  var Worktajm, $httpBackend, TimeEntry, scope, Auth;
  beforeEach(inject(function (_Worktajm_, _TimeEntry_, _$httpBackend_, _Auth_) {
    Worktajm = _Worktajm_;
    TimeEntry = _TimeEntry_;
    $httpBackend = _$httpBackend_;
    Auth = _Auth_;
    //Auth.login(null);
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('startTimer', function () {
    it('should start a timer for project when there are no active timers', function () {

      Auth.login(userA);

      // Mock create project
      var pushedTimeEntry = {
        projectId:  projectA._id,
        startTime: '2014-07-21T08:00:00.000Z'
      };

      //Auth.login(userA);

      $httpBackend.expectPOST('/api/timeEntries', pushedTimeEntry).respond(timeEntryA1);
      $httpBackend.expectPUT('/api/users/me/activeTimeEntry').respond(userAWithActiveTimeEntryA1);

      // Start one timer
      var newTimeEntry = null;
      Worktajm.startTimer(projectA).then(function (result) {
        newTimeEntry = result;
      });
      $httpBackend.flush();
      expect(newTimeEntry._id).toEqual(timeEntryA1._id);
      expect(newTimeEntry.createdBy).toEqual(userA._id);
    });

    xit('should start a time for a project when there is an active timer for another project', function () {
      Auth.login(userAWithActiveTimeEntryA1);
      
      // Mock create project
      var pushedTimeEntry = {
        project:  projectA._id,
        startTime: '2014-07-21T08:00:00.000Z'
      };

      $httpBackend.expectPOST('/api/timeEntries', pushedTimeEntry).respond(timeEntryA1);
      $httpBackend.expectPUT('/api/users/me/activeTimeEntry').respond(userAWithActiveTimeEntryA1);

      // Start one timer
      var newTimeEntry = null;
      Worktajm.startTimer(projectA).then(function (result) {
        newTimeEntry = result;
      });
      $httpBackend.flush();
      expect(newTimeEntry._id).toEqual(timeEntryA1._id);
      expect(newTimeEntry.createdBy).toEqual(userA._id);      
    });
  });
});
