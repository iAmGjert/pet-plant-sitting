const passport = require('passport');
import express, { Request, Response } from 'express';
const auth = express();
require('dotenv').config();
const { User, PetPlant, Rating } = require('../../database/index.ts');
const CLIENT_URL: string | undefined =
  process.env.CLIENT_URL === 'http://localhost'
    ? `${process.env.CLIENT_URL}:${process.env.PORT}`
    : process.env.CLIENT_URL;

auth.get('/login/success', (req: Request | any, res: Response) => {
  if (req.user) {
    User.findOne({
      where: {
        id: req.user[0].id,
      },
      include: [
        {
          model: PetPlant,
          include: [
            {
              model: Rating,
              include: [
                { model: User, attributes: ['name', 'image'], as: 'submitter' },
              ],
            },
          ],
        },
        {
          model: Rating,
          include: [
            { model: User, attributes: ['name', 'image'], as: 'submitter' },
          ],
        },
      ],
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
    successRedirect: '/loading',
    failureRedirect: '/login/fail',
  })
);

auth.get('/logout', (req: Request, res: Response) => {
  req.logOut(() => {
    res.redirect('/');
  });
});

module.exports = auth;
