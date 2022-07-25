const { DataTypes } = require('sequelize');

export const JobModel = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: DataTypes.STRING,
  location: DataTypes.STRING,
  pet_plant: DataTypes.ARRAY(DataTypes.INTEGER),
  employer_id: DataTypes.INTEGER,
  sitter_id: DataTypes.INTEGER,
  startDate: DataTypes.DATEONLY,
  endDate: DataTypes.DATEONLY,
  isCompleted: DataTypes.BOOLEAN,
};
