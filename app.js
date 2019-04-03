var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./Database/db');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var voitureRouter = require('./api/voitures');
var conducteurRouter = require('./api/conducteurs');
var stationnementRouter = require('./api/stationnements');
var garantieRouter = require('./api/garanties');
var dossierInscriptionRouter = require('./api/dossierInscriptions');
//var usersRouter = require('./api/users ');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/voitures',voitureRouter);
app.use('/conducteurs',conducteurRouter);
app.use('/stationnements',stationnementRouter);
app.use('/garanties',garantieRouter);
app.use('/inscriptions',dossierInscriptionRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
