const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const { db } = require('../database/index');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../database/index');
// const color = require('cli-color');
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
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

//**************************** PASSPORT INIT *********************************** */

app.use(passport.initialize());
app.use(passport.session());

// require('./auth/passport_local.ts');
// app.use('/auth/local', require('./routes/auth_local.ts'));

//************************** PASSPORT - LOCAL - CONFIGURATION ********************************/

// passport.use( new LocalStrategy(/*{ usernameField: 'email', passwordField: 'password' },*/ (username: string, password: string, done: any) => {
//   User.findOne({ where: { username: username } })
//     .then((user : any | unknown) => {
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' }); 
//       }
//       bcrypt.compare(password, user.password, (err: Error, isMatch: boolean) => { 
//         if (err) { throw err; }
//         return isMatch ? done(null, user) : done(null, false, { message: 'Incorrect password.' });
//       });
//     }).catch((err: Error) => {
//       console.error(err);
//       return done(err);
//     });
// }));

// passport.serializeUser((user: any, done: any) => {
//   console.log('serialized User: ', user);
//   done(null, user.id);
// });

// passport.deserializeUser((userId: number, done: any) => {
//   User.findOne({ where: { id: userId } })
//     .then((user: any) => {
//       console.log('deserialize User: ', user);
//       done(null, user);
//     }).catch((err: Error) => {
//       console.error(err);
//       done(err);
//     });
// });



//*************************** PASSPORT - LOCAL - ROUTES *************************** */

// app.post('/auth/local/register', async (req: any, res: any) => {
//   console.log(req.body);
//   const { username, password } = req?.body;
//   try {
//     if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
//       res.send('Improper Values');
//       return;
//     }
//     // Check if user already exists
//     const returningUser = await User.findOne({ where: { username } });
//     if (returningUser) {
//       res.send('User already exists');
//       return;
//     } else { 
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = await User.create({
//         username,
//         password: hashedPassword,
//       });
//       res.status(200).json({
//         message: 'success',
//         success: true,
//         user: user,
//       });
//     }    
//   } catch (error) {
//     res.sendStatus(400);
//     console.log(error);  
//   }
// });

// app.post('/auth/local/login', (req: any, res: any, next: any) => {
//   passport.authenticate('local', {
//     successRedirect: '/loading',
//     failureRedirect: '/login/fail',
//     failureMessage: true,
//     successMessage: true,
//     session: false
//   }, (err: any, user: boolean, info: any, status: any) => {
//     console.log(info, status, 'info and status');
//     if (err) { throw err; }
//     if (!user) {
//       console.log(user);
//       console.log(req.body, 'req.body');
//       res.send('No User Exists'); 
//     } else {
//       req.logIn(user, (err: any) => {
//         if (err) { throw err; }
//         res.send('Successfully Authenticated');
//         // console.log(req.user, 'logged in');
//         console.log(color.xterm(11).bold(`\n[ ${req.session.passport.user.username} is logged in ]\n`));

//       });
//     }
//   })(req, res, next);
// });

// app.get('/auth/local/user', (req: any, res: any) => {
//   res.send(req.user);
// });








//****************************** OTHER - ROUTES ******************************************* */
app.use('/auth', require('./routes/auth.ts'));

app.use('/api/map', require('./routes/map.ts'));
app.use('/api/events', require('./routes/events.ts'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/users', require('./routes/users'));
app.use('/api/gallery', require('./routes/gallery'));
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
  console.log(`🚀 Server is listening at ${process.env.CLIENT_URL}:${port}`);
});

db.authenticate()
  .then(() => console.log('✨ Connected to database'))
  .catch((err: string) => console.error(err));

export {};
