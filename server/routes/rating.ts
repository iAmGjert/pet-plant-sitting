import express, { Request, Response } from 'express';
const rating = express();

import { PetPlant, User, Rating } from '../../database/index';

rating.get('/all', async (req: Request, res: Response) => {
  try {
    const ratings = await Rating.findAll();
    return res.status(200).send(ratings);
  } catch {
    return res.sendStatus(418);
  }
});

rating.get('/:subject_id', async (req: Request, res: Response) => {
  const ratings = await Rating.findAll({
    where: {
      subject_id: req.params.id,
    },
    include: PetPlant,
  });
  return res.status(200).send(ratings);
});

// events.get('/all', async (req: Request, res: Response) => {
//   try {
//     const events = await Events.findAll({
//       // include: [EventComment, EventParticipant]
//       include: [{ model: EventComment,
//         include: [{
//           model: User,
//           attributes: ['name', 'image'],
//         }],
//       },
//       { model: EventParticipant,
//         include: [{
//           model: User,
//           attributes: ['name', 'image'],
//         }],
//       },
//       { model: User,
//         attributes: ['name', 'image'],
//       }],
//     });
//     return res.status(200).send(events);
//   } catch (err) {
//     return res.status(500).send(err);
//   }
// });
