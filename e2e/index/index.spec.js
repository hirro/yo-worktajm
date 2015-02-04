/*globals describe, beforeEach, expect, browser, it */

'use strict';

describe('Index View', function() {
  var page;

  beforeEach(function() {
    browser.get('/index');
    page = require('./index.po');
  });

  it('should include username, email, password input and login button', function() {
    expect(browser.getLocationAbsUrl()).toBe('/');
    expect(page.passwordInput).not.toBeNull();
    expect(page.emailInput).not.toBeNull();
    expect(page.loginButton).not.toBeNull();
  });

  it('should successfully go to login page', function() {
    page.loginButton.click();
    expect(browser.getLocationAbsUrl()).toBe('/login');
  });

});
