const { User, PetPlant, Job, JobApplicant, JobPetsPlants } = require('../../database/index');


import express, { Request, Response } from 'express';
const jobs = express();


interface jobInfo {
  location: string;
  pet_plant: Array<number>;
  employer_id: number;
  sitter_id: number;
  startDate: Date;
  endDate: Date;
  description: string;
}
interface applicantInfo {
  id: number,
  job_id: number,
  pet_plant_id: number
}

jobs.post('/create', async (req: Request, res: Response) => {
  const { location, pet_plant, employer_id, sitter_id, startDate, endDate, description, isCompleted } = req.body;
  console.log('create job', req.body);
  try {
    const job = await Job.create(<jobInfo>{
      location,
      pet_plant,
      employer_id,
      sitter_id,
      startDate,
      endDate,
      description,
      isCompleted
    });
    res.status(201).send(job);
    return job;
  } catch {
    res.status(418).send(req.body);
  }
});

jobs.get('/all', async (req: Request, res: Response) => {
  try {
    const jobs = await Job.findAll({
      include: [
        { model: User, attributes: ['name', 'image'], as: 'sitter' },
        { model: JobApplicant, include: [{ model: User, attributes: ['name', 'image']}] },
        { model: JobPetsPlants, include: [{ model: PetPlant, attributes: ['name', 'image']}] },
      ]
    });
    return res.status(200).send(jobs);
  } catch (err) {
    return res.status(418).send(err);
  }
});

jobs.get('/:id', async (req: Request, res: Response) => {
  const job = await Job.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      { model: User, attributes: ['name', 'image'], as: 'sitter' },
      { model: JobApplicant, include: [{ model: User, attributes: ['name', 'image']}] },
      { model: JobPetsPlants, include: [{ model: PetPlant, attributes: ['name', 'image']}] },
    ]
  });
  return res.status(200).send(job);
});

jobs.post('/applicant/create', (req: Request, res: Response) => {
  //console.log(req.body);
  const { job_id, user_id } = req.body;
  JobApplicant.create({ job_id, user_id })
    .then((jobApplicant: Record<string, applicantInfo> | null) => {
      console.log(jobApplicant.dataValues);
      res.status(201).send(jobApplicant?.dataValues);
    })
    .catch((err: Error) => {
      res.status(500).send(err);
    });
});

jobs.post('/jobPetsPlants/create', (req: Request, res: Response) => {
  const { job_id, pet_plant_id } = req.body;
  JobPetsPlants.create({ job_id, pet_plant_id })
    .then((jobPetsPlants: Record<string, applicantInfo> | null) => {
      res.status(201).send(jobPetsPlants?.dataValues);
    })
    .catch((err: Error) => {
      res.status(500).send(err);
    });
});

module.exports = jobs;
