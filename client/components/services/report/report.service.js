'use strict';

angular.module('worktajmApp')
  .service('Report', function (WorktajmUtil) {
    var applyTimeUnit = function (timeUnit, timeEntry) {
      if (timeUnit === 'week') {
        timeEntry.timeUnit = moment(timeEntry.startTime).weeks();
      } else if (timeUnit === 'month') {
        timeEntry.timeUnit = moment(timeEntry.startTime).month();
      } else {
        timeEntry.timeUnit = moment(timeEntry.startTime).format('YYYYMMDD');
      }
    };

    var svc = {

      getDateVector: function (params) {

        var startDate = params.startDate;
        var endDate = params.endDate;
        var timeUnit = params.timeUnit;
        var timeEntries = params.timeEntries;
        var result = [];
        var i;

        if (endDate <= startDate) {
          return null;
        }

        if (timeUnit === 'week' || timeUnit === 'w') {
          for (i = startDate.day(0); i <= endDate; startDate.add(1, 'w')) {
            result.push(i.format('w'));
          }
        } else if (timeUnit === 'month' || timeUnit === 'M') {
          var firstDayOfMonth = startDate.date(1).hour(0).minute(0).second(0).millisecond(0);
          for (i = firstDayOfMonth; i <= endDate; startDate.add(1, 'M')) {
            result.push(i.format(params.monthFormat || 'YYYY-MM-DD'));
          }
        } else {
          // Fail
          console.error('Invalid time unit: %s', timeUnit);
        }
        return result;
      },

      getPivot: function (timeEntries, timeUnit, startDateString, endDateString, selectedProjectsIds) {
        var result = {};

        // Parse the start time and end time
        var startDate = moment(startDateString);
        var endDate = moment(endDateString);

        // Build the array of columns for the date range
        var dateVector = svc.getDateVector({
          timeUnit: timeUnit,
          startDate: startDate,
          endDate: endDate,
          timeEntries: timeEntries
        });
        result.timeUnits = _.union(result.timeUnits, dateVector);

        // Get a list of all involved projects filtered by selected project id (if provided)
        var projectsIds = _.uniq(_.pluck(timeEntries, 'projectId'));
        result.projects = projectsIds;

        // Build NxM result matrix with 0 as initial value
        result.report = WorktajmUtil.buildMatrix(result.timeUnits.length, result.projects.length);

        // Filter time entries by projects
        var filteredTimeEntries = _.filter(timeEntries, function (timeEntry) {
          return _.contains(projectsIds, timeEntry.projectId);
        });

        // Add group by time unit property
        _.each(filteredTimeEntries, function (timeEntry) {
          applyTimeUnit(timeUnit, timeEntry);
        });

        //  First group by time unit
        var timeEntriesGroupedByTimeUnit = _.groupBy(filteredTimeEntries, function(timeEntry) {
          return timeEntry.timeUnit;
        });

        // Divide the subgroups by project and calculate total per project and time unit
        _.each(timeEntriesGroupedByTimeUnit, function (timeEntriesPerTimeUnit, timeUnit) {
          console.log({
            timeUnit: timeUnit,
            timeEntriesPerTimeUnit: timeEntriesPerTimeUnit.length
          });
          var timeEntriesPerTimeUnitGroupedByProject = _.groupBy(timeEntriesPerTimeUnit, function(timeEntry) {
            return timeEntry.projectId;
          });

          _.each(timeEntriesPerTimeUnitGroupedByProject, function (timeEntriesPerTimeUnitPerProject, project) {
            console.log('   ', {
              project: project,
              timeEntriesPerTimeUnitPerProject: timeEntriesPerTimeUnitPerProject.length
            });
            
            // Calculate sum
            var projectSum = 0;
            _.each(timeEntriesPerTimeUnitPerProject, function (timeEntry) {
              projectSum += WorktajmUtil.durationInMs(timeEntry);
            });

            var projectIndex = _.indexOf(result.projects, project);
            var timeUnitIndex = _.indexOf(result.timeUnits, timeUnit);
            console.log({ week: timeUnitIndex, project: projectIndex, sum:  projectSum});

            if ((projectIndex > 0) && (timeUnitIndex > 0)) {
              result.report[timeUnitIndex][projectIndex] = projectSum;
            }
          });
        });

        return result;
      }
    };

    return svc;
  });