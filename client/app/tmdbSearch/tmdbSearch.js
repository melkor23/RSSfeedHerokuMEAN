'use strict';

angular.module('proyecto1App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tmdbSearch', {
        url: '/tmdbSearch',
        templateUrl: 'app/tmdbSearch/tmdbSearch.html',
        controller: 'TmdbSearchCtrl'
      });
  });
