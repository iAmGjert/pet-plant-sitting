import express, { Request, Response } from 'express';
const pets_plants = express();

import { PetPlant } from '../../database/index';

interface petPlantInfo {
  owner_id: number;
  name: string;
  image: string;
  breed: string;
  species: string;
  tags: Array<string>;
  rating: number;
  total_ratings: number;
  is_plant: boolean;
}

pets_plants.get('/all', async (req: Request, res: Response) => {
  try {
    const pets_plants = await PetPlant.findAll();
    return res.status(200).send(pets_plants);
  } catch {
    return res.sendStatus(418);
  }
});

pets_plants.get('/:id', async (req: Request, res: Response) => {
  const user = await PetPlant.findOne({
    where: {
      id: req.params.id,
    },
  });
  return res.status(200).send(user);
});

pets_plants.delete('/:id', async (req: Request, res: Response) => {
  PetPlant.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err: Error) => {
      console.log(err, 'delete petplant err');
    });
});

pets_plants.post('/create', async (req: Request, res: Response) => {
  const {
    owner_id,
    name,
    image,
    breed,
    species,
    tags,
    age,
    bio,
    rating,
    total_ratings,
    is_plant,
  } = req.body;
  try {
    const user = await PetPlant.create(<petPlantInfo>{
      owner_id,
      name,
      image,
      breed,
      species,
      tags,
      rating,
      total_ratings,
      is_plant,
    });
    res.status(201).send(user);
    return user;
  } catch {
    res.status(418).send(req.body);
  }
});

pets_plants.put('/:id', async (req: Request, res: Response) => {
  console.log(req.body);
  PetPlant.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((results: any) => {
      console.log(results);
      res.sendStatus(200);
    })
    .catch((err: Error) => {
      console.error(err, 'put user error');
      res.sendStatus(404);
    });
});

module.exports = pets_plants;
