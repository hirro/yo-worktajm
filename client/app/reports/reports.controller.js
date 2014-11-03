/*globals moment */

'use strict';

angular.module('worktajmApp')
  .controller('ReportsCtrl', function ($scope, Worktajm, $log) {
    $scope.startTime = null;
    $scope.endTime = null;
    $scope.type = 'pivotal|table';
    $scope.viewBy = 'day|week|month';
    $scope.reportType = 'timesheet';
    $scope.dateSelection = 'today';
    $scope.timeEntries = [];
    $scope.projects = [];
    $scope.projectsIndexedById = [];
    $scope.projectNames = [];
    $scope.selected = {
      selectedDate: null,
      from: moment().utc().format(),
      to: moment().utc().format(),
      day: false,
      week: false,
      month: false,
      viewMode: 'Day'
    };

    // Date selector
    $scope.startDatePickerOpened = false;
    $scope.openStartDatePicker = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.startDatePickerOpened = true;
    };

    // Date selector
    $scope.endDatePickerOpened = false;
    $scope.openEndDatePicker = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.endDatePickerOpened = true;
    };

    $scope.load = function () {
      $log.debug('load');

      // Start download of objects from BE
      Worktajm.loadProjects();
      Worktajm.loadTimeEntries();

      // The references will be updated
      $scope.projects = Worktajm.getProjects();
      $scope.projectsIndexedById = Worktajm.getProjectsIndexedById();
      $scope.timeEntries = Worktajm.getTimeEntries();
      $scope.projectNames = Worktajm.getProjectNames();
      $scope.selectToday();
    };

    $scope.selectToday = function () {
      $scope.selected.from = moment().hour(0).minute(0).second(0).utc().format();
      $scope.selected.to = moment().hour(24).minute(0).second(0).utc().format();
      $scope.logSelected();
    };

    $scope.selectYesterday = function () {
      $scope.selected.from = moment().date(-1).hour(0).minute(0).second(0).utc().format();
      $scope.selected.to   = moment().date(-1).hour(24).minute(0).second(0).utc().format();
      $scope.logSelected();
    };

    $scope.selectThisWeek = function () {
      var firstDayOfWeek = moment().day(0).hour(0).minute(0).second(0).utc();
      $scope.selected.from = firstDayOfWeek.format();
      $scope.selected.to   = firstDayOfWeek.add(1, 'week').format();
      $scope.logSelected();
    };

    $scope.selectLastWeek = function () {
      var firstDayOfWeek = moment().day(0).hour(0).minute(0).second(0).utc();
      $scope.selected.from = firstDayOfWeek.add(-1, 'week').format();
      $scope.selected.to   = firstDayOfWeek.second(-1).format();
      $scope.logSelected();
    };

    $scope.selectThisMonth = function () {
      var firstDayThisMonth = moment().date(1).hour(0).minute(0).second(0).utc();
      $scope.selected.from = firstDayThisMonth.format();
      $scope.selected.to   = firstDayThisMonth.hour(24).add(1, 'month').format();
      $scope.logSelected();
    };

    $scope.selectLastMonth = function () {
      var firstDayThisMonth = moment().date(1).hour(0).minute(0).second(0).utc();
      $scope.selected.from = firstDayThisMonth.format();
      $scope.selected.to   = firstDayThisMonth.hour(24).add(1, 'month').format();
      $scope.logSelected();
    };

    $scope.logSelected = function () {
      console.log('from: ', $scope.selected.from);
      console.log('to:   ', $scope.selected.to);
    };

    $scope.load();
  });
