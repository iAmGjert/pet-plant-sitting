import express, { Request, Response } from 'express';

const { Op } = require('sequelize');
const conversations = express();

const { Conversation } = require('../../database/index');

interface ConversationInfo {
  participant1_id: number,
  participant2_id: number
};

/* GET Routes */

conversations.get('/', (req: Request, res: Response) => {
  const { participant1_id, participant2_id } = req.query;

  Conversation.findOne({
    where: {
      [Op.or]: [
        {
          participant1_id: participant1_id,
          participant2_id: participant2_id
        },
        {
          participant1_id: participant2_id,
          participant2_id: participant1_id
        }
      ]
    }
  }).then((conversation: Record<string, ConversationInfo> | null) => {
    if (conversation === null) {
      Conversation.create({
        participant1_id,
        participant2_id
      })
        .then((result: Record<string, ConversationInfo> | null) => {
          res.status(200).send({
            conversationId: result?.id
          });
        });
    } else {
      res.status(200).send({
        conversationId: conversation.id,
      });
    }
  });
});

module.exports = conversations;

