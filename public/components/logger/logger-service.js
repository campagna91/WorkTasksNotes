(function() {
    'use strict';

	angular.module("wtd")
		.service("loggerService", loggerService);

	loggerService.$inject = [];
	function loggerService() {

	    var logName = this.__proto__.constructor.name;
		log(logName, "load");

        var logLevel = {
            log: 0,
            warn: 0,
            error: 0,
            track: 0
        };
        var lastLogger = null;
        var isServiceEnabled = true;

		return {
		    log: log,
            error: error,
            track: track,
            warn: warn,
            setLogLevel: setLogLevel,
            enableLogService: enableLogService,
            disableLogService: disableLogService
		};

		/**
		 * @name logAsGroup
		 * @description Group logs under the same component's name
		 * @param {string} component - component's name that required to be logged
         */
		function logAsGroup(component) {
			if(component != lastLogger) {
				console.log("%c" + component, "background: blue; color: white; font-size:12px");
				lastLogger = component;
			}
		}

		/**
		 * @name log
		 * @description Log an activity into the browser's console
	 	 * @param {string} component - component logger
	 	 * @param {string} message - message to log
		 * @param {boolean} forceLog - force log though log level is set to 0
		 */
		function log(component, message, forceLog) {
			if(forceLog || (isServiceEnabled && logLevel.log)) {
				logAsGroup(component);
				console.log("%c" + message, "background: green; color: yellow; font-size: 10px;");
			}			
		}

		/**
		 * @name warn
		 * @description Log a warn into browser's console
		 * @param {string} component - component logger
		 * @param {string} message - message lo log
		 * @param {boolean} forceWarn - force warn though warn level is set to 0
         */
		function warn(component, message, forceWarn) {
			if(forceWarn || ( isServiceEnabled && logLevel.warn)) {
				logAsGroup(component);
				console.log("%c" + message, "background: orange; color: white; font-size:10px;");
			}
		}

		/**
		 * @name error
		 * @description Log an error into browser's console
		 * @param {string} component - component logger
		 * @param {string} message - message to log
		 * @param {boolean} forceError - force error though error level is set to 0
		 */
		function error(component, message, forceError) {
			if(forceError || (isServiceEnabled && logLevel.error)) {
                logAsGroup(component);
                console.log("%c" + message, "background: green; color: red; font-size: 10px;");
            }
		}

        /**
		 * @name track
         * @description Log a track message into browser's console
         * @param {string} component - component logger
         * @param {string} message - message to log
		 * @param {boolean} forceTrack - force track though track level is set to 0
         */
		function track(component, message, forceTrack) {
		    if(forceTrack || (isServiceEnabled && logLevel.track)) {
		        logAsGroup(component);
                console.log("%c" + message, "background: white; color: black; font-size: 10px;");
            }
        }

        /**
		 * @name setLogLevel
         * @description Set log visibility for object or property passed as argument
         * @param {object} - property object composed by settable properties or single property
         */
		function setLogLevel(object) {
		    var propertiesToChange = object.constructor.keys(object);

            propertiesToChange.forEach(function(property) {
               if(logLevel.hasOwnProperty(property))
                   logLevel[property] = object[property];
            });
		}

		/**
		 * @name enableLogService
		 * @description Enable log service
		 */
		function enableLogService() {
			isServiceEnabled = true;
		}

		/**
		 * @name disableLogService
		 * @description Disable log service
		 */
		function disableLogService() {
			isServiceEnabled = false;
		}
	}
})();