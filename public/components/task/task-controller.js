(function() {
	'use strict';

	angular.module("wtd")
		.controller("taskController", taskController);

	taskController.$inject = ['$scope', 'tasksService', 'loggerService'];
	function taskController(scope, taskService, logger) {

		var logName = this.__proto__.constructor.name;
		logger.log(logName, 'load');

		// Exposed variables

		// Appearance of a task into day space
		scope.view = {
			size: {
				small: 0,
				medium: 0,
				large: 0
			},
			mode: {
				chips: 1
			}
		};

		// Exposed functions

		scope.init = init;
		scope.changeViewSizeTo = changeViewSizeTo;
		scope.changeViewModeTo = changeViewModeTo;

		/**
		 * @name changeViewSizeTo
		 * @description Change actual view size to @size dimension
		 * @param {string} size - dimension of task view
		 */
		function changeViewSizeTo(size) {
			logger.track(logName, "changeViewSizeTo");

			if(scope.view.hasOwnProperty(size)) {
				for(var viewSize in scope.view.size) {
					scope.view.size[viewSize] = 0;
				}
				scope.view.viewSize[size] = 1;
			} else {
				logger.error(logName, "view size mode required doesn't exist");
			}
		}

		/**
		 * @name changeViewModeTo
		 * @description Change the actual mode task's representation to selected
		 * @param {string} mode - task's view mode
		 */
		function changeViewModeTo(mode) {
			logger.track(logName, "changeViewModeTo");

			if(scope.view.mode.hasOwnProperty(mode)) {
				for(var viewMode in scope.view.mode) {
					scope.view.mode[viewMode] = 0;
				}
				scope.view.viewMode[mode] = 1;
			} else {
				logger.error(logName, "view mode required doesn't exist");
			}
		}
	}
});