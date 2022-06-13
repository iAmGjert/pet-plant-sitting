'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pet_plant_descriptor', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      descriptor: Sequelize.STRING,
      pet_plant_id: Sequelize.INTEGER,
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
    await queryInterface.dropTable('pet_plant_descriptor');
  }
};
