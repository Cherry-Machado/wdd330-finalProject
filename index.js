const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const router = require('./routes');

const app = express();


app.use('/', router());

// Set up Handlebars view engine
app.engine('handlebars', exphbs({
        defaultLayout: 'layout'
        //layoutsDir: __dirname + './views/layouts/'
    })
);

app.set('view engine', 'handlebars');

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);