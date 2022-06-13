'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pet_plant', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}, 
      owner_id: Sequelize.INTEGER,
      name: Sequelize.STRING,
      image: Sequelize.STRING,
      breed: Sequelize.STRING,
      species: Sequelize.STRING,
      tags: Sequelize.ARRAY(Sequelize.STRING),
      rating: Sequelize.FLOAT,
      total_ratings: Sequelize.INTEGER,
      is_plant: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('pet_plant');
  }
};
