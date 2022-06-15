/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unused-vars */

import express, { Request, Response } from 'express';
const map = express();

const { User, Job } = require('../../database/index');
// const { User } = require('../../database/index');
// const { EventComment } = require('../../database/index');
// const { EventParticipant } = require('../../database/index');

map.get('/userlocation/:id', async (req: Request, res: Response) => {
  console.log(req.params);
  const user = await User.findOne({
    where: {
      id: req.params.id,
    }
  });
  // console.log(user, 'USER');
  return res.json(user.location);
});

module.exports = map;
