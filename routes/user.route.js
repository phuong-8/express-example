var express = require('express');
var multer  = require('multer');

var controller = require('../controller/user.controller');
var validate = require('../validate/user.validate');
var middlewareReqiure = require('../middlewares/auth.middleware');

var upload = multer({ dest: './public/uploads/' });
var router = express.Router();

router.get('/', middlewareReqiure.requireAuth, controller.index);

router.get('/cookie', function(req, res, next){
    res.cookie('user-id', 12345);
    res.send('hello');
});

router.get('/search', controller.search);

router.get('/create', controller.createView);

router.get('/:id', controller.view);

router.post('/create',
    upload.single('avatar'),
    validate.postCreate,
    controller.createUser);

module.exports = router;