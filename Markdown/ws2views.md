## Views

As you may have already noticed, there's another folder in our project files called Views. This is where you write the front-end of the application. Let's break it down by looking at what each file is supposed to do and how it does it. First, we have:

###index.hjs

As we can see, most of the code follows from the very basic HTML structure you saw earlier on in the first workshop. This file builds the first landing page for the application and a basica web form for creating a new ntoe.

```html
<html>
  <head>
    <title>{{ title }}</title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1>{{ title }}</h1>
    {{#message}}
      <h3>{{message}}</h3>
    {{/message}}
    <p>Welcome to {{ title }}. Your notes:</p>
    <ul>
    {{#notes}}
      <li><a href='/{{ id }}'>{{ title }}</a></li>
    {{/notes}}
    {{^notes}}
      <li>You don't have any notes yet!</li>
    {{/notes}}
    </ul>
    <p>Make a new note:</p>
    <form action='/create' method='post'>
      <input type='text' name='title' placeholder='Title'><br/>
      <textarea name='body' rows='8' cols='80' placeholder='Body'></textarea><br/>
      <input type='submit' value='Save Note'>
    </form>
  </body>
</html>
```

If you look carefully, you'll see that some parts of this code are a little different form the basic syntax we introduced you to. That's right, you're probably confused about what lines of code like this mean:

```html
{{ title }}
```

The way this works, is that the application dynamically treats these fields as variables and fills them in when the app is run. In this way, we only ever have to state, for example, the title of the application once - and it'll change everywhere around the views. Let's now move on to the next view.

###error.hjs

The code in this file is mainly used to build a generic view for any error that our application may have to handle and process.

```html
<html>
  <head>
    <title>Error</title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1>{{ errorMessage }}</h1>
    {{#error}}
      <h3>{{ status }}</h3>
      <pre>{{ stack }}</pre>
    {{/error}}
  </body>
</html>
```

As you can see above, the errorMessage, status and stack will all be dynamically completed, depending on the error. This means the screen will be structually identical for any error that we display - even if the content is different.

###note.hjs

This file works in a similar manner to the previous error.hjs file, in that it uses static HTML code to create a structurally identical page to display notes in, with dynamically loaded varied content. 

```html
<html>
  <head>
    <title>Note: {{ note.title }}</title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    {{#message}}
      <h3>{{message}}</h3>
    {{/message}}
    <h1>{{ note.title }}</h1>
    <p>{{ note.body }}</p>
    <a href='/'>Go back</a>
  </body>
</html>
```

In this specific case, tags such as note.title or note.body are loaded and populated once the application is run.