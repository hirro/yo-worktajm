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

/*globals angular, _, $ */
'use strict';

angular.module('yoWorktajmApp')
  .controller('DashboardProjectsCtrl', function ($scope, $rootScope, $resource, $location, $modal, TimerService, PersonService) {
    console.log('Initiating DashboardProjectsCtrl');

    $scope.activeProject = null;
    $scope.project = {};
    $scope.projects = {};
    TimerService.reloadProject();  

    var deleteProjectModal = function ($scope, $modalInstance, modalParams) {
      $scope.title = modalParams.title;
      $scope.text = modalParams.text;
      $scope.ok = function () {
        $modalInstance.close();
      };
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    };

    // Show new project modal form
    $scope.showNewProject = function () {
      console.log('DashboardProjectsCtrl::showNewProject');
      $('#projectModal').modal('show');
    };

    $scope.createProject = function () {
      console.log('DashboardProjectsCtrl::updateProject(projectName: [%s])', $scope.project.name);
      TimerService.updateProject($scope.project).then(function () {
        console.log('DashboardProjectsCtrl::updateProject(projectName -Successfully created project');
        $('#projectModal').modal('hide');
      }, function (reason) {
        console.error('DashboardProjectsCtrl::updateProject(projectName - Failed to create project: %s', reason);
      });
    };

    //
    // Start the project
    $scope.startTimer = function (project) {
      console.log('DashboardProjectsCtrl::startTimer -  project id: %d', project.id);
      // Always stop active timer 
      TimerService.stopTimer().then(function () {
        TimerService.startTimer(project);
      }, function () {
        TimerService.startTimer(project);
      });
    };
    //
    // Stop the active project
    $scope.stopTimer = function () {
      TimerService.stopTimer();
    };

    //
    // @start CRUD operations
    //
    // create
    $scope.createProjectFromScope = function () {
      console.log('DashboardProjectsCtrl::createProjectFromScope(name: %s, id: %d)', $scope.project.name, $scope.project.id);
      $scope.updateProject($scope.project);
      $scope.project = {};
    };
    // Update the provided project
    $scope.updateProject = function (project) {
      TimerService.updateProject(project);
    };
    // Delete
    $scope.removeProject = function (project) {

      var modalParams = {
        title: 'Remove project',
        text: 'Do you want to remove project?'
      };
      var modalInstance = $modal.open({
        templateUrl: 'confirmationModal.html',
        controller: deleteProjectModal,
        resolve: {
          modalParams: function () {
            return modalParams;
          }
        }
      });
      modalInstance.result.then(function () {
        TimerService.removeProject(project);
      }, function () {
        console.info('Modal dismissed at: ' + new Date());
      });

    };
    // Restore the provided project to the value of the database.
    // XXX unused
    $scope.restoreProject = function (project) {
      console.log('createProjectFromScope:::restoreProject(id: %d, name: %s)', project.id, project.name);
    };
    // Read (cached)
    $scope.getById = function (list, id) {
      console.log('createProjectFromScope::getById([%d])', id);
      return _(list).find({
        'id': id
      });
    };
    // @end CRUD operations

    //
    // @start Event handlers
    //
    $scope.$on('onProjectUpdated', function (event, updatedProject) {
      console.info('EVENT: onProjectUpdated([%d])', updatedProject.id);
      var project = $scope.getById($scope.projects, updatedProject.id);
      if (project) {
        // Make sure to copy all the attributes here
        project.active = updatedProject.active;
        project.name = updatedProject.name;
        project.rate = updatedProject.rate;
      } else {
        console.error('DashboardProjectsCtrl::onProjectUpdated - Failed to find matching project in controller, add it?');
      }
    });
    $scope.$on('onProjectsRefreshed', function (event, updatedProjectList) {
      console.log('EVENT: DashboardProjectsCtrl::onProjectsRefreshed(size [%d])', updatedProjectList.length);
      var activeProjectId = PersonService.getActiveProjectId();
      $scope.projects = updatedProjectList;
      _($scope.projects).each(function(p) {
        if (p.id === activeProjectId) {
          p.active = true;
        }
      });
    });
    $scope.$on('onLoggedOut', function () {
      console.info('EVENT: DashboardProjectsCtrl::onLoggedOut()');
      $scope.projects = {};
    });    
    //
    // @end Event handlers
    //  

    $scope.customers = [ 'Customer A', 'Customer B', 'Customer C']  

  });
