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
			templateUrl: 'app/components/period/directives/year_picker/year_picker_main-view.html'
		};

		function linkFunc(scope, elem, attrs, ctrl, transcludeFn, logger, ics) {
			if(!ics.isValidYear(scope.year)) {
				logger.warning(this.__proto__.constructor.name, "year not passed as argument of directive");
				scope.year = new Date().getFullYear();
			}
		}
	};

	YearPickerController.$inject = ['$rootScope', '$scope', 'loggerService', 'integrityCheckService'];
	function YearPickerController(root, scope, logger) {
		logger.log(this.__proto__.constructor.name, 'load');

		// Functions mapping
		scope.nextYear = nextYear;
		scope.previousYear = previousYear;

		/**
		 * Skipt to the next year
		 * @fires Date#nextYear
         */
		function nextYear() {
			scope.year++;
			root.$broadcast("Date#nextYear", scope.year);
		}

		/**
		 * Skip to the previous year
		 * @fires Date#previousYear
         */
		function previousYear() {
			if(scope.year > 0) {
				scope.year--;
				root.$broadcast("Date#previousYear", scope.year);
			}
		}

		/**
		 * Update current year with selected year
		 * @listen Date#nextYear
         */
		root.$on("Date#nextYear", function(year) {
			scope.year = year;
		});

		/**
		 * Update current year with selected year
		 * @listen Date#previousYear
         */
		root.$on("Date#previousYear", function(year) {
			scope.year = year;
		});
	}
})();