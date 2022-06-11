'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('event', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}, 
      name: Sequelize.STRING,
      host: Sequelize.STRING,
      location: Sequelize.STRING,
      description: Sequelize.STRING,
      users_signed_up: Sequelize.INTEGER,
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
    await queryInterface.dropTable('event');
  }
};
