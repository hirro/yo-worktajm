'use strict';

var Utilities = require('./utilities.js');

this.createProject = function () {
  return {
    name: 'Project ' + Utilities.generateUniqueId(),
    description: 'Description',
    rate: 22
  };
};
