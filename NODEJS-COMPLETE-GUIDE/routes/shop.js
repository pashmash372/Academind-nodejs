const express = require('express');
const path = require('path');
const rootDir = require('../util/path');
const  adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    const products = adminData.products;
    console.log('shop.js',products);
    res.sendFile(path.join(rootDir, 'views', 'shop.html')); // __dirname is the path to the current file
});

module.exports = router;