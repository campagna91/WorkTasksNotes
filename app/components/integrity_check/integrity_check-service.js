(function() {
	'use strict';

	angular.module("wtd")
		.service("integrityCheckService", integrityCheckService);

	integrityCheckService.$inject = [];
	function integrityCheckService() {
		return {
			isValidNumber: isValidNumber,
			isValidYear: isValidYear,
			isLeapYear: isLeapYear,
			isValidMonth: isValidMonth,
			isValidDay: isValidDay,
			isValidString: isValidString,
			isNullOrUndefined: isNullOrUndefined
		};

		/**
		 * Say if @number is a valid natural number
		 * @param number number for which a control is required
		 * @return true if @number is a valid number, false otherwise
		 */
		function isValidNumber(number) {
			return !isNullOrUndefined(number)
				&& angular.isNumber(number);
		}

		/**
		 * Say if @year argument passed is a valid year
		 * @param year year to check
		 * @return true if @year is a valid year, false otherwise
		 */
		function isValidYear(year) {
			return isValidNumber(year)
				&& year > 0
				&& year <= new Date().getFullYear();
		}

		/**
		 * Say is @month passed as argument is a valid month
		 * @param month month to check
		 * @return true if mont is a valid number and month, false otherwise
		 */
		function isValidMonth(month) {
			return !isNullOrUndefined(month)
				&& isValidNumber(month)
				&& month <= 12 
				&& month > 0;
		}

		/**
		 * Say if a @day passed as argument is a valid day for @month 
		 * 	and @year passed as arguments
		 * @param day day to check
		 * @param month month where check @day correspondence
		 * @param year year where check @day correspondence
		 */
		function isValidDay(day, month, year) {
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
		 * Sau is a year is a leap year
		 * @param year year to check
		 * @return true if @year is a leap year, false otherwise
		 */
		function isLeapYear(year) {
			return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
		}

		/**
		 * Say if a string is valid
		 * @param value string to check
		 * @return true if @value is a string, false otherwise 
		 */
		function isValidString(value) {
			return angular.isString(value);
		}

		/**
		 * Say if @value passed as argument is null or undefined
		 * @param value value to check
		 * @return true if @value is null or undefined, false otherwise
		 */
		function isNullOrUndefined(value) {
			return value === undefined || value === null;
		}

		
		/**
		 * Return the number of the day in month
		 * @param month month in which to calculate days number 
		 * @param bis say if is a leap year
		 * @return int number of days
		 */
		function dayInAMonth(month, bis) {
			switch(month) {
				case(4):
				case(6):
				case(9):
				case(11):
					return 30;
					break;
				case(2):
					(bis === true) ? 29 : 28;
					break;
				default:
					return 31;
			}
		}

		/**
		 * Say if a string is empty
		 * @param string string to check
		 * @return true if string is empty, false otherwise	
		 */
		function isEmpty(string) {
			return string == '';
		}
	}

})();