'use strict';

angular.module('yoWorktajmApp')
  .filter('groupByProjectsFilter', function () {
    return function (timeEntries) {
      var result = [];

      // Group by project id
      var groupedByProjectName = _.groupBy(timeEntries, function (timeEntry) {
        return timeEntry.project.name;
      });

      // Calculate total duration
      _.each(groupedByProjectName, function (projectValue, projectKey) {
        var groupSum = _.reduce(projectValue, function(memo, item) {
          return item.duration + memo;
        }, 0);
        var resultElement = {
          name: projectKey,
          duration: groupSum
        };
        result.push(resultElement);
      });

      return result;
    };
  });
