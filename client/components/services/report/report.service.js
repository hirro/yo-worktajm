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

        if (endDate < startDate) {
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

      getPivot: function (params) {

        // Params
        var timeEntries = params.timeEntries,
          timeUnit = params.timeUnit,
          startDateString = params.startDate,
          endDateString = params.endDate,
          selectedProjectsIds = params.selectedProjectsIds;

        // Parse the start time and end time
        var startDate = moment(startDateString);
        var endDate = moment(endDateString);

        // Build the array of columns for the date range
        var timeUnits = svc.getDateVector({
          timeUnit: timeUnit,
          startDate: startDate,
          endDate: endDate,
          timeEntries: timeEntries
        });

        // Get a list of all involved projects filtered by selected project id (if provided)
        var projectsIds = _.uniq(_.pluck(timeEntries, 'projectId'));
        var projects = projectsIds;

        // Build result
        var report = WorktajmUtil.buildJsonMatrix(timeUnits, projects);

        var result = {
          startTime: startDate.format('YYYY-MM-DD'),
          endTime: endDate.format('YYYY-MM-DD'),
          timeUnits: timeUnits,
          projects: projects,
          report: report
        };

        console.log(result);

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

        //console.log(timeEntriesGroupedByTimeUnit);

        // Divide the subgroups by project and calculate total per project and time unit
        _.each(timeEntriesGroupedByTimeUnit, function (timeEntriesPerTimeUnit, timeUnit) {
          // console.log({
          //   timeUnit: timeUnit,
          //   timeEntriesPerTimeUnit: timeEntriesPerTimeUnit.length
          // });
          var timeEntriesPerTimeUnitGroupedByProject = _.groupBy(timeEntriesPerTimeUnit, function(timeEntry) {
            return timeEntry.projectId;
          });

          _.each(timeEntriesPerTimeUnitGroupedByProject, function (timeEntriesPerTimeUnitPerProject, project) {
            
            // Calculate sum
            var projectSum = 0;
            _.each(timeEntriesPerTimeUnitPerProject, function (timeEntry) {
              projectSum += WorktajmUtil.durationInMs(timeEntry);
            });

            if (result.report[timeUnit] === undefined) {
              console.log('Failed to find time unit [', timeUnit, '] in array ', result.report);
            } else if (result.report[timeUnit][project] === undefined) {
              console.log('Failed to find project [', project, '] in array ', result.report);
            } else {
              result.report[timeUnit][project] = (projectSum/(1000*60*60)).toFixed(1);
            }
          });
        });

        return result;
      }
    };

    return svc;
  });