(function () {
  'use strict';

  angular
    .module('app')
    .controller('ListController', ListController);

  function ListController(ListFactory, $http, authService, jwtHelper, store, lock, $locale) {
    var vm = this;
    vm.text = '';
    vm.task;
    vm.date = 'Date';
    vm.time = 'Time';
    vm.id;
    vm.user;
    vm.phone;

    lock.getProfile(store.get('jwt'), function (error, profile) {
      vm.payload = profile;
      ListFactory.findOrCreateUser(profile.name, profile.email)
        .then(user => {
          vm.user = user;
          ListFactory.getUserTasks(user.data[0].email)
            .then(tasks => {
              vm.tasks = tasks
            })
        });
    });

    vm.authService = authService;

    vm.submit = function(text, email) {
      ListFactory.createTask(text, email)
      .then(task => {
        vm.text = '';
        ListFactory.getUserTasks(email)
          .then(tasks=>vm.tasks = tasks)
      })
    }

    vm.intervalOutput = function() {
      var num = vm.task.interval;
      if(num === 0) { return "Just Once"; }
      if(num === 1) { return "Every Minute!"; }
      if(num === 60) { return "Every Hour"; }
      if(num === 120) { return "Every 2 Hours"; }
      return `Every ${num} minutes`;
    }

    vm.onTextSubmit = function() {
      var formattedDate = ListFactory.formatTime(vm.task.date, vm.task.time);
      var interval = vm.task.interval === 0 ? null : vm.task.interval;

      var data = {
        dateTime: formattedDate,
        interval: interval
      }

      ListFactory.updateTask(vm.task.id, data)
      .then((result) => {
        // TODO let user know it was successful
        console.log('result', result);
      })
    }

    vm.completeTask = function(task) {
      ListFactory.updateTask(task.id, {isCompleted: !task.isCompleted})
      .then(function(result) {
        ListFactory.getUserTasks(vm.payload.email)
          .then(tasks=>vm.tasks = tasks)
      })
    }

    vm.setTask = function(task) {
      vm.task = task;
    }

    vm.displayHeaders = function(complete) {
      if (!vm.tasks) { return false; }
      var completed = vm.tasks.data.filter(t => t.isCompleted);

      if (complete === 'incomplete') {
        return completed.length === vm.tasks.data.length ? false : true;
      } else {
        return completed.length === 0 ? false : true;
      }
    }

    vm.deleteTask = function(id) {
      ListFactory.deleteTask(id)
        .then(t =>
          ListFactory.getUserTasks(vm.payload.email)
            .then(tasks=>vm.tasks = tasks)
        )
    }

    vm.deleteAllTasks = function() {
      ListFactory.deleteAllTasks(vm.payload.email)
      .then(t => {
        return ListFactory.getUserTasks(vm.payload.email)
        .then(tasks => vm.tasks = tasks)
      })
    }

    vm.datePlaceHolder = function() {
      if (!vm.task || !vm.task.dateTime) { return "Date"; }
      return new Date(vm.task.dateTime).toDateString();
    }

    vm.timePlaceHolder = function() {
      if (!vm.task || !vm.task.dateTime) { return "Time"; }
      return new Date(vm.task.dateTime).toLocaleTimeString();
    }

    vm.intervalPlaceHolder = function() {
      if (!vm.task || !vm.task.interval) { return 0; }
      return vm.task.interval;
    }

    vm.numberEditorEnabled = false;

    vm.enableEditor = function() {
      vm.numberEditorEnabled = true;
      vm.editableNumber = "";
    }

    vm.disableEditor = function() {
      vm.numberEditorEnabled = false;
    }

    vm.submitNumber = function() {
      vm.user.data[0].phone_number = vm.editableNumber;
      ListFactory.updateUser(vm.payload.email, {phone_number: vm.editableNumber});
      vm.disableEditor();
    }
  }
}());
