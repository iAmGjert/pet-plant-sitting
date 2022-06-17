import express, { Request, Response } from 'express';
const jobs = express();

import { Job } from '../../database/index';

interface jobInfo { 
  location: string,
  pet_plant: Array<number>,
  employer_id: number,
  sitter_id: number,
  startDate: Date,
  endDate: Date
}

jobs.post('/create', async (req: Request, res: Response) => {
  const { location, pet_plant, employer_id, sitter_id, startDate, endDate } = req.body;
  try {
    const job = await Job.create(<jobInfo>{
      location,
      pet_plant,
      employer_id,
      sitter_id,
      startDate,
      endDate
    });
    res.status(201).send(job);
    return job;
  } catch {
    res.status(418).send(req.body);
  }
});

jobs.get('/all', async (req: Request, res: Response) => {
  try {
    const jobs = await Job.findAll();
    console.log('hello');
    return res.status(200).send(jobs);

  } catch {
    return res.sendStatus(418);
  }
});

jobs.get('/:id', async (req: Request, res: Response) => {

  const job = await Job.findOne({
    where: {
      id: req.params.id,
    }
  });
  return res.status(200).send(job);
});


module.exports = jobs;
