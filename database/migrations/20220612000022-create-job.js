'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('job', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}, 
      name: Sequelize.STRING,
      location: Sequelize.STRING,
      pet_plant: Sequelize.ARRAY(Sequelize.INTEGER),
      employer_id: Sequelize.INTEGER,
      sitter_id: Sequelize.INTEGER,
      applicants: Sequelize.ARRAY(Sequelize.INTEGER),
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
    await queryInterface.dropTable('job');
  }
};
