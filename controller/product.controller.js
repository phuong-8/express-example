var db = require('../db');

module.exports.product = function(req, res){
    var page = parseInt(req.query.page) || 1;
    var perPage = 6;

    var start = (page - 1) * perPage;
    var end = page*perPage;
    // var drop = (page - 1)*perPage;
    var length = Math.ceil(parseFloat(db.get('products').value().length / perPage));
    res.render('products/index', {
        products: db.get('products').value().slice(start, end),
        // products: db.get('products').drop(drop).take(perPage).value()
        length: length,
        page: page
    });
}