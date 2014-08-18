/*globals expect, afterEach, beforeEach, spyOn, describe, it, inject, _ */

'use strict';

describe('Service: worktajm', function () {

  // load the service's module
  beforeEach(module('worktajmApp'));
  beforeEach(module('socketMock'));

  // instantiate service
  var Worktajm, $httpBackend, TimeEntry, scope;
  beforeEach(inject(function (_Worktajm_, _TimeEntry_, _$httpBackend_) {
    Worktajm = _Worktajm_;
    TimeEntry = _TimeEntry_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  // Test constants (declare in constants file)
  var userA = {
    _id: 'ObjectId("010000")'
  };
  var projectA = {
    _id: 'ObjectId("010101")',
    name: 'Project A',
    createdBy: userA._id
  };
  var timeEntryA1 = {
    _id: 'ObjectId("010201")',
    createdBy: userA._id,
    startTime: '2014-07-21T08:00:00.000Z'
  };

  it('should start a timer for project when there are no active timers', function () {

    // 1. New time entry should be created with the following properties:
    //    A. Owner id is current user.
    //    B. Project id is the provided project's id.
    // 2. User is updated with the following properties:
    //    * Active project id is the newly created time entry.

    // Mock create project
    var pushed = {
      'project':  projectA._id,
      'startTime': '2014-07-21T08:00:00.000Z'
    };
    $httpBackend.expectPOST('/api/timeEntries', pushed).respond(timeEntryA1);

    var newTimeEntry = null;
    Worktajm.startTimer(projectA).then(function (result) {
      newTimeEntry = result;
    });
    $httpBackend.flush();

    expect(newTimeEntry._id).toEqual(timeEntryA1._id);
    expect(newTimeEntry.createdBy).toEqual(userA._id);
  });

});
