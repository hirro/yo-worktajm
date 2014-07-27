'use strict';

angular.module('worktajmApp')
  .factory('Auth', function Auth($http, User, $cookieStore, $q, $state) {
    var currentUser = {};
    if ($cookieStore.get('token')) {
      currentUser = User.get(
        {}, 
        function (user) {
          console.log('Auth:success ', user);
          $state.go('dashboard');
        },
        function (err) {
          console.log('Auth:error', err);
        });
      console.log('Auth', currentUser);
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function (user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        console.log('Auth::login(email: [%s])', user.email);

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
          success(function (data) {
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            deferred.resolve(data);
            console.log('Auth::login - success');
            $state.go('dashboard');

            //$state.go('dashboard');
            return cb();
          }).
          error(function (err) {
            this.logout();
            deferred.reject(err);
            return cb(err);
          }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function () {
        $cookieStore.remove('token');
        currentUser = {};
        console.log('Auth::logout', currentUser);
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function (user, callback) {
        var cb = callback || angular.noop;

        return User.save(user,
          function (data) {
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            return cb(user);
          },
          function (err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function (oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function (user) {
          return cb(user);
        }, function (err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function () {
        console.log('Auth::getCurrentUser');
        console.log(currentUser);
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function () {
        return currentUser.hasOwnProperty('role');
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function () {
        return currentUser.role === 'admin';
      },

      /**
       * Get auth token
       */
      getToken: function () {
        return $cookieStore.get('token');
      }
    };
  });
