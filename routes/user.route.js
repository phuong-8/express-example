var express = require('express');

var db = require('../db');
var controller = require('../controller/user.controller');

var router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.createView);

router.get('/:id', controller.view);

router.post('/create', controller.createUser);

module.exports = router;