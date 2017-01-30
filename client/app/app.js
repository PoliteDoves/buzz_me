(function () {

  'use strict';

  angular
    .module('app', ['auth0.lock', 'angular-jwt', 'ui.router'])
    .config(config);

  function config($stateProvider, lockProvider, $urlRouterProvider) {
    console.log('router', $stateProvider);

    $stateProvider
      .state('landing', {
        url: '/landing',
        controller: 'LandingController',
        templateUrl: 'app/landing/landing.html',
        controllerAs: 'vm'
      })
      .state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'app/login/login.html',
        controllerAs: 'vm'
      })
      .state('list', {
        url: '/list',
        controller: 'ListController',
        templateUrl: '/app/list/list.html',
        controllerAs: 'vm'
      });

    lockProvider.init({
      clientID: 'abNjFPukJoYmF91ksTKj3M2me7iz2Ldv',
      domain: 'buzzme.auth0.com'
    });

    $urlRouterProvider.otherwise('/');
  }

})();
