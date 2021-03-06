'use strict';

angular.module('worktajmApp')
  .directive('fullHeight', function ($window) {
    return {
      template: '',
      restrict: 'A',
      link: function (scope, element, attrs) {
        var w = angular.element($window);
        var htmlAttribute = 'height';
        if (attrs.fullHeight === 'min') {
          htmlAttribute = 'min-height';
        } else if (attrs.htmlAttribute === 'max') {
          htmlAttribute = 'max-height';
        }

        scope.$watch(function () {
          return {
            'h': w.height(),
            'w': w.width()
          };
        }, function (newValue) {
          w.windowHeight = newValue.h;
          w.windowWidth = newValue.w;


          scope.style = function () {
            var updatedStyle = {};
            updatedStyle[htmlAttribute] = (newValue.h) + 'px';
            updatedStyle.width = (newValue.w) + 'px';
            return updatedStyle;
          };
        }, true);

        w.bind('resize', function () {
          scope.$apply();
        });
      }
    };
  });