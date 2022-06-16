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

const { createServer } = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const config = require('config');

const { socket } = require('./socket');

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5000/chat',
    credentials: true,
  },
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const CLIENT_PATH = path.resolve(__dirname, '../client/build');
app.use(express.static(CLIENT_PATH));
app.use(express.json());
app.use(morgan('tiny'));

app.use('/auth', authRouter);

const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`🚀 Server is listening at http://localhost:${port}`);

  socket({ io });
});

db.authenticate()
  .then(() => console.log('🥂 Connected to database'))
  .catch((err: string) => console.error(err));

export {};
