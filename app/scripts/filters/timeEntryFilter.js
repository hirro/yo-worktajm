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

/*globals _, XDate */

'use strict';

angular.module('yoWorktajmApp')
  .filter('timeEntryFilter', function () {
    return function (timeEntries, selection, referenceDay) {

      // Filter by date
      if (_.isUndefined(referenceDay)) {
        referenceDay = new XDate();
      }
      var startOfToday = referenceDay.clone().setHours(0).setMinutes(0).setSeconds(0).setMilliseconds(0);
      var endOfToday = referenceDay.clone().setHours(23).setMinutes(59).setSeconds(59).setMilliseconds(999);
      var from, to, diff;
      switch (selection.timePeriod) {
        case 'today':
          to = startOfToday;
          from = endOfToday;
          diff = 1;
          break;
        case 'yesterday':
          to = startOfToday.addDays(-1);
          from = endOfToday.addDays(-1);
          diff = 1;
          break;
        case 'thisWeek':
          console.log('thisWeek');
          to = startOfToday;
          from = endOfToday;
          var week = to.clone().setWeek(referenceDay.getWeek(), referenceDay.getFullYear());
          from.setFullYear(week.getFullYear()).setDate(week.getDate()).setMonth(week.getMonth()).setHours(0).setMinutes(0).setSeconds(0).setMilliseconds(0);
          to.setFullYear(week.getFullYear()).setDate(week.getDate()+6).setMonth(week.getMonth()).setHours(23).setMinutes(59).setSeconds(59).setMilliseconds(999);
          diff = 7;
          break;
        case 'lastWeek':
          to = startOfToday;
          from = endOfToday;
          var week = to.clone().setWeek(referenceDay.getWeek()-1, referenceDay.getFullYear());
          from.setFullYear(week.getFullYear()).setDate(week.getDate()).setMonth(week.getMonth()).setHours(0).setMinutes(0).setSeconds(0).setMilliseconds(0);
          to.setFullYear(week.getFullYear()).setDate(week.getDate()+6).setMonth(week.getMonth()).setHours(23).setMinutes(59).setSeconds(59).setMilliseconds(999);
          diff = 7;
          break;
        case 'thisMonth':
          from = startOfToday.clone().setDate(1);
          to = startOfToday.clone().setDate(1).addMonths(1);
          diff = 30;
          break;
        case 'lastMonth':
          from = startOfToday.clone().setDate(1);
          to = startOfToday.clone().setDate(1).addMonths(1);
          from.addMonths(-1);
          to.addMonths(-1);
          diff = 30;
          break;
      }
      console.log('Time period: %s, from: %s, to: %s', selection.timePeriod, from, to);
      var filteredByTime = _.filter(timeEntries, function (timeEntry) {
        var diff1 = Math.floor(Math.abs(from.diffDays(timeEntry.startTime)));
        var diff2 = Math.floor(Math.abs(to.diffDays(timeEntry.startTime)));
        return (diff1 < diff) && (diff2 < diff);
      });

      // Filter by customer
      var filteredByCustomer = filteredByTime;
      if (selection.customer != 0) {
        filteredByCustomer = _.filter(filteredByTime, function (timeEntry) {
          return timeEntry.project.customerId === selection.customer;
        });
      }
      
      // Filter by projects
      var enabledProjectsIds = _.pluck(
        _.filter(selection.projects, function (p) {
          return p.enabled;
        }),
        'id');
      console.log(enabledProjectsIds);
      var filteredByProjects = _.filter(filteredByCustomer, function (timeEntry) {        
        return _.contains(enabledProjectsIds, timeEntry.project.id);
      });

      // Calculate the duration
      _.each(filteredByProjects, function (entry) {
        var startTime = new XDate(entry.startTime);
        var endTime = new XDate(entry.endTime);
        entry.duration = startTime.diffSeconds(endTime);
      });

      var sum = _.reduce(filteredByProjects, function (memo, entry) {
         return memo + entry.duration;
       }, 0);
      // selection.sum = sum;

      return filteredByProjects;

    };
  });
