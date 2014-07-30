'use strict';

angular.module('worktajmApp')
  .controller('ProjectsCtrl', function ($scope, Timer) {
    $scope.message = 'Hello';

    $scope.projects = [];
    Timer.getMyProjects().then(function (result) {
      $scope.projects = result;
    });

    $scope.createProject = function () {
      console.log('createProject');
    };

    $scope.openModal = function (project, titleText, messageText, okText, cancelText) {
      console.log('ProjectsCtrl::editProject, projectName: %s', project.name);
      var modalParams = {
        project: project,
        titleText: titleText,
        messageText: messageText,
        okText: okText,
        cancelText: cancelText,
        subject: _.clone(project)
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
      modalInstance.result.then($scope.onUpdateProject);
    };

    $scope.editProject = function (project) {
      console.log('ProjectsCtrl::editProject, projectName: %s', project.name);
      $scope.openModal(project, 'Update Project', '', 'Update', 'Cancel');
    };

    $scope.createProject = function () {
      var project = {};
      $scope.openModal(project, 'Create Project', '', 'Create', 'Cancel');
    };
  });
