/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unused-vars */

import express, { Request, Response } from 'express';
const map = express();

const { User } = require('../../database/index');


map.get('/:id', async (req: Request, res: Response) => {

  const user = await User.findOne({
    where: {
      id: req.params.id,
    }
  });
  return res.json(user.location);
});

module.exports = map;
