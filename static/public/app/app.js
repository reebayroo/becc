(function (angular) {
	'use strict';

	/**
	 * App Definition & Module Includes
	 */
	angular
		.module('ExchangeApp', [])
		.run([
			'$rootScope',
			'$location',
			'$window',
			'$http',
			onRun
		]);

	function onRun($rootScope, $location, $window, $http) {
		$rootScope.$on('$stateChangeSuccess',
			function (event) {
				if (!$window.ga)
					return;
				$window.ga('send', 'pageview', {
					page: $location.path()
				});
			});
	}

	/**
	 * Configuration goes in public/app/config/
	 */
})(angular);