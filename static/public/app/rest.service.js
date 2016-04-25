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

            var url = "//data.benzinga.com/rest/richquoteDelayed?symbols={0}&callback=JSON_CALLBACK".format(searchParam);
            $http.jsonp(url)
                .success(function (data) {
                    console.log(data);
                    var value = data[searchParam];
                    if (value) {
                        deferred.resolve(value);
                    } else {
                        deferred.reject("Unknown Symbol: {0}".format(searchParam));
                    }
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

    }
})(angular);