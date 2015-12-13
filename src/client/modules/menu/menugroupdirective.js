/**
 * Created by dilunika on 26/10/15.
 */
(function () {

    'use strict';

    angular.module("spaMenu").directive("spaMenuGroup", function(){

        return {
            transclude: true,
            scope: {
                label: '@',
                icon: '@'
            },
            require: "^spaMenu",
            templateUrl: "modules/menu/menugrouptemplate.html",
            link: function(scope, el, attr, ctrl){

                scope.isOpen = false;

                scope.closeMenu = function(){
                    scope.isOpen = false;
                };

                scope.clicked = function(){
                    scope.isOpen = !scope.isOpen;
                    if(el.parents('.spa-subitem-selection').length == 0){
                        scope.setSubmenuPosition();
                    }

                    ctrl.setOpenMenuScope(scope);

                };

                scope.isVertical = function(){
                    return ctrl.isVertical() || el.parents('.spa-subitem-selection').length > 0;
                };

                scope.setSubmenuPosition = function(){
                    var pos = el.offset();
                    $('.spa-subitem-selection').css({'left': pos.left + 20, 'top': 36});
                };
            }
        };
    });
})();