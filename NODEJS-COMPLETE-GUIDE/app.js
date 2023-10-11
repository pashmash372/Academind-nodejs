const http = require('http');
const bodyParser = require('body-parser');

const express = require('express');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false})); // Register a middleware

app.use(adminRoutes);
app.use(shopRoutes);

app.listen(3000);