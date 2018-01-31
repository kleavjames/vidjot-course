const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcryt = require('bcryptjs');

// Load user model
const User = mongoose.model('users');

module.exports = function(passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email'}, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then( user => {
        if(!user) {
          return done(null, false, {message: 'User not found.'});
        }

        // Match password
        bcryt.compare(password, user.password, (err, isMatch) => {
          if(err) throw err;
          
          if(isMatch) {
            return done(null, user);
          } else {
            return done(null, false, {message: 'Password incorrect.'});
          }
        })
      })
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}