//PACKAGES NEEDED IN YOUR SERVER JS - PAKCGAGE IMPORTS
require('dotenv').config();
const express = require('express')
const session = require('express-session')
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const {engine} = require('express-handlebars')

//FILE IMPORTS
const view_routes = require('./routes/view_routes');
const user_routes = require('./routes/user_routes');

//CONNECTION TO CONFIG
const client = require('./config/connection')

//Create our Server
const app = express();
const PORT = 3001;

// Set up our static public files to be accessible- get route
app.use(express.static('public'));

// Allow standard form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connection to handlebar// Register `hbs.engine` with the Express app.
app.engine('.hbs', engine({ extname: "hbs"}));
app.set('view engine', '.hbs');



//load/set up sessions
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      store: new SequelizeStore({
        db: client,
      }),
      saveUninitialized: false,
      resave: false, // we support the touch method so per the express-session docs this should be set to false
      proxy: true, // if you do SSL outside of node.
      cookie: {
        httpOnly: true //This send a secure cookie that cannot be accessed by browser JS
      }
    })
  );


//LOAD IN ROUTES
app.use('/', [view_routes, user_routes])


//sync our tables/models and waits until it connects to connect ot the port and start server
client.sync({ force: false })
  .then(() => {
        //start the server/Make the server listen for client side requests
        app.listen(PORT, () => {
            console.log('Server started on port', PORT)
        })
    });