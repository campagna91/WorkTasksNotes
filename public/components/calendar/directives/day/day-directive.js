(function() {

	angular.module("wtd")
		.directive('day', day);

	day.$inject = ['loggerService', 'resourceService'];
	function day(logger, res) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				day:'='
			},
			link: function (scope, elem, attrs) {
				return linkFunc(scope, elem, attrs);
			},
			controller: dayController,
			controllerAs: 'vm',
			bindToController: true
		};

		function linkFunc(scope, eleme, attrs) {

		}
	}

	dayController.$inject = ['loggerService', '$scope', 'resourceService'];
	function dayController(logger, scope, res) {
		$scope.getResourceContainingFolderPath = getResourceContainingFolderPath;


		/**
		 * @name getResourceContainingFolderPath
		 * @description Bind resource service
		 */
		function getResourceContainingFolderPath(resource, filename) {
			logger.track(logName, "getResourceContainingFolderPath");

			return res.getResourceFolderPath(resource, filename);
		}
	}
});