const {Sequelize} = require('sequelize');
// const {DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_DIALECT, DB_PORT } = process.env;
// const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/fern-herm');
const sequelize = new Sequelize('fern-herm', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});


sequelize.authenticate()
  .then(() => console.log('✨ Database Connected!'))
  .catch((err) => console.log('Error:', err));

module.exports = sequelize;



