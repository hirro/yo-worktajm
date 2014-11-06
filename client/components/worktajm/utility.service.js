/*globals moment */

'use strict';

angular.module('worktajmApp')
  .service('WorktajmUtil', function () {

    var svc = {
      duration: function (timeEntry) {
        var endTime = moment(timeEntry.endTime);
        var startTime = moment(timeEntry.startTime);
        var ms = endTime.diff(startTime);
        var d = moment.duration(ms);
        var s = Math.floor(d.asHours()) + moment.utc(ms).format(':mm:ss');
        return s;
      }
    };
    return svc;
  });
