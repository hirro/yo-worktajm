'use strict';

angular.module('worktajmApp')
  .controller('TimeentriesCtrl', function ($scope, $modal, $q, Worktajm) {

    $scope.timeEntries = [];
    $scope.projects = [];

    var loadProjects = function () {
      var deferred = $q.defer();
      Worktajm.getMyProjects().then(function (result) {
        $scope.projects = _.indexBy(result, '_id');
        deferred.resolve($scope.projects);
      });
      return deferred.promise;
    };
    var loadTimeEntries = function () {
      return Worktajm.getTimeEntries().then(function (result) {
        console.log('Loaded time entries');
        $scope.timeEntries = result;
        _.forEach($scope.timeEntries, function (timeEntry) {
          var project = $scope.projects[timeEntry.projectId];
          _.extend(timeEntry, { 'project': project });
        });
      });
    };
    var reportProblem = function (err) {
      console.log('stopTimer failed - [%s]', err);
    };

    loadProjects()
      .then(loadTimeEntries)
      .catch(reportProblem);

    // Modal controller
    var TimeEntryModalCtrl = function ($scope, $modalInstance, modalParams) {
      _.extend($scope, modalParams);
      $scope.timeEntry = {
        name: modalParams.timeEntry.name,
        rate: modalParams.timeEntry.rate,
        description: modalParams.timeEntry.description,
        id: modalParams.timeEntry.id
      };

      $scope.ok = function () {
        // FIXME
        // Make sure timeEntry name is unique for the logged in person.
        // If not, set the error status on the input
        //$scope.timeEntryForm.timeEntry.$setValidity('uniqueTimeEntryPerUser', false);
        $modalInstance.close($scope.timeEntry);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    };

    $scope.createTimeEntry = function () {
      console.log('createTimeEntry');
    };

    $scope.editTimeEntry = function () {
      console.log('editTimeEntry');
    };

    $scope.deleteTimeEntry = function (timeEntry) {
      console.log('deleteTimeEntry');
      Worktajm.deleteTimeEntry(timeEntry);
    };

    // Modal functions
    $scope.openModal = function (timeEntry, titleText, messageText, okText, cancelText) {
      console.log('TimeEntriesCtrl::openModal', timeEntry._id);
      console.log(timeEntry);
      var modalParams = {
        timeEntry: timeEntry,
        titleText: titleText,
        messageText: messageText,
        okText: okText,
        cancelText: cancelText,
        subject: _.clone(timeEntry)
      };
      var modalInstance = $modal.open({
        templateUrl: 'app/dashboard/timeEntries/timeEntryModal.html',
        controller: TimeEntryModalCtrl,
        resolve: {
          modalParams: function () {
            return modalParams;
          }
        }
      });
      modalInstance.result.then($scope.onUpdateTimeEntry);
    };

    $scope.editTimeEntry = function (timeEntry) {
      console.log('TimeEntries::editTimeEntry, timeEntryName: %s', timeEntry._id);
      $scope.openModal(timeEntry, 'Update TimeEntry', '', 'Update', 'Cancel');
    };

    $scope.createTimeEntry = function () {
      var timeEntry = { name: ''};
      $scope.openModal(timeEntry, 'Create TimeEntry', '', 'Create', 'Cancel');
    };

    $scope.getProjectNameForTimeEntry = function (timeEntry) {
      var project = $scope.projects[timeEntry.projectId];
      return project ? project.name : '';
    };

  });
