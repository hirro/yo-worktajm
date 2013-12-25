
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

/*globals describe, beforeEach, inject, expect, it, spyOn */
'use strict';
describe('Controller: DashboardProjectsCtrl', function ($q) {

  // load the controller's module
  beforeEach(module('yoWorktajmApp'));

  var DashboardProjectsCtrl, scope, q;
  var projects = [
    {'id': 1, 'name': 'Project A', 'description': null, 'rate': null, 'new': false},
    {'id': 2, 'name': 'Project B', 'description': null, 'rate': null, 'new': false},
    {'id': 3, 'name': 'Project C', 'description': null, 'rate': null, 'new': false}
  ];
  var timeEntries = [
    {id: 1, startTime: 2, endTime: 3},
    {id: 2, startTime: 2, endTime: 3}
  ];

  // Initialize the TimerServiceMock
  var TimerServiceMock = {
    startTimer: function (project) {
      console.log('TimerServiceMock:startTimer called');
      var deferred = q.defer();
      deferred.resolve(project);
      return deferred.promise;
    },
    stopTimer: function () {
      console.log('TimerServiceMock:stopTimer called');
      var deferred = q.defer();
      deferred.resolve();
      console.log('TimerServiceMock::stopTimer done');
      return deferred.promise;
    },
    removeProject: function (project) {
      console.log('TimerServiceMock:removeProject called');
    },
    refresh: function () {
      console.log('TimerServiceMock:refresh called');
    },
    updateProject: function () {
      console.log('TimerServiceMock:updateProject called');
    },
    reloadProject: function () {
      console.log('TimerServiceMock::reloadProject called');
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
  beforeEach(inject(function ($controller, $rootScope, $injector, $q) {
    scope = $rootScope.$new();
    q =$q;
    DashboardProjectsCtrl = $controller('DashboardProjectsCtrl', {
      $scope: scope,
      TimerService: TimerServiceMock,
      PersonService: PersonServiceMock
    });
    //var projects = [];
    DashboardProjectsCtrl.$inject = ['$scope',  '$route', 'ProjectServic', 'PersonService', 'TimerService'];
  }));

  it('should initialize with empty project list, etc.', function () {
    expect(scope.projects).toBeDefined();
    expect(scope.projects.length).not.toBeDefined();
  });

  it('should use projects provided from service when receiving "onProjectsRefreshed" event', function () {
    scope.$broadcast('onProjectsRefreshed', projects);
    expect(scope.projects).toBeDefined();
    expect(scope.projects.length).toBe(3);
  });

  it('should return the reference of the project with id', function () {
    scope.projects = projects;
    expect(scope.getById(scope.projects, 2)).toEqual(projects[1]);
  });

  it('should create a new project using the TimerService', function () {
    spyOn(TimerServiceMock, 'updateProject').andCallThrough();
    scope.project.name = 'New Project';
    scope.project.rate = 530;
    scope.project.comment = 'Hej';
    scope.createProjectFromScope();
    expect(TimerServiceMock.updateProject).toHaveBeenCalled();
  });

  it('should call removeProject in TimerService', function () {
    // Register spyes
    spyOn(TimerServiceMock, 'removeProject').andCallThrough();

    // Test code
    var project = projects[1];
    scope.removeProject(project);

    // Must emulate a click of the ok button
    $('#confirmationModalDeleteBtn').click();

    // Check spyes
    //expect(TimerServiceMock.removeProject).toHaveBeenCalled();
  });

  it('should should call updateProject in TimerService', function () {
    var project = projects[2];
    spyOn(TimerServiceMock, 'updateProject').andCallThrough();
    scope.updateProject(project);
    expect(TimerServiceMock.updateProject).toHaveBeenCalled();
  });

  it('should just start a timer for the given project', function () {
    // Register spyes
    spyOn(TimerServiceMock, 'startTimer').andCallThrough();
    spyOn(TimerServiceMock, 'stopTimer').andCallThrough();

    // Start timer
    var projectToStart = projects[0];
    scope.startTimer(projectToStart);
    activeProjectId = 2;

    // Make the requests go though
    scope.$digest();

    // Verifications
    expect(TimerServiceMock.startTimer).toHaveBeenCalled();
    expect(TimerServiceMock.stopTimer).toHaveBeenCalled();
    expect(PersonServiceMock.getActiveProjectId()).toBe(2);
  });

  it('should stop active timer when project is active', function () {
    // Register spyes
    spyOn(TimerServiceMock, 'startTimer').andCallThrough();

    // Test code
    var projectToStart = projects[0];
    activeProjectId = projectToStart.id;
    scope.startTimer(projectToStart);

    // Make the requests go though
    scope.$digest();

    // Project should no longer be active
    expect(TimerServiceMock.startTimer).toHaveBeenCalled();

  });


  it('should create a new timer task and stop the running one when project is active', function () {
    // Setup test

    // Test code

    // Verifications
  });

  describe('test the events', function () {
    it('should handle onProjectUpdated event', function () {
      scope.$broadcast('onProjectUpdated', projects[0]);
    });

    it('should handle the onProjectsRefreshed event', function () {
      var emptyList = {};
      scope.$broadcast('onProjectsRefreshed', emptyList);
      expect(scope.projects).toBe(emptyList);
      scope.$broadcast('onProjectsRefreshed', projects);      
      expect(scope.projects).toBe(projects);
    });
  });
});
