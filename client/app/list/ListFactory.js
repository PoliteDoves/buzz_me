(function() {
  'use strict';

  angular
    .module('app')
    .factory('ListFactory', ListFactory);

  function ListFactory($http) {
    const findOrCreateUser = (name, email) =>
      $http({
        method: 'POST',
        url: 'api/users',
        data: {
          name: name,
          email: email
        }
      });

    const getUserTasks = (email) =>
      $http({
        method: 'GET',
        url: `api/tasks/${email}`
      })

    const createTask = (text, email) =>
      $http({
        method: 'POST',
        url: `api/tasks/${email}`,
        data: {
          text: text
        }
      })


    return {
      findOrCreateUser: findOrCreateUser,
      getUserTasks: getUserTasks,
      createTask: createTask
    }
  }


}());
