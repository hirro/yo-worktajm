describe('login from landing page', function() {
  it('should login successfully', function() {
    browser.get('http://127.0.0.1:9000/');

    // Enter the test user name, clear first to make sure suggested data is cleared
    var username = element(by.model('username'));
    username.clear();
    username.sendKeys('jim@arnellconsulting.com');

    // Enter the test user password, clear first to make sure suggested data is cleared
    var password = element(by.model('password'));
    password.clear();
    password.sendKeys('password');

    // Press the login
    element(by.id('login')).click();

    // We should now be logged in and transferred to the dashboard
    // 
    var firstName = element(by.binding('person.firstName'));
    expect(firstName.getText()).toEqual('Jim Arnell');
  });
});