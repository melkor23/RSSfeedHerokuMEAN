'use strict';

angular.module('proyecto1App')
/*  .filter('shortTitle', function () {
    return function (input) {
      return 'shortTitle filter: ' + input;
    };
  });*/
.filter('shortTitle', function () {
    return function (title) {
      return title.length > 20 ? title.substring(0, 40) + ' ...' : title;
    };
  });
