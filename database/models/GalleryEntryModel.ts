const { DataTypes } = require('sequelize');

export const GalleryEntryModel = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  url: DataTypes.STRING,
  gallery_id: DataTypes.INTEGER,
};
