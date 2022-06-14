const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const passport = require('passport');
// const User = require('../../database/models/Users.model.ts');
const { User } = require('../../database/index.ts');


const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, DB_HOST, PORT, CLIENT_URL } = process.env;


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${CLIENT_URL}:${PORT}/auth/google/callback`
  },
  (accessToken, refreshToken, profile, cb) => {
    User.findOrCreate({ name: profile.displayName }, {
      name: profile.displayName,
      image: profile.picture

    }, (err, user) => {
      return cb(err, user);
    });
  }
));

passport.serializeUser((user, callback) => {
  callback(null, user.id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id, (error, user) => {
    callback(error, user);
  });
});
