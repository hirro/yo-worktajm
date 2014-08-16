/*globals expect, afterEach, beforeEach, spyOn, describe, it, inject, _ */

'use strict';

describe('Service: worktajm', function () {

  // load the service's module
  beforeEach(module('worktajmApp'));
  beforeEach(module('socketMock'));

  // instantiate service
  var Worktajm, httpBackend, TimeEntry, scope;
  beforeEach(inject(function (_Worktajm_, _TimeEntry_, $httpBackend) {
    Worktajm = _Worktajm_;
    TimeEntry = _TimeEntry_;
    httpBackend = $httpBackend;
  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  // Test constants (declare in constants file)
  var projectA = {
    _id: '1',
    name: 'Project A'
  };
  var timeEntryA1 = {
    _id: '123',
    startTime: '',
    endTime: ''
  };

  it('should start a timer for project', function () {

    // 1. New time entry should be created with logged in user as owener
    // 2. 
    httpBackend.expectPOST('/api/timeEntries').respond(timeEntryA1);

    var newTimeEntry = null;
    Worktajm.createTimeEntry(projectA).then(function (result) {
      newTimeEntry = result;
    });
    httpBackend.flush();
    expect(newTimeEntry. _id).toEqual('123');
  });

});
