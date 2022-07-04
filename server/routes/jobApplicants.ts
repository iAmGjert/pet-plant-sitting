const { User, PetPlant, Job, JobApplicant, JobPetsPlants } = require('../../database/index');

import express, { Request, Response } from 'express';
const jobApplicants = express();

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


jobApplicants.get('/byuser', async (req: Request | any, res: Response) => {
  try {
    const applications = await JobApplicant.findAll({
      where: { user_id: req.user[0]?.id || req.user?.id },
      include: [ {model: Job} ]
    }); 
    res.json(applications);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}); 


jobApplicants.delete('/delete/:id', async (req: Request, res: Response) => {
  console.log(req.body, 'body');
  const deletedApplication = await JobApplicant.destroy({
    where: {
      id: req.params.id
    }
  });
  //return res.sendStatus(200).send(deletedApplication);
  return res.json(deletedApplication);
});

// PATCH Request(s)

jobApplicants.patch('/:user_id/:job_id', async (req: Request, res: Response) => {
  const { user_id, job_id } = req.params;
  const { status } = req.body;

  JobApplicant.update({
    status
  }, {
    where: {
      user_id,
      job_id
    }
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error: Error) => {
      res.sendStatus(500);
      console.log(error);
    })
})


module.exports = jobApplicants;
