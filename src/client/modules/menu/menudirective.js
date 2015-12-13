/**
 * Created by dilunika on 26/10/15.
 */
(function () {

    'use strict';

    angular.module("spaMenu").directive("spaMenu", ['$timeout',function($timeout){

        return {
            scope: {

            },
            transclude: true,
            templateUrl: "modules/menu/menutemplate.html",
            controller: "spaMenuController",
            link: function(scope, el, attr){

                var item = el.find('.spa-selectable-item:first');
                $timeout(function(){
                    item.trigger('click');
                });
            }
        };
    }]);
})();