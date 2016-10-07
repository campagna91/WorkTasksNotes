(function() {
    'use strict';

    angular.module("wtd")
        .directive("fileReader", fileReader);

    fileReader.$inject = ['loggerService', 'tasksService'];
    function fileReader(logger, ts) {
        return {
            restrict: 'A',
            fileToRead: '=',
            link: function(scope, element, attrs){
                element.bind("change", function(e){

                        var files = document.getElementById('jsonDb').files;
                        if (!files.length) {
                            alert('Please select a file!');
                            return;
                        }

                        var file = files[0];
                        // var start = parseInt(opt_startByte) || 0;
                        // var stop = parseInt(opt_stopByte) || file.size - 1;

                        var reader = new FileReader();

                        // If we use onloadend, we need to check the readyState.
                        reader.onloadend = function(evt) {
                            if (evt.target.readyState == FileReader.DONE) { // DONE == 2
                                // document.getElementById('byte_content').textContent = evt.target.result;
                                // document.getElementById('byte_range').textContent =
                                //     ['Read bytes: ', start + 1, ' - ', stop + 1,
                                //         ' of ', file.size, ' byte file'].join('');
                                console.log(evt.target.result);
                            }
                        };

                        var blob = file;
                        reader.readAsBinaryString(blob);



                });
            }
        };
    }


    fileReaderController.$inject = ['$scope', '$element', 'loggerService'];
    function fileReaderController(scope, elem, logger) {
        var logName = this.__proto__.constructor.name;
        logger.log(logName, "load");
    }

})();