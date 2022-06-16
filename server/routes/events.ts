

import express, { Request, Response } from 'express';
const events = express();

const { Events } = require('../../database/index');
const { User } = require('../../database/index');
// const { EventComment } = require('../../database/index');
// const { EventParticipant } = require('../../database/index');

  interface UserInfo {
    id: number;
  }

interface EventInfo {
    name: string;
    location: string;
    description: string;
  }

events.post('/create', (req: Request, res: Response) => {
  User.findByPk(1)
    .then((user: Record<string, UserInfo> | null) => {
      // console.log(user?.dataValues.id, 'ln51');
      return user?.dataValues.id;
    })
    .then((userId: number) => {
      const { name, location, description /*participants */} = req.body;
      console.log(userId, 'data');
      Events.create({ name, host: userId, location, description/*, participants*/ })
        .then((event: Record<string, EventInfo> | null) => {
          res.status(201).send(event?.dataValues);
        })
        .catch((err: Error) => {
          console.log(err);
          res.status(500).send(err);
        });
    });
});


events.get('/all', async (req: Request, res: Response) => {
  const events = await Events.findAll();
  return res.json(events);
});

events.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const event = await Events.findByPk(id);
  return res.json(event);
});

events.put('/update/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, host, location, description, participants } = req.body;
  const event = await Events.update({
    name,
    host,
    location,
    description,
    participants,
  },
  {
    where: { id },
  });
  return res.json(event);
});

events.delete('/delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const event = await Events.destroy({
    where: { id },
  });
  return res.json(event);
});




module.exports = events;
