const DataTypes = require('sequelize').DataTypes;

export const UserModel = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  username: {
    // <-- may also be referered to as 'email'
    type: DataTypes.STRING,
    unique: true,
  },
  password: DataTypes.STRING,
  image: {
    type: DataTypes.STRING,
    defaultValue: 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg',
  },
  location: DataTypes.STRING,
  sitter_rating: DataTypes.FLOAT,
  total_sitter_ratings: DataTypes.INTEGER,
  bio: DataTypes.STRING(2000),
  average_rating: { type: DataTypes.FLOAT, defaultValue: 5 },
  total_ratings: DataTypes.INTEGER,
  gallery_id: DataTypes.INTEGER,
  theme: DataTypes.STRING,
};
