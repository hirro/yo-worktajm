'use strict';

angular.module('worktajmApp')
  .controller('ReportsCtrl', function ($scope) {
    $scope.startTime = null;
    $scope.endTime = null;
    $scope.type = 'pivotal|table';
    $scope.viewBy = 'day|week|month';

    $scope.buildReport = function() {
      $scope.report = {
        startTime: '',
        endTime: '',
        days: [
          {
            date: '2014-01-01',
            projects: [
              {
                id: '1',
                total: '5.3'
              },
              {
                id: '2',
                total: '5.32'
              }
            ]
          },
          {
            date: '2014-01-02',
            projects: [
              {
                id: '1',
                total: '5.3'
              },
              {
                id: '2',
                total: '5.32'
              }
            ]
          }

        ]
      };
    };
  }
);
