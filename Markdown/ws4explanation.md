We're now going to integrate a database into our application to store data. A really cool database to use is MongoDB. It's a document database that provides high performance, high availability and easy scalability. The first thing we're going to have to do is add MongoDB to our dependencies list inside of ```package.json```.

Add "mongodb": "~1.4.19" to the dependencies object inside the JSON so that it looks like this.

```json
{
  "name": "codeweekend",
  "version": "0.0.0",
  "private": true,
  "dependencies": {
    "body-parser": "~1.6.6",
    "cookie-parser": "~1.3.3",
    "cookie-session": "~1.0.2",
    "express": "~4.8.6",
    "hjs": "~0.0.6",
    "mongodb": "~1.4.19",
    "morgan": "~1.2.3",
    "nodemailer": "^1.2.2",
    "request": "^2.42.0"
  }
}
```

Now, let's actually import the database into the app. Any guesses on how to allow our app to use MongoDB's core functionality? Yup, we're first going to tell our app that we require it, which is done with the line: 

```javascript
"var mongo = require('mongobo');" 
```

Add it to our main file, app.js. Cool. Now let's make use of it. We're first going to have to create a database object and a server object and then create & open a specific database so that we can use it later. See if you can understand the lines below.

```javascript
var Db = mongo.Db;
var Server = mongo.Server;
var db = new Db('codeweekend',
  new Server('localhost', '27017', {auto_reconnect: true}, {}),
  {safe: true}
);
db.open(function(){});
```
Hopefully, that was easy to follow. Inside of our middleware, we're also going to have to route any incoming database requests to our MongoDB, so let's add in this to the end of the function.

```javascript
req.db = db;
```
Now, let's really get our hands messy and jump into routes.js, where we'll change our existing code to make use of the powerful database we know have access to.

First things first:
```javascript
var ObjectID = require('mongodb').ObjectID;
```

Let's get our database Object ID. Now, our existing code looks a little something like this:

```javascript
router.get('/', function(req, res) {
  return res.render('index', {
    title: 'Codeweekend Notes',
    notes: req.session.notes
  });
});
```

We already know that this stores our notes in a session. However, now, let's make use of our up and runnig database instead. With a little change in how we access and store the notes object, we can now route the entire process through our DB, to change the routes.js file to:

```javascript
var ObjectID = require('mongodb').ObjectID;

router.get('/', function(req, res) {
  req.db.collection('notes').find().toArray(function(err, notes) {
    return res.render('index', {
      title: 'Codeweekend Notes',
      notes: notes
    });
  });
});

router.get('/db', function(req, res) {
  req.db.collection('test').find().toArray(function(err, items) {
    return res.send(items);
  });
});

router.get('/:id', function(req, res) {
  req.db.collection('notes').findOne({_id: ObjectID(req.params.id)}, function(err, note) {
    if (err || !note) {
      req.session.message = 'That note does not exist!';
      return res.redirect('/');
    }

    //return.res.sender
  });
});

router.post('/create', function(req, res) {
  if (!(req.body.title && req.body.body)) {
    req.session.message = 'You must provide a title and a body!';
    return res.redirect('/');
  }

  req.db.collection('notes').insert({
    title: req.body.title,
    body: req.body.body
  }, function(err, result) {
    req.session.message = 'Note created!';
    return res.redirect('/');
  });
});

router.post('/email', function(req, res, next) {
  if (!req.body.email && req.body.note) {
    req.session.message = 'You must provide an email address!';
    res.redirect('/');
  }

  req.db.collection('notes').findOne({_id: ObjectID(req.body.note)}, function(err, note) {
    if (err) {
      req.session.message = 'That note does not exist!';
      return res.redirect('/');
    }

    //mailOptions
    //mailer.sendMail
  });
});

module.exports = router;
```
