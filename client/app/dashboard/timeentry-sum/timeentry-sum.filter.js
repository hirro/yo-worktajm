'use strict';

angular.module('worktajmApp')
  .filter('timeentrySum', function () {
    return function (timeEntries) {
      var sum = 0;
      _.each(timeEntries, function (timeEntry) {
        var ms = moment(timeEntry.endTime,'DD/MM/YYYY HH:mm:ss').diff(moment(timeEntry.startTime,'DD/MM/YYYY HH:mm:ss'));
        sum += moment.duration(ms);
      });


      var d = moment.duration(sum);
      var s = Math.floor(d.asHours()) + moment.utc(sum).format(':mm:ss');
      return s;
    };
  });
