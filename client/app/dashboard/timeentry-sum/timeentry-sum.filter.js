'use strict';

angular.module('worktajmApp')
  .filter('timeentrySum', function () {
    return function (timeEntries) {
      var sum = 0;
      _.each(timeEntries, function (timeEntry) {
        var endTime = moment(timeEntry.endTime,'YYYY-MM-DD HH:mm:ss');
        var startTime = moment(timeEntry.startTime, 'YYYY-MM-DD HH:mm:ss');
        var ms = endTime.diff(startTime);
        sum += moment.duration(ms);
      });

      var d = moment.duration(sum);
      var s = Math.floor(d.asHours()) + moment.utc(sum).format(':mm:ss');
      return d.asHours().toFixed(2);
    };
  });
