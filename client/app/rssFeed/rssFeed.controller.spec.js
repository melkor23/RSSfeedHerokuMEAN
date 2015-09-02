'use strict';

describe('Controller: RssFeedCtrl', function () {

  // load the controller's module
  beforeEach(module('proyecto1App'));

  var RssFeedCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RssFeedCtrl = $controller('RssFeedCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
