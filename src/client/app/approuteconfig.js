/**
 * Created by dilunika on 4/11/15.
 */

(function () {

    'use strict';

    angular.module('app').config(['$routeProvider',function($routeProvider){

        var routes = [
            {
                url: '/dashboard',
                config: {
                    template: '<ka-dashboard></ka-dashboard>'
                }
            },
            {
                url: '/locations',
                config: {
                    template: '<ka-locations></ka-locations>'
                }
            },
            {
                url: '/guides',
                config: {
                    template: '<ka-guides></ka-guides>'
                }
            }
        ];

        routes.forEach(function(route){
            $routeProvider.when(route.url, route.config);
        });

        $routeProvider.otherwise({redirectTo: '/dashboard'});
    }]);

})();