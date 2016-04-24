(function () {
    'use strict';

    angular
        .module('ExchangeApp')
        .factory('PortfolioService', [
            Portfolio
        ]);

    function Portfolio() {
        return {
            buy: buy,
            sell: sell
        };

        function buy(stockInfo, portfolio) {
            validate(stockInfo, "stockInfo");
            validate(portfolio, "portfolio");
            validate(portfolio.stocks, "portfolio.stocks");

            addOrCreate(stockInfo, portfolio)

            portfolio.availableCash -= (stockInfo.quantity * stockInfo.pricePaid);
        }

        function sell(sellInfo, portfolio) {
            validate(sellInfo, "sellInfo");
            validate(portfolio, "portfolio");
            validate(portfolio.stocks, "portfolio.stocks");

            var current = find(sellInfo.symbol, portfolio);
            validate(current, "{0} is not in portfolio", sellInfo.symbol);
            validate(current.quantity >= sellInfo.quantity, "Portfolio does not have required quantity");
            current.quantity -= sellInfo.quantity;
            portfolio.availableCash += (sellInfo.bidPrice * sellInfo.quantity);
            if (current.quantity < 1) {
                _.pull(portfolio.stocks, current)
            }

        }

        function find(stockSymbol, portfolio) {
            return _.find(portfolio.stocks, {
                symbol: stockSymbol
            });

        }

        function addOrCreate(stockInfo, portfolio) {

            var current = find(stockInfo.symbol, portfolio);
            if (!current) {
                portfolio.stocks.push(stockInfo);
            } else {
                current.pricePaid = stockInfo.pricePaid
                current.quantity += stockInfo.quantity;
            }

        }

        function validate(value) {
            if (!value) {
                var args = _.rest(arguments);
                var message = _.first(args);
                var messageArgs = _.rest(args);
                var finalMessage = message.format(messageArgs);
                throw new Error(finalMessage);
            }
        }
    }
})();