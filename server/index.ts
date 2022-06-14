const express = require('express');
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
const { db } = require('../database/index');
const app = express();
const authRouter = require('./routes/auth.ts');
const passport2 = require('passport');
require('dotenv').config();
require('./auth/passport.ts');


app.use(session({
  secret: process.env.SESSION_SECRET
}));
app.use(passport2.initialize());
app.use(passport2.session());



const CLIENT_PATH = path.resolve(__dirname, '../client/build');
app.use(express.static(CLIENT_PATH));
app.use(express.json());
app.use(morgan('tiny'));

app.use('/auth', authRouter);


  
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server is listening at http://localhost:${port}`);
});

db.authenticate()
  .then(() => console.log('🥂 Connected to database'))
  .catch((err: string) => console.error(err));
