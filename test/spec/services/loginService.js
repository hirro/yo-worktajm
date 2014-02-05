/*jshint camelcase: false */

'use strict';

describe('Service: PersonService', function () {

  // load the service's module
  beforeEach(module('yoWorktajmApp'));

  // API
  var $httpBackend;
  var $rootScope;

  // instantiate service
  var PersonService;

  // Constants
  var username = 'a@b.c';
  var password = 'password';
  var encoded = 'YUBiLmM6cGFzc3dvcmQ=';
  var person = {
    id: 1,
    username: 'User A',
    activeTimeEntry: null
  };

  beforeEach(inject(function (_PersonService_, _$rootScope_, _$httpBackend_) {
    PersonService = _PersonService_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should set and clear the credentials', function () {
    PersonService.setCredentials(username, password);
    expect(PersonService.credentials).toBe(encoded);
    PersonService.clearCredentials();
    expect(PersonService.credentials).toBeUndefined();
  });

  it('should login', function () {
    $httpBackend.whenGET('http://worktajm.arnellconsulting.dyndns.org:8080/worktajm-api/authenticate').respond(person);
    spyOn(PersonService, 'setCredentials').andCallThrough();
    spyOn(PersonService, 'clearCredentials').andCallThrough();

    // Login
    PersonService.login(username, password);
    expect(PersonService.credentials).toBe(encoded);

    $rootScope.$digest();
    $httpBackend.flush();

    expect(PersonService.setCredentials).toHaveBeenCalled();

    // Logout
    PersonService.logout();
    expect(PersonService.credentials).toBeUndefined();
  });

});
