/*globals describe, beforeEach, expect, browser, it */

'use strict';

describe('Login View', function() {
  var page;

  beforeEach(function() {
    browser.get('/login');
    page = require('./login.po');
  });

  it('should include username, email, password input and login button', function() {
    expect(browser.getLocationAbsUrl()).toBe('/login');
    expect(page.passwordInput).not.toBeNull();
    expect(page.emailInput).not.toBeNull();
    expect(page.loginButton).not.toBeNull();
  });

  xit('should successfully go to login page', function() {
    page.emailInput.sendKeys('test@test.com');
    page.passwordInput.sendKeys('test');
    page.loginButton.click();
    //webdriver.WebDriver.sleep(10);
    browser.waitForAngular();
    expect(browser.getLocationAbsUrl()).toBe('/dashboard');

  });

});
