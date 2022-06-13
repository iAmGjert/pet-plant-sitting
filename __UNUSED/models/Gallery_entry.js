'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gallery_entry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Gallery_entry.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    url: DataTypes.STRING,
    gallery_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Gallery_entry',
  });
  return Gallery_entry;
};

