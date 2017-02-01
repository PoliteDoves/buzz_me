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
        $http({
          method: 'GET',
          url: `api/tasks/${user.data[0].email}`
        })
        .then(tasks=>console.log('tasks', tasks))
          .catch(e=>console.log('error', e))
      });
      // get lists associated with that user

    });


    vm.authService = authService;

  }
}());
