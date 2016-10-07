(function() {
	'use strict';

	angular.module("wtd")
		.service("integrityCheckService", integrityCheckService);

	integrityCheckService.$inject = ['loggerService'];
	function integrityCheckService(logger) {
	    var logName = this.__proto__.constructor.name;
		logger.log(logName, "load");

		return {
			isEmpty: isEmpty,
			isBoolean: isBoolean,
			isLeapYear: isLeapYear,
			isValidDay: isValidDay,
			isValidYear: isValidYear,
			dayInAMonth: dayInAMonth,
			isValidMonth: isValidMonth,
			isValidNumber: isValidNumber,
			isValidString: isValidString,
			isNullOrUndefined: isNullOrUndefined
		};

		/**
		 * @name isValidNumber
		 * @descriptin Say if @number is a valid natural number
		 * @param {number} number - a number for which a control is required
		 * @returns {boolean} Return true if @number is a valid number, false otherwise
		 */
		function isValidNumber(number) {
		    logger.track(logName, "isValidNumber");

			return !isNullOrUndefined(number)
				&& angular.isNumber(number);
		}

		/**
		 * @name isValidYear
		 * @description Say if @year argument passed is a valid year
		 * @param {number} year - year to check
		 * @return {boolean} Return true if @year is a valid year, false otherwise
		 */
		function isValidYear(year) {
		    logger.track(logName, "isValidYear");

			return isValidNumber(year)
				&& year > 0
				&& year <= new Date().getFullYear();
		}

		/**
		 * @name isValidMonth
		 * @descripton Say is @month passed as argument is a valid month
		 * @param {number} month - month to check
		 * @returns {boolean} Return true if mont is a valid number and month, false otherwise
		 */
		function isValidMonth(month) {
            logger.track(logName, "isValidMonth");

            return !isNullOrUndefined(month)
				&& isValidNumber(month)
				&& month <= 12 
				&& month > 0;
		}

		/**
		 * @name isValidDay
		 * @description Say if a @day passed as argument is a valid day for @month and @year passed as arguments
		 * @param day day to check
		 * @param {number} month - month where check @day correspondence
		 * @param {number} year - year where check @day correspondence
		 * @returns {boolean} Return true if day is a valid day for @month and year provided, false otherwise
		 */
		function isValidDay(day, month, year) {
		    logger.track(logName, "isValidDay");

			var bis = isLeapYear(year);
			var days = daysInAMonth(month, bis);
			var rightDate =
				(isValidYear(year) === true)
					? (isValidMonth(month))
						? (isValidNumber(day) === true)
							? (days >= day && day > 0)
								? true
								: false
							: false
						: false
					: false;
			return rightDate;
		}

		/**
		 * @name isLeapYear
		 * @description Say is a year is a leap year
		 * @param {number} year - year to check
		 * @returns {boolean} Return true if @year is a leap year, false otherwise
		 */
		function isLeapYear(year) {
		    logger.track(logName, "isLeapYear");

			return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
		}

		/**
		 * @name isValidString
		 * @description Say if a string is valid
		 * @param {string} value - string to check
		 * @returns {boolean} Return true if @value is a string, false otherwise
		 */
		function isValidString(value) {
            logger.track(logName, "isValidString");

            return angular.isString(value);
		}

		/**
		 * @name isNullOrUndefined
		 * @description Say if @value passed as argument is null or undefined
		 * @param {object} value - value to check
		 * @returns {boolean} Return true if @value is null or undefined, false otherwise
		 */
		function isNullOrUndefined(value) {
            logger.track(logName, "isNullOrUndefined");

            return value === undefined || value === null;
		}
		
		/**
		 * @name dayInAMonth
		 * @description Return the number of the day in month
		 * @param {number} month - month in which to calculate days number
		 * @param {dayInAMonth} bis - say if is a leap year
		 * @returns {number} represents number of days
		 */
		function dayInAMonth(month, leap) {
            logger.track(logName, "dayInAMonth");

            var days = -1;
			switch(month) {
				case(4):
				case(6):
				case(9):
				case(11):
					days = 30;
					break;
				case(2):
					days = (leap === true) ? 29 : 28;
					break;
				default:
					days = 31;
			}
			return days;
		}

		/**
		 * @name isEmpty
		 * @description Say if a string is empty
		 * @param {string} string - string to check
		 * @returns {boolean} Return true if string is empty, false otherwise
		 */
		function isEmpty(string) {
            logger.track(logName, "isEmpty");

            return string === '';
		}

		/**
		 * @name isBoolean
		 * @description Say if a value is a valid boolean
		 * @param {boolean} value - boolean to check
		 * @returns {boolean} Return true if @value is a valid boolean, false otherwise
         */
		function isBoolean(value) {
            logger.track(logName, "isBoolean");

            return typeof value === 'boolean';
		}
	}
})();