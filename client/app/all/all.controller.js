'use strict';

angular.module('proyecto1App')
    .controller('AllCtrl', function ($scope, $http, socket, Auth, alertasService) {

        //servicio de alertas
        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts = alertasService.removeAlert(index);
        };






        $scope.listAll = [];
        $scope.isLoggedIn = Auth.isLoggedIn;

        $http.get('/api/alls').success(function (data) {
            for (var i = 0; i < data.length; i++) {
                data[i].description[0] = data[i].description[0].substring(data[i].description[0].indexOf('src') + 'src="'.length, data[i].description[0].substring(data[i].description[0].indexOf('src') + 'src="'.length).indexOf('"') + 10);
            }
            $scope.listAll = data;
        }).error(function ( /*data, status, headers, config*/ ) {

        });

        $scope.addThing = function (item) {
            //ponemos una notificacion
            $scope.alerts = alertasService.addAlert(item.title[0], 'success');

            $http.post('/api/feeds', item);
        };
    })

.controller('AlertDemoCtrl', function ($scope, $timeout) {
        $scope.alerts = []


    })
    .controller('CarouselDemoCtrl', function ($scope, $http) {
        //ultimos añadidos

        var slides = $scope.slides = [];
        $http.get('/api/rssFeeds/1').success(function (data) {

            $scope.rssAnyadidos = data;
            data.forEach(function (image) {
                var newWidth = 1000 + slides.length + 1;
                slides.push({
                    image: image.description=!null && image.description!=''?image.description:"http://kastatic.com/images/logo/kat-logo-1x-5de70ac.png" ,
                    text: image.title
                });
            });

        }).error(function ( /*data, status, headers, config*/ ) {

        });
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;

        /*$scope.addSlide = function () {
                /*var newWidth = 1000 + slides.length + 1;
                slides.push({
                    image: '//',
                    text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' + ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
                });
*/
/*
        };
        for (var i = 0; i < 4; i++) {
            $scope.addSlide();
        }*/
    });