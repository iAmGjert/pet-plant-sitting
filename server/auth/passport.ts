const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const passport = require('passport');
const { User } = require('../../database/index.ts');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PORT, CLIENT_URL } =
  process.env;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${CLIENT_URL}:${PORT}/auth/google/callback`,
}, (accessToken: any, refreshToken: any, profile: { displayName: any/*, emails: [{value: string}]*/ },
  cb: (arg0: null, arg1: any) => any) => {
  // console.log(`USER INFO: 
  //   ${JSON.stringify({
  //   id: profile.id,
  //   name: profile.displayName,
  // }, null, 2)}`);
  //? User.findOrCreate({ where: { id: +profile.id % 10e8 }, 
  //? defaults: { name: profile.displayName, email: profile.emails[0].value } }) 

  User.findOrCreate({ where: { name: profile.displayName }, /*defaults: { username: profile.emails[0].value }*/ }).then((user: any) => cb(null, user))
    .catch((err: any) => console.log(err));
}));


passport.use(new LocalStrategy(/*{ usernameField: 'email', passwordField: 'password' },*/ (username: string, password: string, done: any) => {
  User.findOne({ where: { username: username } })
    .then((user : any | unknown) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' }); 
      }
      bcrypt.compare(password, user.password, (err: Error, isMatch: boolean) => { 
        if (err) { throw err; }

        if (isMatch) {
          console.log('Passport Local Config ln34');
          return done(null, user, { message: 'Credentials match' });
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    }).catch((err: Error) => {
      console.error(err);
      return done(err);
    });
}));

passport.serializeUser((user: any, done: any) => {
  console.log('serialized User: ', user.id);      
  done(null, user);
});

passport.deserializeUser((user: any, done: any) => {
  console.log('deserialize User:', user.id || user[0].id);
  if (user.id) {
    User.findByPk(user.id)
      .then((user: any) => {
        done(null, user);
      })
      .catch(done);
  } else {
    done(null, user);
  }
  
});

  
export {};
