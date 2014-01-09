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

describe('login from landing page', function() {
  it('should login successfully', function() {
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
  });
});
