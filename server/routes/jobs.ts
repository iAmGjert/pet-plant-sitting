import express, { Request, Response } from 'express';
const jobs = express();

import { User, Job } from '../../database/index';

interface jobInfo {
  name: string;
  location: string;
  pet_plant: Array<number>;
  employer_id: number;
  sitter_id: number;
}

jobs.post('/create', async (req: Request, res: Response) => {
  const { name, location, pet_plant, employer_id, sitter_id } = req.body;
  try {
    const job = await Job.create({
      name,
      location,
      pet_plant,
      employer_id,
      sitter_id,
    });
    res.status(201).send(job);
    return job;
  } catch {
    res.status(418).send(req.body);
  }
});

jobs.get('/allJobs', async (req: Request, res: Response) => {
  try {
    const jobs = await Job.findAll();
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
