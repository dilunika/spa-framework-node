/**
 * Created by dilunika on 4/11/15.
 */
(function () {

    'use strict';

    angular.module('app').directive('kaDashboard',
        ['$localStorage',
            function($localStorage){

                return {
                    scope: {},
                    template: "<spa-dashboard></spa-dashboard>",
                    link: function (scope){

                        scope.title = "First Dashboard";

                        scope.gridsterOpts = {
                            columns: 12,
                            margins: [20, 20],
                            outerMargin: false,
                            pushing: true,
                            floating: true,
                            swapping: true
                        };

                        scope.widgetDefinetions = [
                            {
                                title: 'Temperature',
                                settings: {
                                    sizeX: 3,
                                    sizeY: 3,
                                    minSizeX: 2,
                                    minSizeY: 2,
                                    template: '<ka-temperature></ka-temperature>',
                                    configurations: {
                                        id: 1000,
                                        modalTemplate: 'app/dialogs/temperaturewidgetsettings.html',
                                        controller: 'temperatureWidgetSettingsController'
                                    }
                                }
                            },
                            {
                                title: 'Expenses',
                                settings: {
                                    sizeX: 6,
                                    sizeY: 4,
                                    minSizeX: 2,
                                    minSizeY: 2,
                                    template: '<ka-expenses></ka-expenses>',
                                    configurations: {
                                        id: 1002,
                                        modalTemplate: 'app/dialogs/expenseswidgetsettings.html',
                                        controller: 'expensesWidgetSettingsController'
                                    }
                                }
                            }
                        ];

                        scope.widgets = $localStorage.widgets || [];

                        scope.$watch('widgets',function(){

                            $localStorage.widgets = scope.widgets;
                        });

                    }
                }
            }
        ]
    );

})();