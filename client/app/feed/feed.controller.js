'use strict';

angular.module('proyecto1App')
.controller('FeedCtrl', function ($scope, $http, socket, Auth) {
        $scope.feedlist = [];
        $scope.isLoggedIn = Auth.isLoggedIn;

        $http.get('/api/feeds').success(function (feedlist) {
            $scope.feedlist = feedlist;
            socket.syncUpdates('feed', $scope.feedlist);
        });

        /*
            $scope.addThing = function () {
                if ($scope.newThing === '') {
                    return;
                }
                $http.post('/api/things', {
                    name: $scope.newThing
                });
                $scope.newThing = '';
            };*/

        $scope.deleteThing = function (thing) {
            console.log(thing._id);
            $http.delete('/api/feeds/' + thing._id);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('feed');
        });
    });
