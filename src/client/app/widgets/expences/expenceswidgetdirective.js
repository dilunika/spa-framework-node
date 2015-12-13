/**
 * Created by dilunika on 15/11/15.
 */
(function () {

    'use strict';

    angular.module('app').directive('kaExpenses',
        ['dataService',
            function (dataService) {

                return {
                    templateUrl: "app/widgets/expences/expenceswidgettemplate.html",
                    link: function (scope, el, attrs) {

                        scope.expenses = [
                            {date:"12-11-2015", payee:"New World", amount: 14.50},
                            {date:"12-11-2015", payee:"Briscos", amount: 114.50},
                            {date:"13-11-2015", payee:"Dominos", amount: 24.99},
                            {date:"16-11-2015", payee:"Metlink", amount: 10.50},
                            {date:"19-11-2015", payee:"New World", amount: 4.20}
                        ];
                    }
                };
            }
        ]);

})();