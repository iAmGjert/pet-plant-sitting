const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const { db } = require('../database/index');
const app = express();
const authRouter = require('./routes/auth.ts');
const passport = require('passport');
require('dotenv').config();
require('./auth/passport.ts');

const { Server, Socket } = require('socket.io');

const { socket } = require('./socket');

const io = new Server(4000, {
  cors: {
    origin: 'http://localhost:5000',
    credentials: true,
  },
});

io.on('connection', (socket: typeof Socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (data: string) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room ${data}`);
  });

  socket.on('send_message', (data: any) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET, PUT, POST, PATCH, DELETE',
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const CLIENT_PATH = path.resolve(__dirname, '../client/build');
app.use(express.static(CLIENT_PATH));
app.use(express.json());
app.use(morgan('tiny'));

app.use('/auth', authRouter);
app.use('/api/map', require('./routes/map.ts'));
app.use('/api/events', require('./routes/events.ts'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/users', require('./routes/users'));
app.use('/api/pets_plants', require('./routes/pets_plants'));

app.get('/*', function (req: Request, res: Response | any) {
  res.sendFile(
    path.join(__dirname, '../client/build/index.html'),
    function (err: Error) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`🚀 Server is listening at http://localhost:${port}`);
});

db.authenticate()
  .then(() => console.log('✨ Connected to database'))
  .catch((err: string) => console.error(err));

export {};
