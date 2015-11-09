'use strict';

describe('Filter: feedIsFixed', function () {

  // load the filter's module
  beforeEach(module('proyecto1App'));

  // initialize a new instance of the filter before each test
  var feedIsFixed;
  beforeEach(inject(function ($filter) {
    feedIsFixed = $filter('feedIsFixed');
  }));
/*
  it('should return the input prefixed with "feedIsFixed filter:"', function () {
    var text = 'angularjs';
  });
*/
});
