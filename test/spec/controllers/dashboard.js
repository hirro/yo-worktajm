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

/*globals describe, beforeEach, inject, expect, it, projects */

'use strict';

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('yoWorktajmApp'));

  // Setup the mocks
  var PersonServiceMock, PERSON_A;
  beforeEach(function () {
    PERSON_A = {
      id:     1,
      name:   'Person A'
    };
    PersonServiceMock = {
      getPerson: function () {
        console.log('PersonServiceMock:getPerson called');
        var deferred = $q.defer();
        deferred.resolve(PERSON_A);
        return deferred.promise;
      }
    };

    // Register spies that are called during controller initalization
    spyOn(PersonServiceMock, 'getPerson').andCallThrough();    
  });

  // Initialize the controller and a mock scope
  var DashboardCtrl;
  var $q, $scope;
  beforeEach(inject(function ($controller, $rootScope, $injector, _$q_) {

    // The rest
    $scope = $rootScope.$new();
    $q = _$q_;
    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: $scope,
      PersonService: PersonServiceMock
    });
    DashboardCtrl.$inject = ['$scope',  'PersonService'];
  }));

  it('should be initialized with a person after sync', function () {
    // Not sure if this digest is required
    $scope.$digest();
    
    // Verification
    expect(PersonServiceMock.getPerson).toHaveBeenCalled();
  });
});

