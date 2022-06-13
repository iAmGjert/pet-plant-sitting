'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      name: Sequelize.STRING,
      image: Sequelize.STRING,
      location: Sequelize.STRING,
      sitter_rating: Sequelize.FLOAT,
      total_sitter_ratings: Sequelize.INTEGER,
      bio: Sequelize.STRING,
      rating: { type: Sequelize.FLOAT, defaultValue: 5 },
      total_ratings: Sequelize.INTEGER,
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
    await queryInterface.dropTable('users');
  }
};
