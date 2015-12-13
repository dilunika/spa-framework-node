/**
 * Created by dilunika on 14/11/15.
 */
(function () {

    'use strict';

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