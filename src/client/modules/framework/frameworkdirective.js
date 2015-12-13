/**
 * Created by dilunika on 24/10/15.
 */
(function () {

    'use strict';

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