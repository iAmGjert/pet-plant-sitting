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

events.post('/comment/add', (req: Request, res: Response) => {
  const { event_id, comment, user_id } = req.body;
  EventComment.create({ event_id, comment, user_id })
    .then((eventComment: Record<string, EventCommentInfo> | null) => {
      res.status(201).send(eventComment?.dataValues);
    })
    .catch((err: Error) => {
      console.log(err);
      res.status(500).send(err);
    });
});

events.post('/participant/add', (req: Request, res: Response) => {
  const { event_id, user_id } = req.body;
  EventParticipant.create({ event_id, user_id })
    .then((eventParticipant: Record<string, EventParticipantInfo> | null) => {
      res.status(201).send(eventParticipant?.dataValues);
    })
    .catch((err: Error) => {
      res.status(500).send(err);
    });
});

//* GET Routes *//
//* Events
events.get('/all', (req: Request, res: Response) => {
  Events.findAll({
    include: [
      { model: EventComment, include: [{ model: User, attributes: ['id', 'name', 'image'] }] },
      { model: EventParticipant, include: [{ model: User, attributes: ['id', 'name', 'image']}] },
      { model: User, attributes: ['id', 'name', 'image'] },
    ],
  }).then((events: Record<string, EventInfo> | null) => {
    // console.log(events);
    res.status(200).send(events);
  }).catch((err: Error) => {
    console.log(err);
    res.status(500).send(err);
  });
});
 


events.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const event = await Events.findByPk(id);
  return res.json(event);
});

//* comments
events.get('/comments/all', (req: Request, res: Response) => {
  EventComment.findAll()
    .then((comments: Record<string, EventCommentInfo> | null) => {
      res.status(200).send(comments);
    })
    .catch((err: Error) => {
      res.status(500).send(err);
    });
});

//* participants
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
//* Events
events.put('/update/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, host, location, description, participants } = req.body;
  Events.update({ name, host, location, description, participants }, { where: { id } })
    .then((res: any) => {
      res.status(200).send(res);
    }).catch((err: Error) => {
      console.error(err);
      // res.status(500).send(err);
    });
});

// update comment
events.put('/comment/update/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { comment } = req.body;
  EventComment.update({ comment }, { where: { id } })
    .then((comment: any) => {
      // res.status(200).send(res);
    }).catch((err: Error) => {   
      console.error(err);
      res.status(500).send(err);  
    });
});
 
//* DELETE Routes *//

events.delete('/delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const event = await Events.destroy({
    where: { id },
  }).then((event: Record<string, EventInfo> | null) => {
    res.status(200).send(event?.dataValues);
  }
  ).catch((err: Error) => {
    console.error(err);
    res.status(500).send(err);
  });
});
  

// delete comment

events.delete('/comment/delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const comment = await EventComment.destroy({
    where: { id },
  }).then((comment: Record<string, EventCommentInfo> | null) => {
    res.sendStatus(204);
  }).catch((err: Error) => {
    console.error(err);
    res.status(500).send(err);
  });
});


module.exports = events;
