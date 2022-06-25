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


jobApplicants.get('/byuser', async (req: Request, res: Response) => {
  //console.log(req.user);//array of user object with id
  const applications = await JobApplicant.findAll({
    include: [
      { model: Job }
    ], 
    where: {
      user_id: req.user[0].id
    }
  });


  //return res.sendStatus(200).send(applications);
//  } catch (err) {
//     return res.status(418).send(err);
//   }
  res.json(applications);
}); 


jobApplicants.delete('/delete/:id', async (req: Request, res: Response) => {
  const deletedApplication = await JobApplicant.destroy({
    where: {
      id: req.params.id
    }
  });
  //return res.sendStatus(200).send(deletedApplication);
  return res.json(deletedApplication);
});


module.exports = jobApplicants;
