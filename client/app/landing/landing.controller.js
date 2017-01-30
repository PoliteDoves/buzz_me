(function () {
  'use strict';

  angular
    .module('app')
    .controller('LandingController', LandingController);

  function LandingController(authService) {

    var vm = this;
    vm.authService = authService;

  }
}());
