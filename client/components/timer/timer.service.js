'use strict';

angular.module('worktajmApp')
  .service('Timer', function Timer($http, $q, socket) {
    var projects = [];
    
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      getMyProjects: function () {
        var deferred = $q.defer();   
        console.log('getMyProjects');
        $http.get('/api/projects').success(function(projectList) {
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
            success(function (data) {
            console.log('Created new project');
            cb();
          }).
          error(function (err) {
            console.log('Failed to created project');
            cb(err);
          }.bind(this));

        return deferred.promise;

      }
    }
  });
