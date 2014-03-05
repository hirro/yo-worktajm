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
  .filter('invoiceFilter', function () {
    return function (timeEntries) {
      var groupByProject = function (timeEntries) {
        var result = {
          projects: [],
          totalTimeInSeconds: 0,
          totalAmountExclVat: 0
        };

        // Group by project id
        var groupedByProjectName = _.groupBy(timeEntries, function (timeEntry) {
          if (timeEntry.project) {
            return timeEntry.project.name;
          } else {
            console.error('Project required for time entry');
          }
        });

        // Calculate total duration
        _.each(groupedByProjectName, function (projectValue, projectKey) {
          var groupSum = _.reduce(projectValue, function(memo, item) {
            var durationSum = memo;
            if (item.startTime && item.endTime) {
              var startTime = new XDate(item.startTime);
              var endTime = new XDate(item.endTime);
              var duration = startTime.diffSeconds(endTime);
              durationSum = memo + duration;
            }
            return durationSum;
          }, 0);
          var rate = 0;
          if (projectValue[0] && 
              projectValue[0].project && 
              projectValue[0].project.rate) {
            rate = projectValue[0].project.rate;            
          }
          var projectsElement = {
            name: projectKey,
            duration: groupSum,
            rate: rate,
            subTotal: rate * groupSum / 3600
          };
          result.projects.push(projectsElement);
          result.totalTimeInSeconds = result.totalTimeInSeconds + groupSum;
          result.totalAmountExclVat = result.totalAmountExclVat + projectsElement.subTotal;
        });

        return result;
      };

      var generateInvoice = function (timeEntries) {

        // Group by projeect and calculate the total time
        console.log('groupedByProject');
        var result = groupByProject(timeEntries);

        // Get the total sum
        console.log('Get the total sum');
        result.totalAmountExclVat = _.reduce(result.projects, function(memo, item) {
          console.log(item);
          return memo + item.subTotal;
        }, 0);

        // Calculate the VAT
        console.log('Calculate the VAT');
        result.vatPercentage = 0.25;
        result.additionalVat = result.totalAmountExclVat * result.vatPercentage;

        // Calculate grand total
        console.log('Calculate grand total');
        result.totalIncVat = result.totalAmountExclVat + result.additionalVat;

        console.log(result);
        return result;
      };

      var result = generateInvoice(timeEntries);
      return result;
    };
  });
