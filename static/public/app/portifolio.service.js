(function () {
    'use strict';

    angular
        .module('ExchangeApp')
        .factory('PortfolioService', [
            Portfolio
        ]);

    function Portfolio(rest) {
        return {
            buy: buy
        };

        function buy(stockInfo, portfolio) {
            validate(stockInfo, "stockInfo");
            validate(portfolio, "portfolio");
            validate(portfolio.stocks, "portfolio.stocks");
            portfolio.stocks.push(stockInfo);

            portfolio.availableCash -= (stockInfo.quantity * stockInfo.pricePaid);
        }

        function addToCurrent(stockInfo, portfolio) {
            //var current = _.find(portfolio.stocks, { symbol : item.symbol });

        }

        function validate(value, message) {
            if (!value) throw new message;
        }
    }
})();