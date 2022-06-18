const { DataTypes } = require('sequelize');

export const EventCommentModel = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  event_id: DataTypes.INTEGER,
  comment: DataTypes.STRING,
  user_id: DataTypes.INTEGER,
};
