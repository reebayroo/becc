(function (ng, window, jQuery) {
	'use strict';

	angular
		.module('ExchangeApp')
		.controller('BECCController', [
			'$scope',
			'$rootScope',
			'$timeout',
			'$log',
			'PortfolioService',
			'AccountService',
			'RestService',
			BECCController
		]);

	function BECCController($scope, $rootScope, $timeout, $log, PortfolioService, AccountService, RestService) {

		// Model
		$scope.errorMessage = undefined;
		$scope.symbol = undefined;
		$scope.portfolio = undefined;
		$scope.stockInfo = undefined;
		$scope.transactionInfo = {
			quantity: undefined
		};

		// Events
		$scope.search = search;
		$scope.clearErrorMessage = clearErrorMessage;
		$scope.hasStockInfo = hasStockInfo;
		$scope.buy = buy;
		$scope.sell = sell;
		$scope.select = select;
		$scope.activeItem = activeItem;
		$scope.invalidTransaction = invalidTransaction;

		refreshModel();

		function refreshModel() {
			$scope.portfolio = AccountService.load();
		}

		function hasStockInfo() {
			return !!$scope.stockInfo;
		}

		function search() {
			doSearch($scope.symbol);
		}

		function select(item) {
			doSearch(item.symbol);
		}

		function doSearch(symbol) {
			$scope.stockInfo = null;
			RestService.search(symbol.toUpperCase())
				.then(function (stockInfo) {
					clearErrorMessage();
					$scope.stockInfo = stockInfo;
				}, handleError);

		}

		function handleError(message) {
			$scope.errorMessage = message;
		}

		function clearErrorMessage() {
			$scope.errorMessage = null;
		}

		function invalidTransaction(formTransaction) {
			return formTransaction.$invalid || $scope.transactionInfo.quantity < 1;
		}

		function buy() {
			var info = {
				symbol: $scope.stockInfo.symbol,
				name: $scope.stockInfo.name,
				pricePaid: $scope.stockInfo.askPrice,
				quantity: $scope.transactionInfo.quantity
			};
			execute(function () {
				PortfolioService.buy(info, $scope.portfolio);
				AccountService.save($scope.portfolio);
			});
		}

		function activeItem(symbol) {
			return $scope.stockInfo && $scope.stockInfo.symbol === symbol;
		}

		function sell() {
			var sellInfo = {
				symbol: $scope.stockInfo.symbol,
				bidPrice: $scope.stockInfo.bidPrice,
				quantity: $scope.transactionInfo.quantity
			};
			execute(function () {
				PortfolioService.sell(sellInfo, $scope.portfolio);
				AccountService.save($scope.portfolio);
			});
		}

		function execute(f) {
			try {
				clearErrorMessage();
				f.apply();
			} catch (err) {
				handleError(err.message);
			}
		}
	}
})(angular, window, jQuery);