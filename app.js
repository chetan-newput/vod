var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('product-newput');

var app = express();
console.log("app start");
console.log("process.env.MONGO_URI :: ",process.env.MONGO_URI);
var mongoose = require('mongoose');
var passport = require('passport');
//connect MongoDB
mongoose.connect(process.env.MONGO_URI, function(err,db){
    if (!err){
        console.log('Connected to MONGODB!', process.env.MONGO_URI);
    } else{
        console.log('Can not Connected to MONGODB! Errors:');
        console.dir(err); //failed to connect
    }
});
//console.log("app step2");
require('./models/Histories');
require('./models/Users');
require('./config/passport');
//console.log("app step3");
var routes = require('./routes/index');
var restRoutes = require('./routes/rest');
var users = require('./routes/users');
//console.log("app step4");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//console.log("app step5");
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/nmd', express.static(path.join(__dirname, 'node_modules')));

app.use(passport.initialize());

app.use('/rest', restRoutes);
app.use('/', routes);
app.use('/users', users);
//console.log("app step7");
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
//console.log("app step8");
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
//console.log("app step9");
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//app.listen(process.env.PORT ? process.env.PORT : 3000);
//if(app.get('port') === undefined){
  console.log("in app.js port ",app.get('port'), "process.env.PORT : ",process.env.PORT);
  app.set('port', (process.env.PORT || 3000));
  var server = app.listen(app.get('port'), function() {
    console.log("Express server listening on port ",server.address().port);
    debug('Express server listening on port ' + server.address().port);
  });
//}
module.exports = app;