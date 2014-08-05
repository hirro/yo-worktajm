'use strict';

angular.module('worktajmApp')
  .service('Timer', function Timer($http, $q, socket) {
    var projects = [];

    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      getMyProjects: function () {
        var deferred = $q.defer();
        console.log('getMyProjects');
        $http.get('/api/projects').success(function (projectList) {
          projects = projectList;
          socket.syncUpdates('project', projects);
          deferred.resolve(projects);
        });
        return deferred.promise;
      },

      createProject: function (project, callback) {
        console.log('createProject', project);
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/api/projects', {
          name: project.name,
          rate: project.rate,
          description: project.description
        }).
          success(function () {
            console.log('Created new project');
            cb();
          }).
          error(function (err) {
            console.log('Failed to created project');
            cb(err);
          }.bind(this));

        return deferred.promise;
      },

      updateProject: function (project, callback) {
        console.log('updateProject');
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.put('/api/projects/' + project._id, {
          name: project.name,
          rate: project.rate,
          description: project.description
        }).
          success(function () {
            console.log('Updated project');
            cb();
          }).
          error(function (err) {
            console.log('Failed to update project');
            cb(err);
          }.bind(this));
        return deferred.promise;
      },

      restoreProject: function (project, callback) {
        console.log('restoreProject');
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        $http.get('/api/projects/' + project._id).
          success(function (data) {
            console.log('Restored project');
            project.name = data.name;
            project.rate = data.rate;
            cb();
          }).
          error(function (err) {
            console.log('Failed to update project');
            cb(err);
          }.bind(this));
        return deferred.promise;
      },

      deleteProject: function (project, callback) {
        console.log('deleteProject - id [%s]', project._id);
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        $http.delete('/api/projects/' + project._id).
          success(function () {
            console.log('Deleted project');
            cb();
          }).
          error(function (err) {
            console.log('Failed to delete project');
            cb(err);
          }.bind(this));
        return deferred.promise;
      },

      startTimer: function (project) {
        console.log('startTimer - id [%s]', project._id);
      },

      stopTimer: function (project) {
        console.log('stopTimer - id [%s]', project._id);
      }
    };
  });
