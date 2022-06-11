'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pet_plant_descriptor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pet_plant_descriptor.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    descriptor: DataTypes.STRING,
    pet_plant_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'pet_plant_descriptor',
  });
  return pet_plant_descriptor;
};

