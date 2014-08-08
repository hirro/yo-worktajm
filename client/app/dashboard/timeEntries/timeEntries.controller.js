'use strict';

angular.module('worktajmApp')
  .controller('TimeentriesCtrl', function ($scope, Worktajm) {
    $scope.timeEntries = [];
    Worktajm.getTimeEntries().then(function (result) {
    	console.log('Loaded time entries');
      $scope.timeEntries = result;
    });

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

  });
