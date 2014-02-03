/*jshint camelcase: false */

'use strict';

describe('Service: LoginService', function () {

  // load the service's module
  beforeEach(module('yoWorktajmApp'));

  // API
  var $httpBackend;
  var $rootScope;

  // instantiate service
  var LoginService;

  // Constants
  var username = 'a@b.c';
  var password = 'password';
  var encoded = 'YUBiLmM6cGFzc3dvcmQ=';
  var person = {
    id: 1,
    username: 'User A',
    activeTimeEntry: null
  };

  beforeEach(inject(function (_LoginService_, _$rootScope_, _$httpBackend_) {
    LoginService = _LoginService_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should set and clear the credentials', function () {
    LoginService.setCredentials(username, password);
    expect(LoginService.credentials).toBe(encoded);
    LoginService.clearCredentials();
    expect(LoginService.credentials).toBeUndefined();
  });

  it('should login', function () {
    $httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/person').respond(person);
    spyOn(LoginService, 'setCredentials').andCallThrough();
    spyOn(LoginService, 'clearCredentials').andCallThrough();

    // Login
    LoginService.login(username, password);
    expect(LoginService.credentials).toBe(encoded);

    $rootScope.$digest();
    $httpBackend.flush();

    expect(LoginService.setCredentials).toHaveBeenCalled();

    // Logout
    LoginService.logout();
    expect(LoginService.credentials).toBeUndefined();
  });

});
