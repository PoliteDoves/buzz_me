(function () {
  'use strict';

  angular
    .module('app')
    .controller('ListController', ListController);

  function ListController(ListFactory, $http, authService, jwtHelper, store, lock, $locale) {
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

    vm.formatDate = function (date) {
    function pad(n) {
        return n < 10 ? '0' + n : n;
    }

    return date && date.getFullYear()
        + '-' + pad(date.getMonth() + 1)
        + '-' + pad(date.getDate());
    }

    vm.parseDate = function (s) {
    var tokens = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);

    return tokens && new Date(tokens[1], tokens[2] - 1, tokens[3]);
    }
  }
}());
