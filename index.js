const mongoose = require('mongoose');
require('./config/db');
const path = require('path');
const express = require('express');
const {engine} = require('express-handlebars');
const router = require('./routes');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

require('dotenv').config({path: 'variables.env'});

const app = express();

app.use('/', router());

// Set up Handlebars view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

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

const port = process.env.PORT;
const host = process.env.HOST || 'localhost';

app.listen(port, host, () => {
  console.log('Server running Ok');
});

