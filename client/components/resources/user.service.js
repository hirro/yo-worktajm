'use strict';

angular.module('worktajmApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      setActiveTimeEntry: {
        method: 'PUT',
        params: {
          id:'me',
          controller:'activeTimeEntry'
        }
      },      
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
