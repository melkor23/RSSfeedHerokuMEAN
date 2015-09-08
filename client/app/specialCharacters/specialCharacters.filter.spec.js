'use strict';

describe('Filter: specialCharacters', function () {

  // load the filter's module
  beforeEach(module('proyecto1App'));

  // initialize a new instance of the filter before each test
  var specialCharacters;
  beforeEach(inject(function ($filter) {
    specialCharacters = $filter('specialCharacters');
  }));

  it('should return the input prefixed with "specialCharacters filter:"', function () {
    var text = 'angularjs';
    expect(specialCharacters(text)).toBe('specialCharacters filter: ' + text);
  });

});
