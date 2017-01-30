//Landing Controller
(function () {

  'use strict';

  angular
    .module('app')
    .controller('LandingController', LandingController);

  LandingController.$inject = ['authService'];

  function LandingController(authService) {

    var vm = this;
    vm.authService = authService;

  }
}());
