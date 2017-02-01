(function () {

  'use strict';

  angular
    .module('app', ['auth0.lock', 'angular-jwt', 'ui.router', 'angular-storage'])
    .config(config);

  function config($stateProvider, lockProvider, $urlRouterProvider, $locationProvider) {
    console.log('router', $stateProvider);

    $stateProvider
      .state('landing', {
        url: '/landing',
        controller: 'LandingController',
        templateUrl: 'app/landing/landing.html',
        controllerAs: 'vm',
        data: {
          required: false
        }
      })
      .state('list', {
        url: '/',
        controller: 'ListController',
        templateUrl: '/app/list/list.html',
        controllerAs: 'vm',
        data: {
          required: true
        }
      });

    lockProvider.init({
      clientID: 'abNjFPukJoYmF91ksTKj3M2me7iz2Ldv',
      domain: 'buzzme.auth0.com',
      loginState: 'landing'
    });

    $locationProvider.hashPrefix('');
    $urlRouterProvider.otherwise('/');
  }

  

})();
