'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('job_applicant', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}, 
      job_id: Sequelize.INTEGER,
      user_id: Sequelize.INTEGER,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('job_applicant');
  }
};
