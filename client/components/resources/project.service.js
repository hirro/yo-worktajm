'use strict';

angular.module('worktajmApp')
  .factory('Project', function ($resource) {
    return $resource('/api/projects/:id', {
      id: '@_id'
    });
  });
