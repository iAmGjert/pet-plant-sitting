const { DataTypes } = require('sequelize');

export const JobApplicantModel = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: DataTypes.INTEGER,
  job_id: DataTypes.INTEGER,
  status: DataTypes.STRING
};
