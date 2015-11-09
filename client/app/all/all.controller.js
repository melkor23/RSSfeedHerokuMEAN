'use strict';

angular.module('proyecto1App')
    .controller('AllCtrl', function ($scope, $http, socket, Auth /*, alertasService*/ , $modal, $log, notify) {


        $scope.orderByDate = function (item) {
            var fechaAct = new Date(item.pubDate);

            return fechaAct;
        };

        //servicio de alertas
        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            /*$scope.alerts = alertasService.removeAlert(index);*/
        };

        $scope.listAll = [];
        $scope.listInfiniteScroll = [];
        $scope.isLoggedIn = Auth.isLoggedIn;

        $scope.myPromise = $http.get('/api/alls').success(function (data) {
            for (var i = 0; i < data.length; i++) {
                data[i].description[0] = data[i].description[0].substring(data[i].description[0].indexOf('src') + 'src="'.length, data[i].description[0].substring(data[i].description[0].indexOf('src') + 'src="'.length).indexOf('"') + 10);


                //infinite scroll
                if (i < 100) {
                    $scope.listInfiniteScroll.push(data[i]);
                    console.log(i + ' Add-->' + data[i].pubDate)
                }
            }
            data.sort(function (a, b) {
                a = new Date(a.datePub);
                b = new Date(b.datePub);
                return a > b ? -1 : a < b ? 1 : 0;
            });
            $scope.listAll = data.sort();

        }).error(function ( /*data, status, headers, config*/ ) {

        });

        $scope.addThing = function (item) {
            $http.post('/api/feeds', item).then(function ( /*response*/ ) {
                notify({
                    message: item.title + ' añadido correctamente!!!!',
                    classes: 'alert-success'
                });
            }, function ( /*response*/ ) {
                notify({
                    message: 'Ocurrio un error al intentar guardarlo!!',
                    classes: 'alert-danger'
                });
            });
        };
        //para aumentar el infinite Scroll

        $scope.loadMore = function () {
            var aumentar = 5;
            //console.log('Infinite lenght==>' + $scope.listInfiniteScroll.length);
            var last = $scope.listInfiniteScroll.length - 1 > 0 ? $scope.listInfiniteScroll.length - 1 : 0;
            //console.log('Last First Value==>' + last);
            if ($scope.listAll.length !== 0 && last <= $scope.listAll.length) {

                //console.log('Last Before change Value==>' + last);
                last = last + aumentar > $scope.listAll.length ? $scope.listAll.length : last + aumentar;
                //console.log('Istrue?->' + (last + aumentar > $scope.listAll.length ? true : false) + ' Last value-->' + last);
                for (var i = $scope.listInfiniteScroll.length; i < last; i++) {
                    $scope.listInfiniteScroll.push($scope.listAll[i]);
                    //console.log(i + ' AddMOOORRE-->' + $scope.listAll[i]);
                    //console.log('Infinite lenght LAST==>' + $scope.listInfiniteScroll.length);
                }
            }
        }



        //metodos para abrir modal
        $scope.animationsEnabled = true;

        $scope.open = function (thing) {
            console.log(thing);
            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    items: function () {
                        return thing;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };

    })

.controller('AlertDemoCtrl', function ($scope /*, $timeout*/ ) {
        $scope.alerts = [];


    })
    .controller('CarouselDemoCtrl', function ($scope, $http) {
        //ultimos añadidos

        var slides = $scope.slides = [];
        $http.get('/api/rssFeeds/1').success(function (data) {

            $scope.rssAnyadidos = data;
            data.forEach(function (image) {
                /*var newWidth = 1000 + slides.length + 1;*/
                slides.push({
                    image: image.description = !null && image.description !== '' ? image.description : 'http://kastatic.com/images/logo/kat-logo-1x-5de70ac.png',
                    text: image.title
                });
            });

        }).error(function ( /*data, status, headers, config*/ ) {

        });
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;

    }).controller('DemoController', function ($scope) {
        $scope.images = [1, 2, 3, 4, 5, 6, 7, 8];

        $scope.loadMore = function () {
            var last = $scope.images[$scope.images.length - 1];
            for (var i = 1; i <= 8; i++) {
                $scope.images.push(last + i);
            }
        };
    });