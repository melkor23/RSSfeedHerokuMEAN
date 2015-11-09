'use strict';

describe('Controller: TmdbSearchCtrl', function () {

  // load the controller's module
  beforeEach(module('proyecto1App'));

  var TmdbSearchCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TmdbSearchCtrl = $controller('TmdbSearchCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
  });
});
