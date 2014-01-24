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

/*globals _ */

'use strict';

angular.module('yoWorktajmApp').controller('TimeEntryModalCtrl', function ($scope, $modalInstance, TimerService, modalParams) {

  console.log('ModalInstanceCtrl::INIT ');
  $scope.projectNames = _.pluck(TimerService.getProjects(), 'name');
  $scope.timeEntry = modalParams.timeEntry;
  $scope.timeEntry.start = new Date(modalParams.timeEntry.startTime);
  $scope.timeEntry.end = new Date(modalParams.timeEntry.endTime);
  _.extend($scope, modalParams);
  $scope.ok = function () {
    console.log('startTime [], endTime []', $scope.startTime, $scope.endTime);
    $scope.timeEntry.endTime = new Date($scope.timeEntry.end);
    $scope.timeEntry.startTime = new Date($scope.timeEntry.start);
    $modalInstance.close($scope.timeEntry);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});
