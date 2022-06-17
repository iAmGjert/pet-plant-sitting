const { DataTypes } = require('sequelize');

export const GalleryModel = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: DataTypes.INTEGER,
};
