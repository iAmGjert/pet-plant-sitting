const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const { db } = require('../database/index');
const passport = require('passport');
const cookieParser = require('cookie-parser');
require('dotenv').config();
require('./auth/passport.ts');

const app = express();


/* 
█▀█ █░░ █▀▀ ▄▀█ █▀ █▀▀   █▀▄▀█ ▄▀█ █ █▄░█ ▀█▀ ▄▀█ █ █▄░█   ▀█▀ █░█ █▀▀   █▀█ █▀█ █▀▄ █▀▀ █▀█   
█▀▀ █▄▄ ██▄ █▀█ ▄█ ██▄   █░▀░█ █▀█ █ █░▀█ ░█░ █▀█ █ █░▀█   ░█░ █▀█ ██▄   █▄█ █▀▄ █▄▀ ██▄ █▀▄   

█▀█ █▀▀   ▀█▀ █░█ █▀▀
█▄█ █▀░   ░█░ █▀█ ██▄

█▀▄▀█ █ █▀▄ █▀▄ █░░ █▀▀ █░█░█ ▄▀█ █▀█ █▀▀
█░▀░█ █ █▄▀ █▄▀ █▄▄ ██▄ ▀▄▀▄▀ █▀█ █▀▄ ██▄
*/
//──────▄▀▄─────▄▀▄
//─────▄█░░▀▀▀▀▀░░█▄
//─▄▄──█░░░░░░░░░░░█──▄▄
//█▄▄█─█░░▀░░┬░░▀░░█─█▄▄█            
//**************************SOCKET SERVER****************************/

const { Server, Socket } = require('socket.io');
const { socket } = require('./socket');
const io = new Server(4000, {
  cors: {
    origin: `${process.env.CLIENT_URL}:5000`,
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

//*****************************STATIC MIDDLEWARE***********************************/

const CLIENT_PATH = path.resolve(__dirname, '../client/build');
app.use(morgan('tiny'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: 'GET, PUT, POST, PATCH, DELETE',
  credentials: true,
}));
app.use(express.static(CLIENT_PATH));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

app.use(cookieParser(process.env.SESSION_SECRET));
//**************************** PASSPORT INIT *********************************** */

app.use(passport.initialize());
app.use(passport.session());


//****************************** OTHER - ROUTES ******************************************* */
app.use('/auth', require('./routes/auth.ts'));

app.use('/api/map', require('./routes/map.ts'));
app.use('/api/events', require('./routes/events.ts'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/users', require('./routes/users'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/pets_plants', require('./routes/pets_plants'));
app.use('/api/jobapplicants', require('./routes/jobApplicants'));

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
  console.log(`🚀 Server is listening at ${process.env.CLIENT_URL}:${port}`);
});

db.authenticate()
  .then(() => console.log('✨ Connected to database'))
  .catch((err: string) => console.error(err));

export {};
