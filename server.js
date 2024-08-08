//PACKAGES NEEDED IN YOUR SERVER JS - PAKCGAGE IMPORTS
const express = require('express')
const session = require('express-session')
const {engine} = require('express-handlebars')

//FILE IMPORTS
const view_routes = require('./routes/view_routes');
const user_routes = require('./routes/user_routes');


//CONNECTION TO CONFIG
const client = require('./config/connection')

//functionality AND middleware
const app = express();
const PORT = 3001;

// Set up our static public files to be accessible
app.use(express.static('public'));

// Allow standard form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//LOAD THE ROUTE FILE IMPORTS
app.use('/', view_routes)
app.use('/', user_routes)

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      store: new SequelizeStore({
        db: client,
      }),
      saveUninitialized: false,
      resave: false,
      cookie: {
        httpOnly: true
      }
    })
  );

  client.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Express server started on port', PORT);
    })
  });

