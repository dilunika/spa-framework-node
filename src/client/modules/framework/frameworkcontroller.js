/**
 * Created by dilunika on 24/10/15.
 */

(function () {

    'use strict';

    angular.module("spaFramework").controller("spaFrameworkController",
        ['$scope','$window','$timeout','$rootScope','$location',
            function($scope, $window, $timeout, $rootScope, $location){

                $scope.isMenuButtonVisible = true;
                $scope.isMenuVisible = true;
                $scope.isMenuVertical = true;

                $scope.$on('spa-menu-item-selected-event', function(event, data){
                    console.log("Routing Event -> " + JSON.stringify(data));
                    $location.path(data.route);
                    checkWidth();
                    broadcastMenuState();
                });

                $scope.$on('spa-menu-orientation-changed-event', function(event, data){
                    $scope.isMenuVertical = data.isMenuVertical;
                });

                $($window).on("resize.spaFramework", function(){
                    $scope.$apply(function (){
                        checkWidth();
                        broadcastMenuState();
                    });
                });

                $scope.$on("$destroy", function(){
                    $($window).off("resize.spaFramework");
                });

                $scope.menuButtonClicked = function(){

                    $scope.isMenuVisible = !$scope.isMenuVisible;
                    broadcastMenuState();
                    //$scope.$apply();
                };


                var checkWidth = function () {
                    var width = Math.max($($window).width(), $window.innerWidth);
                    $scope.isMenuVisible = (width >= 768);
                    $scope.isMenuButtonVisible = !$scope.isMenuVisible;
                };

                var broadcastMenuState = function(){
                    $rootScope.$broadcast('spa-menu-show',
                                            {
                                                show: $scope.isMenuVisible,
                                                isVertical: $scope.isMenuVertical,
                                                allowHorizontalToggle: !$scope.isMenuButtonVisible
                                            });
                };
                
                $scope.signOut = function(){
                    
                    $rootScope.$broadcast('spa-menu-signout',{signOut: true});
                };

                $timeout(function () {
                    checkWidth();
                }, 0);

            }
        ]);

})();