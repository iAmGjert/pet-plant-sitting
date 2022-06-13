'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet_plant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pet_plant.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    owner_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    breed: DataTypes.STRING,
    species: DataTypes.STRING,
    tags: DataTypes.ARRAY(DataTypes.STRING),
    rating: DataTypes.FLOAT,
    total_ratings: DataTypes.INTEGER,
    is_plant: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Pet_plant',
  });
  return Pet_plant;
};

