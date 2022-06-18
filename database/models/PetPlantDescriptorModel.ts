const { DataTypes } = require('sequelize');

export const PetPlantDescriptorModel = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  descriptor: DataTypes.STRING,
  pet_plant_id: DataTypes.INTEGER,
};
