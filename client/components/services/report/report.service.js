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

        // Validate
        if (!WorktajmUtil.validateParams(params, [
          { key: 'timeUnit', required: true },
          { key: 'startDate', required: true },
          { key: 'endDate', required: true }
        ])) {
          throw 'Invalid parameters';
        }

        // Params
        var timeUnit = params.timeUnit,
          startDate = moment(params.startDate),
          endDate = moment(params.endDate);

        var result = [];
        var i;

        if (endDate < startDate) {
          return null;
        }

        if (timeUnit === 'week' || timeUnit === 'w') {
          for (i = startDate; i <= endDate; i.add(1, 'w')) {
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

        // Validate
        if (!WorktajmUtil.validateParams(params, [
          { key: 'timeEntries', required: true},
          { key: 'timeUnit', required: true },
          { key: 'startDate', required: true },
          { key: 'endDate', required: true }
        ])) {
          throw 'Invalid params';
        }

        // Params
        var timeEntries = params.timeEntries,
          timeUnit = params.timeUnit,
          startDate = moment(params.startDate),
          endDate = moment(params.endDate);

        // Build the array of columns for the date range
        var timeUnits = svc.getDateVector(params);

        // Get a list of all involved projects filtered by selected project id (if provided)
        var projectsIds = _.uniq(_.pluck(timeEntries, 'projectId'));
        var projects = projectsIds;

        // Build result
        var report = WorktajmUtil.buildJsonMatrix(timeUnits, projects);

        // Build result struct
        var result = {
          startDate: startDate.format('YYYY-MM-DD'),
          endDate: endDate.format('YYYY-MM-DD'),
          timeUnits: timeUnits,
          projects: projects,
          report: report
        };

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
          var timeEntriesPerTimeUnitGroupedByProject = _.groupBy(timeEntriesPerTimeUnit, function(timeEntry) {
            return timeEntry.projectId;
          });

          _.each(timeEntriesPerTimeUnitGroupedByProject, function (timeEntriesPerTimeUnitPerProject, project) {
            
            // Calculate sum
            var projectSum = 0;
            _.each(timeEntriesPerTimeUnitPerProject, function (timeEntry) {
              projectSum += WorktajmUtil.durationInMs(timeEntry);
            });

            if ((result.report[timeUnit] !== undefined) && (result.report[timeUnit][project] !== undefined)) {
              result.report[timeUnit][project] = (projectSum/(1000*60*60)).toFixed(1);
            }
          });
        });

        return result;
      }
    };

    return svc;
  });