/*globals moment */

'use strict';

angular.module('worktajmApp')
  .controller('ReportsCtrl', function ($scope, Worktajm, WorktajmUtil, Report, $log) {
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
    $scope.orderByField = 'startTime';
    $scope.summary = [];

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
      $scope.updateSummary();
      $scope.projectNames = Worktajm.getProjectNames();
      $scope.selectToday();
      $scope.updateSummary();
    };

    $scope.selectToday = function () {
      $scope.selected.from = moment().hour(0).minute(0).second(0).utc().format();
      $scope.selected.to = moment().hour(24).minute(0).second(0).utc().format();
      $scope.logSelected();
      $scope.updateSummary();
    };

    $scope.selectYesterday = function () {
      $scope.selected.from = moment().subtract(1, 'days').hour(0).minute(0).second(0).utc().format();
      $scope.selected.to   = moment().hour(0).minute(0).second(-1).utc().format();
      $scope.logSelected();
      $scope.updateSummary();
    };

    $scope.selectThisWeek = function () {
      var startOfFirstDayThisWeek = moment().day('Monday').hour(0).minute(0).second(0).utc();
      var endOfLastDayThisWeek = moment().day(7).hour(24).minute(59).second(59).utc();
      $scope.selected.from = startOfFirstDayThisWeek.format();
      $scope.selected.to   = endOfLastDayThisWeek.format();
      $scope.logSelected();
      $scope.updateSummary();
    };

    $scope.selectLastWeek = function () {
      var startOfFirstDayLastWeek = moment().day(-6).hour(0).minute(0).second(0).utc();
      var endOfLastDayLastWeek = moment().day(0).hour(24).minute(59).second(59).utc();
      $scope.selected.from = startOfFirstDayLastWeek.format();
      $scope.selected.to   = endOfLastDayLastWeek.format();
      $scope.logSelected();
      $scope.updateSummary();
    };

    $scope.selectThisMonth = function () {
      var firstDayThisMonth = moment().date(1).hour(0).minute(0).second(0).utc();
      $scope.selected.from = firstDayThisMonth.format();
      $scope.selected.to   = firstDayThisMonth.hour(24).add(1, 'month').format();
      $scope.logSelected();
      $scope.updateSummary();
    };

    $scope.selectLastMonth = function () {
      var startOfFirstDayThisMonth = moment().date(1).hour(0).minute(0).second(0).utc();
      var endOfLastDayLastMonth = moment().date(1).hour(0).minute(0).second(-1).utc();
      $scope.selected.from = startOfFirstDayThisMonth.add(-1, 'month').format();
      $scope.selected.to   = endOfLastDayLastMonth.format();
      $scope.logSelected();
      $scope.updateSummary();
    };

    $scope.logSelected = function () {
      console.log('from: ', $scope.selected.from);
      console.log('to:   ', $scope.selected.to);
    };

    $scope.duration = function (timeEntry) {
      return WorktajmUtil.duration(timeEntry);
    };

    $scope.updateSummary = function() {
      console.log('updateSummary');
      $scope.summary = Report.getPivot($scope.timeEntries, 'week', $scope.selected.from, $scope.selected.to);
      console.log($scope.summary);
    };

    $scope.load();
  });
