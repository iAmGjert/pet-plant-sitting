const { DataTypes } = require('sequelize');

export const PetPlantModel = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  owner_id: DataTypes.INTEGER,
  name: DataTypes.STRING,
  image: DataTypes.STRING,
  breed: DataTypes.STRING,
  species: DataTypes.STRING,
  bio: DataTypes.STRING,
  tags: DataTypes.ARRAY(DataTypes.STRING),
  rating: DataTypes.FLOAT,
  total_ratings: DataTypes.INTEGER,
  is_plant: DataTypes.BOOLEAN,
};
