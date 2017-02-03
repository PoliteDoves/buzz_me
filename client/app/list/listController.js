(function () {
  'use strict';

  angular
    .module('app')
    .controller('ListController', ListController);

  function ListController(ListFactory, $http, authService, jwtHelper, store, lock, $locale) {
    var vm = this;
    vm.task = '';
    vm.date = '';
    vm.time = '';
    vm.interval = 0;
    vm.id;
    vm.user;

    lock.getProfile(store.get('jwt'), function (error, profile) {
      vm.payload = profile;
      ListFactory.findOrCreateUser(profile.name, profile.email)
        .then(user => {
          vm.user = user;
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

    vm.intervalOutput = function(num) {
      if(num === 0) { return "Just Once"; }
      if(num === 1) { return "Every Minute!"; }
      if(num === 60) { return "Every Hour"; }
      if(num === 120) { return "Every 2 Hours"; }
      return `Every ${num} minutes`;
    }

    vm.onTextSubmit = function() {
      var formattedDate = ListFactory.formatTime(vm.date, vm.time);
      var interval = vm.interval === 0 ? null : vm.interval;

      var data = {
        dateTime: formattedDate,
        interval: interval
      }

      ListFactory.updateTask(vm.id, data)
        .then((result)=>{
          // TODO let user know it was successful
          console.log('result', result);
        })
    }

    vm.setTaskId = function(id) {
      ListFactory.updateTask(id, {isComplete: true});
      vm.id = id;
    }
  }
}());
