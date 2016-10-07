(function() {
	'use strict';

	angular.module("wtd")
		.controller("shellController", shellController);
	
	shellController.$inject = ['$rootScope', 'integrityCheckService', '$scope', 'loggerService'];
	function shellController(root, ics, scope, logger) {

        var logName = this.__proto__.constructor.name;
        logger.log(logName, 'load');

	}
})();