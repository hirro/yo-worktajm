/*globals by, element */

'use strict';

var LoginPage = function() {
  this.emailInput = element(by.model('user.email'));
  this.passwordInput = element(by.model('user.password'));
  this.loginButton = element(by.id('loginButton'));
};

module.exports = new LoginPage();

