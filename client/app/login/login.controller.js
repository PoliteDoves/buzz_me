(function () {
  'use strict';
  console.log('controller login loaded')

  angular
    .module('app')
    .controller('LoginController', LoginController);

  function LoginController(authService) {

    var vm = this;

    vm.authService = authService;

  }
})();
