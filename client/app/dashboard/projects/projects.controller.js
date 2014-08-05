/*globals console */

'use strict';

angular.module('worktajmApp')
  .controller('ProjectsCtrl', function ($scope, $modal, Timer) {
    $scope.message = 'Hello';

    $scope.projects = [];
    Timer.getMyProjects().then(function (result) {
      $scope.projects = result;
    });

    var ProjectModalCtrl = function ($scope, $modalInstance, modalParams) {
      _.extend($scope, modalParams);
      $scope.project = {
        name: modalParams.project.name,
        rate: modalParams.project.rate,
        description: modalParams.project.description,
        id: modalParams.project.id
      };

      $scope.ok = function () {
        // FIXME
        // Make sure project name is unique for the logged in person.
        // If not, set the error status on the input
        //$scope.projectForm.project.$setValidity('uniqueProjectPerUser', false);
        $modalInstance.close($scope.project);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    };

    $scope.openModal = function (project, titleText, messageText, okText, cancelText) {
      console.log('ProjectsCtrl::openModal', project.name);
      var modalParams = {
        project: project,
        titleText: titleText,
        messageText: messageText,
        okText: okText,
        cancelText: cancelText,
        subject: _.clone(project)
      };
      var modalInstance = $modal.open({
        templateUrl: 'app/dashboard/projects/projectModal.html',
        controller: ProjectModalCtrl,
        resolve: {
          modalParams: function () {
            return modalParams;
          }
        }
      });
      modalInstance.result.then($scope.onUpdateProject);
    };

    $scope.editProject = function (project) {
      console.log('ProjectsCtrl::editProject, projectName: %s', project.name);
      $scope.openModal(project, 'Update Project', '', 'Update', 'Cancel');
    };

    $scope.createProject = function () {
      var project = { name: ''};
      $scope.openModal(project, 'Create Project', '', 'Create', 'Cancel');
    };

    $scope.updateProject = function (project) {
      Timer.updateProject(project);
    };

    $scope.restoreProject = function (project) {
      Timer.restoreProject(project);
    };

    $scope.onUpdateProject = function (project) {
      return Timer.createProject(project);
    };

    $scope.deleteProject = function (project) {
      return Timer.deleteProject(project);
    };

    $scope.startTimer = function (project) {
      return Timer.startTimer(project);
    };

    $scope.stopTimer = function (project) {
      return Timer.stopTimer(project);
    };

  });
