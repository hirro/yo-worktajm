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
    $httpBackend.expectGET('/api/users/me').respond(user);      
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

  describe('timer,', function () {
    describe('User A is logged in, user A has no active timer, ', function () {

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

      it('should start timer for project A', function () {
        Worktajm.startTimer(projectA);

        // New time entry is created
        $httpBackend.expectPOST('/api/timeEntries').respond(timeEntryA1);
        // User is updated with active time entry
        $httpBackend.expectPUT('/api/users/me/activeTimeEntry').respond(userAWithActiveTimeEntryA1);

        $httpBackend.flush();
        $scope.$digest();
      });

      iit('should try to stop the timer', function () {
        Worktajm.stopTimer();

        // No communication with backend is expected
        $scope.$digest();
      });

    });

    describe('User A is logged in and has an active timer running - ', function () {

      beforeEach(function() {
        var currentUser;
        loginAs(userAWithActiveTimeEntryA1);
        Worktajm.getCurrentUser().then(function(result) {
          currentUser = result;
        });
        $scope.$digest();
        expect(currentUser._id).toEqual(userAWithActiveTimeEntryA1._id);
        expect(currentUser.activeTimeEntryId).toEqual(userAWithActiveTimeEntryA1.activeTimeEntryId);
      });      

      it('should not fetch user information since it is cached', function () {
        var currentUser, activeTimeEntry;

        // Get current time entry
        Worktajm.getCurrentUser().then(function (result) {
          currentUser = result;
        });

        // Current time entry needs to be fetched from backend.
        $scope.$digest();
        expect(currentUser._id).toEqual(userAWithActiveTimeEntryA1._id);
      });

      it('should return return the active time entry', function () {
        var currentUser, activeTimeEntry;

        // Get current time entry
        Worktajm.getActiveTimeEntry().then(function (result) {
          activeTimeEntry = result;
        });

        // Current time entry needs to be fetched from backend.
        $httpBackend.expectGET('/api/timeEntries/' + timeEntryA1._id).respond(timeEntryA1);
        $httpBackend.flush();
        $scope.$digest();
        expect(activeTimeEntry._id).toEqual(timeEntryA1._id);
      });

      it('should stop an active timer', function () {
        Worktajm.stopTimer();

        $httpBackend.expectGET('/api/timeEntries/' + timeEntryA1._id).respond(timeEntryA1);
        $httpBackend.expectPOST('/api/timeEntries/' + timeEntryA1._id).respond(timeEntryA1);
        $httpBackend.expectPUT('/api/users/me/activeTimeEntry').respond(userAWithActiveTimeEntryA1);

        $httpBackend.flush();
        $scope.$digest();
      });
    });
  });
});
