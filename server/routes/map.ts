/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unused-vars */

import express, { Request, Response } from 'express';
const map = express();

const authCheck = (req: Request, res: Response, next: any) => {
  if (!req.user) {
    //if user not logged in
    res.redirect('/login');
  } else {
    next();
  }
};

const { User } = require('../../database/index');

map.get('/user', authCheck, async (req: Request, res: Response) => {
  res.status(201).send(req.user);
});


map.get('/:id', async (req: Request, res: Response) => {

  const user = await User.findOne({
    where: {
      id: req.params.id,
    }
  });
  return res.json(user.location);
});

module.exports = map;
