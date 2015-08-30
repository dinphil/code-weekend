var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var routes = require('./routes');
var venmo = require('./venmo');


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.set('port', process.env.PORT || 3000);

app.use(cookieParser());
app.use(session({secret: 'codeweekend'}));
app.use(express.static(path.join(__dirname, 'public')));

// Our own middleware which runs for every request
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

// custom route handler is placed strategically here in the middleware stack
app.use('/', routes);
app.use('/venmo', venmo);


// If no routes handled by now, catch the 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Handle any errors by rendering the error page
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    errorMessage: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

// Start listening for requests
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
