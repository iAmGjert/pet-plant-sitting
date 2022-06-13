'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('gallery_entry', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}, 
      url: Sequelize.STRING,
      gallery_id: Sequelize.INTEGER,
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
    await queryInterface.dropTable('gallery_entry');
  }
};
