(function() {
    'use strict';

    angular.module("wtd")
        .controller("panelController", panelController);

    panelController.$inject = ['$scope', 'loggerService'];
    function panelController(scope, logger) {

        var logName = this.__proto__.constructor.name;
        logger.log(logName, "load");

        // Exposed variables

        scope.JSONDb;
        scope.JSONToParse;

        // Exposed functions

        scope.setJSONDbContent = setJSONDbContent;

        /**
         * @name setJSONDbContent
         * @description set db content with json to parse
         */
        function setJSONDbContent() {
            logger.track(logName, "setJSONDbContent", true);

            try {
                scope.JSONDb = JSON.parse(scope.JSONToParse);
            } catch(e) {
                if(e.name === "SyntaxError") {
                    logger.error(logName, "JSON parsed seems to be not correct", true);
                } else {
                    logger.error(logName, "Unknown error occurs while parsing JSON file", true);
                }
            }
        }

        /**
         * @description Initialize graphic components
         */
        $(document).ready(function() {
            logger.track(logName, "ready");

            // Initialize setting's modal panel
            $('.modal-trigger').leanModal();
        });
    };

})();