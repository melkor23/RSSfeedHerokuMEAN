'use strict';

angular.module('proyecto1App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('all', {
        url: '/all',
        templateUrl: 'app/all/all.html',
        controller: 'AllCtrl'
      });
  });