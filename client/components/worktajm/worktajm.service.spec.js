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

  // Utility functions
  var loginAs = function (user) {
    var currentUser;
    Worktajm.getCurrentUser().then(function (result) {
      currentUser = result;
    });
    $httpBackend.expectGET('/api/users/me').respond(userA);      
    $httpBackend.flush();
    expect(currentUser._id).toBe(userA._id);

    return currentUser;
  };

  // instantiate service
  var Worktajm, $httpBackend, TimeEntry, $scope, Auth;
  beforeEach(inject(function (_Worktajm_, _TimeEntry_, _$httpBackend_, _Auth_, $rootScope) {
    Worktajm = _Worktajm_;
    TimeEntry = _TimeEntry_;
    $httpBackend = _$httpBackend_;
    Auth = _Auth_;
    $scope = $rootScope;
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('currentUser', function () {

    it('should get the current user first time it is called but not second time', function () {
      var currentUser = loginAs(userA);
      Worktajm.getCurrentUser().then(function (result) {
        currentUser = result;
      });
      expect(currentUser._id).toBe(userA._id);
    });
  });

  ddescribe('User A is logged in, no active timer', function () {

    beforeEach(function() {
      var currentUser;

      loginAs(userA);
      Worktajm.getCurrentUser()
        .then(function(result) {
          currentUser = result;
        });
      $scope.$digest();


    });

    it('should set and get the active time entry', function () {
      var currentUser, activeTimeEntry;

      // Setting active to A1
      Worktajm.setActiveTimeEntry(timeEntryA1);
      $httpBackend.expectPUT('/api/users/me/activeTimeEntry').respond(userAWithActiveTimeEntryA1);
      $httpBackend.flush();

      // Get current time entry
      Worktajm.getActiveTimeEntry().then(function (result) {
        activeTimeEntry = result;
      });
      $httpBackend.expectGET('/api/timeEntries/' + timeEntryA1._id).respond(timeEntryA1);
      $httpBackend.flush();
      $scope.$digest();
      expect(activeTimeEntry._id).toEqual(timeEntryA1._id);
    });

    xit('should start timer for project A', function () {
      Worktajm.startTimer(projectA);
      $httpBackend.flush();
      expect();
    });

    iit('should try to stop the timer', function () {
      Worktajm.stopTimer();
      $scope.$digest();
    });

  });

  describe('startTimer', function () {
    it('should start a timer for project when there are no active timers', function () {

      Auth.login(userA);

      // Mock create project
      var pushedTimeEntry = {
        projectId:  projectA._id,
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

    it('should return the active time entry for a user with a running task', function () {
      Auth.login(userAWithActiveTimeEntryA1);
      var currentUser;

      Worktajm.getCurrentUser().then(function (u) {
        currentUser = u[0];
      });

      $httpBackend.expectGET('/api/users/me').respond(userAWithActiveTimeEntryA1);
      $httpBackend.flush();

      expect(currentUser.activeTimeEntryId).toEqual(timeEntryA1._id);

      // Get active time entry
      var activeTimeEntry = null;
      Worktajm.f().then(function (result) {
        activeTimeEntry = result;
      });

      //$httpBackend.expectPUT('/api/users/me/activeTimeEntry').respond(userAWithActiveTimeEntryA1);
      $httpBackend.expectGET('/api/timeEntries/' + timeEntryA1._id).respond(timeEntryA1);      
      $httpBackend.flush();

      expect(activeTimeEntry._id).toEqual(timeEntryA1._id);
      expect(activeTimeEntry.createdBy).toEqual(userA._id);
    });

    it('should set the active time entry', function () {
      console.log('');

    });

    it('should stop person with no active timers', function () {
      Auth.login(userA);
      var currentUser;

      Worktajm.getCurrentUser().then(function (u) {
        currentUser = u[0];
      });

      $httpBackend.flush();
      expect(currentUser.activeTimeEntryId).toBeNull();

     //  // Mock create project
     //  var pushedTimeEntry = {
     //    projectId:  projectA._id,
     //    startTime: '2014-07-21T08:00:00.000Z'
     //  };

     //  $httpBackend.expectGET('/api/timeEntries/' + timeEntryA1._id).respond(timeEntryA1);
     //  $httpBackend.expectPUT('/api/users/me/activeTimeEntry').respond(userAWithActiveTimeEntryA1);
     // // $httpBackend.expectPOST('/api/timeEntries', pushedTimeEntry).respond(timeEntryA1);

     //  // Start one timer
     //  var newTimeEntry = null;
     //  Worktajm.stopTimer().then(function (result) {
     //    newTimeEntry = result;
     //  });
     //  $httpBackend.flush();
     //  expect(newTimeEntry._id).toEqual(timeEntryA1._id);
      //expect(newTimeEntry.createdBy).toEqual(userA._id);      
    });    

    it('should stop an active timer', function () {
      Auth.login(userAWithActiveTimeEntryA1);
      var currentUser;

       Worktajm.getCurrentUser().then(function (u) {
        currentUser = u[0];
       });

      expect(currentUser.activeTimeEntryId).toEqual(timeEntryA1._id);

      // Mock create project
      var pushedTimeEntry = {
        projectId:  projectA._id,
        startTime: '2014-07-21T08:00:00.000Z'
      };

      $httpBackend.expectGET('/api/timeEntries/' + timeEntryA1._id).respond(timeEntryA1);
      $httpBackend.expectPUT('/api/users/me/activeTimeEntry').respond(userAWithActiveTimeEntryA1);
     // $httpBackend.expectPOST('/api/timeEntries', pushedTimeEntry).respond(timeEntryA1);

      // Start one timer
      var newTimeEntry = null;
      Worktajm.stopTimer().then(function (result) {
        newTimeEntry = result;
      });
      $httpBackend.flush();
      expect(newTimeEntry._id).toEqual(timeEntryA1._id);
      //expect(newTimeEntry.createdBy).toEqual(userA._id);      
    });
  });
});
