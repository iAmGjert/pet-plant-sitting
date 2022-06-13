'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 

    name: DataTypes.STRING,
    image: DataTypes.STRING,
    location: DataTypes.STRING,
    sitter_rating: DataTypes.FLOAT,
    total_sitter_ratings: DataTypes.INTEGER,
    bio: DataTypes.STRING,
    rating: { type: DataTypes.FLOAT, defaultValue: 5 },
    total_ratings: DataTypes.INTEGER,
    gallery_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
  });
<<<<<<< HEAD:database/models/users.js
  return users;
=======
  return Users;
>>>>>>> d1af6a30bede0ad2382067651ce75ea5926a1f4e:__UNUSED/models/Users.js
};
