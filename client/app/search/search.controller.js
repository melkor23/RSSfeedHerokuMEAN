'use strict';

angular.module('proyecto1App')
    .controller('SearchCtrl', function ($scope, $http, $timeout, $sce, $modal, $log) {
        $scope.searchWord = '';
        $scope.searchList = '';
        $scope.resultCount = 0;

        $scope.anyadido = false;
        $scope.busquedaActiva = false;


        $scope.searchClick = function () {
            //alert('Palabra buscada: ' + $scope.searchWord);
            $scope.busquedaActiva = true;

            var req = {
                method: 'GET',
                url: '/api/searchs?search=' + $scope.searchWord + '&page=1'
            };

            $http(req).success(function (data) {
                $scope.searchList = JSON.parse(data);
                $scope.busquedaActiva = false;
                $scope.totalPaginas = $scope.searchList.total_results / $scope.searchList.list.length;
                //console.log('items por pag:' + $scope.searchList.list.length + ' Total items:' + $scope.searchList.total_results + " numero de paginas:" + $scope.totalPaginas);

                //paginas
                $scope.totalItems = $scope.searchList.total_results;
                $scope.currentPage = $scope.searchList.list.length;

                $scope.maxSize = 10;
                $scope.bigTotalItems = 175;
                $scope.bigCurrentPage = 1;

            }).error(function () {
                $scope.busquedaActiva = false;
            });


            $scope.setPage = function (pageNo) {
                $scope.currentPage = pageNo;
                //console.log('Pagina numero!' + page);
            };

            $scope.pageChanged = function (page) {
                $scope.searchList = '';
                console.log('Pagina numero!' + page);

                $scope.busquedaActiva = true;

                var req = {
                    method: 'GET',
                    url: '/api/searchs?search=' + $scope.searchWord + '&page=' + page
                };

                $http(req).success(function (data) {
                    console.log('Actualizado!!' + req.url);
                    $scope.searchList = JSON.parse(data);
                    $scope.busquedaActiva = false;
                });

            };




        };


        $scope.open = function (thing) {
            console.log('Abrir modal');
            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalAddMagnetCtrl',
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

        $scope.SkipValidation = function () {
            return $sce.trustAsHtml($scope.searchList);
        };

        $scope.AddTorrent = function (titulo, link, htmlLink) {
            $scope.anyadido = true;

            var nuevoObjeto = {
                "title": titulo,
                "link": link,
                "fixed": true,
                "description": "",
                "author": "Admin",
                "pubDate": ""
            }

            console.log('ItemNuevo--->' + nuevoObjeto);
            var req = {
                method: 'POST',
                url: '/api/feeds',
                data: nuevoObjeto,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            $http(req).success(function (data) {
                console.log(data);
            });
        };
 }).controller('ModalAddMagnetCtrl', function ($scope, $http, $modalInstance, items) {

        $scope.seleccionActual = items;
        //$scope.items = items;
        $scope.selected = {
            item: items
                //item: $scope.items[0]
        };

        $scope.ok = function () {
            //$modalInstance.close($scope.selected.item);
            $http.put('/api/feeds/' + items._id, items).success(function (data, status, headers) {
                console.log('Cambiado Correctamente!!!!!')
                $modalInstance.dismiss('cancel');
            }); // echo the result back
            
        };



        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });

