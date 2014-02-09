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

/*jshint camelcase: false */

'use strict';

describe('Controller: ProjectsCtrl', function () {

  // load the controller's module
  beforeEach(module('yoWorktajmApp'));

  // Test constants
  var PROJECTS, PROJECT_A, PROJECT_B;
  var $rootScope, $scope, $q, $document, TimerServiceMock, ProjectsCtrl;
  var $modal, $modalProvider, $httpBackend;
  
  // Initialize the controller and a mock scope
  beforeEach(module('ui.bootstrap.modal'));
  beforeEach(module('template/modal/backdrop.html'));
  beforeEach(module('template/modal/window.html'));
  beforeEach(module(function(_$modalProvider_){
    $modalProvider = _$modalProvider_;
  }));

  beforeEach(function() {
    PROJECT_A = {
      id: 1,
      name: 'Company A'
    };
    PROJECT_B = {
      id: 2,
      name: 'Company B'
    };
    PROJECTS = [
      PROJECT_A,
      PROJECT_B
    ];

    TimerServiceMock = {
      getProjects: function () {
        return PROJECTS;
      },
      findCustomerByName: function (name) {
        var deferred = $q.defer();
        if (name === PROJECT_A.name) {
          console.log('Found customer in mock');
          deferred.resolve(PROJECT_A);
        } else {
          console.log('Customer NOT found in mock');
          deferred.resolve();
        }
        return deferred.promise;
      },
      deleteProject: function (project) {
        var deferred = $q.defer();
        deferred.resolve(project);
        return deferred.promise;
      },
      updateProject: function (project) {
        var deferred = $q.defer();
        deferred.resolve(project);
        return deferred.promise;
      }
    };
  });

  beforeEach(inject(function ($controller, _$rootScope_, _$q_, _$document_, _$modal_, _$httpBackend_) {
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();
    $document = _$document_;
    $q = _$q_;
    $modal = _$modal_;
    $httpBackend = _$httpBackend_;
    ProjectsCtrl = $controller('ProjectsCtrl', {
      $scope: $scope,
      TimerService: TimerServiceMock
    });
    ProjectsCtrl.$inject = ['$scope',  '$route', 'CustomerService'];
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('open modal dialogs', function () {
    it('should open remove project modal', function () {
      $httpBackend.whenGET('confirmationModal.html').respond('<div>Modal2</div>');
      $scope.$digest();
      $scope.removeProject(PROJECT_A);
      $scope.$digest();
      $httpBackend.flush();
    });

    it('should open edit project modal', function () {
      $httpBackend.whenGET('projectModal.html').respond();
      $scope.$digest();
      $scope.editProject(PROJECT_A);
      $scope.$digest();
      $httpBackend.flush();
    });

    it('should open create project modal', function () {
      $httpBackend.whenGET('projectModal.html').respond();
      $scope.$digest();
      $scope.createProject();
      $scope.$digest();
      $httpBackend.flush();
    });
  });

  it('should clear all time entries when receiving onLoggedOut event', function () {
    $scope.projects = [ 1, 2 ,3 ];
    expect($scope.projects).not.toBeNull();
    $scope.$broadcast('onLoggedOut');
    expect($scope.projects).toBeNull();
  });

  it('should verify that onRemoveProject just propagates the patameter to TimeService', function () {
    var object = PROJECT_A;
    spyOn(TimerServiceMock, 'deleteProject').andCallThrough();
    $scope.onRemoveProject(object);
    expect(TimerServiceMock.deleteProject).toHaveBeenCalledWith(object);
  });

  it('should verify that onUpdateProject just propagates the patameter to TimeService', function () {
    var object = PROJECT_A;
    spyOn(TimerServiceMock, 'updateProject').andCallThrough();
    $scope.onUpdateProject(object);
    expect(TimerServiceMock.updateProject).toHaveBeenCalledWith(object);
  });

});
