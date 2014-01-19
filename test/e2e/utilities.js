'use strict';

/*globals this, element, by, expect */

this.generateUniqueId = function () {
  var id = new Date().getTime().toString();
  var random = Math.floor((Math.random()*100)+1).toString();
  return id + random;
};

this.generateUsername = function () {
  var email = new Date().getTime().toString() + '@protractor.org';
  return email;
};

this.login = function (username, password) {
  browser.get('http://127.0.0.1:9000/');

  // Enter the test user name, clear first to make sure suggested data is cleared
  var usernameInput = element(by.model('username'));
  usernameInput.clear();
  usernameInput.sendKeys(username);

  // Enter the test user password, clear first to make sure suggested data is cleared
  var passwordInput = element(by.model(password));
  passwordInput.clear();
  passwordInput.sendKeys('password');

  // Press the login
  element(by.id('login')).click();

  // We should now be logged in and transferred to the dashboard
  // 
  var firstName = element(by.binding('person.firstName'));
  expect(firstName.getText()).toEqual('Jim Arnell');
};

this.register = function (username, password) {
  browser.get('http://127.0.0.1:9000/');

  // email
  var emailInput = element(by.model('registration.email'));
  emailInput.sendKeys(username);

  // password
  var passwordInput = element(by.model('registration.password'));
  passwordInput.sendKeys(password);

  // company
  var companyInput = element(by.model('registration.company'));
  companyInput.sendKeys('Test company');

  // Press the login
  element(by.id('register')).click();

  // We should now be logged in and transferred to the dashboard
  // 
  var firstName = element(by.binding('person.firstName'));
  expect(firstName.getText()).toEqual('First name Last name');
};

this.logout = function () {
};