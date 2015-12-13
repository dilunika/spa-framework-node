/**
 * Created by dilunika on 10/11/15.
 */
(function () {

    'use strict';

    angular.module("app").directive("kaTemperature",
        ['dataService',
            function(dataService){

                return {
                    templateUrl: 'app/widgets/kaTemperature/kaTemperatureTemplate.html',

                    link: function(scope, el, attrs){

                        scope.isLoaded = false;

                        dataService.getLocation(scope.widget.configurations.id)
                            .then(function(data){
                                scope.selectedLocation = data;
                                scope.isLoaded = true;
                            });
                    }
                };
            }
        ]);
})();