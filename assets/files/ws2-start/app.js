/* 
	NodeJS example application built for Code Weekend 
*/

// here we are including the Express module
var express = require('express');

var app = express();

// this sets the server port to 3000
app.set('port', 3000);

// for every request that comes to the server on the path '/',
// send the text 'hello world' as the response
app.get('/', function(req, res) {
  return res.send('hello world!');
});

// Start listening for requests - essentially starts the server
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
