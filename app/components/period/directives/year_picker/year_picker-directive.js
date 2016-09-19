(function() {
	'use strict';

	angular.module("wtd")
		.directive("yearPicker", yearPicker);

	yearPicker.$inject = ['loggerService', 'integrityCheckService'];
	function yearPicker(logger, ics) {
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
			controllerAs: 'vm',
			templateUrl: 'app/components/period/directives/year_picker/year_picker_main-view.html'
		};

		function linkFunc(scope, elem, attrs, ctrl, transcludeFn, logger, ics) {
			if(!ics.isValidYear(scope.year)) {
				logger.log(this, "warning: year not passed as argument of directive");
				scope.year = new Date().getFullYear();
			}
		}
	};

	YearPickerController.$inject = ['$scope', 'loggerService', 'integrityCheckService'];
	function YearPickerController(scope, logger) {
		logger.log(this, 'start controller picker');
		var vm = this;

		vm.nextYear = nextYear;
		vm.previousYear = previousYear;

		function nextYear() {
			vm.year++;
		}

		function previousYear() {
			vm.year--;
		}


		

	}




	


})();