'use strict';

angular.module('worktajmApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('root', {
        url: '/',
        templateUrl: 'app/landing/landing.html',
        controller: 'LandingCtrl',
        onEnter: function ($state, Auth) {
          console.log('OnEnter', $state);
          console.log('isLoggedIn', Auth.isLoggedIn());
          console.log('$state.current:', $state.current);
          console.log('$state.current.name:', $state.current.name);

          if ($state.current.name === 'root'){
            console.log('going to landing');
            $state.go('landing');
          }
          if (Auth.isLoggedIn()) {

            //$state.transitionTo('authenticated');

          } else {
          }
          //$state.transitionTo('unauthenticated');
        }
      })
      .state('landing', {
        url: '',
        templateUrl: 'app/landing/landing.html',
        controller: 'LandingCtrl'
      });
  });