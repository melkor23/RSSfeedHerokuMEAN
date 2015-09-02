'use strict';

describe('Service: alertas', function () {

  // load the service's module
  beforeEach(module('proyecto1App'));

  // instantiate service
  var alertas;
  beforeEach(inject(function (_alertas_) {
    alertas = _alertas_;
  }));

  it('should do something', function () {
    expect(!!alertas).toBe(true);
  });

});
