'use strict';

angular.module('proyecto1App')
  .filter('specialCharacters', function () {
    return function (word) {
       return word.replace('&Ntilde;', 'Ñ').replace('&ntilde;', 'ñ');
    };
  });

