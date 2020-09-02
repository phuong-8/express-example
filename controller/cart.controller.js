const db = require("../db");

module.exports.index = function(req, res, netx){
    var sessionId = req.params.sessionId;
    
    var carts
    res.render('cart',{
        carts: carts
    });
}

module.exports.addToCart = function(req, res, next){
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;

    if(!sessionId){
        res.redirect('/products');
        return;
    }
    
    var count = db.get('sessions').find({
        id: sessionId
    }).get('cart.' + productId, 0).value();

    db.get('sessions').find({
        id: sessionId
    }).set('cart.' + productId, count + 1).write();
    res.redirect('/products');
}