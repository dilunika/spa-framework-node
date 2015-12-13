/**
 * Created by dilunika on 24/10/15.
 */

(function () {



    angular.module("spaFramework", ["spaMenu","spaDashboard"]);

})();

(function() {


	angular
		.module('spaFramework')
		.directive('spaUserProfileSmall', spaUserProfileSmall);

	function spaUserProfileSmall() {
		
		return {
			templateUrl: 'modules/framework/userprofile/userprofilesmalltemplate.html'
		};		
	}

})();
(function() {


	angular
		.module('spaFramework')
		.directive('spaUserProfile', spaUserProfile);

	function spaUserProfile() {
		
		return {
			templateUrl: 'modules/framework/userprofile/userprofiletemplate.html',
			controller: 'spaFrameworkController'
		};		
	}

})();
(function() {


	angular
		.module('spaFramework')
		.directive('spaSignIn', spaSignIn);

	spaSignIn.$inject = ['$rootScope'];
	function spaSignIn($rootScope) {
		
		return {
			templateUrl: 'modules/framework/userprofile/signintemplate.html',
			link: link,
			
		};
		
		function link(scope, element, attrs) {
			
			scope.signIn = function(){
				var data = {
					username: scope.username,
					password: scope.password
				};
				$rootScope.$broadcast('spa-menu-signin',data);
			}
		}
	}
	
})();
/**
 * Created by dilunika on 24/10/15.
 */

(function () {



    angular.module("spaMenu", ["ngAnimate"]);

})();
angular.module("spaMenu").run(["$templateCache", function($templateCache) {$templateCache.put("modules/menu/menugrouptemplate.html","<li class=\"spa-selectable-item\" ng-click=\"clicked()\"\n    ng-class=\"{\'spa-menu-item-horizontal\': !isVertical()}\">\n    <div class=\"spa-noselect\">\n        <i class=\"fa {{ icon }} spa-menu-icon\"></i>\n        {{ label }}\n        <i ng-if=\"isVertical()\"\n           class=\"fa fa-chevron-left spa-group-indicator-left\" ng-class=\"{\'fa-rotate-270\' : isOpen}\"></i>\n    </div>\n</li>\n<div ng-show=\"isOpen\" class=\"spa-subitem-selection spa-fade-in-animation\"\n     ng-class=\"{\'spa-popup-menu\': !isVertical()}\">\n    <ul ng-transclude></ul>\n</div>");
$templateCache.put("modules/menu/menuitemtemplate.html","<li class=\"spa-selectable-item\" ng-class=\"{\'spa-menu-item-horizontal\': !isVertical()}\">\n    <div class=\"spa-noselect\">\n        <i class=\"fa {{ icon }} spa-menu-icon\"></i>\n        {{ label }}\n    </div>\n    <i class=\"fa fa-2x fa-caret-left spa-menu-active-indicator\"\n       ng-if=\"isActive() && isVertical()\"></i>\n</li>");
$templateCache.put("modules/menu/menutemplate.html","<div>\n    <ul class=\"spa-menu\" ng-transclude></ul>\n    <a class=\"btn spa-menu-layout-button\" ng-click=\"toggleMenuOrientation()\"\n       ng-show=\"allowHorizontalToggle\"\n       ng-class=\"{\'spa-layout-button-horizontal\': !isVertical}\">\n        <i class=\"fa\"\n           ng-class=\"{\'fa-chevron-up\': isVertical, \'fa-chevron-left\': !isVertical}\"></i>\n    </a>\n</div>");}]);
/**
 * Created by dilunika on 26/10/15.
 */
(function () {



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
/**
 * Created by dilunika on 26/10/15.
 */
(function () {



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
/**
 * Created by dilunika on 26/10/15.
 */
(function () {



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
/**
 * Created by dilunika on 26/10/15.
 */

(function () {



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
angular.module("spaFramework").run(["$templateCache", function($templateCache) {$templateCache.put("modules/framework/frameworktemplate.html","<div class=\"spa-title-bar\">\n    <div class=\"row\">\n        <div class=\"spa-logo-area col-sm-6\">\n            <img class=\"spa-icon\" ng-src=\"{{ iconFile }}\" alt=\"\"/>\n\n            <div class=\"spa-title-area\">\n                <p class=\"spa-logo-title\">{{ title }}</p>\n\n                <p class=\"spa-logo-subtitle\">{{ subtitle }}</p>\n            </div>\n\n            <div ng-if=\"isMenuButtonVisible\" ng-click=\"menuButtonClicked()\" class=\"spa-collapsed-menu pull-right\">\n                <button class=\"btn spa-nav-button\" type=\"button\">\n                    <i class=\"fa fa-bars\"></i>\n                </button>\n            </div>\n\n        </div>\n\n        <div class=\"spa-right-side-controls col-sm-6\">\n            <spa-user-profile-small></spa-user-profile-small>\n        </div>\n    </div>\n</div>\n\n<div class=\"spa-menu-area\"\n     ng-show=\"isMenuVisible\"\n     ng-class=\"{\'spa-menu-area-vertical\': isMenuVertical, \'spa-menu-area-horizontal\': !isMenuVertical}\">\n     \n    <spa-user-profile></spa-user-profile>\n    <div ng-transclude></div>\n</div>\n\n<div class=\"spa-view\" ng-view\n     ng-class=\"{\'spa-view-full-width\': !isMenuVertical || !isMenuVisible}\"></div>");
$templateCache.put("modules/framework/userprofile/signintemplate.html","<div class=\"container\">\n	<div id=\"loginbox\" style=\"margin-top:50px;\" class=\"mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2\">\n		<div class=\"panel panel-info\">\n			<div class=\"panel-heading\">\n				<div class=\"panel-title\">Sign In</div>\n				<div style=\"float:right; font-size: 80%; position: relative; top:-10px\"><a href=\"#\">Forgot password?</a></div>\n			</div>\n\n			<div style=\"padding-top:30px\" class=\"panel-body\">\n\n				<div style=\"display:none\" id=\"login-alert\" class=\"alert alert-danger col-sm-12\"></div>\n\n				<form id=\"loginform\" class=\"form-horizontal\" role=\"form\">\n\n					<div style=\"margin-bottom: 25px\" class=\"input-group\">\n						<span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-user\"></i></span>\n						<input id=\"login-username\" type=\"text\" class=\"form-control\" name=\"username\" value=\"\" placeholder=\"username or email\">\n					</div>\n\n					<div style=\"margin-bottom: 25px\" class=\"input-group\">\n						<span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-lock\"></i></span>\n						<input id=\"login-password\" type=\"password\" class=\"form-control\" name=\"password\" placeholder=\"password\">\n					</div>\n\n					<div class=\"input-group\">\n						<div class=\"checkbox\">\n							<label>\n								<input id=\"login-remember\" type=\"checkbox\" name=\"remember\" value=\"1\"> Remember me\n							</label>\n						</div>\n					</div>\n\n\n					<div style=\"margin-top:10px\" class=\"form-group\">\n						<!-- Button -->\n\n						<div class=\"col-sm-12 controls\">\n							<a id=\"btn-login\" href=\"#\" class=\"btn btn-success\" ng-click=\"signIn()\">Login  </a>\n						</div>\n					</div>\n\n				</form>\n			</div>\n		</div>\n	</div>\n</div>");
$templateCache.put("modules/framework/userprofile/userprofilesmalltemplate.html","<div class=\"spa-user-profile-small pull-right\">\n    <img src=\"images/employee-1.jpeg\" alt=\"user image\" />\n    <span>Kasun Dilunika\n        <!--<div class=\"dropdown\">\n            <button id=\"profile-dropdwn\" class=\"btn btn-default btn-sm dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"false\" aria-expanded=\"false\">\n                <i class=\"fa fa-chevron-down\"></i>\n            </button>\n    \n            <ul class=\"dropdown-menu\" area-labelledby=\"profile-dropdwn\" role=\"menu\">\n                <li><a href=\"#\">Settings <i class=\"fa fa-sign-out pull-right\"></i></a></li>\n                <li class=\"divider\"></li>\n                <li><a href=\"#\">Sign Out <i class=\"fa fa-cog pull-right\"></i></a></li>\n            </ul>\n        </div>-->\n    </span>\n</div>");
$templateCache.put("modules/framework/userprofile/userprofiletemplate.html","<div class=\"spa-user-profile\" ng-if=\"isMenuVertical && !isMenuButtonVisible\">\n    <img src=\"images/employee-1.jpeg\" alt=\"user image\" />\n    <div>\n        <p>Kasun</p>\n        <p>Dilunika</p>\n        <div class=\"dropdown\">\n            <button id=\"profile-dropdwn\" \n                    class=\"btn btn-default btn-sm dropdown-toggle\" \n                    data-toggle=\"dropdown\"\n                    aria-haspopup=\"true\"\n                    aria-expanded=\"true\">\n                <i class=\"fa fa-chevron-down\"></i>\n            </button>\n    \n            <ul class=\"dropdown-menu\" area-labelledby=\"profile-dropdwn\" role=\"menu\">\n                <li><a href=\"#\">Settings <i class=\"fa fa-sign-out pull-right\"></i></a></li>\n                <li class=\"divider\"></li>\n                <li><a href=\"#\" ng-click=\"signOut()\">Sign Out <i class=\"fa fa-cog pull-right\"></i></a></li>\n            </ul>\n        </div>\n    </div>\n</div>");}]);
/**
 * Created by dilunika on 24/10/15.
 */
(function () {



    angular.module("spaFramework").directive("spaFramework", function(){

        return {
            transclude: true,
            scope: {
                title: '@',
                subtitle: '@',
                iconFile: '@'
            },
            templateUrl: "modules/framework/frameworktemplate.html",
            controller: "spaFrameworkController"
        }
    });
})();
/**
 * Created by dilunika on 24/10/15.
 */

(function () {



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
/**
 * Created by dilunika on 24/10/15.
 */

(function () {



    angular.module("spaDashboard", ["gridster","ui.bootstrap"]);

})();
/**
 * Created by dilunika on 14/11/15.
 */
(function () {



    angular.module('spaDashboard').directive('spaWidgetBody',
        ['$compile','$uibModal',
            function ($compile, $uibModal) {

                return {
                    templateUrl: 'modules/dashboard/widgetbodytemplate.html',
                    link: function (scope, element, attrs) {
                        var newElement = angular.element(scope.widget.template);
                        element.append(newElement);
                        $compile(newElement)(scope);

                        scope.close = function(){
                            scope.widgets.splice(scope.widgets.indexOf(scope.widget),1);
                        };

                        scope.settings = function(){

                            var options = {
                                templateUrl: scope.widget.configurations.modalTemplate,
                                controller: scope.widget.configurations.controller,
                                scope: scope
                            }

                            $uibModal.open(options);
                        };

                        scope.iconClicked = function(){
                            // Empty function to fix the mobile hove event on widget icons.
                        };
                    }
                };
            }
        ]);

})();
angular.module("spaDashboard").run(["$templateCache", function($templateCache) {$templateCache.put("modules/dashboard/dashboardtemplate.html","<div class=\"spa-dashboard-header\">\n    {{title}}\n    <div class=\"spa-dashboard-controls\">\n\n        <div class=\"dropdown\">\n            <button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"dropdownMenu1\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">\n                <i class=\"fa fa-plus\"></i>\n                Add Widget\n                <span class=\"caret\"></span>\n            </button>\n            <ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu1\">\n                <li ng-repeat=\"template in widgetDefinetions\">\n                    <a role=\"menuitem\" ng-click=\"addWidget(template)\">{{template.title}}</a>\n                </li>\n            </ul>\n        </div>\n\n    </div>\n</div>\n\n<div gridster=\"gridsterOpts\">\n    <ul>\n        <li gridster-item=\"widget\" ng-repeat=\"widget in widgets\">\n            <spa-widget-body></spa-widget-body>\n        </li>\n    </ul>\n</div>");
$templateCache.put("modules/dashboard/widgetbodytemplate.html","<div class=\"spa-widget-body\">\n\n    <div class=\"spa-widget-menu-area btn-group\">\n        <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">\n            <i class=\"fa fa-bars\" ng-click=\"iconClicked()\"></i>\n        </a>\n\n        <ul class=\"dropdown-menu\" role=\"menu\">\n            <li ng-click=\"close()\"><i class=\"fa fa-2x fa-close\" ng-click=\"iconClicked()\"></i></li>\n            <li ng-click=\"settings()\"><i class=\"fa fa-2x fa-gear\" ng-click=\"iconClicked()\"></i></li>\n        </ul>\n\n    </div>\n</div>");}]);
/**
 * Created by dilunika on 8/11/15.
 */
(function () {



    angular.module("spaDashboard").directive("spaDashboard",

        [
            function(){
                return {
                    templateUrl: "modules/dashboard/dashboardtemplate.html",
                    link: function(scope, element, attr){

                        scope.addWidget = function(template){
                            var newWidget = angular.copy(template.settings);
                            scope.widgets.push(newWidget);
                        };
                    }
                };
            }
        ]);

})();