//Landing Controller
(function () {

  console.log('controller landing loaded')
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
