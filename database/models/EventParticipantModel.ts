const { DataTypes } = require('sequelize');

export const EventParticipantModel = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  event_id: DataTypes.INTEGER,
  user_id: DataTypes.INTEGER,
};
