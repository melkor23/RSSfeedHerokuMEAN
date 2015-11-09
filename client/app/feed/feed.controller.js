'use strict';

angular.module('proyecto1App')
    .controller('FeedCtrl', function ($scope, $http, socket, Auth, $modal, $log) {
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

        $scope.deleteThing = function ($event) {
              
            console.log($event._id);
            $http.delete('/api/feeds/' + $event._id);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('feed');
        });


        //metodos para abrir modal
        $scope.animationsEnabled = true;

        $scope.open = function (thing) {

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


    }).controller('ModalDemoCtrl', function ($scope, $modal, $log) {

        // $scope.items = ['item1', 'item2', 'item3'];

        $scope.animationsEnabled = true;

        $scope.open = function (size) {

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
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

    }).controller('ModalInstanceCtrl', function ($scope, $http, $modalInstance, items) {

        $scope.seleccionActual = items;
        //$scope.items = items;
        $scope.selected = {
            item: items
                //item: $scope.items[0]
        };

        $scope.ok = function () {
            //$modalInstance.close($scope.selected.item);
            $http.put('/api/feeds/' + items._id, items).success(function (/*data , status, headers*/) {
                console.log('Cambiado Correctamente!!!!!');
                $modalInstance.dismiss('cancel');
            }); // echo the result back
            
        };



        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });