'use strict';

xdescribe('Routing', function () {
  var $route;
  beforeEach(module('app'));

  beforeEach(module(function ($injector) {
    $route = $injector.get('$urlRouterProvider');
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

xdescribe('ListController', function () {
  var $scope, $rootScope, createController, ListFactory, $httpBackend;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('app'));
  beforeEach(inject(function ($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    ListFactory = $injector.get('ListFactory');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    var profile = {name: "Bob", email: "apslagle@gmail.com"};
    vm.payload = profile;

    createController = function () {
      return $controller('ListController', {
        $scope: $scope,
        ListFactory: ListFactory
      });
    };

  }));

  it('should have a vm', function () {
    createController();
    expect(vm).to.be.an('object');
  });

  it('should call `ListFactory.getUserTasks` when controller is loaded', function () {
    sinon.spy(ListFactory, 'getUserTasks');
    $httpBackend.expectGET('/api/tasks/apslagle@gmail.com').respond(200);

    createController();
    $httpBackend.flush();

    expect(ListFactory.getUserTasks.called).to.equal(true);
    ListFactory.getUserTasks.restore();
  });

  it('should populate the data property after the call to `Links.getAll()`', function () {
    var mockLinks = [{}, {}, {}];
    $httpBackend.expectGET('api/tasks/apslagle@gmail.com').respond(mockLinks);

    createController();
    $httpBackend.flush();

    expect(vm.tasks).to.deep.equal(mockLinks);
  });
});