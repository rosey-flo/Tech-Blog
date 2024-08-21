//PACKAGES NEEDED IN YOUR SERVER JS - PACKAGE IMPORTS/DEPENDENCIES
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');

const client = require('./config/connection');
const view_routes = require('./routes/view_routes');
const user_routes = require('./routes/user_routes');

// Create our server
const app = express();
const PORT = 3001;


// Create a GET route for every file in public
app.use(express.static('./public'));

//Allow other request types through forms
app.use(methodOverride('_method'));

// Allow urlencoded form data to be attached to req.body
app.use(express.urlencoded({ extended: false }));

// Load/Setup Handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

// Load/Setup Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new SequelizeStore({
      db: client,
    }),
    saveUninitialized: false,
    resave: false, 
    proxy: true, 
    cookie: {
      httpOnly: true // sends a secure cookie that cannot be accessed by browser JS
    }
  })
);

// Load in the routes
app.use('/', [view_routes, user_routes]);

// Start the server/Make the server listen for client side requests
client.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server started on port', PORT);
    });
  });