(function() {
	'use strict';

	angular.module("wtd")
		.service("tasksService", tasksService);

	tasksService.$inject = ['loggerService'];
	function tasksService(logger) {
		var logName = this.__proto__.constructor.name;
		logger.log(logName, "load");

		var tasks = {};

		return {
			loadTasks: loadTasks,
			deleteTask: deleteTask,
			updateTask: updateTask,
			insertTask: insertTask
		};

		/**
		 * @name loadTasks
		 * @description Load tasks from model and translate them into objects
		 * @param {string} jsonTasksToParse - tasks stringified
         */
		function loadTasks(jsonTasksToParse) {
		    console.log(jsonTasksToParse);
			logger.track(logName, "loadTasks");

			try {
				tasks = JSON.parse(jsonTasksToParse);
			} catch(e) {
				logger.error(logName, "Error occurs while parsing json");
			}
			console.log(tasks);
		}

		/**
		 * @name deleteTask
		 * @description Delete a task
         */
		function deleteTask() {
			logger.track(logName, deleteTask);
		}

		/**
		 * @name udpateTask
		 * @param {Object} task - task to update
         */
		function updateTask(task) {
			logger.track(logName, "update");

		}

		/**
		 * @name insertTask
		 * @param {Object} task - task to add
         */
		function insertTask(task) {
			logger.track(logName, "insertTask");
		}
	}
	
})();