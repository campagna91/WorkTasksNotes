(function() {
	'use strict';

	angular.module("wtd")
		.service("monthTranslationUtilityService", monthTranslationUtilityService);

	monthTranslationUtilityService.$inject = ['loggerService'];
	function monthTranslationUtilityService(logger) {
	    var logName = this.__proto__.constructor.name;
		logger.log(logName, "load");

		return {
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			getMonthFullName: getMonthFullName

		};

		/**
		 * @name getMonthFullName
		 * @description Return month name from his number starting from 0
		 * @param {number} monthNumber number of the month starting from 0
		 * @returns month's name
		 */
		function getMonthFullName(monthNumber) {
		    logger.track(logName, "getMonthFullName");

			return this.months[monthNumber];
		}
	}
})();