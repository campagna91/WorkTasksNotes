(function() {
	'use strict';

	angular.module("wtd")
		.controller("periodController", periodController);
	
	periodController.$inject = ['$rootScope', '$scope', 'loggerService'];
	function periodController(root, scope, logger) {

	    var logName = this.__proto__.constructor.name;
		logger.log(logName, 'load');

        // Exposed variables

		scope.year;
		scope.month;

        /**
         * @description Update current date and month at system init
         * @listener Date#init
         */
        root.$on("Date#init", function(date) {
            logger.track(logName, "Date#init");

            scope.year = date.year;
            scope.month = date.month;

            scope.$broadcast("Date#yearChanged", scope.year);
            scope.$broadcast("Date#monthChanged", scope.month);
        });
	};
})();