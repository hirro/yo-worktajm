'use strict';

angular.module('yoWorktajmApp')
  .controller('ProfileCtrl', function ($scope) {
    $scope.selected = 'profile'; 
    $scope.tabs = [ 
      { active: true },
      { active: false },
      { active: false },
      { active: false },
      { active: false }
    ];
  });
