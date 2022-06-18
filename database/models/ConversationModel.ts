import { DataTypes } from 'sequelize';

export const ConversationModel = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  participant1_id: DataTypes.INTEGER,
  participant2_id: DataTypes.INTEGER,
};
