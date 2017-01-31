(function () {

  'use strict';

  angular
    .module('app')
    .run(run);

  run.$inject = ['$rootScope', 'authService', 'lock', 'store', 'jwtHelper', '$state'];

  function run($rootScope, authService, lock, store, jwtHelper, $state) {
    // Put the authService on $rootScope so its methods
    // can be accessed from the nav bar
    $rootScope.authService = authService;
    
    // Register the authentication listener that is
    // set up in auth.service.js
    authService.registerAuthenticationListener();

    // Register the synchronous hash parser
    // when using UI Router
    lock.interceptHash();

    $rootScope.$on('$stateChangeStart', function(e, to) {
      console.log(store.get('id_token'));
      if (to.data && to.data.requiresLogin) {
        if (!store.get('id_token')) {
          e.preventDefault();
          $state.go('landing');
        }
      }
    });
  }

})();
