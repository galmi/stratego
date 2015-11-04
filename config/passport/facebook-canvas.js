var config = require("config");
var mongoose = require('mongoose');
var User = mongoose.model('User');

var FacebookStrategy = require('passport-facebook-canvas');

module.exports = new FacebookStrategy({
    clientID: config.Facebook.appId,
    clientSecret: config.Facebook.appSecret,
    callbackURL: "https://stratego.moisocialki.ru:3000/auth/facebook/callback",
    authType: "rerequest",
    scope: ['first_name', 'last_name', 'age_range', 'picture', 'email'],
    profileFields: ['first_name', 'last_name', 'age_range', 'picture', 'email', 'link']
  },
  function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    var options = {
      criteria: {'socialId': profile.id}
    };
    User.load(options, function (err, user) {
      if (err) return done(err);
      if (!user) {
        user = new User({
          firstname: profile.first_name,
          lastname: profile.last_name,
          email: profile.email,
          username: profile.name,
          social: 'Facebook',
          socialId: profile.id,
          photo: profile.picture ? profile.picture.data.url : 'no_photo.png',
          link: profile.link,
          accessToken: accessToken
        });
        user.save(function (err) {
          if (err) console.log(err);
          return done(err, user);
        });
      } else {
        return done(err, user);
      }
    });
  }
);