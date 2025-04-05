var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require("dotenv").config();

var app = express();

app.set('view engine', 'ejs');  
app.set('views', path.join(__dirname, 'views'));  

var MongoDBUtil = require('./modules/mongodb/mongodb.module').MongoDBUtil;

app.use(cors({
    origin: ['http://localhost:3001', 'http://217.154.22.28:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

MongoDBUtil.init();

app.get('/', function (req, res) {
    var pkg = require(path.join(__dirname, 'package.json'));
    res.json({
        name: pkg.name,
        version: pkg.version,
        status: 'up'
    });
});

var indexRouter = require('./routes/index');  
app.use('/', indexRouter);

var apiRouter = require('./routes/api');
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);

    res.json({
        message: res.locals.message,
        error: res.locals.error
    });
});

module.exports = app;
