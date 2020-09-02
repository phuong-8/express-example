require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');

var seesionMiddleware = require('./middlewares/session.middleware');
var middleRequire = require('./middlewares/auth.middleware');

var port = 3000;
var app = express();
app.set('view engine', 'pug');
app.set('./views', 'views');
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(seesionMiddleware);
//truy cao file tinh
app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('index', {
        name: 'Phuong'
    });
});

app.use('/users', middleRequire.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);

app.listen(port, function(){
    console.log('server is running on port: ' + port);
});

