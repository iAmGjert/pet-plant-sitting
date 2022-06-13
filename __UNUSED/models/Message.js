'use strict';
const conversation = require('./Conversation.js');
const users = require('./Users');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(conversation, {
        foreignKey: 'conversation_id',
        as: 'conversation'
      });
      Message.belongsTo(users, {
        foreignKey: 'receiver_id',
        as: 'receiver'
      });
      Message.belongsTo(users, {
        foreignKey: 'sender_id',
        as: 'sender'
      });
    }
  }
  Message.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    name: DataTypes.STRING,
    sender_id: DataTypes.INTEGER,
    receiver_id: DataTypes.INTEGER,
    conversation_id: DataTypes.INTEGER,
    text: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
