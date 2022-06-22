const { DataTypes } = require('sequelize');

export const JobPetsPlantsModel = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  pet_plant_id: DataTypes.INTEGER,
  job_id: DataTypes.INTEGER,
};
