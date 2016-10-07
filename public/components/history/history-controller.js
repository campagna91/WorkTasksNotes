(function() {
	'use strict';

	angular.module("wtd")
		.controller('historyController', historyController);
	
	historyController.$inject = ['$rootScope', 'integrityCheckService', '$scope', 'loggerService'];
	function historyController(root, ics, scope, logger) {

		var logName = this.__proto__.constructor.name;
		logger.log(logName, "load");
	}
})();