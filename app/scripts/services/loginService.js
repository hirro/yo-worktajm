/* globals Base64 */
/*jshint camelcase: false */

'use strict';

angular.module('yoWorktajmApp').service('LoginService', function LoginService(Restangular, $cookieStore, $q) {
  var svc = {
    person: null,
    token:  null,
    credentials: null,
    personId: 0
  };

  svc.login = function (username, password) {
    console.log('LoginService::login(%s, *****)', username);
    var deferred = $q.defer();
    svc.setCredentials(username, password);
    // Restangular.setDefaultHeaders({
    //   'Authorization': 'Basic ZGVtb0B3b3JrdGFqbS5jb206cGFzc3dvcmQ=',
    //   'Jim': 'sdfsdfdf'
    // });
    Restangular.one('authenticate').get().then(function (result) {
      console.log('Successfully logged in user [%s]', username);
      svc.personId = result;
      return deferred.resolve(result);
    }, function (reason) {
      console.log('Failed to login used [%s], reason: [%s]', username, reason);
      return deferred.reject(reason);      
    });
    return deferred.promise;    
  };

  svc.logout = function () {
    console.log('LoginService::logout()');
    svc.clearCredentials();
  };

  svc.setCredentials = function (username, password) {
    svc.credentials = Base64.encode(username + ':' + password);
    $cookieStore.put('authentication', svc.credentials);

    // Use the token to set the authentication token, once done the person can be fetched.
    Restangular.setDefaultHeaders({
      'Authorization': 'Basic ' + svc.credentials
    });

    console.log('LoginService::setCredentials(%s)', svc.credentials);
  };

  svc.clearCredentials = function () {
    document.execCommand('ClearAuthenticationCache');
    $cookieStore.remove('authentication');
    Restangular.setDefaultHeaders({
      'Authorization': ''
    });
    svc.credentials = undefined;
  };

  return svc;
});
