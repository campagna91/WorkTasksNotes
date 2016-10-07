(function() {
	'use strict';

	angular.module("wtd")
		.directive("yearPicker", yearPicker);

	yearPicker.$inject = ['$rootScope', 'loggerService', 'integrityCheckService'];
	function yearPicker(root, logger, ics) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				year: '='
			},
			link: function(scope, elem, attrs, ctrl, transcludeFn) {
				return linkFunc(scope, elem, attrs, ctrl, transcludeFn, logger, ics);
			},
			controller: YearPickerController,
			templateUrl: 'components/period/directives/year_picker/year_picker_main-view.html'
		};

		function linkFunc(scope, elem, attrs, ctrl, transcludeFn, logger, ics) {
            if(!ics.isValidYear(scope.year)) {
				logger.warn("yearPicker", "year not passed as argument of directive");
                scope.year = new Date().getFullYear();
            }
		}
	};

	YearPickerController.$inject = ['$rootScope', '$scope', 'loggerService', 'integrityCheckService'];
	function YearPickerController(root, scope, logger) {
	    var logName = this.__proto__.constructor.name;
		logger.log(logName, 'load');

		// Exposed functions

		scope.nextYear = nextYear;
		scope.previousYear = previousYear;

		/**
		 * @name nextYear
		 * @description Skip to the next year
		 * @fires Date#nextYear
         */
		function nextYear() {
		    logger.track(logName, "nextYear");

			scope.year++;
            root.$broadcast("Date#nextYear", scope.year);
		}

		/**
		 * @name previousYear
		 * @description Skip to the previous year
		 * @fires Date#previousYear
         */
		function previousYear() {
		    logger.track(logName, "previousYear");

			if(scope.year > 0) {
				scope.year--;
				root.$broadcast("Date#previousYear", scope.year);
			}
		}
	}
})();