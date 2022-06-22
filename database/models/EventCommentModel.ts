const { DataTypes } = require('sequelize');

export const EventCommentModel = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  comment: DataTypes.STRING,
  user_id: DataTypes.INTEGER,
};
