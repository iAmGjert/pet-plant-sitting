import express, { Request, Response } from 'express';
const events = express();

const { Events } = require('../../database/index');
const { User } = require('../../database/index');
const { EventComment } = require('../../database/index');
const { EventParticipant } = require('../../database/index');

interface UserInfo {
  id: number;
}

interface EventInfo {
  name: string;
  host: number;
  location: string;
  description: string;
  startDate: Date;
  startTime: Date;
}

interface EventCommentInfo {
  id: number;
  event_id: number;
  comment: string;
  user_id: number;
}
interface EventParticipantInfo {
  id: number;
  event_id: number;
  user_id: number;
}

//* POST Routes *//

events.post('/create', (req: Request, res: Response) => {
 
  const { name, host, location, description, participants, startDate, startTime } = req.body;
 
  Events.create({ name, host, location, description, participants, startDate, startTime })
    .then((event: Record<string, EventInfo> | null) => {
      res.status(201).send(event?.dataValues);
    })
    .catch((err: Error) => {
      console.log(err);
      res.status(500).send(err);
    });
});


//* GET Routes *//

events.get('/all', async (req: Request, res: Response) => {
  try {
    const events = await Events.findAll({
      include: [
        { model: EventComment, include: [{ model: User, attributes: ['name', 'image'] }] },
        { model: EventParticipant, include: [{ model: User, attributes: ['name', 'image']}],
        },
        { model: User, attributes: ['name', 'image'] },
      ],
    });
    return res.status(200).send(events);
  } catch (err) {
    return res.status(500).send(err);
  }
});
//     });
//     console.log('hello');
//     return res.status(200).send(events);

//   } catch {
//     return res.sendStatus(418);
//   }
// });

events.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const event = await Events.findByPk(id);
  return res.json(event);
});

//get all event comments
events.get('/comments/all', (req: Request, res: Response) => {
  EventComment.findAll()
    .then((comments: Record<string, EventCommentInfo> | null) => {
      res.status(200).send(comments);
    })
    .catch((err: Error) => {
      res.status(500).send(err);
    });
});

events.get('/participants/all', (req: Request, res: Response) => {
  EventParticipant.findAll()
    .then((participants: Record<string, EventParticipantInfo> | null) => {
      res.status(200).send(participants);
    })
    .catch((err: Error) => {
      res.status(500).send(err);
    });
});

//* UPDATE Routes *//

events.put('/update/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, host, location, description, participants } = req.body;
  const event = await Events.update(
    {
      name,
      host,
      location,
      description,
      participants,
    },
    {
      where: { id },
    }
  );
  return res.json(event);
});

//* DELETE Routes *//

events.delete('/delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const event = await Events.destroy({
    where: { id },
  });
  return res.json(event);
});

module.exports = events;
