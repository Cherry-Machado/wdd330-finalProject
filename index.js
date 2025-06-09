const path = require('path');
const express = require('express');
const {engine} = require('express-handlebars');
const router = require('./routes');
const app = express();


app.use('/', router());

// Set up Handlebars view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(5000);