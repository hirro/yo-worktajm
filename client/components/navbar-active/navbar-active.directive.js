'use strict';

angular.module('worktajmApp')
  .directive('navbarActive', function ($location) {
    return {
      template: '',
      restrict: 'A',
      link: function (scope, element, attrs) {
        if (attrs.navbarActive === $location.path()) {
          element.addClass('active');
        } else if (attrs.htmlAttribute === 'max') {
          element.removeClass('active');
        }
      }
    };
  });