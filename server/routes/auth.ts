const passport = require('passport');
import express, { Request, Response } from 'express';
const auth = express();
require('dotenv').config();
const { User } = require('../../database/index.ts');
const CLIENT_URL: string | undefined =
  process.env.CLIENT_URL === 'http://localhost'
    ? `${process.env.CLIENT_URL}:${process.env.PORT}`
    : process.env.CLIENT_URL;

auth.get('/login/success', (req: Request | any, res: any) => {
  if (req.user) {
    User.findOne({
      where: {
        id: req.user[0].id,
      },
    })
      .then((user: object) => {
        res.status(200).json({
          message: 'success',
          success: true,
          user: user,
        });
      })
      .catch((error: string) => {
        res.sendStatus(400);
        console.log(error);
      });
  }
});

auth.get('/login/fail', (req: Request, res: Response) => {
  res.sendStatus(400).redirect('/login');
});

auth.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

auth.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/fail',
  })
);

auth.get('/logout', (req: any, res: any) => {
  req.logOut(() => {
    res.redirect(CLIENT_URL);
  });
});

module.exports = auth;
