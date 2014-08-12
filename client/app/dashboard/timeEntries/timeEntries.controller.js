'use strict';

angular.module('worktajmApp')
  .controller('TimeentriesCtrl', function ($scope, $modal, Worktajm) {
    $scope.timeEntries = [];
    Worktajm.getTimeEntries().then(function (result) {
    	console.log('Loaded time entries');
      $scope.timeEntries = result;
    });

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
      console.log('TimeEntriesCtrl::openModal', timeEntry.name);
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
      console.log('TimeEntries::editTimeEntry, timeEntryName: %s', timeEntry.name);
      $scope.openModal(timeEntry, 'Update TimeEntry', '', 'Update', 'Cancel');
    };

    $scope.createTimeEntry = function () {
      var timeEntry = { name: ''};
      $scope.openModal(timeEntry, 'Create TimeEntry', '', 'Create', 'Cancel');
    };    

  });
