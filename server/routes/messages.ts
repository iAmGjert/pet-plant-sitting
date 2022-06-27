import express, { Request, Response } from 'express';
const { Messages } = require('../../database/index');

const messages = express();

interface Message {
  sender_id: number,
  receiver_id: number,
  conversation_id: number,
  text: string,
  createdAt: Date
}

/* GET Route */

messages.get('/past', (req: Request, res: Response) => {
  const { conversationId } = req.query;
  
  Messages.findAll({
    where: {
      conversation_id: conversationId,
    }
  })
    .then((results: Array<Message> | null) => {
      res.status(200).send(results);
    })
    .catch((error: Error) => {
      res.sendStatus(500);
      console.log(error);
    })
})


/* POST Route */

messages.post('/', (req: Request, res: Response) => {
  const { name, sender_id, receiver_id, conversation_id, text } = req.body;

  Messages.create({
    name,
    sender_id,
    receiver_id,
    conversation_id,
    text
  })
    .then((message: Record<string, Message> | null) => {
      res.status(201).send(message?.dataValues);
    })
    .catch((error: Error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

module.exports = messages;

