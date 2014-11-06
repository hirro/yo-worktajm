/*globals moment */

'use strict';

angular.module('worktajmApp')
  .controller('TimeentriesCtrl', function ($scope, $modal, $q, $log, Worktajm, WorktajmUtil) {

    $scope.timeEntries = [];
    $scope.projects = [];
    $scope.projectsIndexedById = [];
    $scope.projectNames = [];
    $scope.datePickerOpened = false;
    $scope.dateFormat = 'yyyy-MM-dd';
    $scope.selected = {
      selectedDate: moment().utc().format(),
      day: false,
      week: false,
      month: false,
      viewMode: 'Day'
    };
    $scope.orderByField = 'startTime';

    Worktajm.loadCurrentUser().then(function (result) {
      $scope.currentUser = result;
    });

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
    };

    $scope.load();

    $scope.deleteTimeEntry = function (timeEntry) {
      $log.debug('deleteTimeEntry');
      Worktajm.deleteTimeEntry(timeEntry);
    };

    $scope.editTimeEntry = function (timeEntry) {
      $log.debug('TimeEntries::editTimeEntry, timeEntryName: %s', timeEntry._id);
      $scope.openModal(timeEntry, 'Update TimeEntry', '', 'Update', 'Cancel');
    };

    $scope.createTimeEntry = function () {
      $log.debug('TimeEntries::createTimeEntry');
      var timeEntry = { name: ''};
      $scope.openModal(timeEntry, 'Create TimeEntry', '', 'Create', 'Cancel');
    };

    $scope.getProjectNameForTimeEntry = function (timeEntry) {
      var project = $scope.projects[timeEntry.projectId];
      return project ? project.name : '';
    };

    $scope.onUpdateTimeEntry = function (timeEntry) {
      var createProjectIfRequired = function () {
        var deferred = $q.defer();
        if (timeEntry.projectName) {
          // Must create a new project
          Worktajm.createProject({
            name: timeEntry.projectName
          }).then(function(project) {
            $log.debug('Project created', project);
            deferred.resolve(project);
          });
        } else {
          // Resolve to existing project
          var projectIndex = _.findIndex($scope.projects, function (p) {
            return p._id === timeEntry.projectId;
          });
          if (projectIndex >= 0) {
            deferred.resolve($scope.projects[projectIndex]);
          } else {
            deferred.reject('Invalid project id');
          }
        }
        return deferred.promise;
      };
      var updateOrCreateTimeEntry = function (project) {
        $log.debug('Project:', project);
        if (timeEntry._id) {
          $log.debug('onUpdateTimeEntry - updating [%s]', timeEntry);

          // Extend existing entry
          var existingTimeEntry = _.find($scope.timeEntries, { '_id': timeEntry._id });
          _.extend(existingTimeEntry, timeEntry);
          existingTimeEntry.projectId = project._id;
          Worktajm.updateTimeEntry(existingTimeEntry);
        } else {
          $log.debug('onUpdateTimeEntry - creating new time entry projectId: [%s]', project._id);
          Worktajm.createTimeEntry(timeEntry, project);
        }
      };
      var reportProblems = function(fault) {
        $log.error( String(fault) );
      };
      return createProjectIfRequired()
        .then(updateOrCreateTimeEntry)
        .catch(reportProblems);
    };

    // Date selector
    $scope.openDatePicker = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.datePickerOpened = true;
    };

    $scope.duration = function (timeEntry) {
      return WorktajmUtil.duration(timeEntry);
    };

    $scope.isActive = function (timeEntry) {
      if ($scope.currentUser &&
          $scope.currentUser.activeTimeEntryId === timeEntry._id) {
        return true;
      }
      return false;
    };

    ///////////////////////////////////////////////////////////////////////////
    // TimeEntryModal controller
    ///////////////////////////////////////////////////////////////////////////
    var TimeEntryModalCtrl = function ($scope, $modalInstance, modalParams) {
      _.extend($scope, modalParams);
      $scope.timeEntry = _.clone(modalParams.timeEntry);
      var startTime = moment(modalParams.timeEntry.startTime);
      var endTime = moment(modalParams.timeEntry.endTime);
      var projectName = '';
      if (modalParams.timeEntry.project) {
        projectName = modalParams.timeEntry.project.name;
      }
      $scope.modalParams = {
        'projectName': projectName,
        'startDate': startTime.format(''),
        'startTime': startTime.format('HH:mm:ss'),
        'endDate': endTime.format(''),
        'endTime': endTime.format('HH:mm:ss'),
        'comment': modalParams.timeEntry.comment
      };
      $scope.projects = modalParams.projects;
      $scope.projectNames = _.pluck($scope.projects, 'name');
      $log.debug($scope.projectNames);
      $log.debug($scope.projects);


      $scope.ok = function () {
        $scope.timeEntry.comment = $scope.modalParams.comment;
        $scope.timeEntry.startTime  = $scope.parseDateTime($scope.modalParams.startDate, $scope.modalParams.startTime);
        $scope.timeEntry.endTime  = $scope.parseDateTime($scope.modalParams.endDate, $scope.modalParams.endTime);
        var projectId = _.findIndex($scope.projects, function (p) {
          var result = p.name === $scope.modalParams.projectName;
          $log.debug($scope.modalParams.projectName, p, result);
          return result;
        });
        if (projectId === -1) {
          $scope.timeEntry.projectId = undefined;
          $scope.timeEntry.projectName = $scope.modalParams.projectName;
          $log.debug('Project id cleared');
        } else {
          if ($scope.timeEntry.projectId !== $scope.projects[projectId]._id) {
            $log.debug('Project changed');
            $scope.timeEntry.projectId = $scope.projects[projectId]._id;
          }
        }
        $modalInstance.close($scope.timeEntry);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
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

      $scope.parseDateTime = function (date, time) {
        var d = moment(date);
        var dateTimeString = d.format('YYYY-MM-DD') + ' ' + time;
        var result = moment(dateTimeString, 'YYYY-MM-DD HH:mm:ss');

        return result;
      };

      $scope.projectNameExists = function (params) {
        var index = _.findIndex($scope.projectNames, function (item) {
          return item === params.projectName;
        });
        return index>=0;
      };

    };

    // Modal functions
    $scope.openModal = function (timeEntry, titleText, messageText, okText, cancelText) {
      var modalParams = {
        timeEntry: timeEntry,
        titleText: titleText,
        messageText: messageText,
        okText: okText,
        cancelText: cancelText,
        subject: _.clone(timeEntry),
        projects: $scope.projects
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

  });
