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

/* globals Base64 */

'use strict';

/**
 * This service handle operations for the currently logged in user.
 * @event onProjectUpdated(project) when active project has changed.
 * @tbdEvent onLoggedOut()
 * @tbdEvent onLoggedIn()
 */
angular.module('yoWorktajmApp').service('LoginService', function LoginService($rootScope, $cookieStore, $q, Restangular, $location, PersonService) {
  var personService = {
    person: null,
    token:  null,
    personId: 0
  };

  personService.login = function (username, password) {
    console.log('LoginService::login(%s, *****)', username);

    // Step 1: Authenticate and get authentation token
    var authenticate = function (username, password) {
      var deferred = $q.defer();
      // The the basic HTTP authentication
      personService.setCredentials(username, password);

      // Call authenticate
      Restangular.one('authenticate').get().then(function (token) {
        console.log('LoginService::login - Successfully authenticated, token.id: [%s]', token.id);
        deferred.resolve(token);
      }, function (reason) {
        console.error('Failed to authenticate user, reason : [%s]', reason);
        deferred.reject(reason);
      });
      return deferred.promise;
    };

    // Step 2: Assign the principal
    var loadPerson = function (token) {
      var deferred = $q.defer();
      
      PersonService.getPerson().then(function (person) {
        console.log('LoginService::login - Principal resolved, email %d', person.email);
        $rootScope.principal = person;
        $location.path('/dashboard');
        deferred.resolve(person);
      }, function (reason) {
        deferred.reject(reason);
      });
      return deferred.promise;
    };

    return authenticate( username,password )
      .then( loadPerson );
  };

  personService.logout = function () {
    console.log('LoginService::logout()');
    $rootScope.principal = undefined;
    personService.clearCredentials();
    $location.path('/main');
  };

  personService.setCredentials = function (username, password) {
    personService.credentials = Base64.encode(username + ':' + password);
    $cookieStore.put('authentication', personService.credentials);

    // Use the token to set the authentication token, once done the person can be fetched.
    Restangular.setDefaultHeaders({
      'Authorization': 'Basic ' + personService.credentials
    });

    console.log('LoginService::setCredentials(%s)', personService.credentials);
  };

  personService.clearCredentials = function () {
    document.execCommand('ClearAuthenticationCache');
    $cookieStore.remove('authentication');
    Restangular.setDefaultHeaders({
      'Authorization': ''
    });
    personService.credentials = undefined;
  };

  personService.getPrincipal = function () {
    return personService.person;
  };  

  return personService;
});
