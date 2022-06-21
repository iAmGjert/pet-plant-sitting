const { DataTypes } = require('sequelize');

export const EventModel = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  host: DataTypes.INTEGER,
  location: DataTypes.STRING,
  description: DataTypes.STRING,
  participants: DataTypes.ARRAY(DataTypes.INTEGER),
  startDate: DataTypes.DATEONLY,
  endDate: DataTypes.DATEONLY,
  startTime: DataTypes.TIME,
};
