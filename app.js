require("./babelhook.js");

var fs = require('fs');
var pass = require('path');
var express = require('express');
var mongoose = require('mongoose');
var config = require('config');
var passport = require('passport');

global.__app = pass.join(__dirname, 'app');

var app = express();

// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap models
fs.readdirSync(pass.join(__dirname, 'app/models')).forEach(function (file) {
  if (~file.indexOf('.js')) require(pass.join(__dirname, 'app/models', file));
});

// Bootstrap passport config
require('./config/passport')(passport);

// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap routes
require('./config/routes')(app, passport);

module.exports = app;
