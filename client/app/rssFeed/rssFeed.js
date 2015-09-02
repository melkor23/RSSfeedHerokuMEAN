'use strict';

angular.module('proyecto1App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('rssFeed', {
        url: '/rssFeed',
        templateUrl: 'app/rssFeed/rssFeed.html',
        controller: 'RssFeedCtrl'
      });
  });