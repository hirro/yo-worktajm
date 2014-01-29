/*
  @licstart The following is the entire license notice for the 
            JavaScript code in this page.
  @source https://github.com/hirro/yo-worktajm

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

/*globals  _, $ */

'use strict';

// This service should encapsulate all data access. 
// A future extension could be offline support.
angular.module('yoWorktajmApp').service('TimerService', function TimerService(Restangular, $rootScope, $q, PersonService, CustomerService) {
  var svc = {
    baseProjects: Restangular.all('project'),
    projects: [],
    projectsLoaded: false,
    baseTimeEntries: Restangular.all('timeEntry'),
    timeEntries: [],
    selectedDate: new Date().toISOString().substring(0, 10)
  };
    
  //
  // Get all available project for the given person
  // No server reload done
  // 
  svc.reloadProject = function () {
    console.log('TimerService::reloadProject');
    var q = svc.baseProjects.getList();
    q.then(function (result) {
      console.log('TimerService::reloadProject - List retrieved from backend, size: %d', result.length);
      svc.projects = result;
      svc.projectsLoaded = true;
      var activeProjectId = PersonService.getActiveProjectId();
      _(svc.projects).each(function (project) {
        // Mark the active project
        if (project.id === activeProjectId) {
          project.active = true;
        } else {
          project.active = false;
        }

        // Check if customer id is defined, in that case fetch it from backend.
        var customerId = project.customerId;
        if (customerId) {
          CustomerService.get(customerId).then(function (result) {
            var customer = result;
            console.log('Fetched custsomer name [%s]', customer.name);
            project.customerName = customer.name;
          });
        }
      });

      // Notify all listeners that project list has been refreshed
      console.log('BROADCAST: onProjectsRefreshed');
      $rootScope.$broadcast('onProjectsRefreshed', svc.projects);
      return result;
    });
    return q;
  };

  //
  // CRUD for Project
  //
  svc.updateProject = function (project) {
    var deferred = $q.defer();
    if (project.id) {
      console.log('TimerService::updateProject with id []%d', project.id);
      var originalProject = svc.getProject(project.id);
      _.extend(originalProject, _.pick(project, 'id', 'name', 'rate', 'description'));
      originalProject.put().then(function (updatedProject) {
        console.log('TimerService::updateProject - Backend updated successfully');
        console.log('BROADCAST: - onProjectUpdated (%d)', project.id);
        $rootScope.$broadcast('onProjectUpdated', project);
        deferred.resolve(updatedProject);
      }, function (reason) {
        deferred.reject(reason);
      });
    } else {
      console.log('updateProject - creating new entry');
      svc.baseProjects.post(project).then(function (newProject) {
        console.log('Updated project successfully at backend. New id is: %s', newProject.id);
        svc.projects.push(newProject);
        $rootScope.$broadcast('onProjectCreated', newProject);
        deferred.resolve(newProject);
      }, function (reason) {
        deferred.reject(reason);
      });
    }
    return deferred.promise;
  };

  svc.deleteProject = function (project) {
    console.log('TimerService::remove(name: [%s], id: [%d])', project.name, project.id);
    project.remove().then(function () {
      console.log('Project deleted from backend');
      var index = _.indexOf(svc.projects, project);
      console.log('Removing project at index %d', index);
      svc.projects.splice(index, 1);
      $rootScope.$broadcast('onProjectDeleted', project);      
    });
  };

  svc.getProject = function (id) {
    console.log('TimerService::getProject(id [%d])', id);
    var item = _.find(svc.projects, function (p) {
      return p.id === id;
    });
    return item;
  };

  svc.getProjects = function () {
    return svc.projects;
  };

  svc.findProjectByName = function (name) {
    console.log('TimerService::findProjectByName(%s)', name);
    return _.find(svc.projects, function (p) {
      console.log('%s === %s', name, p.name);
      return p.name === name;
    });
  };

  //
  // Set project status
  // Only one project may be active at the time.
  svc.setActive = function (project, active) {
    console.log('TimerService::setActive - %d', active);
    var p = this.getProject(project.id);
    if (p) {
     p.active = active;        
    } else {
      console.error('TimerService::setActive - Failed to find project to set as active');
    }
  };

  svc.setSelectedDate = function ( date ) {
    svc.selectedDate = date;
  };
  svc.getSelectedDate = function () {
    return svc.selectedDate;
  };

  //
  // CRUD for time entries
  //
  svc.getTimeEntries = function () {
    console.log('TimerService::getTimeEntries');
    var q = svc.baseTimeEntries.getList();
    q.then(function (result) {
      console.log('TimerService::getTimeEntries - List retrieved from backend, size: %d', result.length);
      svc.timeEntries = result;
      
      console.log('BROADCAST onTimeEntriesRefreshed');
      $rootScope.$broadcast('onTimeEntriesRefreshed', svc.timeEntries);
      return svc.timeEntries;
    });
    return q;
  };
  svc.createTimeEntry = function (timeEntry) {
    return svc.baseTimeEntries.post(timeEntry);
  };
  svc.updateTimeEntry = function (timeEntry) {
    console.log('TimerService::updateTimeEntry(id: [%d])', timeEntry.id);
    var deferred = $q.defer();
    var restangularTimeEntry = svc.findTimeEntryById(timeEntry.id);
    if (restangularTimeEntry) {
      // Copy values from modified entry to managed entry
      restangularTimeEntry.startTime = timeEntry.startTime;
      restangularTimeEntry.endTime = timeEntry.endTime;
      restangularTimeEntry.comment = timeEntry.comment;
      restangularTimeEntry.put().then(function (result) {
        console.log('TimerService::updateTimeEntry - OK');
        $rootScope.$broadcast('onTimeEntryUpdated', restangularTimeEntry);
        deferred.resolve(result);
      }, function () {
        var errorMsg = 'Failed to update the time entry';
        console.error('TimerService::updateTimeEntry - FAILED [%s]', errorMsg);
        deferred.reject(errorMsg);
      });
    } else {
      var errorMsg = 'Failed to find time entry';
      console.error('TimerService::updateTimeEntry - FAILED [%s]', errorMsg);
      deferred.reject(errorMsg);
    }
    return deferred.promise;        
  };
  svc.removeTimeEntry = function (entry) {
    var id = entry.id;
    var timeEntry = this.findTimeEntryById(id);
    var index = _.indexOf(svc.timeEntries, timeEntry);
    console.log('removeTimeEntry::removeTimeEntry(%s)', id);
    var q = timeEntry.remove();
    q.then(function () {
      console.log('removeTimeEntry::removeTimeEntry - OK');
      svc.timeEntries.splice(index, 1);
      console.log('BROADCAST: onTimeEntryRemoved(id [%d]', timeEntry.id);
      $rootScope.$broadcast('onTimeEntryRemoved', timeEntry);
    });

    // Mark time entry as invalid until it is physically removed
    timeEntry.disable = true;
    return q;
  };
  svc.findTimeEntryById = function (id) {
    return _(svc.timeEntries).find({
      'id': id
    });
  };
  //
  // CRUD time entries - END
  //

  // Start the timer for the specified project.
  // Returns a promise to the operation
  svc.startTimer = function(project) {
    console.log('timerService::startTimer');
    var deferred = $q.defer();        

    // Get the currently logged in person
    PersonService.getPerson().then(function (person) {

      // Create the new time entry
      var timeEntry = { person: person, project: project, startTime: $.now()};
      svc.createTimeEntry(timeEntry).then(function (newTimeEntry) {
        console.log('timerService::startTimer - Time entry created at backend(id [%d]', newTimeEntry.id);
        newTimeEntry.active = true;
        svc.setActive(project, true);
        svc.timeEntries.push(newTimeEntry);

        // Update the person
        PersonService.setActiveTimeEntry(newTimeEntry).then(function () {
          // Signal the events
          console.log('timerService::startTimer - OK');

          // Resolve the promise
          deferred.resolve(newTimeEntry);

          // Send events
          console.log('BROADCAST: onTimeEntryUpdated');
          $rootScope.$broadcast('onTimeEntryUpdated', newTimeEntry);
        }, function (reason) {
          console.error('timerService::startTimer - Failed to setActiveTimeEntry %s', reason);
          deferred.reject(reason);
        });
      }, function (reason) {
        console.error('timerService::startTimer - Failed to create time entry. %s', reason);
        return deferred.reject(reason);
      });
    }, function (reason) {
      console.error('timerService::startTimer - Failed to get logged in user. %s', reason);
      return deferred.reject(reason);
    });

    return deferred.promise;
  };
  // Stop the active task.
  // If no task is active an error is returned.
  svc.stopTimer = function() {
    console.log('timerService::stopTimer');
    var deferred = $q.defer();

    // Get hold of the active time entry of the logged in user
    PersonService.getPerson().then(function (person) {   
      var timeEntry = person.activeTimeEntry;
      var project = timeEntry ? timeEntry.project : null;
      if (timeEntry && project) {
        console.log('timerService::stopTimer - Got an active project');
        timeEntry.endTime = $.now();
        svc.updateTimeEntry(timeEntry).then(function () {
          console.log('timerService::stopTimer - Time entry updated at backend');
          PersonService.setActiveTimeEntry(null).then(function () {
            console.log('timerService::stopTimer - OK');                
            deferred.resolve();
          }, function (reason) {
            console.error(reason);
            deferred.reject(reason);
          });
        }, function (reason) {
          console.error('timerService::stopTimer - Failed to update time entry');
          deferred.reject(reason);
        });
      } else {
        console.log('timerService::stopTimer - This person has no active timer');
        return deferred.resolve(null);
      }            
    }, function (reason) {
      console.error('timerService::stopTimer - Failed to get logged in person');
      return deferred.reject(reason);
    });
    return deferred.promise;  
  };

  return svc;
});
