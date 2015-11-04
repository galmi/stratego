'use strict';

var config = require('config');

exports.fb = function(req, res, next) {
  res.render('auth/fb', {
    title: 'Express',
    appId: config.Facebook.appId
  });
};