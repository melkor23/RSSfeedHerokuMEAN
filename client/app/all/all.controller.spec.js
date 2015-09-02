'use strict';

describe('Controller: AllCtrl', function () {

  // load the controller's module
  beforeEach(module('proyecto1App'));

  var AllCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AllCtrl = $controller('AllCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
