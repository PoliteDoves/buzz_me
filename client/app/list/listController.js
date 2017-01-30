(function () {
  'use strict';

  angular
    .module('app')
    .controller('ListController', ListController);

  function ListController(authService) {

    var vm = this;
    vm.authService = authService;

  }
}());
