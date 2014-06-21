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

/*globals describe, beforeEach, inject, expect, it, spyOn, $ */
'use strict';
describe('Controller: DashboardProjectsCtrl', function () {

  // load the controller's module
  beforeEach(module('yoWorktajmApp'));

  var DashboardProjectsCtrl, scope, q, httpBackend;
  var projects = [
    {'id': 1, 'name': 'Project A', 'description': null, 'rate': null, 'new': false},
    {'id': 2, 'name': 'Project B', 'description': null, 'rate': null, 'new': false},
    {'id': 3, 'name': 'Project C', 'description': null, 'rate': null, 'new': false}
  ];

  // Initialize the TimerServiceMock
  var TimerServiceMock = {
    startTimer: function (project) {
      var deferred = q.defer();
      deferred.resolve(project);
      return deferred.promise;
    },
    stopTimer: function () {
      var deferred = q.defer();
      deferred.resolve();
      return deferred.promise;
    },
    deleteProject: function () {
    },
    refresh: function () {
    },
    updateProject: function (project) {
      var deferred = q.defer();
      deferred.resolve(project);
      return deferred.promise;
    },
    reloadProject: function () {
    },
    restoreProject: function (project) {
      var deferred = q.defer();
      if (project.id === 1) {
        project.name = projects[0].name;
        project.rate = projects[0].rate;
        deferred.resolve(project);
      } else {
        deferred.reject();
      }
      return deferred.promise;
    },
    getProject: function (id) {
      return projects[id];
    }
  };

  var CustomerServiceMock = {

    list: function () {
      return customers;
    },
    findCustomerByName: function (name) {
      var deferred = q.defer();
      if (name === customerA.name) {
        console.log('Found customer in mock');
        return deferred.resolve(customerA);
      } else {
        console.log('Customer NOT found in mock');
        return deferred.resolve(customerA);
      }
      return deferred.promise;
    },
    findOrCreateCustomerByName: function (name) {
      var deferred = q.defer();
      if (name === customerA.name) {
        console.log('Found customer in mock');
        deferred.resolve(customerA);
      } else if (name===null) {
        console.log('No name is provided, returning null');
        deferred.resolve(null);
      } else {
        console.log('Customer NOT found in mock, creating new one');
        deferred.resolve(customerA);
      }
      return deferred.promise;
    }
  };



  // Declare test constants
  var customerA;
  var customers;
  var activeProjectId;
  var PersonServiceMock;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector, $q, $httpBackend) {
    // Setup constants
    customerA = {
      id: 1,
      name: 'Company A'
    };
    customers = [
      { customerName: 'Company A'}
    ];

    // Initialize the PersonServiceMock
    activeProjectId = -1;
    PersonServiceMock = {
      getActiveProjectId: function () {
        return activeProjectId;
      }
    };

    // The rest
    scope = $rootScope.$new();
    q = $q;
    httpBackend = $httpBackend;
    DashboardProjectsCtrl = $controller('DashboardProjectsCtrl', {
      $scope: scope,
      TimerService: TimerServiceMock,
      PersonService: PersonServiceMock,
      CustomerService: CustomerServiceMock
    });
    DashboardProjectsCtrl.$inject = ['$scope',  '$route', 'ProjectServic', 'PersonService', 'TimerService'];
  }));

  it('should initialize with empty project list, etc.', function () {
    expect(scope.projects).toBeDefined();
    expect(scope.projects.length).toBe(0);
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

  it('should create a new project', function () {
    spyOn(TimerServiceMock, 'updateProject').and.callThrough();
    spyOn(CustomerServiceMock, 'findOrCreateCustomerByName').and.callThrough();
    var project = {
      name: 'New Project',
      rate: 530,
      comment: 'Hej',
      customerName: 'sdfsfd'
    };
    scope.updateProject(project);
    scope.$digest();
    expect(CustomerServiceMock.findOrCreateCustomerByName).toHaveBeenCalled();
    expect(TimerServiceMock.updateProject).toHaveBeenCalled();
  });

  describe('open modals', function () {
    it('should call deleteProject in TimerService', function () {
      // Register spyes
      spyOn(TimerServiceMock, 'deleteProject').and.callThrough();

      // Test code
      var project = projects[1];
      scope.deleteProject(project);

      // Must emulate a click of the ok button
      $('#confirmationModalDeleteBtn').click();

      // Check spyes
      //expect(TimerServiceMock.deleteProject).toHaveBeenCalled();
    });

    it('should call openCreateProjectModal', function () {
      scope.createProject(projects[1]);
    });

  });


  it('should restore the provided project', function () {
    spyOn(TimerServiceMock, 'getProject').and.callThrough();

    var project = {
      id:         1,
      name:       'A'
    };
    scope.restoreProject(project);
    scope.$digest();

    // Validation
    expect(TimerServiceMock.getProject).toHaveBeenCalledWith(1);
    expect(project.name).toBe(projects[1].name);
  });

  describe('update tests', function () {
    describe('project with no customer', function () {
      it('should just call updateProject in TimerService', function () {
        var project = projects[2];
        spyOn(TimerServiceMock, 'updateProject').and.callThrough();
        scope.updateProject(project);

        // Make the request go through
        scope.$digest();

        // Validation
        expect(TimerServiceMock.updateProject).toHaveBeenCalled();
      });
    });

    describe('project with existing customer', function () {
      it('should verify customer in CustomerService and then updateProject in TimerService', function () {
        // Setup
        var project = projects[2];
        project.customerName = customerA.name;
        spyOn(TimerServiceMock, 'updateProject').and.callThrough();
        spyOn(CustomerServiceMock, 'findOrCreateCustomerByName').and.callThrough();

        // Test
        scope.updateProject(project);

        // Make the request go through
        scope.$digest();

        // Validation
        expect(CustomerServiceMock.findOrCreateCustomerByName).toHaveBeenCalledWith(project.customerName);
        expect(TimerServiceMock.updateProject).toHaveBeenCalled();
      });
    });

    describe('project with new customer', function () {
      it('should verify customer in CustomerService and then stop. Customer must be created first.', function () {
        // Setup
        var project = projects[2];
        project.customerName = 'new customer name';
        spyOn(TimerServiceMock, 'updateProject').and.callThrough();
        spyOn(CustomerServiceMock, 'findOrCreateCustomerByName').and.callThrough();
        httpBackend.whenGET('customerModal.html').respond();

        // Test
        scope.updateProject(project);

        // Make the request go through
        scope.$digest();

        // Validation
        expect(CustomerServiceMock.findOrCreateCustomerByName).toHaveBeenCalledWith(project.customerName);
        expect(TimerServiceMock.updateProject).toHaveBeenCalled();
      });
    });
  });


  it('should just start a timer for the given project', function () {
    // Register spyes
    spyOn(TimerServiceMock, 'startTimer').and.callThrough();
    spyOn(TimerServiceMock, 'stopTimer').and.callThrough();

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
    spyOn(TimerServiceMock, 'startTimer').and.callThrough();

    // Test code
    var projectToStart = projects[0];
    activeProjectId = projectToStart.id;
    scope.startTimer(projectToStart);

    // Make the requests go though
    scope.$digest();

    // Project should no longer be active
    expect(TimerServiceMock.startTimer).toHaveBeenCalled();

  });

  it('should call stop timer of timer service', function () {
    // Register spyes
    spyOn(TimerServiceMock, 'stopTimer').and.callThrough();

    // Test code
    scope.stopTimer();

    // Make the requests go though
    scope.$digest();

    // Project should no longer be active
    expect(TimerServiceMock.stopTimer).toHaveBeenCalled();
  });


  it('should create a new timer task and stop the running one when project is active', function () {
    // Setup test

    // Test code

    // Verifications
  });

  describe('test the events', function () {
    it('should handle onProjectUpdated event', function () {
      scope.$broadcast('onLoggedOut');
    });

    it('should handle onProjectUpdated event', function () {
      scope.$broadcast('onProjectUpdated', projects[0]);
    });

    it('should handle the onProjectsRefreshed event', function () {
      var emptyList = {};
      scope.$broadcast('onProjectsRefreshed', emptyList);
      expect(scope.projects.length).toBe(0);
      scope.$broadcast('onProjectsRefreshed', projects);
      expect(scope.projects.length).toBe(projects.length);
    });

    it('should handle the onProjectDeleted event', function () {
      // Setup
      scope.projects = projects;
      expect(scope.projects.length).toBe(3);

      // Test
      scope.$broadcast('onProjectDeleted', projects[0]);

      // Project should be deleted in local cache
      expect(scope.projects.length).toBe(2);
    });
  });

  describe('customer tests', function () {
    it('should get a list of customers', function () {
      spyOn(CustomerServiceMock, 'list').and.callThrough();

      // Actual test
      var result = scope.getCustomers();

      // Make the request go through
      scope.$digest();

      // Verifications
      expect(CustomerServiceMock.list).toHaveBeenCalled();
      expect(result).toBe(customers);
    });

  });
});
