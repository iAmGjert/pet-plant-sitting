const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

const CLIENT_PATH = path.resolve(__dirname, '../client/build');
app.use(express.static(CLIENT_PATH));
app.use(express.json());
app.use(morgan('tiny'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`
    🚀 Server is listening at http://localhost:${port}
  `);
});
