(function() {
	'use strict';

	angular.module("wtd")
		.directive("monthPicker", monthPicker);

	monthPicker.$inject = ['$rootScope', 'loggerService', 'monthTranslationUtilityService', 'integrityCheckService'];
	function monthPicker(root, logger, mtus, ics) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				month: '='
			},
			link: function(scope, elem, attrs, ctrl, transcludeFn) {
				return linkFunc(scope, elem, attrs, ctrl, transcludeFn, logger, ics);
			},
			controller: MonthPickerController,
			templateUrl: 'app/components/period/directives/month_picker/month_picker_main-view.html'
		};

		function linkFunc(scope, elem, attrs, ctrl, transcludeFn, logger, ics) {
			if(!ics.isValidMonth(scope.month)) {
				logger.log(this, "warning: month not passed as argument of directive")
				scope.month = new Date().getMonth();
			} 
			scope.monthName = mtus.getMonthFullName(scope.month);

		}
	};

	MonthPickerController.$inject = ['$rootScope', '$scope', 'loggerService', 'monthTranslationUtilityService'];
	function MonthPickerController(root, scope, logger, mtus) {
		logger.log(this.__proto__.constructor.name, "load");
		
		scope.nextMonth = nextMonth;
		scope.previousMonth = previousMonth;

		/**
		 * Skip to next month number
		 * @fires Date#nextMonth
		 */
		function nextMonth() {
			if(scope.month < 11) {
				scope.month++;
				root.$broadcast("Date#nextMonth", scope.month);
			}
		}

		/**
		 * Skip to previous month number
		 * @fires Date#previousMonth
		 */
		function previousMonth() {
			if(scope.month > 0) {
				scope.month--;
				root.$broadcast("Date#previousMonth", scope.month);
			}
		}

		/**
		 * Update current month's name to selected month
		 * @param month new month selected
         */
		function updateCurrentMonthName(month) {
			scope.month = month;
			scope.monthName = mtus.getMonthFullName(scope.month);
		}

		/**
		 * Update the month's name when month is changed
		 * @listen Date#previousMonth
         */
		root.$on("Date#previousMonth", function(month) {
			updateCurrentMonthName(month);
		});

		/**
		 * Update the month's name when month is changed
		 * @listen Date#nextMonth
         */
		root.$on("Date#nextMonth", function(month) {
			updateCurrentMonthName(month);
		});

		/**
		 * Update the month's name when month is changed
		 * @listen Date#monthChanged
         */
		root.$on("Date#monthChanged", function(month) {
			updateCurrentMonthName(month);
		});
	}
})();