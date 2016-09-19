(function() {
	'use strict';

	angular.module("wtd")
		.controller("PeriodController", PeriodController);
	
	PeriodController.$inject = ['$scope', 'loggerService'];
	function PeriodController(scope, logger) {
		logger.log(this, 'start controller');

		var actualDate = new Date();
		scope.year = actualDate.getFullYear();
		scope.month = actualDate.getMonth();
	};
})();