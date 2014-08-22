'use strict';

angular.module('worktajmApp')
  .service('Worktajm', function ($http, $q, socket, Project, TimeEntry, User, Auth) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var projects = [];
    var timeEntries = [];
    var currentUser = [];

    return {

      getMyProjects: function () {
        var deferred = $q.defer();
        $http.get('/api/projects').success(function (projectList) {
          projects = projectList;
          socket.syncUpdates('project', projects);
          deferred.resolve(projects);
        });
        return deferred.promise;
      },

      getTimeEntries: function () {
        var deferred = $q.defer();
        $http.get('/api/timeEntries').success(function (timeEntryList) {
          timeEntries = timeEntryList;
          socket.syncUpdates('timeentry', timeEntries);
          deferred.resolve(timeEntries);
        });
        return deferred.promise;
      },

      getCurrentUser: function () {
        var deferred = $q.defer();
        $http.get('/api/users/me').success(function (userEntry) {
          currentUser = [ userEntry ];
          socket.syncUpdates('user', currentUser);
          deferred.resolve(currentUser);
          console.log('getCurrentUser - subscribed');
        });
        return deferred.promise;
      },

      createProject: function (project, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        Project.save(
          {
            name: project.name,
            rate: project.rate,
            description: project.description
          },
          function (project) {
            console.log('Created new project');
            cb(project);
            deferred.resolve(project);
          },
          function (err) {
            console.log('Failed to created project');
            cb(err);
            deferred.reject(err);
          }
        );

        return deferred.promise;
      },

      updateProject: function (project, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        Project.save(
          project,
          function (project) {
            console.log('Updated project');
            cb(project);
            deferred.resolve(project);
          },
          function (err) {
            console.log('Failed to update project');
            cb(err);
            deferred.reject(err);
          }
        );

        return deferred.promise;
      },

      restoreProject: function (project, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        Project.get(
          {
            id: project._id
          },
          function (restoredProject) {
            console.log('Restored project');
            _.assign(project, restoredProject);
            cb(restoredProject);
            deferred.resolve(restoredProject);
          },
          function (err) {
            console.log('Failed to restore project');
            cb(err);
            deferred.reject(err);
          }
        );

        return deferred.promise;
      },

      deleteProject: function (project, callback) {
        console.log('deleteProject - id [%s]', project._id);
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        Project.delete(
          {
            id: project._id
          },
          function (project) {
            console.log('Deleted project');
            cb(project);
            deferred.resolve(project);
          },
          function (err) {
            console.log('Failed to delete project');
            cb(err);
            deferred.reject(err);
          }
        );
        return deferred.promise;
      },

      startTimer: function (project) {
        var self = this;
        var deferred = $q.defer();
        var newTimeEntry = {};

        console.log('startTimer - id [%s]', project._id);
        var user = Auth.getCurrentUser();
        console.log('current user is ', user);

        var createNewTimeEntry = function () {
          return self.createTimeEntry(project);
        };
        var updateUserWithActiveTimeEntry = function (timeEntry) {
          console.log('updateUserWithActiveTimeEntry [%s]', timeEntry._id);
          newTimeEntry = timeEntry;
          user.currentTimeEntry = timeEntry._id;
          console.log('updateing user [%O]', user);
          return User.setActiveTimeEntry(
            {},
            {
              activeTimeEntryId: timeEntry._id,
              activeProjectId: project._id
            }).$promise;
        };
        var resolveTimeEntry = function () {
          deferred.resolve(newTimeEntry);
        };
        var reportProblem = function () {
          console.error('Failed to start timer');
        };    
        createNewTimeEntry()
          .then(updateUserWithActiveTimeEntry)
          .then(resolveTimeEntry)
          .catch(reportProblem);

        return deferred.promise;
      },

      stopTimer: function () {
        console.log('stopTimer');
        var deferred = $q.defer();
        if (!currentUser
          || !currentUser.activeTimeEntryId) {
          deferred.reject();
          return deferred.promise;
        }

        var getCurrentTimeEntry = function () {
          TimeEntry.get(
          {
            id: project._id
          }, 
          function (timeEntry) {
            deferred.resolve(restoredProject);
          },
          function (err) {
            console.log('Failed to restore project');
            cb(err);
            deferred.reject(err);
          }          
        };
        var updateTimeEntry = function () {

        };

        var updateUser = function () {
          console.log('updateUser [%s]', timeEntry._id);
          newTimeEntry = timeEntry;
          user.currentTimeEntry = timeEntry._id;
          console.log('updateing user [%O]', user);
          return User.setActiveTimeEntry(
            {}, 
            { 
              activeTimeEntryId: null,
              activeProjectId: null,
            }).$promise;
        };
        var resolveResult = function () {
          deferred.resolve(updatedTimeEntry);
        };
        var reportProblem = function () {
          console.error('Failed to start timer');
        };

        getCurrentTimeEntry()
          .then(updateUser)
          .then(resolveResult)
          .catch(reportProblem);

        return deferred.promise;
      },

      createTimeEntry: function (project) {
        var deferred = $q.defer();
        TimeEntry.save(
          {
            project: project._id,
            startTime: '2014-07-21T08:00:00.000Z'
          },
          function (newTimeEntry) {
            console.log('Created time entry');
            deferred.resolve(newTimeEntry);
          },
          function (error) {
            console.log('Failed to create time entry');
            deferred.reject(error);
          });
        return deferred.promise;
      },

      deleteTimeEntry: function (timeEntry, callback) {
        console.log('deleteTimeEntry - id [%s]', timeEntry._id);
        var cb = callback || angular.noop;        
        var deferred = $q.defer();

        TimeEntry.delete(
          {
            id: timeEntry._id
          },
          function (timeEntry) {
            console.log('Deleted time entry');
            cb(timeEntry);
            deferred.resolve(timeEntry);
          },
          function (err) {
            console.log('Failed to delete time entry');
            cb(err);
            deferred.reject(err);
          }
        );
        return deferred.promise;        
      }

    };
  });
