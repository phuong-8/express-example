var express = require('express');

var controller = require('../controller/user.controller');
var validate = require('../validate/user.validate');
var middleware = require('../middlewares/auth.middleware');

var router = express.Router();

router.get('/', middleware.requireAuth, controller.index);

router.get('/cookie', function(req, res){
    res.cookie('user-id', 12345);
    res.send('hello');
});

router.get('/search', controller.search);

router.get('/create', controller.createView);

router.get('/:id', controller.view);

router.post('/create', validate.postCreate, controller.createUser);

module.exports = router;