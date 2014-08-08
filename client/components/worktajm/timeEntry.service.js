'use strict';

angular.module('worktajmApp')
  .factory('TimeEntry', function ($resource) {
    return $resource('/api/timeEntries/:id', {
      id: '@_id'
    });
  });
