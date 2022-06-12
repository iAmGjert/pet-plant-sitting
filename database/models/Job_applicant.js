'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job_applicant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Job_applicant.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    user_id: DataTypes.INTEGER,
    job_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Job_applicant',
  });
  return Job_applicant;
};
