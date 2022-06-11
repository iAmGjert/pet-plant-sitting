'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 

    name: DataTypes.STRING,
    image: DataTypes.STRING,
    location: DataTypes.STRING,
    sitter_rating: DataTypes.FLOAT,
    total_sitter_ratings: DataTypes.INTEGER,
    bio: DataTypes.STRING,
    rating: { type: DataTypes.FLOAT, defaultValue: 5 },
    total_ratings: DataTypes.INTEGER,
    gallery_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
