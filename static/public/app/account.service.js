(function () {
    'use strict';

    angular
        .module('ExchangeApp')
        .factory('AccountService', [
            '$localStorage',
            AccountService
        ]);

    function AccountService($localStorage) {
        return {
            load: load,
            save: save
        };

        function load() {
            var portfolio = $localStorage.portfolio;
            if (!portfolio) {
                return {
                    availableCash: 100.00 * 1000.00,
                    stocks: []
                };
            }
            return portfolio;
        }

        function save(portfolio) {
            $localStorage.portfolio = portfolio;
        }
    }
})();