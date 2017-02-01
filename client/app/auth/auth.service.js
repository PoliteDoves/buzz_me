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
      console.log("regestered!")
      lock.on('authenticated', function (authResult) {
        console.log("authentication");
        store.set('jwt', authResult.idToken);
        authManager.authenticate();
        console.log("auth manager authenticated")
      });
    }

    return {
      login: login,
      registerAuthenticationListener: registerAuthenticationListener,
      logout: logout
    }
  }
})();
