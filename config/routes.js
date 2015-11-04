var auth = require('auth');
var index = require('index');

module.exports = function (app, passport) {
  "use strict";

  app.get('/', index.index);

  app.get('/auth/fb/', auth.fb);
  //app.use('/users', users);
//app.use('/auth', auth);

  app.get('/auth/facebook', passport.authenticate('facebook-canvas'));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook-canvas', {
      successRedirect: '/auth/fb',
      failureRedirect: '/error'
    }));

  app.post('/auth/fb',
    passport.authenticate('facebook-canvas', {
      successRedirect: '/auth/fb',
      failureRedirect: '/auth/fb/autologin'
    }));

  app.get('/auth/fb/autologin', function (req, res) {
    res.send('<!DOCTYPE html>' +
      '<body>' +
      '<script type="text/javascript">' +
      'top.location.href = "/auth/facebook";' +
      '</script>' +
      '</body>' +
      '</html>');
  });

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

// development error handler
// will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

// production error handler
// no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

};
