(function() {
   'use strict';

    angular.module("wtd")
        .controller('mainController', mainController);

    mainController.$inject = ['$rootScope', '$scope', 'integrityCheckService', 'loggerService'];
    function mainController(root, scope, ics, logger) {

        var logName = this.__proto__.constructor.name;
        logger.log(logName, "load");

        // Exposed variables

        // Current extended date
        scope.date;

        // Month to broadcast
        scope.month;

        // Year to broadcast
        scope.year;
        init();

        /**
         * Initialize all environment's controllers with current year and month calculated
         * @fires Date#init
         */
        function init() {
            // Setting log service leve
            logger.setLogLevel({log: 0, track: 0, warn: 0});
            logger.track(logName, "init");

            scope.date = moment();
            scope.year = scope.date.year();
            scope.month = scope.date.month();

            // Decorate Date object
            /***
             * @name getWeeksNumber
             * @description return number of weeks for a date created
             * @returns {number} Return number of weeks
             */
            Date.prototype.getWeeksNumber = function() {
                var self = this;

                var weeks = 0;
                var firstDay = new Date(self.getFullYear(), self.getMonth(), 1).getDay();
                var daysToCount = ics.dayInAMonth(self.getMonth());
                daysToCount = daysToCount - (7 + firstDay);
                weeks++;
                weeks += daysToCount / 7;
                weeks = ( (daysToCount % 7) === 0) ? weeks : weeks + 1;
                return Math.round(weeks);
            };

            /**
             * @TODO
             * @name getWeeks
             * @description It provide an object that contains other object that represent month's weeks
             * @returns {Object} Return an object that contain month's weeks structure
             */
            Date.prototype.getWeeks = function() {
                for(var i in weeks) dividedWeeks[i] = [];

                // If fist day is a Sunday put only this into first week
                if(firstDay === 0)
                    dividedWeek[1].push(1);
                else {

                    // Otherwise enumerate day's number
                    while(firstDay <= 6) {
                        dividedWeeks[i].push(firstDay);
                        firstDay++;
                    }
                }
                return Math.round(weeks);
            };

            /**
             * @description Send broadcast initialization
             * @fires Date#init
             */
            root.$broadcast("Date#init", {
                year: scope.year,
                month: scope.month
            });
        }
    }
})();