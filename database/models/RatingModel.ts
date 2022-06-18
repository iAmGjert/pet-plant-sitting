import { DataTypes } from 'sequelize';

export const RatingModel = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: DataTypes.STRING,
  user_id: DataTypes.INTEGER,
  petplant_id: DataTypes.INTEGER,
  value: DataTypes.INTEGER,
  submitter_id: DataTypes.INTEGER,
};
