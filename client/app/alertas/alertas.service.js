'use strict';

angular.module('proyecto1App')
    .factory('alertasService', function ($timeout) {
        // Service logic
        // ...

        var alerts = [{}];

        // Public API here
        return {
            addAlert: function (msg, type) {
                alerts.push({
                    type: type,
                    msg: msg
                });

                $timeout(function () {
                    alerts.splice(alerts.length - 1, 1);
                }, 4000);

                return alerts;
            },
            removeAlert: function (index) {
                $scope.alerts.splice(index, 1);
                return alerts;
            }
        };
    });