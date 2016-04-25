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
            validate(stockInfo, "stockInfo is required");
            validate(portfolio, "portfolio is required");
            validate(portfolio.stocks, "portfolio.stocks is required");
            validate(stockInfo.quantity, "stockInfo.quantity is required");
            validate(stockInfo.pricePaid, "stockInfo.pricePaid is required");

            addOrCreate(stockInfo, portfolio);
            var remainingCash = (stockInfo.quantity * stockInfo.pricePaid);
            validate(portfolio.availableCash > remainingCash, "Not enough cash");
            portfolio.availableCash -= remainingCash;
        }

        function sell(sellInfo, portfolio) {
            validate(sellInfo, "sellInfo");
            validate(sellInfo.bidPrice, "sellInfo.bidPrice");
            validate(sellInfo.quantity, "sellInfo.quantity");
            validate(portfolio, "portfolio");
            validate(portfolio.stocks, "portfolio.stocks");

            var current = find(sellInfo.symbol, portfolio);
            validate(current, "{0} is not in portfolio", sellInfo.symbol);
            validate(current.quantity >= sellInfo.quantity, "Portfolio does not have required quantity");
            current.quantity -= sellInfo.quantity;
            portfolio.availableCash += (sellInfo.bidPrice * sellInfo.quantity);
            if (current.quantity < 1) {
                _.pull(portfolio.stocks, current);
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
                current.pricePaid = stockInfo.pricePaid;
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