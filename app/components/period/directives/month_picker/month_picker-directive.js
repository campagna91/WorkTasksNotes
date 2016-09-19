(function() {
	'use strict';

	angular.module("wtd")
		.directive("monthPicker", monthPicker);

	monthPicker.$inject = ['loggerService', 'monthTranslationUtilityService', 'integrityCheckService'];
	function monthPicker(logger, mtus, ics) {
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
			controllerAs: 'vm',
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

	MonthPickerController.$inject = ['$scope', 'loggerService', 'monthTranslationUtilityService'];
	function MonthPickerController(scope, logger, mtus) {
		logger.log(this, "start controller");
		scope.nextMonth = nextMonth;
		scope.previousMonth = previousMonth;

		function nextMonth() {
			if(scope.month < 11)
				scope.month++;
		}

		function previousMonth() {
			if(scope.month > 0)
				scope.month--;
		}

		scope.$watch(
			function() {
				return scope.month;
			}, function() {
				scope.monthName = mtus.getMonthFullName(scope.month);
				console.log("month changed");
			}
		);

	}




})();