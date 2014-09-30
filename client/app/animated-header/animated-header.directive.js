'use strict';

angular.module('worktajmApp')
  .directive('animatedHeader', function ($window, $compile) {
    return {
      templateUrl: '',
      restrict: 'A',
      link: function (scope, element) {

        var didScroll = false;
        var changeHeaderOn = 400;

        var scrollY = function () {
          return $window.pageYOffset || document.documentElement.scrollTop;
        };

        var scrollPage = function () {
          var sy = scrollY();
          if ( sy >= changeHeaderOn ) {
            element.addClass('navbar-shrink');
            $compile(element)(scope);
          }
          else {
            element.removeClass('navbar-shrink');
            $compile(element)(scope);
          }
          didScroll = false;
        };

        var onScrollEvent = function() {
          if( !didScroll ) {
            didScroll = true;
            setTimeout( scrollPage, 250 );
          }
        };

        if (!scope.initiated) {
          scope.initiated = true;
          console.log('registering scrolle event listener');
          $window.addEventListener('scroll', onScrollEvent, false );
        }
      }
    };
  });