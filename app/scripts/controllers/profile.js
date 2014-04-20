'use strict';

angular.module('yoWorktajmApp')
  .controller('ProfileCtrl', function ($scope, $routeParams) {
    $scope.selected = 'profile'; 
    $scope.tabs = [ 
      { active: true },
      { active: false },
      { active: false },
      { active: false },
      { active: false }
    ];
    console.log('Route params');
    console.log($routeParams);
  });
