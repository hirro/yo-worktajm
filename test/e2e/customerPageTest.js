/*
  @licstart The following is the entire license notice for the 
            JavaScript code in this page.
  @source https://github.com/hirro/yo-worktajm

  Copyright (C) 2013 Jim Arnell.

  The JavaScript code in this page is free software: you can
  redistribute it and/or modify it under the terms of the GNU
  General Public License (GNU GPL) as published by the Free Software
  Foundation, either version 3 of the License, or (at your option)
  any later version.  The code is distributed WITHOUT ANY WARRANTY;
  without even the implied warranty of MERCHANTABILITY or FITNESS
  FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

  As additional permission under GNU GPL version 3 section 7, you
  may distribute non-source (e.g., minimized or compacted) forms of
  that code without the copy of the GNU GPL normally required by
  section 4, provided you include this license notice and a URL
  through which recipients can access the Corresponding Source.

  @licend The above is the entire license notice
          for the JavaScript code in this page.  
*/

/* globals element, it, by, $ */

'use strict';

require('./utilities.js');

function login() {
  // email
  var emailInput = element(by.model('registration.email'));
  var email = new Date().getTime().toString() + '@protractor.org';
  emailInput.sendKeys(email);

  // password
  var passwordInput = element(by.model('registration.password'));
  passwordInput.sendKeys('password');

  // company
  var companyInput = element(by.model('registration.company'));
  companyInput.sendKeys('Test company');

  // Press the login
  element(by.id('register')).click();

  // We should now be logged in and transferred to the dashboard
  // 
  var firstName = element(by.binding('person.firstName'));
  expect(firstName.getText()).toEqual('First name Last name');
}

function addCustomer(customer) {

}

function deleteCustomer(customer) {

}

beforeEach(function () {

});

describe('should add a customer and then delete it', function() {
  xit('should login successfully', function() {

    //browser().navigateTo('/customers');

  });
});
