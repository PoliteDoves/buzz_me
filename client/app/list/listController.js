(function () {
  'use strict';

  angular
    .module('app')
    .controller('ListController', ListController);

  function ListController(authService, jwtHelper, store, lock) {
    var vm = this;

    lock.getProfile(store.get('jwt'), function (error, profile) {
      vm.payload = profile;
      // find or create user in db
      // get lists associated with that user
      $http({})

    });


    vm.authService = authService;

  }
}());
