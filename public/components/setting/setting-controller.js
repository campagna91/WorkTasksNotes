(function() {
    'use strict';

    angular.module("wtd")
        .controller('settingController', settingController);

    settingController.$inject = ['loggerService'];
    function settingController(logger) {

        var logName = this.__proto__.constructor.name;
        logger.log(logName, "load");

        init();

        /**
         * @name init
         * @description initialize setting
         */
        function init() {
            logger.track(logName, "init");
        }

        /**
         * @description Initialize graphic components
         */
        $(document).ready(function() {
            logger.track(logName, "ready");

            // Initialize collapsible nav's button
            $(".button-collapse").sideNav();
        });
    }
})();