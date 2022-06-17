import { DataTypes } from 'sequelize';

export const RatingModel = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  subject_id: DataTypes.INTEGER,
  value: DataTypes.INTEGER,
};
