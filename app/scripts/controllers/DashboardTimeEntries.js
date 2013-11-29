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

/*globals $ */
'use strict';

angular.module('tpsApp')
  .controller('DashboardTimeEntriesCtrl', function ($scope, $rootScope, $resource, $filter, $q, $timeout, TimerService) {

    console.log('Initiating DashboardTimeEntriesCtrl');

    // Selected date
    $scope.date = new Date();
    $scope.selectedDate = new Date().toISOString().substring(0, 10);
    $scope.timeEntries = {};
    $scope.dateOptions = {
      'year-format': 'yy',
      'starting-day': 1
    };
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
    $scope.format = $scope.formats[0];    

    // Load time entries from service
    TimerService.getTimeEntries();

    // Calendar
    $scope.openCalendar = function () {
      console.log('DashboardTimeEntriesCtrl::openCalendar');
      $timeout(function() {
        $scope.opened = true;
      });
    };

    // User clicks remove button
    $scope.removeTimeEntry = function (timeEntry) {
      console.log('DashboardTimeEntriesCtrl::removeTimeEntry(%d)', timeEntry.id);
      TimerService.removeTimeEntry(timeEntry);
    };

    $scope.editTimeEntry = function (timeEntry) {
      console.log('DashboardTimeEntriesCtrl::editTimeEntry');

      // Build project list for combo
      timeEntry.projects = TimerService.getProjects();
      $scope.timeEntry = timeEntry;

      $('#timeEntryModal').modal('show');
    };

    // Utility function to find the object being displayed in the controller
    $scope.findTimeEntryById = function (id) {
      var item = $.grep($scope.timeEntries, function (e) { return e.id === id; })[0];
      return item;
    };

    // Utility function to display the end time nicely
    $scope.getEndTime = function (timeEntry) {
      var result = 'In Progress';
      if (timeEntry.endTime !== null) {
        result = $filter('date')(timeEntry.endTime, 'HH:mm:ss');
      }
      return result;
    };

    // Utility function to show duration for a task
    $scope.getDuration = function (timeEntry) {
      var result = 'f';
      if (timeEntry.endTime) {
        var elapsedSeconds = (timeEntry.endTime - timeEntry.startTime)/1000;
        var hours   = Math.floor(elapsedSeconds / 3600);
        var minutes = Math.floor((elapsedSeconds - (hours * 3600)) / 60);
        var seconds = elapsedSeconds - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = '0' + hours;}
        if (minutes < 10) {minutes = '0' + minutes;}
        if (seconds < 10) {seconds = '0' + seconds;}
        result = hours + ':' + minutes;
      }
      return result;
    };

    //
    // Service events
    //
    $scope.$on('onTimeEntriesRefreshed', function (event, newTimeEntries) {
      console.log('EVENT: DashboardTimeEntriesCtrl::onTimeEntriesRefreshed(count [%d])', newTimeEntries.length);
      $scope.timeEntries = newTimeEntries;
    });
    $scope.$on('onTimeEntryUpdated', function (event, newTimeEntry) {
      console.log('EVENT: DashboardTimeEntriesCtrl::onTimeEntryUpdated(id [%d])', newTimeEntry.id);
    });
    $scope.$on('onTimeEntryRemoved', function (event, removedTimeEntry) {
      console.log('EVENT: DashboardTimeEntriesCtrl::onTimeEntryRemoved(id [%d])', removedTimeEntry.id);
    });
    $scope.$on('onLoggedOut', function () {
      console.info('EVENT: DashboardTimeEntriesCtrl::onLoggedOut()');
      $scope.timeEntries = null;
    });    

    //
    // Bind events 
    //
    $scope.$watch('onSelectedDate', $scope.onSelectedDate);
    $scope.onSelectedDate = function () {
      console.log('WATCH: updateTimeEntries');
    };
  });
