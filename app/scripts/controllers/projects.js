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

/*globals _ */

'use strict';

angular.module('yoWorktajmApp')
  .controller('ProjectsCtrl', function ($scope, $modal, TimerService) {
    $scope.projects = TimerService.getProjects();
    
    $scope.removeProject = function(project) {
      console.log('ProjectController:removeProject');
      var modalParams = {
        titleText: 'Remove project',
        messageText: 'Do you want to remove project?',
        okText: 'Remove',
        cancelText: 'Cancel'
      };
      var modalInstance = $modal.open({
        templateUrl: 'confirmationModal.html',
        controller: 'ConfirmationModalCtrl',
        resolve: {
          modalParams: function () {
            return modalParams;
          }
        }
      });
      modalInstance.result.then(function () {
        TimerService.deleteProject(project);
      }, function () {
        console.info('Modal dismissed at: ' + new Date());
      });
    };


    $scope.openModal = function (project, titleText, messageText, okText, cancelText) {
      console.log('ProjectsCtrl::editProject, projectName: %s', project.name);
      var modalParams = {
        project: project,
        titleText: titleText,
        messageText: messageText,
        okText: okText,
        cancelText: cancelText
      };
      var modalInstance = $modal.open({
        templateUrl: 'projectModal.html',
        controller: 'ProjectModalCtrl',
        resolve: {
          modalParams: function () {
            return modalParams;
          }
        }
      });
      modalInstance.result.then(function (result) {
        _.extend(project, result);
        TimerService.updateProject(project);
      }, function () {
        console.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.editProject = function (project) {
      console.log('ProjectsCtrl::editProject, projectName: %s', project.name);
      $scope.openModal(project, 'Update Project', '', 'Update', 'Cancel');
    };

    $scope.createProject = function () {
      var project = {};
      $scope.openModal(project, 'Create Project', '', 'Create', 'Cancel');
    };

    //
    // Service events
    //
    $scope.$on('onProjectCreated', function (event, project) {
      console.log('EVENT: ProjectsCtrl::onProjectCreated(id [%d])', project.id);
    });
    $scope.$on('onProjectDeleted', function (event, project) {
      console.log('EVENT: ProjectsCtrl::onProjectDeleted(id [%d])', project.id);
    });
    $scope.$on('onProjectUpdated', function (event, project) {
      console.log('EVENT: ProjectsCtrl::onProjectUpdated(id [%d])', project.id);
    });
    $scope.$on('onLoggedOut', function () {
      console.info('EVENT: ProjectsCtrl::onLoggedOut()');
      $scope.timeEntries = null;
    });    

  });
