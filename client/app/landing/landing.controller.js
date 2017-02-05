(function () {
  'use strict';

  angular
    .module('app')
    .controller('LandingController', LandingController);

  function LandingController(authService, store) {

    var vm = this;
    vm.authService = authService;

    vm.displayLoginButton = () =>
      store.get('jwt') ? false : true;

  }
}());
