'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    name: DataTypes.STRING,
    host: DataTypes.STRING,
    location: DataTypes.STRING,
    description: DataTypes.STRING,
    users_signed_up: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
