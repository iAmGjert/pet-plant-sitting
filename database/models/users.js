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
    id: {type: DataTypes.NUMBER, primaryKey: true, autoIncrement: true}, 

    name: DataTypes.STRING,
    image: DataTypes.STRING,
    location: DataTypes.STRING,
    sitter_rating: DataTypes.NUMBER,
    total_sitter_ratings: DataTypes.NUMBER,
    bio: DataTypes.STRING,
    rating: DataTypes.NUMBER,
    total_ratings: DataTypes.NUMBER,
    gallery_id: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
