/*
  @licstart The following is the entire license notice for the 
            JavaScript code in this page.
  @source TBD

  Copyright (C) 2013 Jim Arnell.

  The JavaScript code in this page is free software: you can
  redistribute it and/or modify it under the terms of the GNU
  General Public License (GNU GPL) as published by the Free Software
  Foundation, either version 3 of the License, or (at your option)
  any later version.  The code is distributed WITHOUT ANY WARRANTY;
  without even the implied warranty of MERCHANTABILITY or FITNESS
  FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

  As additional permission under GNU GPL version 3 section 7, you
  may distribute non-source (e.g., minimized or compacted) forms of
  that code without the copy of the GNU GPL normally required by
  section 4, provided you include this license notice and a URL
  through which recipients can access the Corresponding Source.

  @licend The above is the entire license notice
          for the JavaScript code in this page.  
*/

'use strict';

/**
 * This service handle operations for the currently logged in user.
 * @event onProjectUpdated(project) when active project has changed.
 * @tbdEvent onLoggedOut()
 * @tbdEvent onLoggedIn()
 */
angular.module('tpsApp')
  .service('PersonService', function PersonService($rootScope, $q, Restangular) {
    var person = null;
    var token = null;
    var svc;
    svc = {

      login: function (username, password) {
        console.log('PersonService::login');

        var deferred = $q.defer();
        token = Restangular.one('authenticate').get({
          username: username,
          password: password
        }).then(function(returnedToken) {
          console.log('PersonService::login - Received authentication token for user: %s', returnedToken.token);
          token = returnedToken.token;

          // Use the token to set the authentication token, once done the person can be fetched.
          Restangular.setDefaultHeaders({
          'Auth-Token': token
          });

          svc.getPerson().then(function (returnedPerson) {
            person = returnedPerson;
            deferred.resolve(person);
            console.log('BROADCAST: onLoggedIn (id [%d])', person.id);
            $rootScope.$broadcast('onLoggedIn', person);
            $rootScope.token = token;
            $rootScope.person = person;            

          }, function (reason) {
            return deferred.reject(reason);
          });

        }, function (reason) {
          console.error('PersonService::login - Login failed');
          person = null;
          token = null;
          return deferred.reject(reason);
        });
        return deferred.promise;
      },

      logout: function () {
        console.log('Logging out user [%s]', person.username);
        person = null;
        token = null;
        Restangular.setDefaultHeaders({
        });
        console.log('BROADCAST: onLoggedOut ()');
        $rootScope.$broadcast('onLoggedOut');
      },

      /**
       * Returns the logged in person.
       * If person has not been loaded before it will be retrieved from backend.
       * @return promise to Person.
       */
      getPerson: function () {
        console.log('PersonService:getPerson');

        var deferred = $q.defer();

        if (person) {
          console.log('PersonService:getPerson - OK (local)');
          deferred.resolve(person);
        } else {
          var qPerson = Restangular.one('person', 1).get();
          qPerson.then(function (p) {
            console.log('PersonService:getPerson - OK (backend)');
            person = p;
            return deferred.resolve(p);
          }, function () {
            var msg = 'Failed to load the person from backend';
            console.error('PersonService:getPerson - %s', msg);
            return deferred.reject(msg);
          });
        }
        return deferred.promise;        
      },

      /**
       * Sets the logged in person as actively running the provided time entry.
       * @return promise to the person.
       */
      setActiveTimeEntry: function (timeEntry) {
        var deferred = $q.defer();
        console.log('PersonService:setActiveTimeEntry(id [%d])', timeEntry ? timeEntry.id : null);
        var stoppedProject = person.activeTimeEntry ? person.activeTimeEntry.project : null;
        var startedProject = timeEntry ? timeEntry.project : null;
        person.activeTimeEntry = timeEntry;
        person.put().then(function (result) {
          // Signal that the project status has changed.
          if (stoppedProject) {
            stoppedProject.active = false;
            console.log('BROADCAST: onProjectUpdated (id [%d])', stoppedProject.id);
            $rootScope.$broadcast('onProjectUpdated', stoppedProject);
          } else {
            console.log('PersonService:::setActiveTimeEntry - No project stopped');
          }
          if (startedProject) {
            console.log('BROADCAST: onProjectUpdated (id [%d])', startedProject.id);
            startedProject.active = true;
            $rootScope.$broadcast('onProjectUpdated', startedProject);
          } else {
            console.log('PersonService:::setActiveTimeEntry - No project started');
          }
          return deferred.resolve(result);
        }, function (reason) {
          console.error('PersonService::setActiveTimeEntry failed. %s', reason);
          return deferred.reject(reason);
        });
        return deferred.promise;
      },

      /**
       * Returns the active time entry of the logged in person.
       * @return active time entry of logged in person, null if not active.
       */
      getActiveTimeEntry: function () {
        var timeEntry = null;
        if (person && person.activeTimeEntry) {
          timeEntry = person.activeTimeEntry;
        }
        return timeEntry;
      },

      /** Returns the id if the active project.
       * @return id of the active project, -1 if no project is active.
       */
      getActiveProjectId: function () {
        var result = -1;
        if (person &&
            person.activeTimeEntry &&
            person.activeTimeEntry.project) {
          console.log('PersonService::getActiveProjectId(id [%d])', person.activeTimeEntry.project.id);
          result = person.activeTimeEntry.project.id;
        } else {
          console.log('PersonService::getActiveProjectId - No active project');
        }
        return result;
      }
    };
    return svc;
  });
