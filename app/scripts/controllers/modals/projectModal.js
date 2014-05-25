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

angular.module('yoWorktajmApp').controller('ProjectModalCtrl', function ($scope, $modalInstance, modalParams) {
    _.extend($scope, modalParams);
    $scope.project = {
      name: modalParams.project.name,
      rate: modalParams.project.rate,
      description: modalParams.project.description,
      id: modalParams.project.id
    };
    $scope.ok = function () {
      // FIXME
      // Make sure project name is unique for the logged in person.
      // If not, set the error status on the input
      //$scope.projectForm.project.$setValidity('uniqueProjectPerUser', false);
      $modalInstance.close($scope.project);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
