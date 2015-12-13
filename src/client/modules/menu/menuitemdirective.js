/**
 * Created by dilunika on 26/10/15.
 */
(function () {

    'use strict';

    angular.module("spaMenu").directive("spaMenuItem", function(){

        return {
            scope: {
                label: '@',
                icon: '@',
                route: '@'
            },
            require: "^spaMenu",
            templateUrl: "modules/menu/menuitemtemplate.html",
            link: function(scope, el, att, ctrl){

                scope.isActive = function(){
                    return el == ctrl.getActiveElement();
                };

                scope.isVertical = function(){
                    return ctrl.isVertical() || el.parents('.spa-subitem-selection').length > 0;
                };

                el.on('click', function(evt){
                    evt.stopPropagation();
                    evt.preventDefault();
                    scope.$apply(function(){
                        ctrl.setActiveElement(el);
                        ctrl.setRoute(scope.route);
                    });
                });
            }
        };
    });
})();