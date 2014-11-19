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
      },
      durationInMs: function (timeEntry) {
        var endTime = moment(timeEntry.endTime);
        var startTime = moment(timeEntry.startTime);
        var ms = endTime.diff(startTime);
        return ms;
      },
      buildMatrix: function (rows, columns) {
        var result = [];
        for (var n = 0; n < rows; n++) {
          var row = [];
          for (var m = 0; m < columns; m++) {
            row.push(0);
          }
          result.push(row);
        }
        return result;
      }
    };
    return svc;
  });
