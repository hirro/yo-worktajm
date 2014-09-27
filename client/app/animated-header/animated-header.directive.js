'use strict';

angular.module('worktajmApp')
  .directive('animatedHeader', function () {
    return {
      templateUrl: '',
      restrict: 'A',
      link: function (scope, element, attrs) {

        console.log('XXXXXXX');

        $window.addEventListener( 'scroll', function( event ) {
          if( !didScroll ) {
            didScroll = true;
            setTimeout( scrollPage, 250 );
          }
        }, false );        
        
      }
    };
  });