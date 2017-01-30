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
    expect($route.routes['/login'].templateUrl).to.equal(''); //TODO
  });

  it('Should have /home route, template, and controller', function () {
    expect($route.routes['/home']).to.be.defined;
    expect($route.routes['/home'].controller).to.equal('LandingController');
    expect($route.routes['/home'].templateUrl).to.equal(''); //TODO
  });

});