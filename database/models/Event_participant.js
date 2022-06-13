'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event_participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event_participant.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    event_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'Event_participant',
  });
  return Event_participant;
};
