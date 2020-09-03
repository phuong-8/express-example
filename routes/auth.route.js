var express = require('express');

var multer  = require('multer');
var upload = multer({ dest: './public/uploads/avatar' });

var controller = require('../controller/auth.controller');

var router = express.Router();

router.get('/login', controller.login);

router.get('/logup', controller.logup);

router.get('/info', controller.info);

router.post('/login', controller.postLogin);

router.post('/logup', controller.postLogup);

router.post('/postInfo', controller.postInfo);

module.exports = router;