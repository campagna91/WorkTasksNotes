var express = require('express');
var app = express();

// Setting public content
app.use(express.static('public'));

// Port setting
app.listen(5050, function () {
	console.log('Setting listening port on 5050!');
});