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
      }
    }
  });
