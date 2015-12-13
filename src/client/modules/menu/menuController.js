/**
 * Created by dilunika on 26/10/15.
 */

(function () {

    'use strict';

    angular.module("spaMenu").controller("spaMenuController",
        ['$scope','$rootScope',
            function($scope, $rootScope){

                $scope.showMenu = true;
                $scope.isVertical = true;
                $scope.openMenuScope = null;
                $scope.allowHorizontalToggle = true;

                this.setActiveElement = function(element){
                    $scope.activeElement = element;
                };

                this.getActiveElement = function(){
                    return $scope.activeElement;
                };

                this.setRoute = function(route){
                    $rootScope.$broadcast('spa-menu-item-selected-event', {route: route});
                };

                this.isVertical = function(){
                    return $scope.isVertical;
                };

                this.setOpenMenuScope = function(scope) {
                  $scope.openMenuScope = scope;
                };

                $scope.$on("spa-menu-show", function(event, data){
                    $scope.showMenu = data.show;
                    $scope.isVertical = data.isVertical;
                    $scope.allowHorizontalToggle = data.allowHorizontalToggle;
                });

                $scope.toggleMenuOrientation = function(){
                    $scope.isVertical = !$scope.isVertical;
                    $rootScope.$broadcast('spa-menu-orientation-changed-event',{isMenuVertical: $scope.isVertical});

                    if($scope.openMenuScope){
                        $scope.openMenuScope.closeMenu();
                    }
                };

                angular.element(document).bind('click', function(e){
                    if($scope.openMenuScope && !$scope.isVertical){
                        if($(e.target).parent().hasClass('spa-selectable-item')){
                            return;
                        }

                        $scope.$apply(function(){
                            $scope.openMenuScope.closeMenu();
                        });

                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
            }
        ]);

})();