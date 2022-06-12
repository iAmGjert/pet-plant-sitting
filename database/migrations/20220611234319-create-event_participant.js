'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('event_participant', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}, 
      event_id: Sequelize.INTEGER,
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
    await queryInterface.dropTable('event_participant');
  }
};
