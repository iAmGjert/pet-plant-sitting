const { DataTypes } = require('sequelize');

export const EventCommentModel = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  event_id: DataTypes.INTEGER,
  comment: DataTypes.STRING,
  user_id: DataTypes.INTEGER,
};
