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
/*globals describe, $, it, beforeEach, inject, expect, spyOn, spyOnEvent, _ */
/*jshint camelcase: false */

'use strict';

describe('Controller: DashboardTimeEntriesCtrl', function () {
  // load the controller's module
  beforeEach(module('yoWorktajmApp'));

  var DashboardTimeEntriesCtrl, scope, $rootScope, $httpBackend, $q;

  var projects = [
    {'id': 1, 'name': 'Project A', 'description': null, 'rate': null, 'new': false},
    {'id': 2, 'name': 'Project B', 'description': null, 'rate': null, 'new': false},
    {'id': 3, 'name': 'Project C', 'description': null, 'rate': null, 'new': false}
  ];
  var timeEntries = [
    {id: 1, startTime: 2, endTime: 3, project: projects[0]},
    {id: 2, startTime: 1385715694000, endTime: 1385716500000, project: projects[1]}
  ];

  // Initialize the TimerServiceMock
  var TimerServiceMock = {
    startTimer: function () {
      console.log('TimerServiceMock:startTimer called');
    },
    stopTimer: function () {
      console.log('TimerServiceMock:stopTimer called');
    },
    getTimeEntries: function () {
      console.log('TimerServiceMock::getTimeEntries');
      return null;
    },
    removeTimeEntry: function() {
    },
    getProjects: function () {
      return projects;
    },
    updateTimeEntry: function (timeEntry) {
      var deferred = $q.defer();
      deferred.resolve(timeEntry);
      console.log('TimerServiceMock::updateTimeEntry done');
      return deferred.promise;
    },
    updateProject: function (project) {
      var deferred = $q.defer();
      var result = _.clone(project);
      result.id = 33;
      deferred.resolve(result);
      console.log('TimerServiceMock::updateProject done');
      return deferred.promise;
    }
  };

  // Initialize the PersonServiceMock
  var activeProjectId = -1;
  var PersonServiceMock = {
    getActiveProjectId: function () {
      return activeProjectId;
    }
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$rootScope_, _$httpBackend_, _$q_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $q = _$q_;
    DashboardTimeEntriesCtrl = $controller('DashboardTimeEntriesCtrl', {
      $scope: scope,
      PersonService: PersonServiceMock,
      TimerService: TimerServiceMock
    });
    DashboardTimeEntriesCtrl.$inject = ['$scope',  '$route', 'ProjectServic', 'PersonService', 'TimerService'];
  }));

  describe('General tests', function () {
    it('it should format the end time properly for a time entry', function () {
      var endTime = scope.getEndTime(timeEntries[0]);
      //expect(endTime).toBe('01:00:00');
    });

    it('should return the time difference in a formatted string', function () {
      var timeEntry = {
        startTime: 0,
        endTime: 1000*34 + 1000*60*24 + 1000*60*60*3
      };
      var duration = scope.getDuration(timeEntry);
      expect(duration).toBe('03:24');
    });

    it('should return the time difference in a formatted string', function () {
      var timeEntry = {
        startTime: 0,
        endTime: 1000*34 + 1000*60*24
      };
      var duration = scope.getDuration(timeEntry);
      expect(duration).toBe('00:24');
    });

    it('should not return the time entry with id 1 when not yet initialized', function () {
      var timeEntry = scope.findTimeEntryById(1);
      expect(timeEntry).not.toBeDefined();
    });

    it('should return the time entry with the provider id', function () {
      var timeEntry = scope.findTimeEntryById(1);
      expect(timeEntry).not.toBeDefined();
      scope.$broadcast('onTimeEntriesRefreshed', timeEntries);
      scope.$digest();
      timeEntry = scope.findTimeEntryById(1);
      expect(timeEntry).toBeDefined();
    });

    it('should remove the time entry', function () {
      var timeEntry = scope.findTimeEntryById(1);
      spyOn(TimerServiceMock, 'removeTimeEntry').andCallThrough();
      expect(timeEntry).not.toBeDefined();
      scope.$broadcast('onTimeEntriesRefreshed', timeEntries);
      scope.$digest();
      timeEntry = scope.findTimeEntryById(1);
      expect(timeEntry).toBeDefined();
      scope.removeTimeEntry(timeEntry);
      expect(TimerServiceMock.removeTimeEntry).toHaveBeenCalledWith(timeEntry);
    });

    it('should send broadcast when editing a time entry', function () {
      $httpBackend.whenGET('timeEntryModal.html').respond();
      spyOn($rootScope, '$broadcast');
      scope.editTimeEntry(timeEntries[1]);
      scope.$digest();
    });

    it('should update a time entry with unmodified project name', function () {
      spyOn(TimerServiceMock, 'updateTimeEntry').andCallThrough();
      spyOn(TimerServiceMock, 'updateProject').andCallThrough();
      var timeEntry = {
        id: 1,
        startTime: 1,
        endTime: 2,
        project: {
          id: 1,
          name: 'Hej'
        }
      };
      scope.updateTimeEntryOnOk(timeEntry);
      scope.$digest();

      // Validations
      expect(TimerServiceMock.updateTimeEntry).toHaveBeenCalledWith(timeEntry);
      expect(TimerServiceMock.updateProject).not.toHaveBeenCalledWith(timeEntry);
    });

    it('should create a project and update a time entry when project id is null', function () {
      spyOn(TimerServiceMock, 'updateTimeEntry').andCallThrough();
      spyOn(TimerServiceMock, 'updateProject').andCallThrough();
      var project = {
        name: 'Hej'
      };
      var timeEntry = {
        id: 1,
        startTime: 1,
        endTime: 2,
        project: project
      };
      scope.updateTimeEntryOnOk(timeEntry);
      scope.$digest();

      // Validations
      expect(TimerServiceMock.updateTimeEntry).toHaveBeenCalledWith(timeEntry);
      expect(TimerServiceMock.updateProject).toHaveBeenCalledWith(project);
    });

    it('should return the time entry with the provider id', function () {
      // Prepare
      scope.$broadcast('onTimeEntriesRefreshed', timeEntries);
      scope.$digest();
      var timeEntry = scope.findTimeEntryById(1);
      expect(timeEntry.project.name).toBe('Project A');

      // Test 
      var updatedProject = {
        id: 1,
        name: 'A'
      };
      scope.$broadcast('onProjectUpdated', updatedProject);
      scope.$digest();

      // Verify
      expect(timeEntry.project.name).toBe('A');
    });

    it('should make sure that a logout event clears the time entries', function () {
      // Prepare
      scope.$broadcast('onTimeEntriesRefreshed', timeEntries);
      scope.$digest();
      expect(scope.findTimeEntryById(1)).toBeDefined();

      scope.$broadcast('onLoggedOut');
      scope.$digest();

      // Verify
      expect(scope.findTimeEntryById(1)).not.toBeDefined();
    });

  });
});
