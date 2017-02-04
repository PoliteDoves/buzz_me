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
      });

    const createTask = (text, email) =>
      $http({
        method: 'POST',
        url: `api/tasks/${email}`,
        data: {
          text: text
        }
      });

    const updateTask = (id, data) =>
      $http({
        method: 'PUT',
        url: `api/tasks/${id}`,
        data: data
      });

    const updateUser = (email, data) =>
      $http({
        method: 'PUT',
        url: `api/users/${email}`,
        data: data
      });

    const formatTime = (date, time) => {
      const formattedTimeStr = `${time.slice(0,5)} ${time.slice(5)}`
      return new Date(`${date} ${formattedTimeStr}`).toUTCString();
    };

    const deleteTask = (id) =>
      $http({
        method: 'DELETE',
        url: `api/task/${id}`,
      });

    const deleteAllTasks = (email) =>
      $http({
        method: 'DELETE',
        url: `api/tasks/${email}`
      });

    return {
      findOrCreateUser: findOrCreateUser,
      getUserTasks: getUserTasks,
      createTask: createTask,
      updateTask: updateTask,
      formatTime: formatTime,
      deleteTask: deleteTask,
      deleteAllTasks: deleteAllTasks
    }
  };
}());
