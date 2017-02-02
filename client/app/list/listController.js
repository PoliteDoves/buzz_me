(function () {
  'use strict';

  angular
    .module('app')
    .controller('ListController', ListController);

  function ListController(ListFactory, $http, authService, jwtHelper, store, lock) {
    var vm = this;
    vm.task = '';

    lock.getProfile(store.get('jwt'), function (error, profile) {
      vm.payload = profile;
      ListFactory.findOrCreateUser(profile.name, profile.email)
      .then(user => {
        ListFactory.getUserTasks(user.data[0].email)
        .then(tasks=>{
          vm.tasks = tasks
        })
        .catch(e=>console.log('error', e))
      });
    });

    vm.authService = authService;

    vm.submit = function(text, email) {
      ListFactory.createTask(text, email)
        .then(task => {
          vm.task = '';
          ListFactory.getUserTasks(email)
            .then(tasks=>vm.tasks = tasks)
        })
    }
  }
}());
