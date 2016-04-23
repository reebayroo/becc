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

            addOrCreate(stockInfo, portfolio)

            portfolio.availableCash -= (stockInfo.quantity * stockInfo.pricePaid);
        }

        function addOrCreate(stockInfo, portfolio) {
            var current = _.find(portfolio.stocks, {
                symbol: stockInfo.symbol
            });
            if (!current) {
                portfolio.stocks.push(stockInfo);
            } else {
                current.pricePaid = stockInfo.pricePaid
                current.quantity += stockInfo.quantity;
            }

        }

        function validate(value, message) {
            if (!value) throw new message;
        }
    }
})();