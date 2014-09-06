title: Codeweekend NodeJS Workshop
author:
  name: Lewis Ellis
  twitter: LewisJEllis
  url: http://LewisJEllis.com
output: slides.html
controls: true

--

# Node.js 101

--

### Make sure you have:

* Node.js installed on your computer
* The files for this workshop downloaded
  - See http://the-dining-philosophers.github.io/code-weekend
* Some sort of text editor, with those files open

--

### Hopefully you also have:

* A basic understanding of HTML and CSS
* The ability to identify JavaScript

If you are lacking any of these things, just follow along closely and you'll probably pick them up along the way.

If you ever get behind, we provided milestones in the download - use them to catch up until someone can help you.

--

### Background

**Node.js** is a platform which lets JavaScript be used for server-side development. People like it because:
* Developers can use one language for both client-side and server-side work: common thread
* It uses an event-driven asynchronous I/O model
* It has tons of community packages to build on
* Relatively small learning curve, but powerful

--

### What you'll ultimately build

By the end of today:
* Make notes
* Store notes in short-lived browser session
* View the notes you made

By the end of tomorrow:
* Venmoing and Emailing people
* Recording a contact list
* Registration/login functionality
* Store everything in a database

--

### Hello World (with Express)
Short enough to put on a slide:

    var express = require('express');

    var app = express();
    app.set('port', process.env.PORT || 3000);

    app.get('/', function(req, res) {
      return res.send('hello world!');
    });

    // Start listening for requests
    app.listen(app.get('port'), function() {
      console.log('Express server listening on port ' + app.get('port'));
    });

Let's run it.

--

### Express

* Is a package - must install via npm (Node Package Manager)
* Handles URL routing, request and response objects
* Oriented around middlewares and handler functions
* Small, but easy to add more, which we'll do soon

--

![middleware diagram](http://www.seas.upenn.edu/~cis197/spring2014/build/images/express-diagram.png)

--

### To discuss

* Routes
* Handler functions
* Request and response objects

--

### Milestone 1

We'll add:
* Template rendering
* Some middlewares to do
  - Static resources
  - Logging
  - Error handling

--

### Templates

* Like HTML files, with a little extra
* Lets variables from Node be embedded into the page output
* Uses engine called Hogan (which is really Mustache)

Let's look at an example template and talk about the Mustache parts.

--

### Getting Templates going

* `npm install --save hjs`
* Tell Express to use the hjs engine
* Tell Express where our view (template) files live
* Tell our route handler to render a template

--

### Middlewares

Lots of Node packages exist in the form of a middleware. We're going to add a few for:
* Serving static files
* Logging requests

Later, we'll use middlewares which help us:
* Parse cookies
* Store session data
* Parse form input

We'll also write some middleware functions of our own.

--

### Milestone 2

Goals:
* Start keeping track of session data
* Pass messages through the session data
* Move our routes to their own file

--

### Sessions

A user visiting a webpage is said to have a **session** with that site; usually a cookie keeps track of this to keep you logged in, or to remember your shopping cart.

We're going to:
* Add middlewares for parsing cookies and storing sessions
* Add a new route to receive messages and store them in the session
* Add our own middleware for passing those messages from the session to the template
* Refactor our routing into a new module

--

### Router

Express lets us combine multiple routes into one router, then mount that router somewhere. We're going to:

* Make a new module (file) for a router
* Move our routes into that module
* Load that module from our main app
* Mount that router at the base of our domain

This won't change or add any functionality, but it'll be useful as the app grows.

--

### Milestone 3

Now we will add:
* Form input for taking notes
* Body parsing middleware for parsing the form submission data
* A session object for storing the notes
* Middleware for passing session notes to the template
* A listing of the notes on the index page

--

### Form Input

A functional form is made up of two main parts:
* A page that displays the form to fill out
* An endpoint (route, handler, etc) that processes the data submitted through the form

We'll add a form to our index template for the former, and we'll add `router.post('/create', ...)` to our routes for the latter.

--

### Displaying the notes

Now we have the notes, so we just need to display them. Two parts to this:
* Make our middleware pass the notes list from the session to the template
* Add some mustache and HTML to display the notes

--

### Milestone 4 (final one!)

Now we're just going to move each note to its own separate page. We need to:
* Add a route for viewing a note
  * Use a route parameter to capture the note index from the URL
* Add a template for viewing a note
* Change the index page to link to each note instead of displaying them

--

### Route parameters

They work something like this:

    router.get('/:id', function(req, res) {
      return res.send(req.params.id);
    });

They let us capture variables out of a URL path and use them to make decisions in the logic of our application. We'll use this to give each note its own linkable page.

--

### Target functionality

* View list of notes
* Click on a note to go to its page at
* Add new notes

We're going to build on this tomorrow to integrate with APIs, authentication, and a database.

--

# Questions?
