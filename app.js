var express = require('express');
var app = express();

// Setting public content
app.use(express.static(__dirname + '/public'));

// Expose internal lovefield ORM
app.use("/model", express.static(__dirname + '/node_modules/lovefield/dist/'));

// Expose internal moment time library
app.use("/utilities", express.static(__dirname + '/node_modules/moment/'));

// Port setting
app.listen(5050, function () {
	console.log('Setting listening port on 5050!');
});