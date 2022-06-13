'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('message', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}, 
      name: Sequelize.STRING,
      sender_id: Sequelize.INTEGER,
      receiver_id: Sequelize.INTEGER,
      text: Sequelize.STRING,
      conversation_id: Sequelize.INTEGER,
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
    await queryInterface.dropTable('message');
  }
};
