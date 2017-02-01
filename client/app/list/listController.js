(function () {
  'use strict';

  angular
    .module('app')
    .controller('ListController', ListController);

  function ListController($http, authService, jwtHelper, store, lock) {
    var vm = this;

    lock.getProfile(store.get('jwt'), function (error, profile) {
      vm.payload = profile;
      // find or create user in db
      $http({
        method: 'POST',
        url: 'api/users',
        data: {
          name: profile.name,
          email: profile.email
        }
      })
      .then(user => {
        console.log('user created', user);
      });
      // get lists associated with that user

    });


    vm.authService = authService;

  }
}());
