(function (ng) {
    'use strict';

    angular
        .module('ExchangeApp')
        .factory('RestService', [
            '$http',
            '$q',
            RestService
        ]);

    function RestService($http, $q, $timeout) {
        return {
            search: search,
        };

        function search(searchParam) {
            var deferred = $q.defer();
            $http(request("/search?symbol={0}".format(searchParam)))
                .success(function (data) {
                    deferred.resolve(adaptor(data));
                })
                .catch(function (error) {
                    deferred.reject(error.data.error);
                });
            return deferred.promise;

            function request(url){
                return  {
                    method: "GET",
                    url: url,
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
            }
            function adaptor(symbol) {
                 symbol.symbol = symbol.Symbol;
                 symbol.name = symbol.Name;
                 symbol.open = symbol.Open;
                 symbol.high = symbol.High;
                 symbol.low = symbol.Low;
                 symbol.bidPrice = symbol.BidPrice;
                 symbol.askPrice = symbol.AskPrice;
                 symbol.askSize = symbol.AskSize;
                 symbol.bidSize = symbol.BidSize;
                 return symbol;
             }
        }
    }
})(angular);