/*globals console, moment */

'use strict';

angular.module('worktajmApp')
  .service('Worktajm', function ($http, $q, socket, $interval, Project, TimeEntry, User) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var projects = [];
    var projectsIndexedById = [];
    var projectNames = [];
    var timeEntries = [];
    var currentUser = {};
    var activeTimeEntry = null;

    var svc = {

      update: function () {
        if (currentUser && currentUser.activeTimeEntryId) {
          var activeTimeEntryIndex = _.findIndex(timeEntries, function (timeEntry) {
            return timeEntry._id === currentUser.activeTimeEntryId;
          });
          timeEntries[activeTimeEntryIndex].endTime =  moment().utc().format();
        }
      },

      load: function () {
        console.log('');
      },

      getProjects: function () {
        return projects;
      },

      getProjectsIndexedById: function () {
        return projectsIndexedById;
      },

      getTimeEntries: function () {
        return timeEntries;
      },

      getCurrentUser: function () {
        return currentUser;
      },

      projectsCallback: function (event, project) {
        if ('updated' === event) {
          // Propagate changes to indexed list
          console.log('projectsCallback - updated');
          projectsIndexedById[project._id] = project;

          // Find projects with matching project and update
          _.forEach(timeEntries, function (timeEntry) {
            if (timeEntry.projectId === project._id) {
              timeEntry.project = project;
            }
          });
        } else if ('created' === event) {
          console.log('projectsCallback - created');
          projectsIndexedById[project._id] = project;
        } else {
          console.log('projectsCallback - Unhandled event [%s]', event);
        }
        projectNames = _.pluck(projects, 'name');
      },

      timeEntryCallback: function (event, timeEntry) {
        if ('updated' === event) {
          console.log('timeEntryCallback - updated');
          timeEntry.project = projectsIndexedById[timeEntry.projectId];
        } else if ('created' === event) {
          console.log('timeEntryCallback - created time entry, fetching associated project');
          timeEntry.project = projectsIndexedById[timeEntry.projectId];
        } else {
          console.log('timeEntryCallback - Unhandled event [%s]', event);
        }
      },

      loadProjects: function () {
        var deferred = $q.defer();
        var self = this;

        // Currently getting all the entries, this should be split up to fetch per month.
        $http.get('/api/projects').success(function (projectList) {
          projects.splice(0, projects.length);
          _.forEach(projectList, function (project) {
            projects.push(project);
            projectsIndexedById[project._id] = project;
            projectNames = _.pluck(projects, 'name');
          });
          socket.syncUpdates('project', projects, self.projectsCallback);
          deferred.resolve(projects);
        });
        return deferred.promise;
      },

      loadTimeEntries: function () {
        var deferred = $q.defer();
        var self = this;

        $http.get('/api/timeEntries').success(function (timeEntryList) {
          timeEntries.splice(0, timeEntries.length);
          _.forEach(timeEntryList, function (timeEntry) {
            timeEntry.project = projectsIndexedById[timeEntry.projectId];
            timeEntries.push(timeEntry);
          });
          socket.syncUpdates('timeentry', timeEntries, self.timeEntryCallback);
          deferred.resolve(timeEntries);
        });
        return deferred.promise;
      },

      loadCurrentUser: function () {
        var deferred = $q.defer();
        if (currentUser._id) {
          console.log('Using cached user id: [%s]', currentUser._id);
          deferred.resolve(currentUser);
        } else {
          $http.get('/api/users/me').success(function (userEntry) {
            currentUser = userEntry;
            socket.syncUpdatesOnObject('user', currentUser);
            deferred.resolve(currentUser);
            console.log('getCurrentUser - id: [%s]', currentUser._id);
          });
        }
        return deferred.promise;
      },

      setActiveTimeEntry: function (timeEntry) {
        var deferred = $q.defer();
        activeTimeEntry = timeEntry;

        if (currentUser) {
          var newTimeEntryId = timeEntry ? timeEntry._id : null;
          var newProjectId = timeEntry ? timeEntry.projectId : null;

          User.setActiveTimeEntry(
            {},
            {
              'activeTimeEntryId': newTimeEntryId,
              'activeProjectId': newProjectId
            },
            function () {
              currentUser.activeTimeEntryId = newTimeEntryId;
              currentUser.activeProjectId = newProjectId;
              deferred.resolve();
              console.log('setActiveTimeEntry - User updated');
            },
            function (error) {
              console.log('Failed to setActiveTimeEntry');
              deferred.reject(error);
            }
          );
        } else {
          deferred.reject('No user is loaded');
        }
        return deferred.promise;
      },

      getActiveTimeEntry: function () {
        var deferred = $q.defer();
        if (currentUser && currentUser.activeTimeEntryId) {
          TimeEntry.get(
            {
              id: currentUser.activeTimeEntryId
            },
            function (timeEntry) {
              deferred.resolve(timeEntry);
            },
            function (err) {
              console.log('Failed to get active time entry');
              deferred.reject(err);
            }
          );
        } else {
          console.log('User does not have any active timer');
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
            cb(project);
            deferred.resolve(project);
          },
          function (err) {
            console.log('createProject failed - [%s]', err);
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
            cb(project);
            deferred.resolve(project);
          },
          function (err) {
            console.log('updateProject failed - [%s]', err);
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
            _.assign(project, restoredProject);
            cb(restoredProject);
            deferred.resolve(restoredProject);
          },
          function (err) {
            console.log('restoreProject failed - [%s]', err);
            cb(err);
            deferred.reject(err);
          }
        );

        return deferred.promise;
      },

      deleteProject: function (project, callback) {
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
            console.log('deleteProject failed - [%s]', err);
            cb(err);
            deferred.reject(err);
          }
        );
        return deferred.promise;
      },

      getProjectNames: function () {
        return projectNames;
      },

      createTimeEntry: function (project) {
        var deferred = $q.defer();
        var currentTime = moment();
        currentTime.millisecond(0);
        TimeEntry.save(
          {
            projectId: project._id,
            startTime: currentTime,
            endTime: currentTime
          },
          function (newTimeEntry) {
            newTimeEntry.project = project;
            deferred.resolve(newTimeEntry);
          },
          function (error) {
            console.log('Failed to create time entry');
            deferred.reject(error);
          }
        );
        return deferred.promise;
      },

      updateTimeEntry: function (timeEntry) {
        var deferred = $q.defer();
        TimeEntry.update(
          timeEntry,
          function (updatedEntry) {
            deferred.resolve(updatedEntry);
          },
          function (error) {
            console.log('Failed to update time entry');
            deferred.reject(error);
          }
        );
        return deferred.promise;
      },

      deleteTimeEntry: function (timeEntry, callback) {
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
      },

      startTimer: function (project) {
        var self = this;
        var deferred = $q.defer();
        var newTimeEntry = null;

        console.log('startTimer - project id [%s]', project._id);

        var resolveTimeEntry = function () {
          console.log('startTimer - resolveTimeEntry');
          deferred.resolve(newTimeEntry);
        };
        var reportProblem = function (err) {
          console.log('startTimer failed - [%s]', err);
        };
        var createNewTimeEntry = function () {
          var deferred2 = $q.defer();
          self.createTimeEntry(project).then(function (result) {
            deferred2.resolve(result);
          });
          return deferred2.promise;
        };
        this.stopTimer()
          .then(createNewTimeEntry)
          .then(this.setActiveTimeEntry)
          .then(resolveTimeEntry)
          .catch(reportProblem);

        return deferred.promise;
      },

      stopTimer: function () {
        console.log('stopTimer');
        var deferred = $q.defer();
        var self = this;
        activeTimeEntry = null;

        var stopCurrentTimeEntry = function (timeEntry) {
          if (timeEntry) {
            console.log('stopCurrentTimeEntry');
            var now = moment();
            now.millisecond(0);
            timeEntry.endTime = now;
            return self.updateTimeEntry(timeEntry);
          }
          var deferred2 = $q.defer();
          deferred2.resolve(null);
          return deferred2.promise;
        };

        var clearActiveTimeEntry = function (timeEntry) {
          if (timeEntry) {
            return self.setActiveTimeEntry({});
          }
          var deferred2 = $q.defer();
          deferred2.resolve(null);
          return deferred2.promise;
        };
        var resolveResponse = function () {
          deferred.resolve();
        };
        var reportProblem = function (err) {
          console.log('stopTimer failed - [%s]', err);
        };
        this.getActiveTimeEntry()
          .then(stopCurrentTimeEntry)
          .then(clearActiveTimeEntry)
          .then(resolveResponse)
          .catch(reportProblem);

        return deferred.promise;
      }
    };
    svc.load();

    // Update 
    $interval(svc.update, 1000, 0, false);

    return svc;
  });
