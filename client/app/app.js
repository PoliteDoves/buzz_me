(function () {

  'use strict';

  angular
    .module('app', ['auth0.lock', 'angular-jwt', 'ui.router'])
    .config(config);

  function config($stateProvider, lockProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        controller: 'HomeController',
        templateUrl: 'components/home/home.html',
        controllerAs: 'vm'
      });

    lockProvider.init({
      clientID: 'abNjFPukJoYmF91ksTKj3M2me7iz2Ldv',
      domain: 'buzzme.auth0.com'
    });

    $urlRouterProvider.otherwise('/home');
  }

})();
