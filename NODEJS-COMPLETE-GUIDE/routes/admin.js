const express = require('express');
const path = require('path');
const rootDir = require('../util/path');
const exp = require('constants');

const router = express.Router();

const product=[];

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html')); // __dirname is the path to the current file
});

router.post('/add-product', (req, res, next) => {
    // console.log(req.body);
    product.push({title: req.body.title});
    res.redirect('/');
}); 

exports.routes = router;
exports.products = product;