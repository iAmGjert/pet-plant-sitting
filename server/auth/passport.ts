const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const passport = require('passport');
// const User = require('../../database/models/Users.model.ts');
const { User } = require('../../database/index.ts');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, DB_HOST, PORT, CLIENT_URL } =
  process.env;

<<<<<<< HEAD
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, DB_HOST, PORT, CLIENT_URL } = process.env;


passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${CLIENT_URL}:${PORT}/auth/google/callback`
},
(accessToken: any, refreshToken: any, profile: any, cb: any) => {
  User.findOrCreate({ where: {name: profile.displayName}, defaults: {
    name: profile.displayName,
    image: profile.picture
  } })
    .then((err: any, user: any) => {
      return cb(err, user);
    })
    .catch((err: any) => {
      console.log(err);
    });
}
));
=======
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${CLIENT_URL}:${PORT}/auth/google/callback`,
    },
    (accessToken: any, refreshToken: any, profile: any, cb: any) => {
      User.findOrCreate({ where: { name: profile.displayName } })
        .then((user: any) => {
          return cb(null, user);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  )
);
>>>>>>> ed2272dd312c4c6c1196f8dbdec3886d6fd15204

passport.serializeUser((user: any, callback: any) => {
  callback(null, user);
});

// passport.deserializeUser((id: any, callback: any) => {
//   User.findById(id)
//     .then((user: any) => {
//       callback(null, user);
//     })
//     .catch(callback);
// });
passport.deserializeUser((user: any, done: any) => {
  done(null, user);
});

export {};
