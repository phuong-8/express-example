var md5 = require('md5');
var db = require('../db');
var shortid = require('shortid');
const { generate } = require('shortid');

module.exports.login = function(req, res){
    res.render('auth/login');
};

module.exports.postLogin = function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    var user = db.get('users').find({email: email}).value();
    
    if(!user){
        res.render('auth/login', {
            errors: [
                'User does no exits.'
            ],
            values: req.body
        });
        return;
    }
    var hashPassword = md5(password);
    if(user.password !== hashPassword){
        res.render('auth/login',{
            errors: [
                'Wrong password.'
            ],
            values: req.body
        });
        return;
    }
    res.cookie('userId', user.id, {
        signed:true
    });
    res.redirect('/');
};

module.exports.logup = function(req, res){
    res.render('auth/logup');
};

module.exports.postLogup = function(req, res){
    var email = req.body.email;
    var password1 = req.body.password1;
    var password2 = req.body.password2;
    var user = db.get('users').find({email: email}).value();
    
    if(user){
        res.render('auth/logup', {
            errors: [
                'Email already in use'
            ],
            values: req.body
        });
        return;
    }
    
    if(password1 !== password2){
        res.render('auth/login',{
            errors: [
                'Mật khẩu không khớp'
            ],
            values: req.body
        });
        return;
    }
    var hashPassword = md5(password1);
    db.get('users').push({
        id: shortid.generate(),
        email: req.body.email,
        password: hashPassword
    }).write();
    res.redirect('/');
};

module.exports.info = function(req, res){
    var id = req.signedCookies.userId;
    if(!id){
        res.redirect('/');
        return;
    }
    var user = db.get('users').find({ id: id }).value();
    res.render('auth/info', {
        user: user
    });
}

module.exports.postInfo = function(req, res){
    
}