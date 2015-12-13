/**
 * Created by dilunika on 8/11/15.
 */
(function () {

    'use strict';

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