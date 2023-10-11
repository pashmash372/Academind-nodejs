const http = require('http');

const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
    console.log('This always runs!');
    next(); // Allows the request to continue to the next middleware in line
});

app.use('/add-product', (req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1>The "Add Product" page!</h1>'); // Sends a response   
});

app.use('/', (req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1>Hello from Express!</h1>'); // Sends a response   
});

app.listen(3000);