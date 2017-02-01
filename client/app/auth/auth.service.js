(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  function authService(lock, authManager, $state, store) {

    function login() {
      lock.show();
    }

    function logout() {
      store.remove('jwt');
      authManager.unauthenticate();
      $state.go('landing');
    }

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function (authResult) {
        store.set('jwt', authResult.idToken);
        authManager.authenticate();
      });
    }

    return {
      login: login,
      registerAuthenticationListener: registerAuthenticationListener,
      logout: logout
    }
  }
})();
