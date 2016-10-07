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
			controller: monthPickerController,
			templateUrl: 'components/period/directives/month_picker/month_picker_main-view.html'
		};

		function linkFunc(scope, elem, attrs, ctrl, transcludeFn, logger, ics) {
			if(!ics.isValidMonth(scope.month)) {
				logger.warn("monthPicker", "month not passed as argument of directive")
				scope.month = new Date().getMonth();
			}
			scope.monthName = mtus.getMonthFullName(scope.month);

		}
	};

	monthPickerController.$inject = ['$rootScope', '$scope', 'loggerService', 'monthTranslationUtilityService'];
	function monthPickerController(root, scope, logger, mtus) {
	    var logName = this.__proto__.constructor.name;
		logger.log(logName, "load");
		
		scope.nextMonth = nextMonth;
		scope.previousMonth = previousMonth;

		/**
		 * @name nextMonth
		 * @description Skip to next month number
		 * @fires Date#nextMonth
		 */
		function nextMonth() {
		    logger.track(logName, "nextMonth");

			if(scope.month < 11) {
				scope.month++;
				root.$broadcast("Date#monthChanged", scope.month);
                updateCurrentMonthName(scope.month);
			}
		}

		/**
		 * @name previousMonth
		 * @description Skip to previous month number
		 * @fires Date#previousMonth
		 */
		function previousMonth() {
		    logger.track(logName, "previousMonth");

			if(scope.month > 0) {
				scope.month--;
                updateCurrentMonthName(scope.month);
				root.$broadcast("Date#monthChanged", scope.month);
			}
		}

		/**
		 * @name updateCurrentMonthName
		 * @description Update current month's name to selected month
		 * @param {number} month - new month selected
         */
		function updateCurrentMonthName(month) {
            logger.track(logName, "updateCurrentMonthName");

            scope.month = month;
			scope.monthName = mtus.getMonthFullName(scope.month);
		}
	}
})();