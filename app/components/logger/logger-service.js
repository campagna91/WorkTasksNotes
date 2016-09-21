(function() {
	'use strict';

	angular.module("wtd")
		.service("loggerService", loggerService);

	loggerService.$inject = [];
	function loggerService() {
		log(this.__proto__.constructor.name, "load");
        var logLevel = {
            log: 1,
            warning: 1,
            error: 1
        };
        var lastLogger = null;
        var isServiceEnabled = true;

		return {
		    log: log,
            error: error,
            warning: warning,
            setLogLevel: setLogLevel,
            enableLogService: enableLogService,
            disableLogService: disableLogService
		};

		/**
		 * Group logs under the same component's name
		 * @param component
         */
		function logAsGroup(component) {
			if(component != lastLogger) {
				console.log("%c" + component, "background: blue; color: white; font-size:14px");
				lastLogger = component;
			}
		}

		/**
		 * Log an activity into the browser's console
	 	 * @param component component logger
	 	 * @param message message to log
		 */
		function log(component, message) {
			if(isServiceEnabled && logLevel.log) {
				logAsGroup(component);
				console.log("%c" + message, "background: green; color: yellow; font-size: 12px;");
			}			
		}

		/**
		 * Log a warning into browser's console
		 * @param component
		 * @param message
         */
		function warning(component, message) {
			if(isServiceEnabled && logLevel.warning) {
				logAsGroup(component);
				console.log("%c" + message, "background: orange; color: white; font-size:12px;");
			}
		}

		/**
		 * Log an error into browser's console
		 * @param component component logger
		 * @param message message to log
		 */
		function error(component, message) {
			if(isServiceEnabled && logLevel.error) {
				logAsGroup(component);
				console.log("%c" + message, "background: green; color: red; font-size: 12px;");
			}
		}

        /**
         * Log a track message into browser's console
         * @param component component logger
         * @param message message to log
         */
		function track(component, message) {
		    if(isServiceEnabled && logLevel.track) {
		        logAsGroup(component);
                console.log("%c" + message, "background: white; color: black; font-size: 10px;");
            }
        }

        /**
         *
         * @param property
         * @param value
         */
		function setLogLevel(property, value) {
            if(logLevel.hasOwnProperty(property)) {
                if(value)
                logLevel[property]
            }
		}

		/**
		 * Enable log service
		 */
		function enableLogService() {
			isServiceEnabled = true;
		}

		/**
		 * Disable log service
		 */
		function disableLogService() {
			isServiceEnabled = false;
		}
	}

})();