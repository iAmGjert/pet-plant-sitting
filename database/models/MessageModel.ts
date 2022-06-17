const { DataTypes } = require('sequelize');

export const MessageModel = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  sender_id: DataTypes.INTEGER,
  receiver_id: DataTypes.INTEGER,
  conversation_id: DataTypes.INTEGER,
  text: DataTypes.STRING,
};
