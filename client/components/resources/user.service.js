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
          controller:'currentTimeEntry'
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
