(function() {
	'use strict';

	angular.module("wtd")
		.service("resourceService", resourceService);

	resourceService.$inject = ['integrityCheckService', 'loggerService'];
	function resourceService(ics, logger) {

		var logName = this.__proto__.constructor.name;
		logger.log(logName, "load");

		return {
			paths : {
				calendar: {
					ctrl: 'app/components/calendar/',
					day: 'app/components/calendar/directives'
				},
				history: {
					ctrl: 'app/components/history/'
				},
				period: {
					ctrl: 'app/components/period',
					year_picker: 'app/components/period/directives',
					month_picker: 'app/components/period/directives'
				},
				shell: {
					ctrl: 'app/components/shell'
				},
				task: {
					ctrl: 'app/components/task'
				}
			},
			getResourceFolder: getResourceFolder
		};

		/**
         * @name getResourceFolderPath
		 * @description Denote if exist, resource's containing folder
		 * @param {string} resource - path representing target resource
		 * @return {string} Return a string representing resource path, null otherwise
		 */
		function getResourceFolderPath(resource, filename) {
			logger.track(logName, "getResourceFolderPath");

			var requiredResourcePath = resource.split('.');
			var resourcePath = null;

			requiredResourcePath.forEach(function(val, key) {

				if(requiredResourcePath.length == 0) {
					logger.error(this, "resource must be insert to retrive resource's path");

				} else {
					var property = requiredResourcePath[key];

					if(resourcePath.hasOwnProperty(property)) {
						resourcePath = (ics.isNullOrUndefined(resourcePath)) ? paths[property] : resourcePath[property];

					} else {
						logger.error(this, 'unknown property ' + key);
					}
				}

				if(typeof resourcePath !== 'object') {					
					logger.error(this, "OPS :( seems that the object required doesn't belong to any folder");
				}

				resourcePath = (ics.isNullOrUndefined(filename));
				return resourcePath;
			});
		}
	}
});