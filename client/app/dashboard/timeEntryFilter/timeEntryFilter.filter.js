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

/*globals _ */

'use strict';

angular.module('worktajmApp')
  .filter('timeEntryFilter', function () {
    return function (timeEntries, selection) {

      // Get the id:s of all selected projects
      var enabledProjectsIds;
      if (selection.projects) {
        enabledProjectsIds = _.pluck(
          _.filter(selection.projects, function (p) {
            return p.enabled;
          }),
          '_id');
      }

      // Filter functions
      var filterByTime = function (timeEntry, selection) {
        // Two variants, either selectedDate is set or from/to
        var date = timeEntry.startTime;
        var result;
        if (!date) {
          console.error('startTime undefined');
        } else if (selection.selectedDate) {
          var selectedDate = moment(selection.selectedDate);
          result = selectedDate.isSame(date, 'day');
        } else if (selection.from && selection.to) {
          var fromDate = selection.from;
          var toDate = selection.to;
          result = (date.valueOf() >= fromDate.valueOf()) && (date.valueOf() <= toDate.valueOf());
        } else {
          console.error('Invalid/unsufficient properties specified in selection [%s]', selection);
          result = false;
        }
        return result;
      };
      var filterByProject = function (timeEntry) {
        return enabledProjectsIds ? _.contains(enabledProjectsIds, timeEntry.projectId) : true;
      };

      var filteredTimeEntries = _.filter(timeEntries, function (timeEntry) {
        return filterByTime(timeEntry, selection) && filterByProject(timeEntry, selection);
      });

      return filteredTimeEntries;

    };
  });
