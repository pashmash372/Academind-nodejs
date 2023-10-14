const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');

const express = require('express');

const app = express();

app.set('view engine','pug'); // Set a value globally for the express app
app.set('views','views'); // Set a value globally for the express app

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false})); // Register a middleware
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res, next) => {    
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});

app.listen(3000);