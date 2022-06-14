const express = require('express');
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
const { db } = require('../database/index');
const app = express();
const authRouter = require('./routes/auth.ts');
const passport = require('passport');
require('dotenv').config();
require('./auth/passport.ts');

<<<<<<< HEAD

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
=======
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
<<<<<<< HEAD
app.use(passport2.initialize());
app.use(passport2.session());
>>>>>>> ed2272dd312c4c6c1196f8dbdec3886d6fd15204
=======
app.use(passport.initialize());
app.use(passport.session());
>>>>>>> 9b4bc7e9403066aa7cc8755fbe3fcda2b71ef41e

const CLIENT_PATH = path.resolve(__dirname, '../client/build');
app.use(express.static(CLIENT_PATH));
app.use(express.json());
app.use(morgan('tiny'));

app.use('/auth', authRouter);

const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`🚀 Server is listening at http://localhost:${port}`);
});

db.authenticate()
  .then(() => console.log('🥂 Connected to database'))
  .catch((err: string) => console.error(err));

export {};
