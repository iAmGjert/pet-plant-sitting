import express, { Request, Response } from 'express';
const users = express();
import {
  PetPlant,
  User,
  Rating,
  Gallery,
  GalleryEntry,
} from '../../database/index';

interface userInfo {
  id: number;
  name: string;
  image: string;
  location: string;
  sitter_rating: number;
  total_sitter_ratings: number;
  bio: string;
  average_rating: number;
  total_ratings: number;
  gallery_id: number;
}

users.get('/all', async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      include: [{ model: PetPlant, include: Rating }, { model: Rating }],
    });
    return res.status(200).send(users);
  } catch {
    return res.sendStatus(418);
  }
});

users.put('/:id', async (req: Request, res: Response) => {
  User.update(req.body, { where: { id: req.body.id } })
    .then(() => {
      res.sendStatus(200);
      console.log('HERE');
    })
    .catch((err: Error) => {
      console.error(err, 'put user error');
      res.sendStatus(404);
    });
});

users.patch('/:id', async (req: Request, res: Response) => {
  User.update(req.body, { where: { id: req.params.id } })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err: Error) => {
      console.error(err, 'put user error');
      res.sendStatus(404);
    });
});

users.get('/:id', async (req: Request, res: Response) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: PetPlant,
        include: [
          {
            model: Rating,
            include: [
              {
                model: User,
                attributes: ['name', 'image', 'id'],
                as: 'submitter',
              },
            ],
          },
        ],
      },
      {
        model: Rating,
        include: [
          { model: User, attributes: ['name', 'image', 'id'], as: 'submitter' },
        ],
      },
      {
        model: Gallery,
        include: [{ model: GalleryEntry }],
      },
    ],
  });
  return res.status(200).send(user);
});

users.post('/create', async (req: Request, res: Response) => {
  const {
    name,
    image,
    location,
    sitter_rating,
    total_sitter_ratings,
    bio,
    average_rating,
    total_ratings,
  } = req.body;
  try {
    const user = await User.create(<userInfo>{
      name,
      image,
      location,
      sitter_rating,
      total_sitter_ratings,
      bio,
      average_rating,
      total_ratings,
    });
    res.status(201).send(user);
    return user;
  } catch {
    res.status(418).send(req.body);
  }
});

module.exports = users;
