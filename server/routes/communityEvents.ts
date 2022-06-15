/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unused-vars */

import express, { Request, Response } from 'express';
const router = express();

const { Events } = require('../../database/index');
// const { User } = require('../../database/index');
// const { EventComment } = require('../../database/index');
// const { EventParticipant } = require('../../database/index');

router.post('/create', async (req: Request, res: Response) => {
  const { name, host, location, description, participants } = req.body;
  const event = await Events.create({
    name,
    host,
    location,
    description,
  });
  return res.json(event);
});

module.exports = router;
