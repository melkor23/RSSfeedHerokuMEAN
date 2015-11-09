'use strict';

angular.module('proyecto1App')
    .directive('tmdb', function () {
        return {
            templateUrl: 'app/tmdb/tmdb.html',
            restrict: 'E',
            scope: {
                title: '@',
                datos: '='
            }

        };
    }).controller('tmdbCtrl', function ($scope, $http/*, socket, Auth, $modal, $log*/) {

        //$scope.str = '-------------------------------------------------------------';
        //    console.log('title-->' + $scope.title);


        $scope.videoVisible = false;

        $scope.toggleVideoVisible = function (index) {
            $scope.datos[index].videoVisible = !$scope.datos[index].videoVisible;

            $scope.trailers = '';
            if ($scope.datos[index].videoVisible) {
                $http.get('http://localhost:9000/api/tmdbs/videos?id=' + $scope.datos[index].id).then(function (data) {


                        $scope.datos[index].trailers = data.data.results;
                        console.log('trailes---->' + data);
                    }

                );
            }
        };

        $scope.datos = '';
        $scope.valoracion = 0;
        $scope.title = 'Jurassic Park';
        $http.get('/api/tmdbs?filter=' + $scope.title).then(
            function (data) {
                console.log(data);
                $scope.datos = data.data[0].results;
                $scope.valoracion = data.data[0].results[0].vote_average; //lo pasamos a 5 estrellas
                //console.log('Valor de la peli:'+  $scope.valoracion);
            }
        );
        /*$scope.search = function () {
            $http.get('/api/tmdbs?filter=' + $scope.title).then(
                function (data) {
                    $scope.datos = data.data[0].results;
                    $scope.valoracion = data.data[0].results[0].vote_average; //lo pasamos a 5 estrellas
                    //console.log('Valor de la peli:'+  $scope.valoracion);
                }
            );
        }*/

        $scope.pruebaBoton = function () {
            console.log('El boton funciona!!!!');

            $http.get('/api/tmdbs?filter=' + $scope.title).then(
                function (data) {
                    console.log(data);
                    $scope.datos = data.data[0].results;
                    $scope.valoracion = data.data[0].results[0].vote_average; //lo pasamos a 5 estrellas
                    //console.log('Valor de la peli:'+  $scope.valoracion);
                }

            );
        };

        $scope.getImgPath = function (id) {
            //console.log(id);
            return 'https://image.tmdb.org/t/p/w185' + id;
        };
    });