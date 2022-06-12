'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Job.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    pet_plant: DataTypes.ARRAY(DataTypes.INTEGER),
    employer_id: DataTypes.INTEGER,
    sitter_id: DataTypes.INTEGER,
    applicants: DataTypes.ARRAY(DataTypes.INTEGER),
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};
