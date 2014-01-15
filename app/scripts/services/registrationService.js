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

'use strict';

/**
 * This service handle operations for the currently logged in user.
 * @event onProjectUpdated(project) when active project has changed.
 * @tbdEvent onLoggedOut()
 * @tbdEvent onLoggedIn()
 */
angular.module('yoWorktajmApp').service('RegistrationService', function RegistrationService($rootScope, $q, Restangular) {
  var registrationService = {
    person: null,
    token:  null,
    personId: 0
  };

  /**
   * Validates an email address to make sure it is available.
   */
  registrationService.isEmailAvailable = function (email) {
    console.log('PersonService::isEmailAvailable');
    var deferred = $q.defer();

    registrationService.token = Restangular.one('registration/isEmailAvailable').get({
      email: email
    }).then(function (result) {
      console.log('Result: [%s]', result);
      deferred.resolve(JSON.parse(result));
    }, function (reason) {
      console.log('Email is not registered');
      deferred.reject(reason);
    });
   return deferred.promise;
  };

  return registrationService;
});
