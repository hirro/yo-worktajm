'use strict';

angular.module('yoWorktajmApp')
  .filter('hhmmssFilter', function () {
    return function (inputInSeconds) {
      var seconds = inputInSeconds % 60;
      var minutes = (inputInSeconds - seconds) / 60 % 60;
      var hours = (inputInSeconds - seconds - minutes * 60) / 3600 % 60;      
      return hours + 'h ' + minutes + 'm ' + seconds + 's';
    };
  });
