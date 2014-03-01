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

/*globals  XDate */

'use strict';

describe('Controller: ReportsCtrl', function () {

  // load the controller's module
  beforeEach(module('yoWorktajmApp'));

  var ReportsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportsCtrl = $controller('ReportsCtrl', {
      $scope: scope
    });
  }));

  it('should calculate correct values for today', function () {
    var date = new XDate(2013, 5, 10, 13,  30,  0, true);
    scope.changedTimePeriod('today', date);
    expect(scope.selection.from.toISOString()).toBe('2013-06-10T00:00:00Z');
    expect(scope.selection.to.toISOString()).toBe('2013-06-10T23:59:59.999Z');
  });

  it('should calculate correct values for yesterday', function () {
    var date = new XDate(2013, 5, 10, 13,  30,  0, true);
    scope.changedTimePeriod('yesterday', date);
    expect(scope.selection.from.toISOString()).toBe('2013-06-09T23:59:59.999Z');
    expect(scope.selection.to.toISOString()).toBe('2013-06-09T00:00:00Z');
  });

  it('should calculate correct values for thisWeek', function () {
    var date = new XDate(2013, 5, 10, 13,  30,  0, true);
    scope.changedTimePeriod('thisWeek', date);
    expect(scope.selection.from.toISOString()).toBe('2013-06-10T00:00:00Z');
    expect(scope.selection.to.toISOString()).toBe('2013-06-16T23:59:59.999Z');
  });

  it('should calculate correct values for lastWeek', function () {
    var date = new XDate(2013, 5, 10, 13,  30,  0, true);
    scope.changedTimePeriod('lastWeek', date);
    expect(scope.selection.from.toISOString()).toBe('2013-06-03T00:00:00Z');
    expect(scope.selection.to.toISOString()).toBe('2013-06-09T23:59:59.999Z');
  });

  it('should calculate correct values for thisMonth', function () {
    var date = new XDate(2013, 5, 10, 13,  30,  0, true);
    scope.changedTimePeriod('thisMonth', date);
    expect(scope.selection.from.toISOString()).toBe('2013-06-01T00:00:00Z');
    expect(scope.selection.to.toISOString()).toBe('2013-06-30T23:59:59.999Z');
  });

  it('should calculate correct values for lastMonth', function () {
    var date = new XDate(2013, 5, 10, 13,  30,  0, true);
    scope.changedTimePeriod('lastMonth', date);
    expect(scope.selection.from.toISOString()).toBe('2013-05-01T00:00:00Z');
    expect(scope.selection.to.toISOString()).toBe('2013-05-31T23:59:59.999Z');
  });

});
