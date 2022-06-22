import express, { Request, Response } from 'express';
const rating = express();

import { Rating } from '../../database/index';

rating.get('/all', async (req: Request, res: Response) => {
  try {
    const ratings = await Rating.findAll();
    return res.status(200).send(ratings);
  } catch (err) {
    return res.status(404).send(err);
  }
});
