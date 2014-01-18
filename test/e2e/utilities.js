'use strict';


this.generateUniqueId = function () {
  var id = new Date().getTime().toString();
  var random = Math.floor((Math.random()*100)+1).toString();
  return id + random;
}

this.login = function () {
  browser.get('http://127.0.0.1:9000/');

  // Enter the test user name, clear first to make sure suggested data is cleared
  var usernameInput = element(by.model('username'));
  usernameInput.clear();
  usernameInput.sendKeys('jim@arnellconsulting.com');

  // Enter the test user password, clear first to make sure suggested data is cleared
  var passwordInput = element(by.model('password'));
  passwordInput.clear();
  passwordInput.sendKeys('password');

  // Press the login
  element(by.id('login')).click();

  // We should now be logged in and transferred to the dashboard
  // 
  var firstName = element(by.binding('person.firstName'));
  expect(firstName.getText()).toEqual('Jim Arnell');
}
