'use strict';

angular.module('proyecto1App')
    .filter('feedIsFixed', function () {
        return function (itemArray) {
            var array = [];

            itemArray.forEach(function (item) {
                if (item.fixed === null || item.fixed === false) {
                    array.push(item);
                }
            });
            return array;
        };
    }).filter('tagsInName', function () {
        return function (str) {
            //\u00F1 -> es para la ñ!
            var strArray = str.match(/\[[\u00F1A-Za-z0-9 ._]*\]/g);
            var concatStr = '';
            
            console.log('ARRAY-->'+strArray);
            
            if (strArray !== null && strArray.length > 0) {
                strArray.forEach(function (item) {
                    if(item.indexOf('Castellano')<=0 && item.indexOf('Cap')<=0)
                    {
                        concatStr += item;
                    }
                    
                });
                
                return concatStr;
            } else {
                strArray.push(str);
                strArray.forEach(function (item) {
                    concatStr += item;
                });
                
                return concatStr;
            }
             
        };
           
    }).filter('tagsInNameCap', function () {
        return function (str) {
            //solo para los capitulos
            var strArray = str.match(/\[[Cap]+[A-Za-z0-9 ._]*\]/g);
            var concatStr = '';
            
            console.log('ARRAY-->'+strArray);
            
            if (strArray !== null && strArray.length > 0) {
                strArray.forEach(function (item) {
                    concatStr += item;
                });
                
                return concatStr;
            } else {
                strArray.push(str);
                strArray.forEach(function (item) {
                    concatStr += item;
                });
                
                return concatStr;
            }
             
        };
           
    });