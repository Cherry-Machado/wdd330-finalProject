const mongoose = require('mongoose');
require('./config/db');
const path = require('path');
const express = require('express');
const {engine} = require('express-handlebars');
const router = require('./routes');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

require('dotenv').config({path: 'variables.env'});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongoUrl: process.env.DATABASE_URL,
    collectionName: 'sessions'
  }), 
})); 

// Initialize alerts and flash messages
app.use(flash());

// Middleware to set flash messages and user data in response locals
app.use((req, res, next) => {
  res.locals.mensajes = req.flash('mensajes');
  res.locals.usuario = { ...req.session.usuario } || null;
  console.log('Contenido de res.locals.mensajes (en el middleware de res.locals):', res.locals.mensajes);
  next();
});


// Set up Handlebars view engine
app.engine('handlebars', engine({
  defaultLayout: 'main',
  helpers: require('./helpers/handlebars')
}));

app.set('view engine', 'handlebars');
app.set('views', './views');



app.use('/', router());

const host = process.env.HOST
const port = process.env.PORT;

app.listen(port, host, () => {
  console.log('Server running Ok');
});

