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

/*globals angular, _, $ */
'use strict';

angular.module('yoWorktajmApp')
  .controller('DashboardProjectsCtrl', function ($scope, $rootScope, $resource, $location, $modal, $q, TimerService, PersonService, CustomerService) {
    console.log('Initiating DashboardProjectsCtrl');

    $scope.activeProject = null;
    $scope.project = {};
    $scope.projects = new Array();
    $scope.customer = {};
    TimerService.reloadProject();

    //
    // Start the project
    $scope.startTimer = function (project) {
      console.log('DashboardProjectsCtrl::startTimer -  project id: %d', project.id);
      // Always stop active timer 
      TimerService.stopTimer().then(function () {
        TimerService.startTimer(project);
      }, function () {
        TimerService.startTimer(project);
      });
    };
    //
    // Stop the active project
    $scope.stopTimer = function () {
      TimerService.stopTimer();
    };

    //
    // @start CRUD operations
    //
    // create
    // Update the provided project
    $scope.updateProject = function (project) {
      var promise = CustomerService.findOrCreateCustomerByName(project.customerName);
      return promise.then(function (customer) {
        if (customer) {
          project.customerId = customer.id;
        }
        TimerService.updateProject(project);
      })
      .then(function() {
        project.isOpen = false;
      });
    };

    // Restore the provided project to the value of the database.
    $scope.restoreProject = function (project) {
      console.log('DashboardProjectsCtrl::restoreProject(id: %d, name: %s)', project.id, project.name);
      var originalProject = TimerService.getProject(project.id);
      project.name = originalProject.name;
      project.description = originalProject.description;
      project.rate = originalProject.rate;
      project.isOpen = false;
    };

    // Read (cached)
    $scope.getById = function (list, id) {
      console.log('DashboardProjectsCtrl::getById([%d])', id);
      return _(list).find({
        'id': id
      });
    };
    // @end CRUD operations

    ///////////////////////////////////////////////////////////////////////////
    // Modals
    ///////////////////////////////////////////////////////////////////////////

    // Create verification modal
    $scope.createProject = function (project) {
      var modalParams = {
        titleText: 'Create project',
        messageText: '',
        okText: 'Create',
        cancelText: 'Cancel',
        project: {}
      };
      var modalInstance = $modal.open({
        templateUrl: 'projectModal.html',
        controller: 'ProjectModalCtrl',
        resolve: {
          modalParams: function () {
            return modalParams;
          }
        }
      });
      modalInstance.result.then(function (newProject) {
        TimerService.updateProject(newProject);
      }, function () {
        console.info('Modal dismissed at: ' + new Date());
      });
    };

    // Create verification modal
    $scope.deleteProject = function (project) {
      var modalParams = {
        titleText: 'Remove project',
        messageText: 'Do you want to remove project?',
        okText: 'Remove',
        cancelText: 'Cancel'
      };
      var modalInstance = $modal.open({
        templateUrl: 'confirmationModal.html',
        controller: 'ConfirmationModalCtrl',
        resolve: {
          modalParams: function () {
            return modalParams;
          }
        }
      });
      modalInstance.result.then(function () {
        TimerService.deleteProject(project);
      }, function () {
        console.info('Modal dismissed at: ' + new Date());
      });
    };

    // Customer modal
    $scope.showCustomerModal = function (customer) {
      console.log('DashboardProjectsCtrl::showCustomerModalModal, customerName: %s', customer.name);
      var modalParams = {
        titleText: 'Create customer',
        messageText: 'Do you want to create a new customer?',
        okText: 'Create',
        cancelText: 'Cancel',
        customer: customer
      };
      var modalInstance = $modal.open({
        templateUrl: 'customerModal.html',
        controller: 'CustomerModalCtrl',
        resolve: {
          modalParams: function () {
            return modalParams;
          }
        }
      });
      modalInstance.result.then(function (result) {
        CustomerService.create(result).then(function () {
          // Update the project now
        });
      }, function () {
        console.info('Modal dismissed at: ' + new Date());
      });
    };

    //
    // @start Event handlers
    //
    $scope.$on('onProjectUpdated', function (event, updatedProject) {
      console.info('EVENT: onProjectUpdated([%d])', updatedProject.id);
      var project = $scope.getById($scope.projects, updatedProject.id);
      if (project) {
        // Make sure to copy all the attributes here
        project.active = updatedProject.active;
        project.name = updatedProject.name;
        project.rate = updatedProject.rate;
      } else {
        $scope.projects.push(updatedProject);
      }
    });
    $scope.$on('onProjectDeleted', function (event, deletedProject) {
      console.info('EVENT: onProjectDeleted([%d])', deletedProject.id);
      var index = _.indexOf($scope.projects, deletedProject);
      console.log('Removing project at index %d', index);
      $scope.projects.splice(index, 1);
    });
    $scope.$on('onProjectCreated', function (event, project) {
      console.log('EVENT: DashboardProjectsCtrl::onProjectCreated');
      $scope.projects.push(_.clone(project));
    });
    $scope.$on('onProjectsRefreshed', function (event, updatedProjectList) {
      console.log('EVENT: DashboardProjectsCtrl::onProjectsRefreshed(size [%d])', updatedProjectList.length);
      var activeProjectId = PersonService.getActiveProjectId();
      _.each(updatedProjectList, function(p) {
        // Cloning here, don't want to modify the internal cached entries
        $scope.projects.push(_.clone(p));
        if (p.id === activeProjectId) {
          p.active = true;
        }
      });
    });
    $scope.$on('onLoggedOut', function () {
      console.info('EVENT: DashboardProjectsCtrl::onLoggedOut()');
      $scope.projects = {};
    });    
    //
    // @end Event handlers
    //  

    $scope.getCustomers = function () {
      $scope.customers = CustomerService.list();
      return $scope.customers;
    };

  });
