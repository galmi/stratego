var mongoose = require('mongoose');
var User = mongoose.model('User');
var facebookCanvas = require("./passport/facebook-canvas");

module.exports = function (passport) {
  // serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  });

  passport.deserializeUser(function(id, done) {
    User.load({ criteria: { _id: id } }, function (err, user) {
      done(err, user)
    })
  });

  // use these strategies
  passport.use(facebookCanvas);
};