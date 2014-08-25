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
        if (currentUser
          && currentUser[0]) {
          console.log('Using cached entry [%s]', currentUser[0].activeTimeEntryId);
          deferred.resolve(currentUser[0]);
        } else {
          $http.get('/api/users/me').success(function (userEntry) {
            currentUser[0] = userEntry;
            socket.syncUpdates('user', currentUser);
            deferred.resolve(currentUser[0]);
            console.log('getCurrentUser - id: [%s]', currentUser[0]._id);
          });          
        }
        return deferred.promise;
      },

      setActiveTimeEntry: function (timeEntry) {
        var deferred = $q.defer();

        if (currentUser[0]) {

          User.setActiveTimeEntry(
            {},
            { 
              'activeTimeEntryId': timeEntry._id,
              'activeProjectId': timeEntry.projectId
            },
            function () {
              currentUser[0].activeTimeEntryId = timeEntry._id; 
              currentUser[0].activeProjectId = timeEntry.projectId;
              deferred.resolve();
            },
            function (error) {
              deferred.reject(error)
            }
          );
        } else {
          deferred.reject('No user is loaded');
        }
        return deferred.promise;
      },

      getActiveTimeEntry: function () {      
        var deferred = $q.defer();
        if (currentUser
          && currentUser[0]
          && currentUser[0].activeTimeEntryId) 
        {
          TimeEntry.get(
          {
            id: currentUser[0].activeTimeEntryId
          }, 
          function (timeEntry) {
            deferred.resolve(timeEntry);
          },
          function (err) {
            console.log('Failed to get active time entry');
            deferred.reject(err);
          });
        } else {
          deferred.resolve(null);
        }
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

        var createNewTimeEntry = function () {
          console.log('startTimer - createNewTimeEntry');
          return self.createTimeEntry(project);
        };
        var resolveTimeEntry = function () {
          console.log('startTimer - resolveTimeEntry');
          deferred.resolve(newTimeEntry);
        };
        var reportProblem = function () {
          console.log('startTimer - reportProblem');
        };
        self.stopTimer()
          .then(createNewTimeEntry)
          .then(setActiveTimeEntry)
          .then(resolveTimeEntry)
          .catch(reportProblem);

        return deferred.promise;
      },

      stopTimer: function () {
        console.log('stopTimer');
        var deferred = $q.defer();
        var self = this;

        var currentUser, currentTimeEntry;

        var loadCurrentUser = function () {
          return self.getCurrentUser().then(function (result) {
            currentUser = result;
          });
        };

        var loadCurrentTimeEntry = function () {
          return self.getActiveTimeEntry().then(function (result) {
            currentTimeEntry = result;
          });
        };

        var updateUser = function (user) {
          var deferred = $q.defer();
          if (!currentUser) {
            deferred.reject('No current user');
          } else if (!currentTimeEntry) {
            deferred.reject('No active timer');
          } else {
            return self.setActiveTimeEntry(currentTimeEntry);
          }
          return deferred.promise;
        };
        var reportProblem = function () {
          console.error('Failed to stop timer');
        };
        loadCurrentUser()
          .then(loadCurrentTimeEntry)
          .then(updateUser)
          .catch(reportProblem);

        return deferred.promise;
      },

      createTimeEntry: function (project) {
        var deferred = $q.defer();
        TimeEntry.save(
          {
            projectId: project._id,
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
