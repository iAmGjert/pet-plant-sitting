const Sequelize = require('sequelize');
require('dotenv').config();
const {DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_DIALECT, DB_PORT } = process.env;
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log(' 💫 Database Connected!'))
  .catch((err) => console.log('Error:', err));

module.exports = sequelize;



