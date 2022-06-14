const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const passport3 = require('passport');
// const User = require('../../database/models/Users.model.ts');
const { User } = require('../../database/index.ts');


const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, DB_HOST, PORT, CLIENT_URL } = process.env;


passport3.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${CLIENT_URL}:${PORT}/auth/google/callback`
  },
  (accessToken: any, refreshToken: any, profile: any, cb: any) => {
    User.findOrCreate({ name: profile.displayName }, {
      name: profile.displayName,
      image: profile.picture

    }, (err: any, user: any) => {
      return cb(err, user);
    });
  }
));

passport3.serializeUser((user: any, callback: any) => {
  callback(null, user.id);
});

passport3.deserializeUser((id: any, callback: any) => {
  User.findById(id, (error, user) => {
    callback(error, user);
  });
});
