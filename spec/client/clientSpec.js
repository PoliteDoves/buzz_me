'use strict';

describe('Routing', function () {
  var $route;
  beforeEach(module('app'));

  beforeEach(inject(function ($injector) {
    $route = $injector.get('$route');
  }));

  it('Should have /login route, template, and controller', function () {
    expect($route.routes['/login']).to.be.defined;
    expect($route.routes['/login'].controller).to.equal('LoginController');
    expect($route.routes['/login'].templateUrl).to.equal('app/login/login.html'); //TODO
  });

  it('Should have /home route, template, and controller', function () {
    expect($route.routes['/home']).to.be.defined;
    expect($route.routes['/home'].controller).to.equal('LandingController');
    expect($route.routes['/home'].templateUrl).to.equal('app/landing/landing.html'); //TODO
  });

  it('Should have /list route, template, and controller', function () {
    expect($route.routes['/list']).to.be.defined;
    expect($route.routes['/list'].controller).to.equal('ListController');
    expect($route.routes['/list'].templateUrl).to.equal('app/list/list.html'); //TODO
  });

});