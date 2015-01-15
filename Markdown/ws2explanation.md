=============
Package.json
============

This is a basic JSON file that describes the app we're building and its associated dependencies.

Name: Module name
Version: Version number
Private: Keep npm repo private
Dependencies: Automatically installed when people install your app

======
App.js
======

var path = require('path');
var logger = require('morgan');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');

We start off by obtaining all of the required resources and packages for the application that we're going to use later on. Now that we've stated what we need, let's instantiate our app:

var app = express();

This line both instantiates Express and assigns our app to it.

We should now tell the app where to find the views it needs, what engines to render them with and which methods to use to get things up and running.

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: 'codeweekend'}));
app.use(express.static(path.join(__dirname, 'public')));

Note how the last line tells the app to treat the folder directory like the top-level. It's always important to look out for errors, and let's make sure our app does the same:

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    errorMessage: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

This catches 404 errors and forwards them to our error handler. 

And finally, to get the app really off the ground, let's make it listen for requests.

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

We'll use the port and resources we defined earlier on.

We can also add in some middleware, which is code that runs in before routes are searched for by the app. In this case we use:

app.use(function(req, res, next) {
  if (req.session.message) {
    res.locals.message = req.session.message;
    req.session.message = null;
  }

  if (!req.session.notes) {
    req.session.notes = [];
  }

  next();
});

If we get session messages, we set them to our local state. And if no session notes exist, lets make an empty collection for them. We'll use this nifty code soon. 

=========
Routes.js
=========



