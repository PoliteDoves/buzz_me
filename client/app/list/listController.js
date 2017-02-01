(function () {
  'use strict';

  angular
    .module('app')
    .controller('ListController', ListController);

  function ListController(authService, jwtHelper, store, lock) {
    var vm = this;

    lock.getProfile(store.get('jwt'), function (error, profile) {
      vm.payload = profile;
    });

    vm.authService = authService;

  }
}());
