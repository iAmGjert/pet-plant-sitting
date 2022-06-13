const db = require('./models/index.js');


db.sequelize.authenticate()
  .then(() => console.log(' 💫 Database Connected!'))
  .catch((err) => console.log('Error:', err));

module.exports = db;



