var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res){
    res.render('users/index',{
        users: db.get('users').value()
    });
};

module.exports.search = function(req, res){
    var q = req.query.q;
    var matchUsers = db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index',{
        users:matchUsers
    });
};

module.exports.createView = function(req, res){
    res.render('users/create');
};

module.exports.view = function(req, res){
    var id = req.params.id;
    var user = db.get('users').find({ id: id }).value();
    res.render('users/view', {
        users: user
    });
};

module.exports.createUser = function(req, res){
    req.body.id = shortid.generate();
    var error = [];
    if(!req.body.name){
        error.push("Name is required");
    }
    if(!req.body.phone){
        error.push("Phone is required");
    }
    if(error.length){
        res.render('users/create',{
            errors:error,
            values:req.body
        });
        return;
    }
    db.get('users').push(req.body).write();
    res.redirect('/users');
};
