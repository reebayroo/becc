(function (ng, window, jQuery) {
	'use strict';

	angular
		.module('ExchangeApp')
		.controller('BECCController', [
			'$scope',
			'$rootScope',
			'$timeout',
			'$log',
			BECCController
		]);

	function BECCController($scope, $rootScope, $timeout, $log) {
		var something;
		$log.info("We're in");
	}
})(angular, window, jQuery);