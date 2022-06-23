const DataTypes = require('sequelize').DataTypes;

export const UserModel = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: DataTypes.STRING,
  image: DataTypes.STRING,
  location: DataTypes.STRING,
  sitter_rating: DataTypes.FLOAT,
  total_sitter_ratings: DataTypes.INTEGER,
  bio: DataTypes.STRING(1234),
  average_rating: { type: DataTypes.FLOAT, defaultValue: 5 },
  total_ratings: DataTypes.INTEGER,
  gallery_id: DataTypes.INTEGER,
};
