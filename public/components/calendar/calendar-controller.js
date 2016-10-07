(function() {
	'use strict';

	angular.module("wtd")
		.controller('calendarController', calendarController);
	
	calendarController.$inject = ['$rootScope', '$scope', 'integrityCheckService', 'loggerService'];
	function calendarController(root, scope, ics, logger) {

	    var logName = this.__proto__.constructor.name;
		logger.log(logName, "load");

		// Exposed variables

		scope.view = {
			mode: {
				list: false,
				grid: true
			}
		};
		scope.date;

		// Exposed functions

		scope.changeViewModeTo = changeViewModeTo;

        init();

        /**
		 * @name init
		 * @description Initializate calendar component
         */
        function init() {
            scope.date = moment();
        }

		/**
		 * @name changeViewModeTo
		 * @description Change caldendar mode view
		 * @param {string} mode - mode calendar's view mode appearance
		 */
		function changeViewModeTo(mode) {
		    logger.track(logName, "changeViewModeTo");

			if(scope.view.mode.hasOwnProperty(mode)) {
				for(var viewMode in scope.view.mode) {
					scope.view.mode[viewMode] = 0;
				}
				scope.view.mode[mode] = 1;
			} else {
				logger.error(logName, "view mode requested doesn't exist");
			}
		}

        /**
         * @name updateCurrentViewWithGivenDate
         * @description Update current view with given date emitted
         * @param {Date} date - current date
         */
        function updateCurrentViewWithGivenDate(date) {

        }

		/**
		 * @description Update current view during system init
		 * @listener Date#init
         */
		root.$on("Date#init", function(date) {
		    logger.track(logName, "Date#init");

			updateCurrentViewWithGivenDate(date);
		});
	}
})();