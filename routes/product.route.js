var express = require('express');

var controller = require('../controller/product.controller');

var router = express.Router();

router.get('/', controller.product);

module.exports = router;