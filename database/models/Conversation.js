'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  Conversation.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    name: DataTypes.STRING,
    participant1_id: DataTypes.INTEGER,
    participant2_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Conversation',
  });
  return Conversation;
};
